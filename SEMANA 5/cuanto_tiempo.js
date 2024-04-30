const { performance } = require('perf_hooks');

// Mejora de la función isPrime utilizando funciones de flecha y optimización de comprobaciones
Number.prototype.isPrime = function() {
    if (this <= 1) return false;
    if (this <= 3) return true;
    if (this % 2 === 0 || this % 3 === 0) return false;
    for (let i = 5; i * i <= this; i += 6) {
        if (this % i === 0 || this % (i + 2) === 0) return false;
    }
    return true;
};

// Función para encontrar el 10,000°, 100,000° y 1,000,000° número primo
function findPrime(target) {
    const start = performance.now();
    let primeCount = 0;
    let num = 2;
    while (primeCount < target) {
        if (num.isPrime()) {
            primeCount++;
        }
        num++;
    }
    console.log(`The ${target}th prime number is ${num-1}`);
    console.log(`This took ${performance.now() - start} milliseconds to run`);
}

findPrime(10000);
findPrime(100000);
findPrime(1000000);

// Función Fibonacci iterativa usando función de flecha
const iFib = n => {
    const vals = [0, 1];
    while (vals.length - 1 < n) {
        let len = vals.length;
        vals.push(vals[len - 1] + vals[len - 2]);
    }
    return vals[n];
};

// Función Fibonacci recursiva
const rFib = n => {
    if (n < 2) {
        return n;
    }
    return rFib(n - 1) + rFib(n - 2);
};

// Comparar el rendimiento de Fibonacci iterativo y recursivo
const startRecursive = performance.now();
rFib(20);
console.log(`Recursive Fibonacci took ${performance.now() - startRecursive} milliseconds`);

const startIterative = performance.now();
console.log(`Iterative Fibonacci value: ${iFib(20)}`);
console.log(`Iterative Fibonacci took ${performance.now() - startIterative} milliseconds`);

// Función para revertir una cadena utilizando un bucle
function reverseString(s) {
    let reversed = "";
    for (let i = s.length - 1; i >= 0; i--) {
        reversed += s[i];
    }
    return reversed;
}

const story = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident culpa nihil repellat nulla laboriosam maxime, quia aliquam ipsam reprehenderit delectus reiciendis molestias assumenda aut fugit tempore laudantium tempora aspernatur? Repellendus consequatur expedita doloribus soluta cupiditate quae fugit! Aliquid, repellat animi, illum molestias maiores, laboriosam vero impedit iusto mollitia optio labore asperiores!";
console.log(reverseString(story));
