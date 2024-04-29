var hello;
var needle = 'haystack';
var brendan = 'super cool';
var food = 'chicken';
var mean;
var genre;
var dojo;

console.log(hello); // undefined
hello = 'world';


function test(){
    var needle = 'magnet';
    console.log(needle);
}
test(); // magnet


function print(){
    brendan = 'only okay';
    console.log(brendan);
}
console.log(brendan);// 'super cool' (La función print() nunca es llamada)


function eat(){
    var food;
    food = 'half-chicken';
    console.log(food);
    food = 'gone';
}
console.log(food);
eat(); 
//'chicken''half-chicken'


mean(); // TypeError: mean is not a function
console.log(food); // ReferenceError: food is not defined
mean = function() {
    var food;
    food = "chicken";
    console.log(food); // 'chicken'
    food = "fish";
    console.log(food); // 'fish'
}
console.log(food); // ReferenceError: food is not defined
//Error al intentar ejecutar mean() como función porque se define después como una función expresada.

console.log(genre); // undefined
genre = "disco";
function rewind() {
    var genre = "rock";
    console.log(genre); // 'rock'
    genre = "r&b";
    console.log(genre); // 'r&b'
}
rewind();
console.log(genre); // 'disco'


dojo = "san jose";
console.log(dojo); // 'san jose'
function learn() {
    var dojo = "seattle";
    console.log(dojo); // 'seattle'
    dojo = "burbank";
    console.log(dojo); // 'burbank'
}
learn();
console.log(dojo); // 'san jose'


function makeDojo(name, students) {
    const dojo = {name, students};
    if (students > 50) {
        dojo.hiring = true;
    } else if (students <= 0) {
        dojo.status = "closed for now";  // Añade una propiedad en lugar de reasignar la constante
    }
    return dojo;
}

console.log(makeDojo("Chicago", 65));
console.log(makeDojo("Berkeley", 0));

