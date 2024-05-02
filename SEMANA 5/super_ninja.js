class Ninja {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.speed = 3;
        this.strength = 3;
    }

    drinkSake() {
        this.health += 10;
        console.log(`${this.name} bebido sake y aumentó su salud a ${this.health}`);
    }

    showStats() {
        return `Nombre: ${this.name}, Salud: ${this.health}, Velocidad: ${this.speed}, Fuerza: ${this.strength}`;
    }
}

class Sensei extends Ninja {
    constructor(name) {
        super(name);
        this.health = 200;
        this.speed = 10;
        this.strength = 10;
        this.wisdom = 10;
    }

    speakWisdom() {
        super.drinkSake();
        console.log("Lo que un programador puede hacer en un mes, dos programadores pueden hacerlo en dos meses.");
    }
}

// ejemplo de uso
const superSensei = new Sensei("Master Splinter");
superSensei.speakWisdom();
// -> "Lo que un programador puede hacer en un mes, dos programadores pueden hacerlo en dos meses."
console.log(superSensei.showStats());
// -> "Nombre: Master Splinter, Salud: 210, Velocidad: 10, Fuerza: 10"
