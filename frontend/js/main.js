const elSignUp = document.querySelector('.js-signup');
const elLogin = document.querySelector('.js-login');

elSignUp.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const formData = new FormData(elSignUp);
    const newUser =  Object.fromEntries(formData.entries());

    const response = await fetch('http://localhost:5000/signup', {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(newUser),
    })

    const data = await response.json();
    if(data.token){
        localStorage.setItem('token', data.token)
        window.location = '/html/index.html';
    } else {
        alert(data.message)
    }

    for(let i = 1; i <= 5; i++){
        evt.target.children[i].value = ''
    }
})

elLogin.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const formData = new FormData(elLogin);
    const newUser =  Object.fromEntries(formData.entries());

    const response = await fetch('http://localhost:5000/login', {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(newUser),
    })

    const data = await response.json();
    if(data.token){
        localStorage.setItem('token', data.token)
        window.location = '/html/index.html';
    } else {
        alert(data.message)
    }

    for(let i = 1; i <= 3; i++){
        evt.target.children[i].value = ''
    }
    
})














