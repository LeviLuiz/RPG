const dbRequest = indexedDB.open("RPG", 1);

dbRequest.onupgradeneeded = (event) => {
    const db = event.target.result;

    if (!db.objectStoreNames.contains("game_config")) {
        db.createObjectStore("game_config", {
            keyPath: "chave",
        });
    }
};

dbRequest.onsuccess = (event) => {
    const db = event.target.result;

    const transaction = db.transaction("game_config", "readwrite");
    const tabela = transaction.objectStore("game_config");

    // =========================
    // PERSONAGEM
    // =========================

    const personagemRequest = tabela.get("personagem");

    personagemRequest.onsuccess = () => {
        if (personagemRequest.result) {
            document.getElementById("escolher").style.display = "none";
            document.querySelector("div").style.display = "block";
        } else {
            document.getElementById("escolher").style.display = "block";
            document.querySelector("div").style.display = "none";
        }
    };

    // =========================
    // LEVEL
    // =========================

    const levelRequest = tabela.get("level");

    levelRequest.onsuccess = () => {
        if (levelRequest.result == null) {
            tabela.put({
                chave: "level",
                valor: 1,
            });

            level = 1;
        } else {
            level = levelRequest.result.valor;
        }

        document.getElementById("level").innerHTML = level;
    };

    // =========================
    // MONEY
    // =========================

    const moneyRequest = tabela.get("money");

    moneyRequest.onsuccess = () => {
        if (moneyRequest.result == null) {
            tabela.put({
                chave: "money",
                valor: 0,
            });

            money = 0;
        } else {
            money = moneyRequest.result.valor;
        }

        document.getElementById("money").innerHTML = money;
    };

    // =========================
    // LUTADOR
    // =========================

    const lutador = document.getElementById("llutador");

    const lutadorRequest = tabela.get("personagem");

    lutadorRequest.onsuccess = () => {
        const personagem = lutadorRequest.result?.valor;

        if (personagem == "Mago") {
            lutador.src = "images/Mago.png";

            hp = 30;
            atk = 3;
            def = 2;
        } else if (personagem == "Guerreiro") {
            lutador.src = "images/Guerreiro.png";

            hp = 25;
            atk = 3;
            def = 3;
        } else if (personagem == "Arqueiro") {
            lutador.src = "images/Arqueiro.png";

            hp = 20;
            atk = 4;
            def = 1;
        }
    };
};

function p(tipo) {
    let personagem;

    if (tipo == "mago") {
        personagem = "Mago";
    } else if (tipo == "arqueiro") {
        personagem = "Arqueiro";
    } else {
        personagem = "Guerreiro";
    }

    const db = dbRequest.result;

    const transaction = db.transaction("game_config", "readwrite");
    const tabela = transaction.objectStore("game_config");

    tabela.put({
        chave: "personagem",
        valor: personagem,
    });

    window.location.reload();
}

function save() {
    const db = dbRequest.result;

    const transaction = db.transaction("game_config", "readwrite");
    const tabela = transaction.objectStore("game_config");

    tabela.put({
        chave: "level",
        valor: level,
    });

    tabela.put({
        chave: "money",
        valor: money,
    });

    document.getElementById("money").innerHTML = money;
    document.getElementById("level").innerHTML = level;

    alert("Jogo salvo");
}