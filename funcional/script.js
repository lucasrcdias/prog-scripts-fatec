var listenerObject = function () {
  var obj       = { count: 0 };
  var listeners = [];
  var count     = 0;

  // adicionando listener
  obj.addListener = function (listener) {
    listeners.push(listener);
  };
  
  // executando listeners
  obj.execute = function execute() {
	var counterObject = { count: ++count };

    for(listener in listeners) {
      listeners[listener](counterObject);
    }
  }

  return obj;
};

// exemplo de listeners
var clickListener = function (obj) {
  console.log("click listener, executed " + obj.count + " times.");
};

var whateverListener = function (obj) {
  console.log("whatever listener, executed " + obj.count + " times.");
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