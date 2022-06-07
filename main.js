let wordWindowOpened = false;
let wordListOpened = false;
const rusInput = document.querySelector('.rus');
const engInput = document.querySelector('.eng');
const addBtn = document.querySelector('.add');
const startBtn = document.querySelector('.start');
const showListBtn = document.querySelector('.showList')


addBtn.addEventListener('click', saveCard);
startBtn.addEventListener('click', renderCard);
showListBtn.addEventListener('click', getWordsList);

let cards = [
    { ru: 'дом', eng: 'home' },
    { ru: 'склон', eng: 'slope' },
    { ru: 'кислый', eng: 'sour' },
    { ru: 'мармелад', eng: 'marmalade' },
    { ru: 'звать', eng: 'call' },
    { ru: 'тень', eng: 'shadow' },
];

class Card {
    constructor(eng, rus, id) {
        this.eng = eng,
            this.rus = rus,
            this.id = id
    }

    render() {
        const parentCard = document.querySelector('.card__box');
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `      
        <div class="options">
            <p class="englishTranslate">${this.eng}</p>
            <p>${this.rus}</p>
        </div>
        <div class="answer">
           <input class="check__translate" type="text" name="check">
           <button class="check__btn">Проверить</button>
        </div>
        `;
        parentCard.append(div);
    }

}

localStorage.getItem('words' , JSON.parse(cards))


function renderCard() {
    if (wordListOpened) {
        closeWordsList();
    }
    try {
        document.querySelector('.card').remove();
        statusMessage.remove();
    } catch { }


    getRandomCard();
    document.querySelector('.check__translate').focus();
    toggleTranslate('0');
    wordWindowOpened = true;
    document.querySelector('.check__btn').addEventListener('click', checkTranslate);
    document.querySelector('.check__translate').addEventListener('keyup', test);
}

function test(e) {
    if (e.keyCode === 13) {
        checkTranslate();
    }
}

function checkTranslate() {
    const trueAnswer = document.querySelector('.englishTranslate');
    const answer = document.querySelector('.check__translate');

    const statusMessage = document.createElement('div');
    document.querySelector('.card').append(statusMessage);

    if (statusMessage) {
        document.querySelector('.check__btn').disabled = true;
    }

    if (answer.value === trueAnswer.innerHTML) {
        statusMessage.textContent = 'Верно';
        setTimeout(() => {
            document.querySelector('.card').remove();
            renderCard();
        }, 1000);
    }

    else {
        toggleTranslate('1')
        statusMessage.textContent = 'Попробуйте еще раз';

        setTimeout(() => {
            statusMessage.remove();
            renderCard();
        }, 1000);
    }
};


function toggleTranslate(value) {
    const engP = document.querySelector('.englishTranslate');
    engP.style.opacity = value;
};


function getRandomCard() {
    document.querySelector('.card__box').style.columnCount = ''
    const card = cards[Math.floor(Math.random() * cards.length)];
    let { ru: ru, eng: eng } = card;
    const newCard = new Card(eng, ru).render();

};


function saveCard() {
    const card = {};
    card.ru = rusInput.value;
    card.eng = engInput.value;
    if (card.ru === '' || card.eng === '') {
        return;
    }
    cards.push(card);
    localStorage.setItem('words', JSON.stringify(cards));
    addCardMessage(card.ru, card.eng);
    clearInputs();
}

function addCardMessage(eng, ru) {
    const message = document.querySelector('.addCardMessage');
    message.innerHTML = `Вы добавили слово  </br> ${eng} - ${ru}`
    message.style.opacity = '1'

    setTimeout(() => {
        message.style.opacity = '0'
    }, 1500);

}


function clearInputs() {
    rusInput.value = '';
    engInput.value = '';
}


function getWordsList() {

    if (wordWindowOpened) {
        closeWordWindow();
    }
    if (document.querySelector('.listItem') || document.querySelector('.card')) {
        let oldList = document.querySelectorAll('.listItem');
        oldList.forEach(item => {
            item.remove()
        });
    }
    try {
        const storageList = JSON.parse(localStorage.getItem('words'));
        storageList.forEach(item => {
            renderList(item);
        });
    } catch {
        cards.forEach(item => {
            renderList(item);
        });
    }
    wordListOpened = true;
   
}

function renderList(item) {
    let { ru: ru, eng: eng } = item;
    const itemList = document.createElement('p')
    const removeBtn = document.createElement('button')
    const parentList = document.querySelector('.card__box');
    parentList.style.columnCount = 2;
    removeBtn.textContent = 'Удалить';

    itemList.classList.add('listItem');
    removeBtn.classList.add('removeItemBtn');
    itemList.textContent = `${ru} - ${eng}`;

    parentList.append(itemList);
    itemList.append(removeBtn);


}

function closeWordWindow() {
    document.querySelector('.card').remove();
    wordWindowOpened = false;
}

function closeWordsList() {
    document.querySelectorAll('.listItem').forEach(item => {
        item.remove();
    })
    wordListOpened = false;
}


document.querySelector('.card__box').addEventListener('click' , function(e){
    if(e.target.classList.contains('listItem')){
        e.target.remove()
    }
})






