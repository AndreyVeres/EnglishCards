class Card {
    constructor(eng, rus, img) {
        this.eng = eng,
            this.rus = rus,
            this.img = img
    }
    render() {
        const parentCard = document.querySelector('.card__box');
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `      
        <div class="options">
            <p class="engP">${this.eng}</p>
            <p>${this.rus}</p>
        </div>
        <div class="answer">
           <input class="check__translate" type="text" name="check">
           <button id="check__btn">Проверить</button>
        </div>
        `;

        parentCard.append(div);
    }

}
const cards = [];
const rusInput = document.querySelector('.rus');
const engInput = document.querySelector('.eng');
const addBtn = document.querySelector('.add');
const startBtn = document.querySelector('.start');
const checkBtn = document.getElementById('check__btn');

let doneCounter = 0;
let wrongCounter = 1;



addBtn.addEventListener('click', saveCard);
startBtn.addEventListener('click', renderCard);


function renderCard() {
    const doneCounterPlace = document.querySelector('.done');
    doneCounterPlace.innerHTML = `${doneCounter}`;
    const wrongCounterPlace = document.querySelector('.wrong');
    wrongCounterPlace.innerHTML = `${wrongCounter}`;
    console.log(wrongCounterPlace)
    console.log(wrongCounter)

    document.querySelectorAll('.counter').forEach(counter => {
        counter.style.visibility = 'visible';
    });

    try {
        document.querySelector('.card').remove();
    } catch { }

    const card = cards[Math.floor(Math.random() * cards.length)];
    let { ru: ru, eng: eng, img: img } = card;
    const newCard = new Card(eng, ru, img).render();


    const engP = document.querySelector('.engP');
    engP.style.display = 'none';

    const checkBtn = document.getElementById('check__btn');
    checkBtn.addEventListener('click', checkTranslate);

    function checkTranslate() {
        const answer = document.querySelector('.check__translate');
        const div = document.createElement('div');
        document.querySelector('.card').append(div);
        if (answer.value === engP.innerHTML) {
            div.textContent = 'Верно';
          
            doneCounter++;
            setTimeout(() => {
                document.querySelector('.card').remove();
                renderCard();
            }, 1500);

        } else {
            div.textContent = 'Попробуйте еще раз';
            console.log(wrongCounter)
            
            setTimeout(() => {
                div.remove();
            }, 1500);
        }

    }
}


function saveCard() {
    const card = {};
    card.ru = rusInput.value;
    card.eng = engInput.value;
    cards.push(card);

}
