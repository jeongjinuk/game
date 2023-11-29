class Any{

    constructor() {
        this.type = false;
        this.routeList = [1,2,3,4]; // 경로 값 상하좌우 이동 1 = 2 row 이런식
        this.curPosition = [0,0]; // 0은 x, 1은 y
    }
    getHTML(){
        if(this.type == "end"){
            return `<div class='end'></div>`;
        }else if(this.type == "T"){
            return `<div class='T'></div>`;
        }
        return `<div class='${this.type ? "road" : "wall"}'></div>`;
    }

    // 현재 좌표에서 step 만큼 가보고 좌표 반환
    // 미로사이즈를 들고 있는 애가 MazeBuilder라서 따로 빼기 좀 힘드네
    getNext(step, operator){
        if (this.routeList.length == 0 && !operator){ // 무한루프 돌 수도 있어서 갈 수 있는 경로에 대한 값을 미리 만들고 인덱스로 랜덤하게 뽑음
            return null;
        }
        let next = [0,0, !operator ? this.routeList.splice(Math.floor(Math.random() * this.routeList.length), 1)[0] : operator];
        switch (next[2]){
            case 1:
                next[0] = this.curPosition[0] + step;
                next[1] = this.curPosition[1];
                break;
            case 2:
                next[0] = this.curPosition[0];
                next[1] = this.curPosition[1] + step;
                break;
            case 3:
                next[0] = this.curPosition[0] - step;
                next[1] = this.curPosition[1];
                break;
            case 4:
                next[0] = this.curPosition[0];
                next[1] = this.curPosition[1] - step;
                break;
        }
        return next;
    }

}