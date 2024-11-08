// *Funcionamiento del display y los botones de borar* //
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

// **Cambia el botón de limpiar en función de lo que haya en el display** //
function updateClearButton() {
  const display = document.getElementById("display");
  const clearButton = document.getElementById("clear");
  clearButton.textContent = display.value === "" ? "AC" : "C";
}

function clearDisplay() {
  const display = document.getElementById("display");
  display.value = "";
  firstValue = null;
  operator = null;
  updateClearButton();
}

function erase() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
  updateClearButton();
}

// **Variables para almacenar el primer valor y el operador actual** //
let firstValue = null;
let operator = null;

function setOperator(op) {
  const display = document.getElementById("display");
  firstValue = parseFloat(display.value);
  operator = op;
  display.value = ""; // Limpia el display para el segundo valor
}

function add() { setOperator('+'); }
function substract() { setOperator('-'); }
function multiply() { setOperator('*'); }
function divide() { setOperator('/'); }

// **Calcula el resultado en función del operador y muestra el resultado** //
function solve() {
  const display = document.getElementById("display");
  const secondValue = parseFloat(display.value);

  if (operator && firstValue !== null && !isNaN(secondValue)) {
    let result = 0;
    switch (operator) {
      case '+':
        result = firstValue + secondValue;
        break;
      case '-':
        result = firstValue - secondValue;
        break;
      case '*':
        result = firstValue * secondValue;
        break;
      case '/':
        result = secondValue !== 0 ? firstValue / secondValue : 'Error';
        break;
    }
    display.value = result.toString().slice(0, 10); // Limita a 10 caracteres
    firstValue = null;
    operator = null;
  }
}

// **Función para el porcentaje** //
function percentage() {
  const display = document.getElementById("display");
  const currentValue = parseFloat(display.value);
  if (!isNaN(currentValue)) {
    display.value = (currentValue / 100).toString().slice(0, 10);
  }
}