// ANIMAIS
function Animal() {
  this.barulho = 'grrr';
}

Animal.prototype = {
  fazerBarulho: function() { return this.barulho; }
}

function Cao() {
  Animal.call(this);
  this.barulho = 'au';
}

Cao.prototype = new Animal();

function Gato() {
  Animal.call(this);
  this.barulho = 'miau';
}

Gato.prototype = new Animal();
// ----------------------------

// MANADA
function Manada() {
  this.animais = [];
}

Manada.prototype = {
  add: function(animal) { this.animais.push(animal); },
  barulhos: function() { return ""; }
};
// ----------------------------

// MANADA VIRGULA
function ManadaVirgula() {
  Manada.call(this);
}

var ManadaVirgulaPrototype = new Manada();
ManadaVirgulaPrototype.barulhos = function() {
  var barulho = "";
  for(animal in this.animais) {
    barulho += this.animais[animal].barulho + ",";
  }

  return barulho.slice(0, -1);
}
ManadaVirgula.prototype = ManadaVirgulaPrototype;
// ----------------------------

// MANADA SUSTENIDA DUPLA
function ManadaSustenidaDupla() {
  Manada.call(this);
}

var ManadaSustenidaDuplaPrototype = new Manada();
ManadaSustenidaDuplaPrototype.barulhos = function() {
  var barulho = "";
  for(animal in this.animais) {
    barulho += (this.animais[animal].barulho + "#").repeat(2);
  }

  return barulho.slice(0, -1);
}
ManadaSustenidaDupla.prototype = ManadaSustenidaDuplaPrototype;
// -----------------------------

var animais = [new Cao(), new Gato()];
var manadaVirgula = new ManadaVirgula();
var manadaSustenida = new ManadaSustenidaDupla();

for(animal in animais) {
  manadaVirgula.add(animais[animal]);
  manadaSustenida.add(animais[animal]);
}

console.log(manadaVirgula.barulhos());
console.log(manadaSustenida.barulhos());
