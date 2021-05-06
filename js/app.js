const modal = document.querySelector('.modal');
const form = document.querySelector('.modal--form');
const table = document.querySelector('#table-body');

let userData = []
let userID = 1


const getData = localStorage.getItem('user')

if(getData !== null) {
    userData = JSON.parse(getData)
    table.innerHTML = renderData();
}

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
       userData.forEach((value, i) => {
            if(value.userID === (+tr)) userData.splice(i, 1)
        })
    }

    saveUser(userData)

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
    userData.push(userInfoObj)

    saveUser(userData)
    
}

function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}


function renderData() {
    return userData.map(({lastName, firstName, club, age, level, userID}) => {
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

window.addEventListener('click', (e) => {
    if (e.target == modal) modal.style.display = "none";
})