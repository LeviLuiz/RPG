document.getElementById('money').innerHTML = localStorage.getItem('money')

function Erro() {
    coin = document.getElementById('money')
    coin.style.color = 'red'

    setInterval(() => {
        coin.style.color = 'white'
        i++
    }, 200);
}

function comprar(preço, nome) {
    money = localStorage.getItem("money");

    if (money <= 0) {
        i = 1
        while (i <= 3) {
            setInterval(Erro(),200)
            setInterval(() => {
                i++
            },200)
        }
    } else {
        money -= preço;
        localStorage.setItem("money", money);
    }

    document.getElementById('money').innerHTML = localStorage.getItem('money')
}