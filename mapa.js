// ============================================================
// BANCO
// ============================================================

const dbRequest = indexedDB.open("RPG", 1);

let db = null;

// ============================================================
// CRIAR BANCO
// ============================================================

dbRequest.onupgradeneeded = (event) => {
    const banco = event.target.result;

    if (!banco.objectStoreNames.contains("game_config")) {
        banco.createObjectStore("game_config", {
            keyPath: "chave",
        });
    }
};

// ============================================================
// BANCO ABERTO
// ============================================================

dbRequest.onsuccess = (event) => {
    db = event.target.result;

    console.log("Banco RPG aberto.");

    carregarBanco();
};

// ============================================================
// ERRO
// ============================================================

dbRequest.onerror = () => {
    console.error("Erro ao abrir o banco:", dbRequest.error);
};

// ============================================================
// VARIÁVEIS
// ============================================================

let mundoAtual = 1;

let nivelAtual = 1;

let xp = 0;

let mundoSelecionado = 0;

// ============================================================
// XP
// ============================================================

const xpPorNivel = 100;

// Mundo 1

const m1nivel1Xp = xpPorNivel;
const m1nivel2Xp = xpPorNivel;
const m1nivel3Xp = xpPorNivel;

// Mundo 2

const m2nivel1Xp = xpPorNivel * 2;
const m2nivel2Xp = xpPorNivel * 2;
const m2nivel3Xp = xpPorNivel * 2;

// Mundo 3

const m3nivel1Xp = xpPorNivel * 3;
const m3nivel2Xp = xpPorNivel * 3;
const m3nivel3Xp = xpPorNivel * 3;

// ============================================================
// ELEMENTOS
// ============================================================

const nivel1 = document.getElementById("nivel1");
const nivel2 = document.getElementById("nivel2");
const nivel3 = document.getElementById("nivel3");

const descMundo1 = document.getElementById("descMundo1");
const descMundo2 = document.getElementById("descMundo2");
const descMundo3 = document.getElementById("descMundo3");

const xpMedioMundos = (100 * 3 + 200 * 3 + 300 * 3) / 9;

// ============================================================
// INICIAR BANCO
// ============================================================

function carregarBanco() {
    const transaction = db.transaction("game_config", "readonly");

    const tabela = transaction.objectStore("game_config");

    const request = tabela.getAll();

    request.onsuccess = () => {
        const dados = {};

        for (const item of request.result) {
            dados[item.chave] = item.valor;
        }

        // XP

        if (dados.xp == null) {
            salvarDB("xp", 0);

            xp = 0;
        } else {
            xp = Number(dados.xp);
        }
        console.log("XP carregado:", xp);

        // Mundo atual

        if (dados.mundo == null) {
            salvarDB("mundo", 1);

            mundoAtual = 1;
        } else {
            mundoAtual = Number(dados.mundo);
        }

        atualizarMapa();
    };
}

// ============================================================
// DEFINIR XP DO NÍVEL
// ============================================================

function definirXpPorNivel(mundo, nivel) {
    if (nivel == 0) {
        return 0;
    }

    if (mundo == 1) {
        if (nivel >= 1 && nivel <= 6) {
            return 100;
        }
    }

    if (mundo == 2) {
        if (nivel >= 1 && nivel <= 6) {
            return 200;
        }
    }

    if (mundo == 3) {
        if (nivel >= 1 && nivel <= 6) {
            return 300;
        }
    }

    return 0;
}

function xpAnteriorMundo(mundo) {
    if (mundo == 1) {
        return 0;
    }

    if (mundo == 2) {
        return 100 * 6;
    }

    if (mundo == 3) {
        return 100 * 6 + 200 * 6;
    }

    return 0;
}

// ============================================================
// PORCENTAGEM DO NÍVEL
// ============================================================

