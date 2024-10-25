n1 = 1
n2 = 2
n3 = 3

i = 1
c = 3
n = 0

function vai() {

    
    /*l1 = document.getElementById('1')
    l2 = document.getElementById('2')
    l3 = document.getElementById('3')
    l4 = document.getElementById('4')
    l5 = document.getElementById('5')
    l6 = document.getElementById('6')

    l1.style.display = 'none'
    l2.style.display = 'none'
    l3.style.display = 'none'
    l4.style.display = 'block'
    l5.style.display = 'block'
    l6.style.display = 'block'*/

    /*d1 = document.getElementById(n1)
    d2 = document.getElementById(n2)
    d3 = document.getElementById(n3)
    d4 = document.getElementById(n3)
    d5 = document.getElementById(n3)
    d6 = document.getElementById(n3)

    d1.style.display = 'none'
    d2.style.display = 'none'
    d3.style.display = 'none'*/

    /*n1 += 3
    n2 += 3
    n3 += 3*/

    //d = 0

    /*iv = 2

    while (i < iv) {
        v = n[i] = i
        dx = d[i] = document.getElementById(i)
        dx.style.display = 'none'

        console.log(v)
        console.log(i + 'i')
        console.log(iv + 'iv')

        i++

        if (i > 2 || iv > 1) {
            iv = i + 3
        }
    }*/

    /*for (i = 1; i < 4; i++) {
        v = n[i] = i
        dx = d[i] = document.getElementById(i)
        dx.style.display = 'none'

        console.log(v)
    }*/

        console.log(i)
        console.log(i - 1)
        console.log(i - 2)
        console.log(i - 3)

        i = 1
    
        while (i < 4) {
            v = n[i] = document.getElementById(i)
            console.log(v)
            v.style.display = 'none'
    
            i++
        }

        i = 4

        while (i < 7) {
            v = n[i] = document.getElementById(i)
            console.log(v)
            v.style.display = 'block'
    
            i++
        }

        i += 3
}

function vem() {
    /*l1 = document.getElementById('1')
    l2 = document.getElementById('2')
    l3 = document.getElementById('3')
    l4 = document.getElementById('4')
    l5 = document.getElementById('5')
    l6 = document.getElementById('6')

    l1.style.display = 'block'
    l2.style.display = 'block'
    l3.style.display = 'block'
    l4.style.display = 'none'
    l5.style.display = 'none'
    l6.style.display = 'none'*/

    console.log(c)
    console.log(c + 1)
    console.log(c + 2)
    console.log(c + 3)

    c = 1

    while (c < 4) {
        v = n[c] = document.getElementById(c)
        console.log(v)
        v.style.display = 'block'

        c++
    }

    c = 4

    while (c < 7) {
        v = n[c] = document.getElementById(c)
        console.log(v)
        v.style.display = 'none'

        c++
    }
}

function level1() {

    inimigo = Math.floor(Math.random() * 2) + 1

    if (inimigo == 1) {
        localStorage.setItem('inimigo', 'abelha')
    } else {
        localStorage.setItem('inimigo', 'vespa')
    }
    
    window.location.href = 'luta.html'
}

function mundo1() {
    local = document.getElementById('locais')
    mundo1 = document.getElementById('mundo1')
    mundo2 = document.getElementById('mundo2')
    mundo3 = document.getElementById('mundo3')

    mundo1.style.display = 'none'
    mundo2.style.display = 'none'
    mundo3.style.display = 'none'

    local.style.display = 'flex'
}

function voltar() {
    window.location.href = 'mapa.html'
}