const modal = document.querySelector('.modal');
const form = document.querySelector('.modal--form');
const table = document.querySelector('#table-body');

const userData = `[]`
let userID = 1

const jsonData = JSON.parse(userData);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    saveUserData(e)
    table.innerHTML = renderData();
    modal.style.display = 'none'
    form.reset()
})

table.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-trash-alt')) {
        let tr = e.target.parentNode.parentNode.id;
        jsonData.forEach((value, i) => {
            if(value.userID === (+tr)) jsonData.splice(i, 1)
        })
    }

    table.innerHTML = renderData();
})

function saveUserData({target}) {
    const userInfoObj = {
        userID,
        lastName: target.surname.value,
        firstName: target.firstName.value,
        age: target.age.value,
        club: target.club.value,
        level: target.level.value
    }
    userID++
    jsonData.push(userInfoObj)
    
}


function renderData() {
    return jsonData.map(({lastName, firstName, club, age, level, userID}) => {
        return `<tr id=${userID}>
                    <td>${lastName}</td>
                    <td>${firstName}</td>
                    <td>${age}</td>
                    <td>${level}</td>
                    <td>${club}</td>
                    <td><i class="fas fa-trash-alt"></i></td>
                </tr>`
    }).join('')
}

document.querySelector('.add-btn').addEventListener('click', () => {
    modal.style.display = 'block';
})

document.querySelector('.close').addEventListener('click', () => {
    modal.style.display = 'none'
})