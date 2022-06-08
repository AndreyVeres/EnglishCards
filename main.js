start();
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
class Card {
    constructor(eng, rus) {
        this.eng = eng,
            this.rus = rus
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
function start() {
    const card = {};
    card.ru = 'привет';
    card.eng = 'hi';
    localStorage.setItem(card.ru, JSON.stringify(card));
}
function renderCard() {
    if (wordListOpened) {
        closeWordsList();
    }
    try {
        document.querySelector('.card').remove();
        statusMessage.remove();
    } catch { }
    document.querySelector('.card__box').style.columnCount = '';
    getRandomCard();
    document.querySelector('.check__translate').focus();
    toggleTranslate('0');
    wordWindowOpened = true;
    document.querySelector('.check__btn').addEventListener('click', checkTranslate);
    document.querySelector('.check__translate').addEventListener('keyup', enter);
}
function checkTranslate() {
    const trueAnswer = document.querySelector('.englishTranslate');
    const answer = document.querySelector('.check__translate');
    const statusMessage = document.createElement('div');
    statusMessage.classList.add('statusMessage')
    document.querySelector('.card').append(statusMessage);
    if (statusMessage) {
        document.querySelector('.check__btn').disabled = true;
    }
    if (answer.value === trueAnswer.innerHTML) {
        statusMessage.textContent = 'Верно';
        statusMessage.style.color = 'rgb(27, 206, 131)'
        setTimeout(() => {
            document.querySelector('.card').remove();
            renderCard();
        }, 900);
    }
    else {
        toggleTranslate('1');
        statusMessage.textContent = 'Попробуйте еще раз';
        statusMessage.style.color = 'rgba(170, 18, 18, 0.692)';
        setTimeout(() => {
            statusMessage.remove();
            renderCard();
        }, 1500);
    }
}
function getRandomCard() {
    let card = JSON.parse(localStorage.getItem(localStorage.key(getRandomInt(localStorage.length))))
    let { ru: ru, eng: eng } = card;
    const newCard = new Card(eng, ru).render();
}
function saveCard() {
    const card = {};
    card.ru = rusInput.value;
    card.eng = engInput.value;
    card.id = Math.random();
    if (card.ru === '' || card.eng === '') {
        return;
    }
    localStorage.setItem(card.id, JSON.stringify(card))
    addCardMessage(card.ru, card.eng);
    clearInputs();
    if (wordListOpened || !wordWindowOpened) {
        getWordsList();
    }
    engInput.focus()
}
function addCardMessage(eng, ru) {
    const message = document.querySelector('.addCardMessage');
    message.innerHTML = `Вы добавили слово  </br> ${eng} - ${ru}`;
    message.style.opacity = '1';
    setTimeout(() => {
        message.style.opacity = '0';
    }, 1500);
}
function getWordsList() {
    if (wordWindowOpened) {
        closeWordWindow();
    }
    if (document.querySelector('.listItem') || document.querySelector('.card')) {
        let oldList = document.querySelectorAll('.listItem');
        oldList.forEach(item => {
            item.remove();
        });
    }
    for (let i = 0; i < localStorage.length; i++) {
        let card = JSON.parse(localStorage.getItem(localStorage.key(i)));
        renderList(card);
    }
    wordListOpened = true;
}
function renderList(item) {
    let { ru: ru, eng: eng, id: id } = item;
    const itemList = document.createElement('p');
    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('id', item.id);
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
    });
    wordListOpened = false;
}
function toggleTranslate(value) {
    const engP = document.querySelector('.englishTranslate');
    engP.style.opacity = value;
};
function clearInputs() {
    rusInput.value = '';
    engInput.value = '';
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function enter(e) {
    if (e.keyCode === 13) {
        checkTranslate();
    }
}
function removeWord(e) {
    if (e.target.classList.contains('removeItemBtn')) {
        let id = e.target.getAttribute('id');
        localStorage.removeItem(id);
        e.target.parentElement.remove();
        getWordsList();
    }
}
const parent = document.querySelector('.card__box').addEventListener('click', function (e) {
    removeWord(e);
});




