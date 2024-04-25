let player = {
    left: 450,
    top: 620,
}
let enemy =[
    {left:250,top:200},
    {left:350,top:300},
    {left:450,top:100},
    {left:550,top:0},
    {left:650,top:230},
    {left:750,top:200},
]
let missile=[]

function drawPlayer() {
    content = `<div class='player' style='left: ${player.left}px;top: ${player.top}px;'></div>`;
    document.getElementById("players").innerHTML=content;
}

function drawEmemies() {
    content='';
    //console.log(enemy);
    for (let idx = 0; idx < enemy.length; idx++) {
        //console.log(idx);
        content += `<div class='enemy' style='left: ${enemy[idx].left}px;top: ${enemy[idx].top}px;'></div>`;
        //console.log(content);
    }
    document.getElementById("enemies").innerHTML=content;
}

function drawMissiles() {
    content='';
    for (let idx = 0; idx < missile.length; idx++) {
        content+=`<div class='missile' style='left: ${missile[idx].left}px; top: ${missile[idx].top}px;'></div>`
    }
    document.getElementById("missiles").innerHTML=content;
}

function moveEnemies() {
    for (let idx = 0; idx < enemy.length; idx++) {
        enemy[idx].top +=1;
    }
}
function moveMissiles() {
    for (let idx = 0; idx < missile.length; idx++) {
        missile[idx].top -=1;
    }
}

document.onkeydown = function(e) {
    console.log(e);
    if(e.keyCode===37 && player.left>10){//left
        player.left -=10;
    }
    if(e.keyCode===39 && player.left<830){//right
        player.left +=10;
    }
    if(e.keyCode===38 && player.top>470){//up
        player.top -=10;
    }
    if(e.keyCode===40 && player.top<640){//down
        player.top +=10;
    }
    if(e.keyCode===32){//fire
        missile.push({left: (player.left +32), top: (player.top-8)})
        drawMissiles();
    }
    console.log(missile);

    drawPlayer();
     
}
function moveDrawEnemies() {
    moveEnemies();
    drawEmemies();  
    setTimeout(moveDrawEnemies,50);
}
function moveDrawMissiles() {
    moveMissiles(); 
    drawMissiles();
    setTimeout(moveDrawMissiles,1);

}
function gameLoop() {
    drawPlayer();
    moveDrawEnemies()
    moveDrawMissiles()
    //setTimeout(gameLoop,10);
}
gameLoop();