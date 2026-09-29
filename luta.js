let tfogo = 2;
let tmagma = 3;
let tflechas = 1;
let tespecial = 2

let recargaFogo = 2;
let recargaMagma = 3;
let recargaFlechas = 1;
let recargaEspecial = 1;

let abelha_hp = 20;
let abelha_atk = 2;
let abelha_def = 1;

let vespa_hp = 20;
let vespa_atk = 3;
let vespa_def = 1;

let deck1 = document.getElementById("deck1");
let deck2 = document.getElementById("deck2");
let deck3 = document.getElementById("deck3");
let deck4 = document.getElementById("deck4");

let personagem = localStorage.getItem("personagem");

if (personagem == "Mago") {
    localStorage.setItem("hp", 30);
    localStorage.setItem("atk", 3);
    localStorage.setItem("def", 2);
    deck1.src = "images/chama.png";
} else if (personagem == "Guerreiro") {
    localStorage.setItem("hp", 25);
    localStorage.setItem("atk", 3);
    localStorage.setItem("def", 3);
    deck1.src = "images/espada.png";
} else {
    localStorage.setItem("hp", 20);
    localStorage.setItem("atk", 4);
    localStorage.setItem("def", 1);
    deck1.src = "images/flecha.png";
}

let eu = document.getElementById("euimg");
let player_hp = Number(localStorage.getItem("hp"));
let player_atk = Number(localStorage.getItem("atk"));
let player_def = Number(localStorage.getItem("def"));

let inimigo = localStorage.getItem("inimigo");
let inimigo_img = document.getElementById("inimigoimg");

if (inimigo == "abelha") {
    inimigo_img.src = "images/Abelha2.png";
} else if (inimigo == "vespa") {
    inimigo_img.src = "images/vespa.png";
    inimigo_img.style.height = "80px";
}

if (personagem == "Mago") {
    eu.src = "images/Mago.png";
} else if (personagem == "Guerreiro") {
    eu.src = "images/Guerreiro.png";
} else {
    eu.src = "images/Arqueiro.png";
}

let slotg1 = document.getElementById("slot1");
let slotg2 = document.getElementById("slot2");
let slotg3 = document.getElementById("slot3");
let slotg4 = document.getElementById("slot4");

let carta1 = localStorage.getItem("slot1");
let carta2 = localStorage.getItem("slot2");
let carta3 = localStorage.getItem("slot3");
let carta4 = localStorage.getItem("slot4");

if (carta1 != null) {
    if (carta1 == "chama" || carta1 == "espada" || carta1 == "flecha") {
        deck1.src = "images/" + carta1 + ".png";
    } else {
        deck1.src = carta1;
    }
}

if (carta2 != null) deck2.src = carta2;
if (carta3 != null) deck3.src = carta3;
if (carta4 != null) deck4.src = carta4;

let hp = document.getElementById("vida");
let hpi = document.getElementById("vidai");

let money = Number(localStorage.getItem("money"));

let turno = 1;
let aguardandoInimigo = false;
let encerrada = false;

let cooldown = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
};

let cooldownTexto = {
    1: document.createElement("span"),
    2: document.createElement("span"),
    3: document.createElement("span"),
    4: document.createElement("span"),
};

for (let i = 1; i <= 4; i++) {
  cooldownTexto[i].style.position = "absolute";
  //cooldownTexto[i].style.top = "5px";
  //cooldownTexto[i].style.left = "5px";
  cooldownTexto[i].style.fontSize = "20px";
  cooldownTexto[i].style.fontWeight = "bold";
  cooldownTexto[i].style.color = "white";
  cooldownTexto[i].style.textShadow = "1px 1px 3px black";

  document.getElementById("slot" + i).style.position = "relative";
  document.getElementById("slot" + i).appendChild(cooldownTexto[i]);
}

function nomeCarta(src) {
    if (!src) return "";

    let nome = src.split("/").pop().split(".")[0];

    return nome.toLowerCase();
}

function danoCarta(src) {
    let carta = nomeCarta(src);

    if (carta == "fogo" || carta == "chama") {
        return tfogo;
    }

    if (carta == "magma") {
        return tmagma;
    }

    if (carta == "flechas" || carta == "flecha") {
        return tflechas;
    }

    if (carta == "tespecial") {
        return tespecial;
    }

    return 0;
}

