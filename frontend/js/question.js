const elLi = document.querySelector('.js-template-li').content;
const elList = document.querySelector('.js-list');
const elSendBnt = document.querySelector('.js-send-btn');
const elRightAnswer = document.querySelector('.js-right-answer');
const elPage = document.querySelector('.js-page');
const elNextStage = document.querySelector('.js-next-stage');


const token = localStorage.getItem('token');

async function getQuestions(){
    try {
        const req = await fetch(`http://localhost:5000/questions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },            
        });
        const res = await req.json();

        localStorage.setItem('questions', JSON.stringify(res[0]))
        render(res[0], elList, res[1]);

        if(res[1].page !== 4){
            elPage.textContent =  `your page is ${res[1].page}`
        } else {
            elPage.textContent = "You done all questions"
            elPage.style.marginTop = '200px'
            elSendBnt.disabled = true;
            elNextStage.disabled = true;
        }

    } catch(error){
        throw error
    }
}
getQuestions()

function render (arr, node, user){
    js_user_name.innerHTML = '';
    js_user_name.textContent = `Welcome ${user.name} to our knowlage battle!` 
    node.innerHTML = '';
    const fragment = new DocumentFragment();

    
    arr.forEach((item, idx) => {
        const clone = elLi.cloneNode(true);
        clone.querySelector('.question').textContent = `${idx + 1}. ${item.question}`
        clone.querySelector('.a').append(item.a);
        clone.querySelector('.b').append(item.b);
        clone.querySelector('.c').append(item.c);

        fragment.append(clone);
    });
    node.append(fragment);
}

async function sendAnswers(evt){
    const userAnswers = []
    elList.childNodes.forEach(item => {
        if(item.tagName == 'LI'){
            const formData = new FormData(item.childNodes[1])
            const newAnswer = {answer: formData.get('answer')} 
            userAnswers.push(newAnswer)        
        }
    })
    
    const questions = JSON.parse(localStorage.getItem('questions'));
    const rightAnswers = userAnswers.filter((item, idx)=> item.answer == questions[idx].answer);
    const answers = {
        isCorrect: rightAnswers.length,
    }

    elRightAnswer.textContent = `to'g'ri javoblar soni ${rightAnswers.length} ta`;
    const allInput = document.querySelectorAll('input');
    allInput.forEach(item => item.disabled = true);

    const req = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            authorization: token
        },
        body: JSON.stringify(answers)
    });

    const res = req.json();

    elSendBnt.disabled = true;
    elNextStage.disabled = false;
}

async function nextStage () {
    const response = await fetch('http://localhost:5000/next-stage', {
        method: "GET",
        headers:{"Content-Type": "application/json", authorization: token },
    })
    
    const data = await response.json();
    if(data.token){
        localStorage.setItem('token', data.token)
        window.location = '/html/index.html';
    } else {
        alert(data.message)
    }
}


elSendBnt.addEventListener('click', sendAnswers)
elNextStage.addEventListener('click', nextStage)
