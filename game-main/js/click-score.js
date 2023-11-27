let cards = document.querySelectorAll('.card');
let score = 0;
let movesCounter = 0;

// 클릭 이벤트 발생 시 스코어 증가 및 업데이트
cards.forEach(card => {
  card.addEventListener('click', function () {
    // 클릭 이벤트에 따른 게임 로직 추가

    // 무브 횟수 증가
    increaseMoveCount();

    // 두 카드가 매치되지 않아도 클릭 시 스코어 증가
    increaseScore();0
    
    // 스코어 및 무브 횟수 업데이트 함수 호출
    updateScore();
    updateMoveCount();
  });
});

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

// 초기화 함수 등이 필요한 경우 추가...




// .클래스, #아이디, 태그 div
// addEventListener(); 이벤등록은 이친구로


