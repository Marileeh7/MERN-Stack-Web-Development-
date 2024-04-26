var likes=[68,212,33]

function remove(elemento){
    elemento.remove();
}
function btnSearch(elemento){
    alert('You are searching for "'+elemento.value+'"');
}

function btnLike(elemento){
    let heart = Number(elemento.textContent);
    heart++
    elemento.textContent=heart;
}