function porcentagemNivel(mundo, nivel) {
    const xpPorNivelAtual = definirXpPorNivel(mundo, nivel);

    if (xpPorNivelAtual <= 0) {
        return 0;
    }

    const xpInicioMundo = xpAnteriorMundo(mundo);

    let xpNoMundo = xp - xpInicioMundo;

    if (xpNoMundo < 0) {
        xpNoMundo = 0;
    }

    const xpAnteriorNivel = (nivel - 1) * xpPorNivelAtual;

    let xpDoNivel = xpNoMundo - xpAnteriorNivel;

    if (xpDoNivel < 0) {
        xpDoNivel = 0;
    }

    if (xpDoNivel > xpPorNivelAtual) {
        xpDoNivel = xpPorNivelAtual;
    }

    return Math.floor((xpDoNivel / xpPorNivelAtual) * 100);
}

function porcentagemMundo(mundo) {
    let total = 0;

    for (let nivel = 1; nivel <= 6; nivel++) {
        total += porcentagemNivel(mundo, nivel);
    }

    return Math.floor(total / 6);
}

// ============================================================
// ATUALIZAR MAPA
// ============================================================

function atualizarMapa() {
    nivel1.innerHTML = porcentagemNivel(mundoAtual, 1) + "% Descoberto";
    nivel2.innerHTML = porcentagemNivel(mundoAtual, 2) + "% Descoberto";
    nivel3.innerHTML = porcentagemNivel(mundoAtual, 3) + "% Descoberto";

    descMundo1.innerHTML = porcentagemMundo(1) + "% Descoberto";
    descMundo2.innerHTML = porcentagemMundo(2) + "% Descoberto";
    descMundo3.innerHTML = porcentagemMundo(3) + "% Descoberto";
}

// ============================================================
// ABRIR MUNDO
// ============================================================

function mundo(nivel) {
    mundoSelecionado = nivel;

    mundoAtual = nivel;

    salvarDB("mundo", mundoAtual);

    document.getElementById("mundos").style.display = "none";

    document.getElementById("locais").style.display = "flex";

    atualizarMapa();
}

// ============================================================
// VOLTAR PARA OS MUNDOS
// ============================================================

function voltar() {
    document.getElementById("locais").style.display = "none";

    document.getElementById("mundos").style.display = "flex";

    mundoSelecionado = 0;
}

// ============================================================
// LEVEL 1
// ============================================================

function level1() {
    iniciarNivel(1);
}

// ============================================================
// LEVEL 2
// ============================================================

function level2() {
    iniciarNivel(2);
}

// ============================================================
// LEVEL 3
// ============================================================

function level3() {
    iniciarNivel(3);
}

// ============================================================
// INICIAR NÍVEL
// ============================================================

function iniciarNivel(nivel) {
    if (!db) {
        console.error("O banco ainda não foi carregado.");

        return;
    }

    nivelAtual = nivel;

    // Salva o nível atual

    salvarDB("nivel", nivel);

    // ========================================================
    // POR ENQUANTO, O NÍVEL 1 É O ÚNICO COM COMBATE
    // ========================================================

    if (nivel != 1) {
        alert("Esse nível ainda não está pronto.");

        return;
    }

    // ========================================================
    // ESCOLHER INIMIGO
    // ========================================================

    const inimigoNumero = Math.floor(Math.random() * 2) + 1;

    let inimigo;

    if (inimigoNumero == 1) {
        inimigo = "abelha";
    } else {
        inimigo = "vespa";
    }

    // ========================================================
    // SALVAR INIMIGO
    // ========================================================

    const transaction = db.transaction("game_config", "readwrite");

    const tabela = transaction.objectStore("game_config");

    tabela.put({
        chave: "inimigo",

        valor: inimigo,
    });

    transaction.oncomplete = () => {
        window.location.href = "luta.html";
    };

    transaction.onerror = () => {
        console.error("Erro ao salvar inimigo:", transaction.error);
    };
}

function vai() {
    for (let numero = 1; numero <= 3; numero++) {
        document.getElementById(numero).style.display = "none";
    }

    for (let numero = 4; numero <= 6; numero++) {
        document.getElementById(numero).style.display = "flex";
    }
}

function vem() {
    for (let numero = 1; numero <= 3; numero++) {
        document.getElementById(numero).style.display = "flex";
    }

    for (let numero = 4; numero <= 6; numero++) {
        document.getElementById(numero).style.display = "none";
    }
}

// ============================================================
// SALVAR NO BANCO
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
