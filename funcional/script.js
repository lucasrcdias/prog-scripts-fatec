var listenerObject = function () {
  var obj = {
    listeners: [],
    count: 0
  };

  // adicionando listener
  obj.addListener = function (listener) {
    this.listeners.push(listener);
  };

  // executando listeners
  obj.execute = function execute() {
    console.log("Executando: " + ++this.count);
    for(listener in this.listeners) {
      this.listeners[listener]();
    }
  }

  return obj;
};

// exemplo de listeners
var clickListener = function () {
  console.log("clicked");
};

var whateverListener = function () {
  console.log("whatever");
}

// criação de um objeto que "escuta"
var listenerObj = listenerObject();

// adicionando listeners ao objeto que "escuta"
listenerObj.addListener(clickListener);
listenerObj.addListener(whateverListener);

// evento click dos botões
var button = document.getElementById('listeners-trigger');
var button2 = document.getElementById('listeners-trigger2');

button.addEventListener('click', function () {
  listenerObj.execute();
});

button2.addEventListener('click', function () {
  listenerObj.execute();
});
