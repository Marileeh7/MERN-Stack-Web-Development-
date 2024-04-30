var diccionario = {
    0:"camino",
    1:"paredes",
    2:"coin",
    3:"cherry"
};

var pacman = {
    x:1,
    y:1,
    vidas:3
}

var fantasma = {
    x:1,
    y:1
}

var puntos=0;
var worldRandom=[
    [1,1,1,1,1,1,1,1,1,1,1],
    [1,0,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,2,1,1,2,1,1,1],
    [1,2,2,1,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,1,2,1,2,1],
    [1,2,2,1,2,2,1,2,2,2,1],
    [1,1,2,1,3,2,1,2,1,2,1],
    [1,2,2,2,2,1,1,2,2,2,1],
    [1,2,1,2,2,2,2,2,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1]
];

function puntaje() {
    if(worldRandom[pacman.y][pacman.x]==2){
        puntos=puntos+10;
    }else if(worldRandom[pacman.y][pacman.x]==3){
        puntos=puntos+50;
    }
    document.getElementById("score").innerHTML="Puntaje: "+puntos;
}

function estaVivo () {
    if (pacman.x==fantasma.x && pacman.y==fantasma.y) {
        if (pacman.vidas>1) {
            pacman.vidas--
            document.getElementById("life").innerHTML="Vidas: "+pacman.vidas;
            //mundoRandom();
            dibujarMundo();
            
            posicionInicialPacman();
            posicionInicialFantasma();

            dibujarFantasma();
            dibujarPacman();    
        } else {
            pacman.vidas--
            document.getElementById("life").innerHTML="Vidas: "+pacman.vidas;
            document.getElementById("gameOver").style.display='block';
        }
    }
}

function dibujarMundo () {
    salida="";

    for(var row = 0; row<worldRandom.length; row++){
        salida+='<div class="row">';
        for(var x = 0; x<worldRandom[row].length; x++){
            salida+='<div class="'+diccionario[worldRandom[row][x]]+'"></div>';
        }
        salida+="</div>";
    }

    document.getElementById("world").innerHTML=salida;
}

function dibujarPacman () {
    document.getElementById("pacman").style.top=pacman.y*40+"px";
    document.getElementById("pacman").style.left=pacman.x*40+"px";
}
function dibujarFantasma () {
    document.getElementById("ghost").style.top=fantasma.y*40+"px";
    document.getElementById("ghost").style.left=fantasma.x*40+"px";
}

function moverFantasma() {
    if (pacman.x<fantasma.x && worldRandom[fantasma.y][fantasma.x-1] != 1){//arriba
        fantasma.x--;
    }else if(pacman.x>fantasma.x && worldRandom[fantasma.y][fantasma.x+1] != 1){//ABAJO
        fantasma.x++;
    }else if(pacman.y<fantasma.y && worldRandom[fantasma.y-1][fantasma.x] != 1){//IZQUIERDA
        fantasma.y--;
    }else if (pacman.y>fantasma.y && worldRandom[fantasma.y+1][fantasma.x] != 1){ // derecha
        fantasma.y++;
    }
}


function posicionInicialPacman() {
    let fin=false;
    for (let row = 0; row < worldRandom.length; row++) {
        for (let colum = 0; colum < worldRandom[row].length; colum++) {
            if (worldRandom[row][colum]==0) {
                    pacman.x=colum;
                    pacman.y=row;
                    fin=true;
                return;
            }
        }
    }
}

function posicionInicialFantasma() {
    let fin=false;
    for (let row = 0; row < worldRandom.length; row++) {
        for (let colum = 0; colum < worldRandom[row].length; colum++) {
            if (worldRandom[row][colum]==0) {
                    fantasma.x=colum;
                    fantasma.y=row;
                    fin=true;
                break;
            }
        }
    }
}    

document.onkeydown = function(e){
    if(e.keyCode==37 && worldRandom[pacman.y][pacman.x-1] != 1){//ARRIBA
        pacman.x--;
        
    }else if(e.keyCode==39 && worldRandom[pacman.y][pacman.x+1] != 1){//ABAJO
        pacman.x++;
        
    }else if(e.keyCode==38 && worldRandom[pacman.y-1][pacman.x] != 1){//IZQUIERDA
        pacman.y--;
        
    }else if(e.keyCode==40 && worldRandom[pacman.y+1][pacman.x] != 1){//DERECHA
        pacman.y++;
    }
    if (pacman.vidas>0) {
        puntaje();
        moverFantasma();
        estaVivo()
        dibujarFantasma();
        worldRandom[pacman.y][pacman.x]=0;
        dibujarPacman();
        dibujarMundo();
        
    }
}

//mundoRandom();

dibujarMundo();

posicionInicialPacman();
posicionInicialFantasma();

dibujarFantasma();
dibujarPacman();
