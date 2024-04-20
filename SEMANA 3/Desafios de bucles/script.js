for (let i = 1; i <=20 ; i++) {
    if (i%2!=0) {
        console.log(i);
    }
}

for (let i = 100; i >= 0 ; i--) {
    if (i%3==0) {
        console.log(i);
    }
}

for (let i = 4; i > -4 ; i-=1.5) {
    console.log(i);
}

let sum=0;
let i=0;
while(i<=100){
    sum+=i;
    i++
}
console.log(sum);

let product=1;
let x=1;
while(x<=12){
    product*=x;
    x++
}
console.log(product);
