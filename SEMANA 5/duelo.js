// Clases
class Carta {
    constructor(nombre, costo) {
      this.nombre = nombre;
      this.costo = costo;
    }
  }
  
  class Unidad extends Carta {
    constructor(nombre, costo, poder, res) {
      super(nombre, costo);
      this.poder = poder;
      this.res = res;
    }
  
    atacar(target) {
      if (!(target instanceof Unidad)) {
        throw new Error("Sólo puedo atacar a otra carta de Unidad");
      }
      console.log(`${this.nombre} ha atacado a ${target.nombre}`);
      target.recibirDaño(this.poder);
    }
  
    recibirDaño(daño) {
      this.res -= daño;
    }
  }
  
  class Efecto extends Carta {
    constructor(nombre, costo, texto, stat, magnitud) {
      super(nombre, costo);
      this.texto = texto;
      this.stat = stat;
      this.magnitud = magnitud;
    }
  
    aplicarEfecto(target) {
      if (!(target instanceof Unidad)) {
        throw new Error("Sólo puedes afectar a otra carta de Unidad");
      }
      console.log(`${this.nombre} ha producido el siguiente efecto en ${target.nombre}: ${this.texto}`);
      target.modificarStat(this.stat, this.magnitud);
    }
  }
  
  // Lógica del juego
  const ninjaRojo = new Unidad("Ninja Cinturón Rojo", 3, 3, 4);
  const algoritmoDificil = new Efecto("Algoritmo Difícil", 2, "Aumentar la resistencia del objetivo en 3", "res", 3);
  const ninjaNegro = new Unidad("Ninja Cinturón Negro", 4, 5, 4);
  const rechazoPromesa = new Efecto("Rechazo de promesa no controlada", 1, "Reducir la resistencia del objetivo en 2", "res", -2);
  const prograPareja = new Efecto("Programación en Pareja", 3, "Aumentar el poder del objetivo en 2", "poder", 2);
  
  // Ejecución del juego
  console.log('El jugador 1 convoca a Ninja Cinturón Rojo');
  algoritmoDificil.aplicarEfecto(ninjaRojo);
  console.log('El jugador 2 convoca a Ninja Cinturón Negro');
  rechazoPromesa.aplicarEfecto(ninjaRojo);
  prograPareja.aplicarEfecto(ninjaRojo);
  ninjaRojo.atacar(ninjaNegro);
  console.log('El jugador 1 ha ganado el juego.');
  