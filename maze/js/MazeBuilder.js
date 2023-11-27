class MazeBuilder {

    constructor() {
        this.roadType = "road";
        this.endType = "end";
        this.size = 39;
        this.maze = new Array(this.size);
        this.stack = new Array();
        for (let i = 0; i < this.size; i++) {
            this.maze[i] = new Array();
        }
    }

    build() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.maze[i][j] = new Any();
            }
        }
        this.createMaze();
        this.startAndEndPoint();
        this.findWalls();
        this.shortestRoot();
        return this.maze;
    }

    // 최단거리
    shortestRoot() {
        const copy = JSON.parse(JSON.stringify(this.maze)); // 그대로 써야함
        // const copy = this.maze;
        let q = [];
        // 출발지 0,0
        // 방문지 type = T
        // [x,y,count]횟수
        q.push([0, 0, 1]);
        let x = [1, -1, 0, 0];
        let y = [0, 0, 1, -1];
        while (q.length) {
            let pop = q.shift();
            if (pop[0] == this.size - 1 && pop[1] == this.size - 1) {
                this.root = pop[2];
                return;
            }
            copy[pop[0]][pop[1]].type = "T";
            for (let i = 0; i < 4; i++) {
                let nx = pop[0] + x[i];
                let ny = pop[1] + y[i];

                if (nx < 0 ||
                    ny < 0 ||
                    nx > this.size - 1 ||
                    ny > this.size - 1 ||
                    copy[nx][ny].type == "wall" ||
                    copy[nx][ny].type == "T") {
                    continue;
                }
                q.push([nx, ny, pop[2]+1]);
            }
        }
    }


    findWalls() {
        let walls = [];
        const copy = JSON.parse(JSON.stringify(this.maze));

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (copy[i][j].type == "wall") {
                    let coor = [];
                    this.getLongWallCoordinates(i, j, copy, coor);
                    walls.push(coor);
                }
            }
        }
        // 벽자르기
        walls.forEach(wall => {
            let stat = wall.splice(0, wall.length / 2);
            stat = stat.splice(stat.length/ 2, 3);
            let mid = wall.splice(wall.length / 2, 3);
            stat.forEach(arr => {
                this.maze[arr[0]][arr[1]].type = this.roadType;
            })
            mid.forEach(arr => {
                this.maze[arr[0]][arr[1]].type = this.roadType;
            });
        });
    }

    getLongWallCoordinates(i, j, copy, coor) {
        if (i < 0 || j < 0 || i > this.size - 1 || j > this.size - 1 || copy[i][j].type != "wall") {
            return;
        }
        copy[i][j].type = "T";
        coor.push([i, j]);
        this.getLongWallCoordinates(i + 1, j, copy, coor);
        this.getLongWallCoordinates(i - 1, j, copy, coor);
        this.getLongWallCoordinates(i, j + 1, copy, coor);
        this.getLongWallCoordinates(i, j - 1, copy, coor);
    }


    startAndEndPoint() {
        let row0 = this.maze[0];
        let row1 = this.maze[1];
        let row2 = this.maze[this.size - 1];
        let row3 = this.maze[this.size - 2];

        row0[0].type = this.roadType;
        row0[1].type = this.roadType;
        row1[0].type = this.roadType;
        row1[1].type = this.roadType;

        row2[this.size - 1].type = this.endType;
        row2[this.size - 2].type = this.roadType;
        row3[this.size - 1].type = this.roadType;
        row3[this.size - 2].type = this.roadType;
    }

    //백트래킹
    createMaze() {
        let startPosition = [Math.floor(Math.random() * this.size), Math.floor(Math.random() * this.size)];
        let start = this.maze[startPosition[0]][startPosition[1]];
        start.curPosition = startPosition;
        start.type = this.roadType;
        this.stack.push(start);

        while (this.stack.length) {
            let pop = this.stack.pop();
            this.stack.push(pop);

            let routePosition = pop.getRoutePosition();

            if (this.isNullRoute(routePosition)) {
                this.stack.pop();
                continue;
            }

            if (this.isMazeRouteRange(routePosition)) continue;

            let curNode = this.maze[routePosition[0]][routePosition[1]];
            curNode.curPosition = routePosition;
            curNode.type = this.roadType;

            let wallPosition = pop.getWallPosition(routePosition[2]);
            let wallNode = this.maze[wallPosition[0]][wallPosition[1]];
            wallNode.type = this.roadType;
            this.stack.push(curNode);
        }
    }

    isMazeRouteRange(routePosition) {
        return routePosition[0] < 0 ||
            routePosition[1] < 0 ||
            routePosition[0] > this.size - 1 ||
            routePosition[1] > this.size - 1 ||
            this.maze[routePosition[0]][routePosition[1]].type == "road";
    }

    isNullRoute(routePosition) {
        return routePosition == null;
    }
}
