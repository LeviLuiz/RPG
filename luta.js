const dbRequest = indexedDB.open("RPG", 1);

// ============================================================
// BANCO
// ============================================================

dbRequest.onupgradeneeded = (event) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains("game_config")) {
        db.createObjectStore("game_config", {
            keyPath: "chave",
        });
    }
};

dbRequest.onerror = () => {
    console.error("Erro ao abrir o banco:", dbRequest.error);
};

dbRequest.onsuccess = (event) => {
    const db = event.target.result;

    const transaction = db.transaction("game_config", "readonly");

    const tabela = transaction.objectStore("game_config");

    const request = tabela.getAll();

    request.onsuccess = () => {
        const dados = {};

        for (const item of request.result) {
            dados[item.chave] = item.valor;
        }

        // ====================================================
        // VALORES UNIVERSAIS
        // ====================================================

        const valoresPadrao = {
            dano_fogo: 2,
            dano_magma: 3,
            dano_flechas: 1,
            dano_principal: 2,

            recarga_fogo: 2,
            recarga_magma: 3,
            recarga_flechas: 1,
            recarga_principal: 1,

            abelha_hp: 20,
            abelha_atk: 2,
            abelha_def: 1,

            vespa_hp: 20,
            vespa_atk: 3,
            vespa_def: 1,

            level: 1,
            money: 0,
            xp: 0,
        };

        const faltando = [];

        for (const chave in valoresPadrao) {
            if (!(chave in dados)) {
                dados[chave] = valoresPadrao[chave];

                faltando.push({
                    chave: chave,
                    valor: valoresPadrao[chave],
                });
            }
        }

        // ====================================================
        // CRIAR OS VALORES QUE AINDA NÃO EXISTEM
        // ====================================================

        if (faltando.length > 0) {
            const transaction2 = db.transaction("game_config", "readwrite");

            const tabela2 = transaction2.objectStore("game_config");

            for (const item of faltando) {
                tabela2.put(item);
            }
        }

        iniciarJogo(db, dados);
    };
};

// ============================================================
// INICIAR JOGO
// ============================================================

