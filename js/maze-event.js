const container = document.querySelector("#maze");
const movableElement = document.querySelector("#player");
const walls = document.querySelectorAll(".wall");
const ends = document.querySelectorAll(".end");
const step = 20;

let travel = 0;
let isMoving = false;

function arrived(x, y){
    let arrived = false;
    ends.forEach(end => {
        const  endRect = end.getBoundingClientRect();
        arrived = arrived || ( x ==  endRect.top && y ==  endRect.left);
    });
    return arrived;
}

function isCollision(x, y){
    let isCollision = false;
    walls.forEach(wall => {
        const wallRect = wall.getBoundingClientRect();
        isCollision = isCollision || ( x ==  wallRect.top && y ==  wallRect.left);
    });
    return isCollision;
}


function keyDown(e) {
    if (isMoving) return;
    isMoving = !isMoving;

    const playerRect = movableElement.getBoundingClientRect();
    let newX = playerRect.left - container.getBoundingClientRect().left;
    let newY = playerRect.top - container.getBoundingClientRect().top;
    let top = movableElement.getBoundingClientRect().top;
    let left = movableElement.getBoundingClientRect().left;

    switch (e.key) {
        case "ArrowUp":
            newY = Math.max(newY - step, 0);
            top = top - step;
            break;
        case "ArrowDown":
            newY = Math.min(newY + step, container.clientHeight - playerRect.height);
            top = top + step;
            break;
        case "ArrowLeft":
            newX = Math.max(newX - step, 0);
            left = left - step;
            break;
        case "ArrowRight":
            newX = Math.min(newX + step, container.clientWidth - playerRect.width);
            left = left + step;
            break;
    }

    if (!isCollision(top, left)) {
        movableElement.style.transform = `translate(${newX}px, ${newY}px)`;
        travel++;
    }
    if (arrived(top, left)){
        let format = `최단거리 : ${shortestRoute} \n당신의 기록 : ${travel}`
        alert(format);
        location.reload();
    }
    setTimeout(() => {isMoving = !isMoving}, 140); // 일정 시간(예: 100ms) 아니면 이벤트가 연속으로 발생해서 벽통과함
}

document.addEventListener("keydown",  keyDown);