function recargaCarta(src) {
    let carta = nomeCarta(src);

    if (carta == "fogo" || carta == "chama") {
        return recargaFogo;
    }

    if (carta == "magma") {
        return recargaMagma;
    }

    if (carta == "flechas" || carta == "flecha") {
        return recargaFlechas;
    }

    if (carta == "tespecial") {
        return recargaEspecial;
    }

    return 0;
}

function atacar(slotNumber) {
    if (encerrada) return;

    if (aguardandoInimigo) return;

    if (cooldown[slotNumber] > 0) {
        console.log(
            "Essa carta ainda está em recarga por " +
                cooldown[slotNumber] +
                " turno(s).",
        );
        return;
    }

    let imagem;

    if (slotNumber == 1) {
        imagem = deck1.src;
    } else if (slotNumber == 2) {
        imagem = deck2.src;
    } else if (slotNumber == 3) {
        imagem = deck3.src;
    } else if (slotNumber == 4) {
        imagem = deck4.src;
    }

    if (!imagem) return;

    let dano = danoCarta(imagem);
    let recarga = recargaCarta(imagem);

    if (dano <= 0) {
        console.log("Essa carta ainda não possui dano definido.");
        return;
    }

    abaterCooldowns();

    if (inimigo == "abelha") {
        abelha_hp -= dano;
    } else if (inimigo == "vespa") {
        vespa_hp -= dano;
    }

    cooldown[slotNumber] = recarga;

    document.getElementById("deck" + slotNumber).style.filter = "grayscale(80%)";

    mostrarCooldown();

    luta();

    if (encerrada) return;

    aguardandoInimigo = true;

    setTimeout(() => {
        turnoInimigo();
    }, 500);
}

function abaterCooldowns() {
    for (let i = 1; i <= 4; i++) {
        if (cooldown[i] > 0) {
            cooldown[i]--;
        }
    }

    mostrarCooldown();
}

function mostrarCooldown() {
  for (let i = 1; i <= 4; i++) {
      if (cooldown[i] > 0) {
          cooldownTexto[i].innerHTML = cooldown[i];
          document.getElementById("deck" + i).style.filter = "grayscale(80%)";
      } else {
          cooldownTexto[i].innerHTML = "";
          document.getElementById("deck" + i).style.filter = "";
      }
  }
}

function turnoInimigo() {
    if (encerrada) return;

    let danoInimigo;

    if (inimigo == "abelha") {
        danoInimigo = abelha_atk - player_def;
    } else if (inimigo == "vespa") {
        danoInimigo = vespa_atk - player_def;
    } else {
        return;
    }

    if (danoInimigo < 1) {
        danoInimigo = 1;
    }

    player_hp -= danoInimigo;

    localStorage.setItem("hp", player_hp);

    luta();

    if (!encerrada) {
        aguardandoInimigo = false;
        turno++;
    }
}

slotg1.onclick = () => atacar(1);
slotg2.onclick = () => atacar(2);
slotg3.onclick = () => atacar(3);
slotg4.onclick = () => atacar(4);

function luta() {
    hp.innerHTML = "HP: " + Math.max(0, player_hp);

    if (inimigo == "abelha") {
        hpi.innerHTML = "HP: " + Math.max(0, abelha_hp);
    } else if (inimigo == "vespa") {
        hpi.innerHTML = "HP: " + Math.max(0, vespa_hp);
    }

    let inimigo_morto =
        (inimigo == "abelha" && abelha_hp <= 0) ||
        (inimigo == "vespa" && vespa_hp <= 0);

    if (inimigo_morto) {
        encerrada = true;

        document.getElementById("win").style.display = "block";

        money += 10;

        localStorage.setItem("money", money);

        return;
    }

    if (player_hp <= 0) {
        encerrada = true;

        document.getElementById("lose").style.display = "block";

        money -= 10;

        localStorage.setItem("money", money);
    }
}

function desistir() {
    let confirmar = confirm("Se desistir perderá 5 moedas");

    if (confirmar) {
        if (money < 5) {
            alert("Você não tem dinheiro para desistir");
        } else {
            money -= 5;

            localStorage.setItem("money", money);

            window.location.href = "mapa.html";
        }
    }
}

function sair() {
    if (
        (inimigo == "abelha" && abelha_hp <= 0) ||
        (inimigo == "vespa" && vespa_hp <= 0)
    ) {
        let level = Number(localStorage.getItem("level"));

        level += 1;

        localStorage.setItem("level", level);
    }

    window.location.href = "mapa.html";
}

luta();