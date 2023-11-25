class Any{
    constructor() {
        this.type = "T";
        this.routeList = new Array(1,2,3,4); // 경로 값 상하좌우 이동 1 = 2 row 이런식
        this.curPosition = new Array(0,0); // 0은 x, 1은 y
    }
    getHTML(){
        return "<div class='"+this.type+"'></div>"
    }
    getRoutePosition(){
        if (this.routeList.length == 0){
            return null;
        }
        let routePosition = new Array();
        routePosition[2] = this.routeList.splice(Math.floor(Math.random() * this.routeList.length), 1)[0];
        switch (routePosition[2]){
            case 1:
                routePosition[0] = this.curPosition[0] + 2;
                routePosition[1] = this.curPosition[1] + 0;
                break;
            case 2:
                routePosition[0] = this.curPosition[0] + 0;
                routePosition[1] = this.curPosition[1] + 2;
                break;
            case 3:
                routePosition[0] = this.curPosition[0] - 2;
                routePosition[1] = this.curPosition[1] + 0;
                break;
            case 4:
                routePosition[0] = this.curPosition[0] + 0;
                routePosition[1] = this.curPosition[1] - 2;
                break;
        }

        return routePosition;
    }

    getWallPosition(positionOperator){
        let wallPosition = [];
        switch (positionOperator){
            case 1:
                wallPosition[0] = this.curPosition[0] + 1;
                wallPosition[1] = this.curPosition[1] + 0;
                break;
            case 2:
                wallPosition[0] = this.curPosition[0] + 0;
                wallPosition[1] = this.curPosition[1] + 1;
                break;
            case 3:
                wallPosition[0] = this.curPosition[0] - 1;
                wallPosition[1] = this.curPosition[1] + 0;
                break;
            case 4:
                wallPosition[0] = this.curPosition[0] + 0;
                wallPosition[1] = this.curPosition[1] - 1;
                break;
        }
        return wallPosition;
    }



}