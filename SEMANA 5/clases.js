class Ninja {
    constructor(nombre) {
        this.nombre = nombre;
        this.salud = 100; // Un valor inicial para la salud
        this.velocidad = 3; // Valor predeterminado para la velocidad
        this.fuerza = 3; // Valor predeterminado para la fuerza
    }

    sayName() {
        console.log(`Mi nombre es ${this.nombre}`);
    }

    showStats() {
        console.log(`Nombre: ${this.nombre}, Fuerza: ${this.fuerza}, Velocidad: ${this.velocidad}, Salud: ${this.salud}`);
    }

    drinkSake() {
        this.salud += 10;
        console.log(`Salud después de beber sake: ${this.salud}`);
    }
}

// Creación de una instancia de Ninja y uso de sus métodos
const ninja1 = new Ninja("Hyabusa");
ninja1.sayName(); 
ninja1.showStats(); 
ninja1.drinkSake(); 
