abelha_hp = 20;
abelha_atk = 2;
abelha_def = 1;
abelha_slot1 = "Ferrão";

vespa_hp = 20;
vespa_atk = 3;
vespa_def = 1;
vespa_slot1 = "Ferrão";

if (localStorage.getItem('personagem') == 'Mago') {
    localStorage.setItem('hp', 30)
    localStorage.setItem('atk', 3)
    localStorage.setItem('def', 2)
} else if (localStorage.getItem('personagem') == 'Guerreiro') {
    localStorage.setItem('hp', 25)
    localStorage.setItem('atk', 3)
    localStorage.setItem('def', 3)
} else {
    localStorage.setItem('hp', 20)
    localStorage.setItem('atk', 4)
    localStorage.setItem('def', 1)
}

inimigo = localStorage.getItem("inimigo");
eu = document.getElementById("euimg");
inimigo_img = document.getElementById("inimigoimg");
personagem = localStorage.getItem("personagem");
player_hp = localStorage.getItem("hp");
player_atk = localStorage.getItem("atk");
player_def = localStorage.getItem("def");

slotg1 = document.getElementById("slot1");
slotg2 = document.getElementById("slot2");
slotg3 = document.getElementById("slot3");
slotg4 = document.getElementById("slot4");

slot1 = localStorage.getItem("slot1");
slot2 = localStorage.getItem("slot2");
slot3 = localStorage.getItem("slot3");
slot4 = localStorage.getItem("slot4");

hp = document.getElementById("vida");
hpi = document.getElementById("vidai");

money = Number(localStorage.getItem("money"))

if (inimigo == 'abelha') {
    inimigo_img.src = 'images/Abelha2.png'
} else if (inimigo == 'vespa') {
    inimigo_img.src = 'images/vespa.png'
    inimigo_img.style.height = '80px'
}


if (personagem == "Mago") {
  eu.src = "images/Mago.png";
} else if (personagem == "Guerreiro") {
  eu.src = "images/Guerreiro.png";
} else {
  eu.src = "images/Arqueiro.png";
}

function playerv() {
  slot1.onclick = "slot1()";
  slot2.onclick = "slot2()";
  slot3.onclick = "slot3()";
  slot4.onclick = "slot4()";
}

function inimigov() {
  slot.onclick = "none";
}

function luta() {
  if (inimigo == "abelha") {
    hp.innerHTML = `HP: ${player_hp}`;
    hpi.innerHTML = `HP: ${abelha_hp}`;
  }

  if (inimigo == "vespa") {
    hp.innerHTML = `HP: ${player_hp}`
    hpi.innerHTML = `HP: ${vespa_hp}`
  }

  if (abelha_hp == 0 || vespa_hp == 0) {

    if (document.getElementById('win').style.display != 'block') {
        document.getElementById('win').style.display = 'block'
      money += 10
      console.log(money)
      localStorage.setItem("money", money)
    }
  }

  if (player_hp == 0) {
    document.getElementById('lose').style.display = 'block'
      money -= 10
      console.log(money)
      localStorage.setItem("money", money)
  }
}

luta()

function desistir() {
  confirmar = confirm("Se desistir perderá 5 moedas");

  if (confirmar == true) {
    if ((money = localStorage.getItem("money") < 5)) {
      alert("Você não tem dinheiro para desistir");
    } else {
      money = localStorage.getItem("money");
      money -= 5;
      localStorage.setItem("money", money);

      window.location.href = "mapa.html";
    }
  }
}

function sair() {
    if (abelha_hp == 0) {
    level = Number(localStorage.getItem('level'))
    level += 1
    localStorage.setItem('level', level)
    console.log(level)
    }
    window.location.href = 'mapa.html'
}

function slot1() {
    acao = localStorage.getItem('slot1')
    img = localStorage.getItem('slot1_img')

    slotg1.src = img

    abelha_hp -= acao
    vespa_hp -= acao

    luta()
}

function slot2() {
  acao2 = localStorage.getItem('slot2')
  img2 = localStorage.getItem('slot2_img')

  slotg2.src = img2

  abelha_hp -= acao2
  vespa_hp -= acao2

  luta()
}

function slot3() {
  acao3 = localStorage.getItem('slot3')
  img3 = localStorage.getItem('slot3_img')

  slotg3.src = img3

  abelha_hp -= acao3
  vespa_hp -= acao3

  luta()
}

function slot4() {
  acao4 = localStorage.getItem('slot4')
  img4 = localStorage.getItem('slot4_img')

  slotg4.src = img4

  abelha_hp -= acao4
  vespa_hp -= acao4

  luta()
}