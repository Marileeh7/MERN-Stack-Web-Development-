function BtnLogin(element) {
    if (element.innerText==='Login') {
        element.innerText = "Logout";
    } else {
        element.innerText = "Login";
    }
}
function remove(element) {
    element.remove();
}