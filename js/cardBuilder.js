class CardBuilder {
    constructor(cardSize) {
        this.cardSize = cardSize;
    }

    start(){
        this.cardList = new Array();
        let array = new Array();
        let pair = 2

        while (pair-- > 0){
            for (let i = 1; i <= this.cardSize; i++) {
                array.push(i);
            }
        }

        let pairCardSize = array.length;

        while (pairCardSize-- > 0){
            let rand = Math.floor(Math.random() * pairCardSize);
            this.cardList.push(array.splice(rand,1));
        }
        return this;
    }

    #getCardHTML(value){
        return `<div class="scene scene--card">
            <div class="card"  value="${value}" style="pointer-events: none;">
                <div class="card__face card__face--front" >?</span></div>
                <div class="card__face card__face--back">${value}</div>
            </div>
        </div>`;
    }

    build() {
        let resultTemp = [];
        for (let i = 0; i < this.cardSize * 2; i++) {
            resultTemp.push(this.#getCardHTML(this.cardList[i]));
        }
        return resultTemp;
    }
}




