let flag = true;
let first = "";
let second = "";
let disableDeck = false;

let cards = document.querySelectorAll('.card');
let score = 0;
let movesCounter = 0;

// 무브 횟수를 증가시키는 함수
function increaseMoveCount() {
    movesCounter++;
}

// 스코어를 증가시키는 함수
function increaseScore() {
    score++;
}

// 스코어를 화면에 업데이트하는 함수
function updateScore() {
    // 업데이트된 스코어를 화면에 표시
    document.getElementById('score').innerText = score;
}

// 무브 횟수를 화면에 업데이트하는 함수
function updateMoveCount() {
    // 업데이트된 무브 횟수를 화면에 표시
    document.getElementById('moveCount').innerText = "Moves: " + movesCounter;
}

// 화면 초기화 클리어 시
function reset() {
    for (let card of document.querySelectorAll('.card')) {
        flag = flag && card.style.pointerEvents === "none";
    }
    if (flag) {
        alert(score - visible + "점 입니다.");
        location.reload();
        return;
    }
    flag = true;
}

// 카드 뒤집기 이벤트
function flipEvent(e){

    let currentTarget = e.currentTarget;
    if (currentTarget !== first && !disableDeck) {
        currentTarget.classList.add("is-flipped");
        if (!first) {
            first = currentTarget;
            return;
        }
        second = e.currentTarget;
        disableDeck = true;
        if (first.attributes.value.value - second.attributes.value.value === 0) {
            first.style.pointerEvents = "none";
            second.style.pointerEvents = "none";
        } else {
            first.classList.remove("is-flipped");
            second.classList.remove("is-flipped");
        }
        first = "";
        second = "";
        disableDeck = false;
    }
}

// 클릭 이벤트 발생 시 스코어 증가 및 업데이트
cards.forEach(card => {
    card.addEventListener('click', function () {
        // 클릭 이벤트에 따른 게임 로직 추가

        // 무브 횟수 증가
        increaseMoveCount();

        // 두 카드가 매치되지 않아도 클릭 시 스코어 증가
        increaseScore();

        // 스코어 및 무브 횟수 업데이트 함수 호출
        updateScore();
        updateMoveCount();
    });
});

// 초기 할당시 카드 뒤집기가능
cards.forEach(card => {
        card.classList.add("is-flipped");
        setTimeout(() => {
            card.classList.remove("is-flipped");
            card.style.pointerEvents = "auto";
        }, visibleTime);
    });

// 리셋 및 뒤집기 이벤트 할당
cards.forEach(h => {
        h.addEventListener('click', flipEvent)
        h.addEventListener('click', reset)
    });



