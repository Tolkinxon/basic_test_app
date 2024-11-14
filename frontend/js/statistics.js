const elTemplate = document.querySelector('.js-stasitics-template').content;
const elStatisticsList = document.querySelector('.js-stasitics-list');
const elStatistict = document.querySelector('.js-statistics');
const elStatistictBtn = document.querySelector('.js-stasitics-btn');
const elLogout = document.querySelector('.js-logout-btn');

function renderStatistics(arr, node){
    node.innerHTML = '';
    const fragment = new DocumentFragment();
    
    arr.forEach(({isCorrect, sure_name, name}, idx) => {
        const clone = elTemplate.cloneNode(true);
        clone.querySelector('.stasitics__user-name').textContent = name + " " + sure_name;
        clone.querySelector('.statistics__procent').textContent = `${((isCorrect * 100) / 15).toFixed(1)}%`;
        clone.querySelector('.diagramm').style.width = `${((isCorrect * 100) / 15).toFixed()}%`;

        fragment.append(clone);
    });
    node.append(fragment);
}


async function getStatistics(){
    
    try {
        const req = await fetch(`http://localhost:5000/statistics`);
        let res = await req.json();

        res =  res.filter(item =>item.name !== undefined)
        res.sort((a, b) => b.isCorrect - a.isCorrect);

        renderStatistics(res,elStatisticsList);
    } catch(error){
        throw error
    }
}


function showStatistics () {
    getStatistics()
    elStatistict.classList.toggle('hide'); 
}

function logout () {
    window.location = '/'
    localStorage.clear();
}

elStatistictBtn.addEventListener('click', showStatistics)
elLogout.addEventListener('click', logout)