function iniciarJogo(db, config) {
    // ========================================================
    // VALORES UNIVERSAIS
    // ========================================================

    let tfogo = Number(config.dano_fogo);
    let tmagma = Number(config.dano_magma);
    let tflechas = Number(config.dano_flechas);
    let tespecial = Number(config.dano_principal);
    let recargaFogo = Number(config.recarga_fogo);
    let recargaMagma = Number(config.recarga_magma);
    let recargaFlechas = Number(config.recarga_flechas);
    let recargaEspecial = Number(config.recarga_principal);

    // ========================================================
    // INIMIGOS
    // ========================================================

    let abelha_hp = Number(config.abelha_hp);
    let abelha_atk = Number(config.abelha_atk);
    let abelha_def = Number(config.abelha_def);

    let vespa_hp = Number(config.vespa_hp);
    let vespa_atk = Number(config.vespa_atk);
    let vespa_def = Number(config.vespa_def);

    // ========================================================
    // ELEMENTOS
    // ========================================================

    let deck1 = document.getElementById("deck1");
    let deck2 = document.getElementById("deck2");
    let deck3 = document.getElementById("deck3");
    let deck4 = document.getElementById("deck4");

    let eu = document.getElementById("euimg");
    let inimigoimg = document.getElementById("inimigoimg");

    // ========================================================
    // PERSONAGEM
    // ========================================================

    let personagem = config.personagem;

    // ========================================================
    // DEFINIR PERSONAGEM
    // ========================================================

    if (personagem == "Mago") {
        player_hp = 30;
        player_atk = 3;
        player_def = 2;

        deck1.src = "images/chama.png";

        eu.src = "images/Mago.png";
    } else if (personagem == "Guerreiro") {
        player_hp = 25;
        player_atk = 3;
        player_def = 3;

        deck1.src = "images/espada.png";

        eu.src = "images/Guerreiro.png";
    } else {
        personagem = "Arqueiro";

        player_hp = 20;

        player_atk = 4;

        player_def = 1;

        deck1.src = "images/flecha.png";

        eu.src = "images/Arqueiro.png";
    }

    // ========================================================
    // SALVAR ATRIBUTOS DO PERSONAGEM NO DB
    // ========================================================

    salvarDB(db, "personagem", personagem);

    salvarDB(db, "hp", player_hp);

    salvarDB(db, "atk", player_atk);

    salvarDB(db, "def", player_def);

    // ========================================================
    // INIMIGO
    // ========================================================

    let inimigo = config.inimigo;
    if (inimigo == "abelha") {
        inimigoimg.src = "images/Abelha2.png";
    } else if (inimigo == "vespa") {
        inimigoimg.src = "images/vespa.png";

        inimigoimg.style.height = "80px";
    }

    // ========================================================
    // SLOTS
    // ========================================================

    let slotg1 = document.getElementById("slot1");

    let slotg2 = document.getElementById("slot2");

    let slotg3 = document.getElementById("slot3");

    let slotg4 = document.getElementById("slot4");

    // ========================================================
    // CARTAS
    // ========================================================

    let carta1 = config.slot1;

    let carta2 = config.slot2;

    let carta3 = config.slot3;

    let carta4 = config.slot4;

    // ========================================================
    // CARTAS
    // ========================================================

    if (carta1 != null) {
        if (carta1 == "chama" || carta1 == "espada" || carta1 == "flecha") {
            deck1.src = "images/" + carta1 + ".png";
        } else {
            deck1.src = carta1;
        }
    }

    if (carta2 != null) {
        deck2.src = carta2;
    }

    if (carta3 != null) {
        deck3.src = carta3;
    }

    if (carta4 != null) {
        deck4.src = carta4;
    }

    // ========================================================
    // HP NA TELA
    // ========================================================

    let hp = document.getElementById("vida");

    let hpi = document.getElementById("vidai");

    // ========================================================
    // OUTROS
    // ========================================================

    let money = Number(config.money);
    let xp = Number(config.xp);
    let level = Number(config.level);

    let turno = 1;
    let aguardandoInimigo = false;
    let encerrada = false;

    // ========================================================
    // COOLDOWN
    // ========================================================

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

    // ========================================================
    // TEXTO DO COOLDOWN
    // ========================================================

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

    // ========================================================
    // NOME DA CARTA
    // ========================================================

    function nomeCarta(src) {
        if (!src) return "";

        let nome = src.split("/").pop().split(".")[0];

        return nome.toLowerCase();
    }

    // ========================================================
    // DANO DA CARTA
    // ========================================================

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

        if (carta == "tespecial" || carta == "espada") {
            return tespecial;
        }

        return 0;
    }

    // ========================================================
    // RECARGA DA CARTA
    // ========================================================

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

        if (carta == "tespecial" || carta == "espada") {
            return recargaEspecial;
        }

        return 0;
    }

    // ========================================================
    // ATACAR
    // ========================================================

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

        document.getElementById("deck" + slotNumber).style.filter =
            "grayscale(80%)";

        mostrarCooldown();

        luta();

        if (encerrada) return;

        aguardandoInimigo = true;

        setTimeout(() => {
            turnoInimigo();
        }, 500);
    }

    // ========================================================
    // ABATER COOLDOWNS
    // ========================================================

    function abaterCooldowns() {
        for (let i = 1; i <= 4; i++) {
            if (cooldown[i] > 0) {
                cooldown[i]--;
            }
        }

        mostrarCooldown();
    }

    // ========================================================
    // MOSTRAR COOLDOWN
    // ========================================================

    function mostrarCooldown() {
        for (let i = 1; i <= 4; i++) {
            if (cooldown[i] > 0) {
                cooldownTexto[i].innerHTML = cooldown[i];

                document.getElementById("deck" + i).style.filter =
                    "grayscale(80%)";
            } else {
                cooldownTexto[i].innerHTML = "";

                document.getElementById("deck" + i).style.filter = "";
            }
        }
    }

    // ========================================================
    // TURNO DO INIMIGO
    // ========================================================

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

        salvarDB(db, "hp", player_hp);

        luta();

        if (!encerrada) {
            aguardandoInimigo = false;

            turno++;
        }
    }

    // ========================================================
    // CLICAR NAS CARTAS
    // ========================================================

    slotg1.onclick = () => atacar(1);

    slotg2.onclick = () => atacar(2);

    slotg3.onclick = () => atacar(3);

    slotg4.onclick = () => atacar(4);

    // ========================================================
    // LUTA
    // ========================================================

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

        // ====================================================
        // VITÓRIA
        // ====================================================

        if (inimigo_morto) {
            encerrada = true;

            document.getElementById("win").style.display = "block";

            money += 10;
            salvarDB(db, "money", money);

            xp += 10;
            salvarDB(db, "xp", xp);

            return;
        }

        // ====================================================
        // DERROTA
        // ====================================================

        if (player_hp <= 0) {
            encerrada = true;

            document.getElementById("lose").style.display = "block";

            money -= 10;

            salvarDB(db, "money", money);
        }
    }

    // ========================================================
    // DESISTIR
    // ========================================================

    function desistir() {
        let confirmar = confirm("Se desistir perderá 5 moedas");

        if (confirmar) {
            if (money < 5) {
                alert("Você não tem dinheiro para desistir");
            } else {
                money -= 5;

                salvarDB(db, "money", money, () => {
                    window.location.href = "mapa.html";
                });
            }
        }
    }

    // ========================================================
    // SAIR
    // ========================================================

    function sair() {
        if (
            (inimigo == "abelha" && abelha_hp <= 0) ||
            (inimigo == "vespa" && vespa_hp <= 0)
        ) {
            level += 1;

            salvarDB(db, "level", level, () => {
                window.location.href = "mapa.html";
            });

            return;
        }

        window.location.href = "mapa.html";
    }

    // ========================================================
    // DEIXAR AS FUNÇÕES DISPONÍVEIS
    // ========================================================

    window.atacar = atacar;

    window.desistir = desistir;

    window.sair = sair;

    // ========================================================
    // INICIAR LUTA
    // ========================================================

    luta();
}

// ============================================================
// SALVAR NO INDEXEDDB
// ============================================================

function salvarDB(db, chave, valor, callback) {
    const transaction = db.transaction("game_config", "readwrite");

    const tabela = transaction.objectStore("game_config");

    tabela.put({
        chave: chave,

        valor: valor,
    });

    if (callback) {
        transaction.oncomplete = callback;
    }
}
