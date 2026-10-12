const dbRequest = indexedDB.open("RPG", 1);

// ============================================================
// BANCO
// ============================================================

let db = null;

// ============================================================
// ABRIR / CRIAR BANCO
// ============================================================

dbRequest.onupgradeneeded = (event) => {
    const banco = event.target.result;

    if (!banco.objectStoreNames.contains("game_config")) {
        banco.createObjectStore("game_config", {
            keyPath: "chave",
        });
    }
};

dbRequest.onsuccess = (event) => {
    db = event.target.result;

    console.log("Banco RPG aberto.");

    carregarCartas();
};

dbRequest.onerror = () => {
    console.error("Erro ao abrir o banco:", dbRequest.error);
};

// ============================================================
// ELEMENTOS
// ============================================================

let slot1 = document.getElementById("deck1");

let slot2 = document.getElementById("deck2");

let slot3 = document.getElementById("deck3");

let slot4 = document.getElementById("deck4");

let carta = document.querySelectorAll("div.card");

let button = document.getElementById("editar");

let save = document.getElementById("salvar");

let slots = document.getElementById("slots");

let slots2 = document.getElementById("slots2");

let slots3 = document.getElementById("slots3");

let editarBtn = document.getElementById("editar");

// ============================================================
// VARIÁVEIS
// ============================================================

let carta1 = "";

let slot = "";

// ============================================================
// CARREGAR CARTAS DO BANCO
// ============================================================

function carregarCartas() {
    const transaction = db.transaction("game_config", "readonly");

    const tabela = transaction.objectStore("game_config");

    const request = tabela.getAll();

    request.onsuccess = () => {
        const dados = {};

        for (const item of request.result) {
            dados[item.chave] = item.valor;
        }

        // ====================================================
        // PERSONAGEM
        // ====================================================

        if (dados.personagem == "Mago") {
            carta1 = "chama";
        } else if (dados.personagem == "Guerreiro") {
            carta1 = "espada";
        } else {
            carta1 = "flecha";
        }

        // ====================================================
        // CARTA PRINCIPAL
        // ====================================================

        slot1.src = "images/" + carta1 + ".png";

        // ====================================================
        // SLOT 1
        // ====================================================

        if (dados.slot1 == null) {
            salvarDB("slot1", carta1);
        } else {
            if (
                dados.slot1 == "chama" ||
                dados.slot1 == "espada" ||
                dados.slot1 == "flecha"
            ) {
                slot1.src = "images/" + dados.slot1 + ".png";
            } else {
                slot1.src = dados.slot1;
            }
        }

        // ====================================================
        // SLOT 2
        // ====================================================

        if (dados.slot2 != null) {
            slot2.src = dados.slot2;
        }

        // ====================================================
        // SLOT 3
        // ====================================================

        if (dados.slot3 != null) {
            slot3.src = dados.slot3;
        }

        // ====================================================
        // SLOT 4
        // ====================================================

        if (dados.slot4 != null) {
            slot4.src = dados.slot4;
        }

        // ====================================================
        // CARTAS CONHECIDAS
        // ====================================================

        for (let i = 1; i <= 15; i++) {
            const card = document.getElementById("card" + i);

            if (!card) continue;

            const dataset = card.dataset.hab;

            if (dataset == undefined) {
                card.src = "images/desconhecido.jpg";
            } else {
                card.src = "images/" + dataset + ".png";
            }
        }
    };

    request.onerror = () => {
        console.error("Erro ao carregar cartas:", request.error);
    };
}

// ============================================================
// EDITAR CURSOR
// ============================================================

function editar_cursor() {
    // ========================================================
    // DESATIVAR EDIÇÃO
    // ========================================================

    if (editarBtn.innerHTML == "Parar") {
        slot = "";

        save.style.display = "none";

        slots.style.display = "none";

        slots2.style.display = "none";

        slots3.style.display = "none";

        button.innerHTML = "Editar";

        for (let b = 1; b <= 15; b++) {
            const acao = document.getElementById("card" + b);

            if (acao) {
                acao.style.cursor = "default";
            }
        }

        // ========================================================
        // ATIVAR EDIÇÃO
        // ========================================================
    } else {
        save.style.display = "block";

        slots.style.display = "block";

        slots2.style.display = "block";

        slots3.style.display = "block";

        button.innerHTML = "Parar";

        for (let b = 1; b <= 15; b++) {
            const acao = document.getElementById("card" + b);

            if (acao) {
                acao.style.cursor = "pointer";
            }
        }
    }
}

// ============================================================
// SELECIONAR SLOT
// ============================================================

function editar(n) {
    if (n == "slot2") {
        slot = slot2;
    } else if (n == "slot3") {
        slot = slot3;
    } else {
        slot = slot4;
    }
}

// ============================================================
// CARTAS CONHECIDAS
// ============================================================

let cartas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

// ============================================================
// ADICIONAR CARTA AO SLOT
// ============================================================

function adicionar(img) {
    console.log(img);

    if (
        img == "leviluiz.github.io/RPG/images/desconhecido.jpg" ||
        img == "http://127.0.0.1:5500/images/desconhecido.jpg"
    ) {
        alert("Essa carta ainda não foi encontrada");

        return;
    }

    if (slot2.src != img && slot3.src != img && slot4.src != img) {
        if (!slot) {
            return;
        }

        slot.src = img;
    } else {
        alert("Já está sendo usado em outro slot");

        return;
    }
}

// ============================================================
// SALVAR
// ============================================================

function salvar() {
    if (!db) {
        console.error("Banco ainda não disponível.");

        return;
    }

    // ========================================================
    // SALVAR TUDO NO BANCO
    // ========================================================

    const transaction = db.transaction("game_config", "readwrite");

    const tabela = transaction.objectStore("game_config");

    // SLOT 1

    tabela.put({
        chave: "slot1",

        valor: carta1,
    });

    // SLOT 2

    tabela.put({
        chave: "slot2",

        valor: slot2.src,
    });

    // SLOT 3

    tabela.put({
        chave: "slot3",

        valor: slot3.src,
    });

    // SLOT 4

    tabela.put({
        chave: "slot4",

        valor: slot4.src,
    });

    transaction.oncomplete = () => {
        save.innerHTML = "Salvo";

        setTimeout(() => {
            save.innerHTML = "Salvar";
        }, 1000);
    };

    transaction.onerror = () => {
        console.error("Erro ao salvar cartas:", transaction.error);
    };
}

// ============================================================
// SALVAR UMA COISA NO BANCO
// ============================================================

function salvarDB(chave, valor) {
    if (!db) {
        console.error("Banco ainda não disponível.");

        return;
    }

    const transaction = db.transaction("game_config", "readwrite");

    const tabela = transaction.objectStore("game_config");

    tabela.put({
        chave: chave,

        valor: valor,
    });

    transaction.onerror = () => {
        console.error("Erro ao salvar:", transaction.error);
    };
}
