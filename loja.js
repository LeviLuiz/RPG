document.getElementById('money').innerHTML = localStorage.getItem('money')

function Erro() {
    coin = document.getElementById('money')
    coin.style.color = 'red'

    setInterval(() => {
        coin.style.color = 'white'
    }, 200);
}

function comprar(preço, nome) {
    money = localStorage.getItem("money");

    if (money <= 0) {
            setInterval(Erro(),200)
    } else {
        money -= preço;
        localStorage.setItem("money", money);
        localStorage.setItem('especial', nome)
    }

    document.getElementById('money').innerHTML = localStorage.getItem('money')
}