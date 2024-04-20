function alwaysHungry(arr) {
    for (let i = 0; i < arr.length; i++) {
        if(arr[i]=='comida'){
            console.log('delicioso');
        } 
    }
}

alwaysHungry([3.14, "comida", "pastel", true, "comida"]);
alwaysHungry([4, 1, 5, 7, 2]);

function highPass(arr, cutoff) {
    var filteredArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]>cutoff) {
            filteredArr.push(arr[i]);
        }
    }
    return filteredArr;
}
var result = highPass([6, 8, 3, 10, -2, 5, 9], 5);
console.log(result); // esperamos de vuelta [6, 8, 10, 9]

function betterThanAverage(arr) {
    var sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    var prom=sum/arr.length;
    var count = 0
    for (let i = 0; i < arr.length; i++) {
        if (prom<arr[i]) {
            count++
        }
    }
    return count;
}
var result = betterThanAverage([6, 8, 3, 10, -2, 5, 9]);
console.log(result); // esperamos 4 de vuelta

function reverse(arr) {
    var reversedArray = [];
    for (var i = arr.length - 1; i >= 0; i--) {
        reversedArray.push(arr[i]);
    }
    return reversedArray;
}

var result = reverse(["a", "b", "c", "d", "e"]);
console.log(result); // Esperamos de vuelta ["e", "d", "c", "b", "a"]

function fibonacciArray(n) {
    // [0, 1] son los valores inciales del arreglos para calcular el resto
    var fibArr = [0, 1];
    // tu código aquí
    for (let i = 0; i < n-2; i++) {
        fibArr.push(fibArr[i]+fibArr[i+1]);
    }
    return fibArr;
}   
var result = fibonacciArray(10);
console.log(result); // esperamos de vuelta[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

