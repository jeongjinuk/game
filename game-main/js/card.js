class Card {
    static cardTmp = '<div class="scene scene--card">' +
        '    <div class="card"  value="{0}" style="pointer-events: none;">' + // 클릭 잠깐 막기
        '        <div class="card__face card__face--front" >?</span></div>' +
        '        <div class="card__face card__face--back">{0}</div>' +
        '    </div>' +
        '</div>';

    static start = (cardSize) => {
        let array = new Array();
        let result = new Array();
        let pair = 2

        while (pair-- > 0){
            for (let i = 1; i <= cardSize; i++) {
                array.push(i);
            }
        }

        let pairCardSize = array.length;

        while (pairCardSize-- > 0){
            let rand = Math.floor(Math.random() * pairCardSize);
            let slice = array.splice(rand,1);
            result.push(slice);
        }
        return result;
    }
    static flipEvent = (e) => {
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
    constructor(formater, arr) {
        this.cardList = new Array();
        this.formater = formater;
        this.arr = arr;
        this.len = arr.length;
    }
    cardHtmlBuilder() {
        for (let i = 0; i < this.len; i++) {
            this.cardList[i] = this.formater(Card.cardTmp, this.arr[i]);
        }
        return this.cardList;
    }
}




