class MazeBuilder{

    constructor() {
        this.size = 39;
        this.maze = new Array(this.size);
        this.stack = new Array();
    }

    build(){
        for (let i = 0; i < this.size; i++) {
            let col = new Array(this.size);
            for (let j = 0; j < this.size; j++){
                let any = new Any();
                if (i % 2 == 0 && j % 2 == 0){
                    col[j] = any;
                    continue;
                }
                any.type = "wall";
                col[j] = any;
            }
            this.maze[i] = col;
        }
        this.backTracking();
        return this.maze;
    }

    backTracking(){
        this.maze[0][0].curPosition[0] = 0;
        this.maze[0][0].curPosition[1] = 0;
        this.maze[0][0].type = "road";
        this.stack.push(this.maze[0][0]);

        while (this.stack.length != 0){
            console.log(this.stack.length);
            let pop = this.stack.pop();
            this.stack.push(pop);
            let routePosition = pop.getRoutePosition();

            if (routePosition == null) {
                this.stack.pop();
                continue;
            }
            if (routePosition[0] < 0 ||
                routePosition[1] < 0 ||
                routePosition[0] > this.size-1 ||
                routePosition[1] > this.size-1)
                continue;

            if (this.maze[routePosition[0]][routePosition[1]].type == "road") continue;

            this.maze[routePosition[0]][routePosition[1]].curPosition = routePosition;
            this.maze[routePosition[0]][routePosition[1]].type = "road";

            let wallPosition = pop.getWallPosition(routePosition[2]);
            this.maze[wallPosition[0]][wallPosition[1]].type = "road";
            this.stack.push(this.maze[routePosition[0]][routePosition[1]]);
        }


    }

}
