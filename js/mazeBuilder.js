const x = [1, -1, 0, 0];
const y = [0, 0, 1, -1];
let size = 0;
const maze = new Array(size);
let shortestRoute = 0;

// 실행 함수 및 초기화 작업
class MazeBuilder {
    constructor(mazeSize) {
        size = mazeSize;
        for (let i = 0; i < size; i++) {
            maze[i] = [];
            for (let j = 0; j < size; j++) {
                maze[i][j] = new MazeCell(i, j);
            }
        }
    }
    build() {
        this.#createdMaze();
        this.#setStartAndEndPoint();
        this.#increasedDifficulty();
        this.#setShortestRoute();
        return maze;
    }

    // 미로 범위
    #isMazeRouteRange(x, y) {
        return x >= 0 && y >= 0 && x <= size - 1 && y <= size - 1;
    }

    // 미로생성
    #createdMaze() {
        const stack = [];
        let start = maze[Math.floor(Math.random() * size)][Math.floor(Math.random() * size)];
        start.type = true;
        stack.push(start);

        while (stack.length) {
            let cur = stack[stack.length - 1];
            let nextRoute = cur.getNext(2, 0);

            if (nextRoute == null) {
                stack.pop();
                continue;
            }

            if (this.#isMazeRouteRange(nextRoute[0], nextRoute[1]) &&
                !maze[nextRoute[0]][nextRoute[1]].type) {

                let curNode = maze[nextRoute[0]][nextRoute[1]];
                curNode.type = true;

                let wall = cur.getNext(1, nextRoute[2]);
                maze[wall[0]][wall[1]].type = true;

                stack.push(curNode);
            }
        }
    }

    // 밑에도 Any를 이용하고 싶은데 이게 또 만들어줘야함
    // 가장 최단 경로 검색
    // 오류 있음 마지막 도착지까지 연결된 경로가 존재하지 않을 수 있음
    #setShortestRoute() {
        const copy = JSON.parse(JSON.stringify(maze));
        // const copy = maze;
        const q = [];
        q.push([0, 0, 1]); // x, y, 이동했는 횟수

        while (q.length) {
            let pop = q.shift();
            if (pop[0] == size - 1 && pop[1] == size - 1) {
                shortestRoute = pop[2];
                break;
            }
            // copy[pop[0]][pop[1]].type = "T";
            copy[pop[0]][pop[1]].type = false;
            for (let i = 0; i < 4; i++) {
                let nx = pop[0] + x[i];
                let ny = pop[1] + y[i];
                if (this.#isMazeRouteRange(nx, ny) && copy[nx][ny].type) {
                    q.push([nx, ny, pop[2] + 1]);
                }
                // if (this.#isMazeRouteRange(nx, ny) && (copy[nx][ny].type != "T" && copy[nx][ny].type)) {
                //     q.push([nx, ny, pop[2] + 1]);
                // }
            }
        }
    }

    // 끝지정 시작 지정
    #setStartAndEndPoint() {
        let row0 = maze[0];
        let row1 = maze[1];
        let row2 = maze[size - 1];
        let row3 = maze[size - 2];

        row0[0].type = true;
        row0[1].type = true;
        row1[0].type = true;
        row1[1].type = true;

        row2[size - 1].type = "end";
        row2[size - 2].type = true;
        row3[size - 1].type = true;
        row3[size - 2].type = true;
    }

    // 미로 난이도 올리기
    #increasedDifficulty() {
        const walls = [];
        const copy = JSON.parse(JSON.stringify(maze));
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (!copy[i][j].type) {
                    const coordinate = [];
                    this.#wallSearch(i, j, copy, coordinate);
                    walls.push(coordinate);
                }
            }
        }

        this.#spliceWalls(walls);
    }

    // 벽 좌표 탐색 및 벽길이 알 수 있게
    #wallSearch(i, j, copy, coor) {
        if (this.#isMazeRouteRange(i, j) && !copy[i][j].type) {
            copy[i][j].type = true;
            coor.push([i, j]);
            for (let k = 0; k < 4; k++) {
                this.#wallSearch(i + x[k], j + y[k], copy, coor);
            }
        }
    }

    // 벽 자르기 여러 루트가 생길 수 있도록
    // 미로를 더 복잡하게 만들기 위해서
    #spliceWalls(walls) {
        const setRoad = (coors) => coors.forEach((coor) => maze[coor[0], coor[1]].type = true);
        walls
            .filter(value => value.length > 5) // 벽길이가 40 넘어갈때만
            .forEach(wall => {
                let start = wall.splice(0, wall.length / 2).splice(wall.length / 2 / 2, 3);
                let mid = wall.splice(wall.length / 2, 3);
                setRoad(start);
                setRoad(mid);
            });
    }
}
