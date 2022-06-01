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
            <p class="engP">${this.eng}</p>
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
let cards = [{ru: 'дом', eng: 'home', id: 0.3093031704097471}];

const rusInput = document.querySelector('.rus');
const engInput = document.querySelector('.eng');
const addBtn = document.querySelector('.add');
const startBtn = document.querySelector('.start');



addBtn.addEventListener('click', saveCard);
startBtn.addEventListener('click', renderCard);


function renderCard() {
    try {
        document.querySelector('.card').remove();
        statusMessage.remove();
    } catch { }

    getRandomCard();
    toggleTranslate();

    document.querySelector('.check__btn').addEventListener('click', checkTranslate);


}

console.log(document.querySelector('.check__btn'))


checkTranslate = () => {
    const trueAnswer = document.querySelector('.engP');
    const answer = document.querySelector('.check__translate');
    
    const statusMessage = document.createElement('div');
    document.querySelector('.card').append(statusMessage);

    if(statusMessage){
        document.querySelector('.check__btn').disabled = true;
    }
    if (answer.value === trueAnswer.innerHTML) {
        statusMessage.textContent = 'Верно';
        setTimeout(() => {
            document.querySelector('.card').remove();
            renderCard();
        }, 1000);
    } else {
        statusMessage.textContent = 'Попробуйте еще раз';

        setTimeout(() => {
            statusMessage.remove();
            renderCard();
        }, 1000);
    }

};


toggleTranslate = () => {
    const engP = document.querySelector('.engP');

    engP.style.display = 'none';
};



getRandomCard =  (res) => {
    // try {
    //     fetch('http://localhost:3000/posts')
    //     .then(res => res.json())
    //     .then(res => {
    //         res.forEach(item => {
    //              cards.push(item);
    //         });
    //     });  
    // }catch {

    // }
    
        const local =JSON.parse(localStorage.getItem('words')) 
        console.log(local)

        local.forEach(item => {
            cards.push(item);
        })

        const card = cards[Math.floor(Math.random() * cards.length)];
   
        let { ru: ru, eng: eng, id = '' } = card;
        const newCard = new Card(eng, ru, '').render();

  
};


function saveCard() {
    const card = {};
  
    card.ru = rusInput.value;
    card.eng = engInput.value;
    card.id = Math.random();
    cards.push(card);
   
    // postCard('http://localhost:3000/posts', card);
}

async function postCard(url, data) {
    const res = await fetch(`${url}`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
}


const deleteBtn = document.querySelector('.delete')
deleteBtn.addEventListener('click' , function(){
    fetch('http://localhost:3000/posts/0.6156288728783055' , {
        method: 'DELETE',
    
    });
})

document.querySelector('.local').addEventListener('click' , function () {
    localStorage.setItem('words' , JSON.stringify(cards));
});


