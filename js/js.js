var y = 10;
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer = null;
var timerFuel = null;
var fuel = 100;
var condicion = true;


//Cuando carga la página:
window.onload = function() {
    document.onclick = function() {
        if (a == g) {
            motorOn();
        } else {
            motorOff();
        }
    }
    document.onkeydown = motorOn;
    document.onkeyup = motorOff;
    //Empezar a mover la nave:
    start();
}

function start() {
    timer = setInterval(function() {
        moverNave();
    }, dt * 1000);
    condicion = true;
}

function stop() {
    clearInterval(timer);
    condicion = false;
}

function reiniciar() {

    y = 10;
    v = 0;
    a = -g;
    fuel = 100;
    document.getElementById("fuel").innerHTML = fuel.toFixed(0);
    condicion = true;
    document.getElementById("acabado").style.display = "none";
    stop();
    start();

}

function moverNave() {
    v += a * dt;
    document.getElementById("velocidad").innerHTML = v.toFixed(0) + " m/s";
    y += v * dt;
    document.getElementById("altura").innerHTML = (72 - y).toFixed(0) + " m";

    if (y < 72) {
        document.getElementById("nave").style.top = y + "%";
    } else {
        if (v < 5) {
            document.getElementById("fin_juego").innerHTML = "¡Bien hecho!";
            document.getElementById("game").innerHTML = "Aterrizaje completado! Quiero felicitarte por tus nuevos logros, una vez más demuestras que todo con esfuerzo vale mucho más la pena.";
            document.getElementById("celebration").src = "img/celebration.svg";

        } else {
            document.getElementById("cohete").src = "img/explosion.svg";
            document.getElementById("fin_juego").innerHTML = "¡Demasiado rápido!";
            document.getElementById("game").innerHTML = "Inténtalo de nuevo, hazlo con más delicadeza. ¡No la líes!";
            document.getElementById("celebration").src = "img/loose.svg";
        }
        stop();
        acabado();
    }
}

function motorOn() {
    if (condicion) {
        a = -g;
        if (timerFuel == null)
            timerFuel = setInterval(function() {
                actualizarFuel();
            }, 10);
        document.getElementById("cohete").src = "img/navef.svg";
    }
}

function motorOff() {
    if (condicion) {
        a = g;
        clearInterval(timerFuel);
        timerFuel = null;
        document.getElementById("cohete").src = "img/nave.svg";
    }
}

function actualizarFuel() {
    if (condicion) {
        if (y <= 70) {
            fuel -= 0.2;
            if (fuel <= 0) {
                fuel = 0;
                motorOff();
            }
        }
    }
    document.getElementById("fuel").innerHTML = fuel.toFixed(0);
}

function pausar() {
    stop();
    motorOff();
    document.getElementById("pausa").style.display = "inline-block";
}

function reanudar() {
    motorOff();
    document.getElementById("pausa").style.display = "none";
    document.getElementById("menuabout").style.display = "none";
    start();

}

function acabado() {
    document.getElementById("acabado").style.display = "block";
    activo = false;
}

function about() {
    stop();
    document.getElementById("menuabout").style.display = "inline-block";
}
