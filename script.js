if (localStorage.getItem('personagem') == null) {
    document.getElementById('escolher').style.display = 'static'
    document.querySelector('div').style.display = 'none'
} else {
    document.getElementById('escolher').style.display = 'none'
    document.querySelector('div').style.display = 'static'
}

function p1() {
    localStorage.setItem('personagem', 'Mago')
    window.location.href = 'index.html'
}

function p2() {
    localStorage.setItem('personagem', 'Guerreiro')
    window.location.href = 'index.html'
}

function p3() {
    localStorage.setItem('personagem', 'Arqueiro')
    window.location.href = 'index.html'
}

if (localStorage.getItem('level') == null) {
    localStorage.setItem('level', 1)
} else if (localStorage.getItem('money') == null) {
    localStorage.setItem('money', 0)
}

document.getElementById('money').innerHTML = localStorage.getItem('money')
document.getElementById('level').innerHTML = localStorage.getItem('level')

money = localStorage.getItem('money')
level = localStorage.getItem('level')

function save() {
    localStorage.setItem('level', level)
    localStorage.setItem('money', money)

    moneyp = document.getElementById('money')
    levelp = document.getElementById('level')

    moneyp.innerHTML = localStorage.getItem('money')
    levelp.innerHTML = localStorage.getItem('level')

    alert('Jogo salvo')
}

lutador = document.getElementById('llutador')

if (localStorage.getItem('personagem') == 'Mago') {
    lutador.src = 'images/Mago.png'
    localStorage.setItem('hp', 30)
    localStorage.setItem('atk', 3)
    localStorage.setItem('def', 2)
} else if (localStorage.getItem('personagem') == 'Guerreiro') {
    lutador.src = 'images/Guerreiro.png'
    localStorage.setItem('hp', 25)
    localStorage.setItem('atk', 3)
    localStorage.setItem('def', 3)
} else {
    lutador.src = 'images/Arqueiro.png'
    localStorage.setItem('hp', 20)
    localStorage.setItem('atk', 4)
    localStorage.setItem('def', 1)
}

