// *Variables globales* //
let firstValue = null;
let operator = null;

// *Función para el funcionamiento de la pantalla* //
// *Controla que no se puedan escribir números enteros con 0 a la izquierda* //
// TODO: Controlar que no exceda la longitud de la pantalla //
function updateDisplay(value) {
  const display = document.getElementById("display");
  if (display.textContent.length < 10) {
    if (display.value === "" && value === "00") {
      display.value = "0.0";
    } else if (display.value === "" && value === ".") {
      display.value = "0.";
    } else if (display.value === "0" && value === "0") {
      display.value = "0.0";
    } else if (display.value === "0" && value === "00") {
      display.value = "0.00";
    } else {
      display.value += value;
    }
  } else {
    display.value = value;
  }
  updateClearButton();
}

function updateLog(value) {
  // TODO: Implementar funcionalidad del log
}

// *Función para cambiar el texto del botón de limpiar dependiendo de lo que hay en la pantalla* //
function updateClearButton() {
  const display = document.getElementById("display");
  const clearButton = document.getElementById("clear");
  clearButton.textContent = display.value === "" ? "AC" : "C";
}

//* Función para limpiar la pantalla* //
// TODO: Hacer que cuando se presione C limpie la pantalla y cuando se presione AC limpie también el log //
function clearDisplay() {
  const display = document.getElementById("display");
  display.value = "";
  firstValue = null;
  operator = null;
  updateClearButton();
}

// *Funcionalidad de botones* //

//* Botón de borrar* //
function erase() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
  updateClearButton();
}

//* Oeraciones *//
function setOperator(op) {
  const display = document.getElementById("display");
  firstValue = parseFloat(display.value);
  operator = op;
  display.value = "";
}

function solve() {
  const display = document.getElementById("display");
  const secondValue = parseFloat(display.value);

  if (operator && firstValue !== null && !isNaN(secondValue)) {
    let result;

    switch (operator) {
      case '+':
        result = add(firstValue, secondValue);
        break;
      case '-':
        result = subtract(firstValue, secondValue);
        break;
      case '*':
        result = multiply(firstValue, secondValue);
        break;
      case '/':
        result = divide(firstValue, secondValue);
        break;
    }

    display.value = result;
    firstValue = result;
    operator = null;
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 !== 0) {
    return num1 / num2;
  } else {
    return "Error";
  }
}

function percentage(total, percentage) {
  // TODO: Implementar %
}