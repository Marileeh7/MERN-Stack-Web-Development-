const display = document.getElementById("display");
let num1 = "";
let num2 = "";
let op = "";

function press(num) {
    if (op === "") { 
        num1 = '';
        op="r";
        num1 += num;
    } else {  
        num1 += num;
    }
    display.innerHTML = num1;
}

function setOP(key) {
    op = key;
    num2 = num1;
    num1 = "";
}

function clr() {
    num1 = "";
    num2 = "";
    op = "";
    display.innerHTML = "0";
}

function calculate() {
    let a = parseFloat(num2);
    let b = parseFloat(num1);
    let res = 0;
    switch (op) {
        case "+":
            res = a + b;
            break;
        case "-":
            res = a - b;
            break;
        case "*":
            res = a * b;
            break;
        case "/":
            if (b === 0) {
                display.innerHTML = "Error"; // Manejo de división por cero
                return;
            }
            res = a / b;
            break;
        default:
            display.innerHTML = "Operación no válida";
            return;
    }
    num1 = res;
    num2 = "";
    op = "";
    display.innerHTML = res;
}

