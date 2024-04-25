let world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,1,1,1,1,2,1,1,2,1,1,2,1,2],
    [2,1,2,2,1,2,1,1,2,1,1,2,1,2],
    [2,1,1,2,1,2,1,1,2,9,9,2,1,2],
    [2,1,1,2,1,8,1,1,1,2,1,2,1,2],
    [2,2,1,2,2,8,1,1,2,1,1,2,1,2],
    [2,1,1,1,1,8,1,1,2,2,1,1,1,2],
    [2,1,1,2,1,2,1,1,1,1,1,1,1,2],
    [2,2,2,2,1,1,1,1,2,2,1,1,1,2],
    [2,1,1,2,2,2,1,1,1,1,1,2,2,2],
    [2,1,1,1,2,9,1,1,2,1,1,1,1,2],
    [2,1,2,2,2,2,2,8,2,2,2,9,9,2],
    [2,1,1,1,1,1,1,8,2,9,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2]
]

//valores de ninja
let direction='down'; 
let walkValue = 1;

//posicion de ninja
let posicionColumna = 1
let posicionFila = 1
world[posicionColumna][posicionFila]=3

let displayWorld=()=>{
    let output = "";
    world.forEach(arr=>{
        output += `\n<div class="row">`
        arr.forEach(element=>{
            if (element === 2) {
                output += `\n\t<div class="brick"></div>`
            }else if (element === 1) {
                output +=  `\n\t<div class="coin">
                                <img class="coin-img" src="./assets/coin.gif" alt="coin">
                                </div>`
            }else if (element === 0) {
                output += `\n\t<div class="empty"></div>`
            }else if (element === 3) {
                output += `\n\t<div class="pacman">
                                <img class="ninja-img" src="./assets/${direction+walkValue}.png" alt="ninja">
                                </div>`
            }else if (element === 4) {
                output +=  `\n\t<div class="coin">
                                <img class="coin-img" src="./assets/bluey.gif" alt="coin">
                                </div>`
            }else if (element === 5) {
                output +=  `\n\t<div class="coin">
                                <img class="coin-img" src="./assets/pinky.gif" alt="coin">
                                </div>`
            }else if (element === 6) {
                output +=  `\n\t<div class="coin">
                                <img class="coin-img" src="./assets/pumpky.gif" alt="coin">
                                </div>`
            }else if (element === 7) {
                output +=  `\n\t<div class="coin">
                                <img class="coin-img" src="./assets/scaredy.png" alt="coin">
                                </div>`
            }else if (element === 8) {
                output +=  `\n\t<div class="coin">
                                <img class="coin-img" src="./assets/sushi.png" alt="coin">
                                </div>`
            }else if (element === 9) {
                output +=  `\n\t<div class="coin">
                                <img class="coin-img" src="./assets/onigiri.png" alt="coin">
                                </div>`
            }
        })
        output += `\n</div>`
    })
    document.querySelector(".world").innerHTML=output;
}
displayWorld();

eventoTechado=document.addEventListener("keydown",(e)=>{
    console.log(e.key);
    if (walkValue == 1){
        walkValue = 2;
    }
    else if (walkValue == 2){
            walkValue = 1;
    }
    if (e.key==="ArrowUp") {
        if (world[posicionColumna-1][posicionFila]!==2) {
            world[posicionColumna][posicionFila] = 0
            direction='top';
            posicionColumna--
        }else{
            world[posicionColumna][posicionFila] = 3
        }
    }
    if (e.key==="ArrowDown") {
        if (world[posicionColumna+1][posicionFila]!==2) {
            world[posicionColumna][posicionFila] = 0
            direction='down';
            posicionColumna++
        }else{
            world[posicionColumna][posicionFila] = 3
        }
    }
    if (e.key==="ArrowLeft") {
        if (world[posicionColumna][posicionFila-1]!==2) {
            world[posicionColumna][posicionFila] = 0
            direction='left';
            posicionFila--
        }else{
            world[posicionColumna][posicionFila] = 3
        }
    }
    if (e.key==="ArrowRight") {
        if (world[posicionColumna][posicionFila+1]!==2) {
            world[posicionColumna][posicionFila] = 0
            direction='right';
            posicionFila++
        }else{
            world[posicionColumna][posicionFila] = 3
        }
    }
    world[posicionColumna][posicionFila]=3
    displayWorld();
})

setInterval(() => {

//posicion fantasma bluey
let posicionColumnaPhantomBluey=12
let posicionFilaPhantomBluey=12
world[posicionColumnaPhantomBluey][posicionFilaPhantomBluey]=4
if (world[posicionColumnaPhantomBluey][posicionFilaPhantomBluey]!==2) {
    
}
//posicion fantasma 1
let posicionColumnaPhantomPinky=12
let posicionFilaPhantomPinky=12 
world[posicionColumnaPhantomPinky][posicionFilaPhantomPinky]=5

//posicion fantasma 2
let posicionColumnaPhantomPumpky =12
let posicionFilaPhantomPumpky=12 
world[posicionColumnaPhantomPumpky][posicionFilaPhantomPumpky]=6

//posicion fantasma 3
let posicionColumnaPhantomScaredy =12
let posicionFilaPhantomScaredy=12 
world[posicionColumnaPhantomScaredy][posicionFilaPhantomScaredy]=7

}, 500);