slot1 = document.getElementById('deck1')
slot2 = document.getElementById('deck2')
slot3 = document.getElementById('deck3')
slot4 = document.getElementById('deck4')

carta = document.querySelectorAll('div.card')
button = document.getElementById('editar')

if (localStorage.getItem('personagem') == 'Mago') {
    carta1 = 'chama'
} else if (localStorage.getItem('personagem') == 'Guerreiro') {
    carta1 = 'espada'
} else {
    carta1 = 'flecha'
}

slot1.src = 'images/' + carta1 + '.png'

if (localStorage.getItem('slot1') == null) {
    localStorage.setItem('slot1', carta1)
}

function editar_cursor() {
    if (slot1.id == 'carta_editar') {
        slot1.id = 'deck1'
        slot2.id = 'deck2'
        slot3.id = 'deck3'
        slot4.id = 'deck4'
        slots.style.display = 'none'
        slots2.style.display = 'none'
        slots3.style.display = 'none'
        button.innerHTML = 'Editar'

        for (b = 1; b <= 15; b++) {
            acao = document.getElementById('card' + b)
            acao.style.cursor = 'default'
        }

    } else {
        slot1.id = 'carta_editar'
        slot2.id = 'carta_editar'
        slot3.id = 'carta_editar'
        slot4.id = 'carta_editar'
        slots.style.display = 'block'
        slots2.style.display = 'block'
        slots3.style.display = 'block'
        button.innerHTML = 'Parar'

        for (b = 1; b <= 15; b++) {
            acao = document.getElementById('card' + b)
            acao.style.cursor = 'pointer'
        }
    }
}

slot = 2

function editar(n) {
    if (n == 'slot2') {
        slot = slot2
    } else if (n == 'slot3') {
        slot = slot3
    } else {
        slot = slot4
    }
}

cartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

localStorage.setItem('carta', 'fogo')

for (i = 1; i <= 15 ; i++) {
    card = document.getElementById('card' + i)

    //console.log(card)

    dataset = card.dataset.hab

    if (dataset == undefined) {
        card.src = 'images/abelha.jpg'
        //console.log(dataset + `${i}`)
    } else {

        for (c = 1; c <= cartas.length; c++) {
            card.src = 'images/' + dataset + '.png'
        }
    }
}

function adicionar(img) {
    if (card.style.cursor == 'pointer') {
        nimg = document.createElement('img')
        nimg.src = img
        nimg.classList.add('image')
        slot.src = nimg.src
    }
}