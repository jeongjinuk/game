class MazeBuilder {

    constructor() {
        this.x = [1, -1, 0, 0];
        this.y = [0, 0, 1, -1];
        this.size = 39;
        this.maze = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            this.maze[i] = new Array();
        }
    }

    build() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let any = new Any();
                any.curPosition = [i, j];
                this.maze[i][j] = any;
            }
        }
        this.createdMaze();
        this.increasedDifficulty();
        this.setShortestRoute();
        return this.maze;
    }
    // 유틸
    isMazeRouteRange(x, y) {
        return x >= 0 &&
            y >= 0 &&
            x <= this.size - 1 &&
            y <= this.size - 1;
    }

    //미로 만들기
    createdMaze() {
        const stack = [];
        let start = this.maze[Math.floor(Math.random() * this.size)][Math.floor(Math.random() * this.size)];
        start.type = true;
        stack.push(start);

        while (stack.length) {
            let cur = stack[stack.length-1];
            let nextRoute = cur.getNext(2,0);

            if (nextRoute == null) {
                stack.pop();
                continue;
            }

            if (this.isMazeRouteRange(nextRoute[0], nextRoute[1]) && !this.maze[nextRoute[0]][nextRoute[1]].type) {

                let curNode = this.maze[nextRoute[0]][nextRoute[1]];
                curNode.type = true;

                let wall = cur.getNext(1, nextRoute[2]);
                this.maze[wall[0]][wall[1]].type = true;

                stack.push(curNode);
            }
        }
        this.setStartAndEndPoint();
    }
    // 끝지정 시작 지정
    setStartAndEndPoint() {
        let row0 = this.maze[0];
        let row1 = this.maze[1];
        let row2 = this.maze[this.size - 1];
        let row3 = this.maze[this.size - 2];

        row0[0].type = true;
        row0[1].type = true;
        row1[0].type = true;
        row1[1].type = true;

        row2[this.size - 1].type = "end";
        row2[this.size - 2].type = true;
        row3[this.size - 1].type = true;
        row3[this.size - 2].type = true;
    }

    // 밑에도 Any를 이용하고 싶은데 이게 또 만들어줘야함
    // 가장 최단 경로 검색
    setShortestRoute() {
        const copy = JSON.parse(JSON.stringify(this.maze));
        const q = [];
        q.push([0,0,1]); // x, y, 이동했는 횟수

        while (q.length && q[0][0] != this.size - 1 && q[0][1] != this.size - 1) {
            q.sort((o1, o2) => o2[2] - o1[2]);
            let pop = q.shift();
            copy[pop[0]][pop[1]].type = false;
            for (let i = 0; i < 4; i++) {
                let nx = pop[0] + this.x[i];
                let ny = pop[1] + this.y[i];
                if (this.isMazeRouteRange(nx, ny) && copy[nx][ny].type) {
                    q.push([nx, ny, pop[2]+1]);
                }
            }
        }
        this.route = q[0][2];
    }

    // 미로 난이도 올리기
    increasedDifficulty() {
        const walls = [];
        const copy = JSON.parse(JSON.stringify(this.maze));
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (!copy[i][j].type) {
                    const coordinate = [];
                    this.wallSearch(i, j, copy, coordinate);
                    walls.push(coordinate);
                }
            }
        }
        // 벽자르기 여러 루트가 생길 수 있도록
        this.spliceWalls(walls);
    }
    // 벽 좌표 탐색
    wallSearch(i, j, copy, coor) {
        if (this.isMazeRouteRange(i, j) && !copy[i][j].type){
            copy[i][j].type = true;
            coor.push([i, j]);
            for (let k = 0; k < 4; k++) {
                this.wallSearch(i + this.x[k], j + this.y[k], copy, coor);
            }
        }
    }
    // 미로를 더 복잡하게 만들기 위해서
    spliceWalls(walls){
        const setRoad = (coors) => coors.forEach(coor => this.maze[coor[0], coor[1]].type = true);
        walls
            .filter(value => value.length > 20) // 벽길이가 40 넘어갈때만
            .forEach(wall => {
            let start = wall.splice(0, wall.length / 2).splice(wall.length/2/2, 3);
            let mid = wall.splice(wall.length / 2, 3);
            let end = wall.splice(wall.length / 2, wall.size).splice(wall.length/2/2, 3);
            setRoad(start);
            setRoad(mid);
            setRoad(end);
        });
    }
}
