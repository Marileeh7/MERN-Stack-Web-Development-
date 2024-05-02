var avion    =   {x:200,y:350}
var balas    =   [];
var enemigos =   [{x:50, y:-70, t:2},
                  {x:250, y:-120, t:1},
                  {x:450, y:-100, t:2},
                  {x:350, y:-170, t:1},
                  {x:150, y:-20, t:1},
                  {x:540, y:-25, t:2},
                  {x:660, y:-15, t:1}];
var puntos = 0;
var juegoActivo = true;

var nave            = document.getElementById('hero');
var navesEnemigas   = document.getElementById('enemies');
var disparos        = document.getElementById('bullets');

function dibujarAvion() {
    nave.style['top']=avion.y+'px';
    nave.style['left']=avion.x+'px';
}

function dibujarEnemigos() {
    var output = '';
    enemigos.forEach(enemy => {
        output+='<div class="enemy'+enemy.t+'" style="top:'+enemy.y+'px; left: '+enemy.x+'px;"></div>'
    });
    navesEnemigas.innerHTML=output;
}

function dibujarBalas(){
    var output = '';
    balas.forEach(bala => {
        output+='<div class="bullet" style="top:'+bala.y+'px; left: '+bala.x+'px;"></div>'
    });
    disparos.innerHTML=output;
}

function moverDisparos() {
    balas?.forEach(bala => {
        if (bala.y<0) {
            balas.shift();
        }
        bala.y-=5;
    });
}

function moverEnemigos() {
    enemigos.forEach(enemy => {
        if (enemy.y>530) {
            enemy.y=-20;
            enemy.x = Math.random()*1000;
        }
        enemy.y+=2;
    });
}

function mostrarExplosion(x, y) {
    var explosion = document.getElementById('explosion');
    explosion.style.left = x + 'px';
    explosion.style.top = y + 'px';
    explosion.style.display = 'block';
    
}


function sonidoDisparo() {
    var audio = document.getElementById("sonido");
    audio.playbackRate = 1;
    audio.play();
}
function sonidoImpacto() {
    var audio = document.getElementById("accidente");
    audio.playbackRate = 1;
    audio.play();
}

function detectarColision() {
    enemigos.forEach(enemigo => {
            balas.forEach(bala => {
            if (
                bala.x < enemigo.x + 28 && // Ancho del enemigo
                bala.x + 6 > enemigo.x &&   // Ancho de la bala
                bala.y < enemigo.y + 28 && // Altura del enemigo
                bala.y + 6 > enemigo.y     // Altura de la bala
            ) {
                // Se ha detectado una colisión
                sonidoDisparo();
                puntos += 10;
                // Eliminar la bala y el enemigo afectado
                balas.splice(balas.indexOf(bala), 1);
                enemigos.splice(enemigos.indexOf(enemigo), 1);
            }
        });
    });
}

function detectarAccidenteAereo(){
    enemigos.forEach(a => {
        if (Math.abs(avion.x-a.x)<30 && Math.abs(avion.y-a.y)<20) {
            puntos-=500;
            dibujarPuntaje()
            sonidoImpacto();
            mostrarExplosion(avion.x, avion.y);
            detenerJuego();
            juegoActivo = false;
        }
    });
}


function dibujarPuntaje() {
    document.getElementById('score').innerHTML=puntos;
}

function gameLoop() {
    moverEnemigos();
    moverDisparos();
    dibujarAvion();
    dibujarEnemigos();
    dibujarBalas();
    detectarColision();
    dibujarPuntaje()
    detectarAccidenteAereo()
}

document.onkeydown = function(e) {
    if (!juegoActivo) return; // No permitir movimiento si el juego no está activo

    if (e.code === 'ArrowLeft') {
        if (avion.x > 0) { // Verificar que el avión no esté en el borde izquierdo
            avion.x -= 5;
        }
    } else if (e.code === 'ArrowRight') {
        if (avion.x < 972) { // Verificar que el avión no esté en el borde derecho
            avion.x += 5;
        }
    } else if (e.code === 'ArrowUp') {
        if (avion.y > 0) { // Verificar que el avión no esté en el borde superior
            avion.y -= 5;
        }
    } else if (e.code === 'ArrowDown') {
        if (avion.y < 523) { // Verificar que el avión no esté en el borde inferior
            avion.y += 5;
        }
    } else if (e.code === 'Space') {
        balas.push({ x: avion.x + 5, y: avion.y - 13 });
        dibujarBalas();
    }
    dibujarAvion();
}

var gameInterval; // Variable para almacenar el identificador del intervalo del juego

// Función para iniciar el bucle del juego
function iniciarJuego() {
    gameInterval = setInterval(gameLoop, 100);
}

// Función para detener el bucle del juego
function detenerJuego() {
    clearInterval(gameInterval);
}

iniciarJuego();