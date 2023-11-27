let flag = true;
let reset = () => {
    for (let card of document.querySelectorAll('.card')) {
        flag = flag && card.style.pointerEvents === "none";
    }
    if (flag) {
        alert(117- (score + visible)  + "점 입니다.");
        location.reload();
        return;
    }
    flag = true;
}
