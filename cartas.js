slot1 = document.getElementById("deck1");
slot2 = document.getElementById("deck2");
slot3 = document.getElementById("deck3");
slot4 = document.getElementById("deck4");

carta = document.querySelectorAll("div.card");
button = document.getElementById("editar");
save = document.getElementById("salvar");
slots = document.getElementById("slots");
slots2 = document.getElementById("slots2");
slots3 = document.getElementById("slots3");

editarBtn = document.getElementById("editar");

if (localStorage.getItem("personagem") == "Mago") {
    //arma principal
    carta1 = "chama";
} else if (localStorage.getItem("personagem") == "Guerreiro") {
    carta1 = "espada";
} else {
    carta1 = "flecha";
}

slot1.src = "images/" + carta1 + ".png"; //img da carta principal

if (localStorage.getItem("slot1") == null) {
    localStorage.setItem("slot1", carta1);
}

if (localStorage.getItem("slot2") != null) {
    slot2.src = localStorage.getItem("slot2");
}
if (localStorage.getItem("slot3") != null) {
    slot3.src = localStorage.getItem("slot3");
}
if (localStorage.getItem("slot4") != null) {
    slot4.src = localStorage.getItem("slot4");
}

function editar_cursor() {
    //ativa ou desativa o cursor pointer
    if (editarBtn.innerHTML == "Parar") {
        slot = "";
        save.style.display = "none";
        slots.style.display = "none";
        slots2.style.display = "none";
        slots3.style.display = "none";
        button.innerHTML = "Editar";

        for (b = 1; b <= 15; b++) {
            acao = document.getElementById("card" + b);
            acao.style.cursor = "default";
        }
    } else {
        save.style.display = "block";
        slots.style.display = "block";
        slots2.style.display = "block";
        slots3.style.display = "block";
        button.innerHTML = "Parar";

        for (b = 1; b <= 15; b++) {
            acao = document.getElementById("card" + b);
            acao.style.cursor = "pointer";
        }
    }
}

slot = "";

function editar(n) {
    //seleciona o slot
    if (n == "slot2") {
        slot = slot2;
    } else if (n == "slot3") {
        slot = slot3;
    } else {
        slot = slot4;
    }
}

cartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; //nº cartas conhecidas

for (i = 1; i <= 15; i++) {
    card = document.getElementById("card" + i);

    dataset = card.dataset.hab;

    if (dataset == undefined) {
        card.src = "images/abelha.jpg";
    } else {
        card.src = "images/" + dataset + ".png";
    }
}

function adicionar(img) {
    if (slot2.src != img && slot3.src != img && slot4.src != img) {
        slot.src = img;
    } else {
      alert('Já está sendo usado em outro slot')
      return
    }
}

function salvar() {
    //salva a imagem no localStorage
    localStorage.setItem("slot1", carta1);
    localStorage.setItem("slot2", slot2.src);
    localStorage.setItem("slot3", slot3.src);
    localStorage.setItem("slot4", slot4.src);

    save.innerHTML = "Salvo";

    intervalo = setInterval(() => {
        save.innerHTML = "Salvar";
        clearInterval(intervalo);
    }, 1000);
}
