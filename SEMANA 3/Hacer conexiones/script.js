var connections= 498;
var request= 2;
var numList = document.querySelector("#listConnections");
var numRequest = document.querySelector("#listRequest");
function accept(id){
    connections=connections+1;
    request=request-1;
    numList.innerHTML=connections;
    numRequest.innerHTML=request; 
    id.remove();
}
function deny(id){
    request=request-1;
    numRequest.innerHTML=request; 
    id.remove();
    console.log('RECHAZADO');
}
function changeName(id){
    id.innerHTML='Leticia Rodas';
}