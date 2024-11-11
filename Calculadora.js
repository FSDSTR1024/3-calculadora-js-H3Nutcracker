// *Variables globales* //
let firstValue = null;
let operator = null;
const display = document.getElementById("display");
const log = document.getElementById("log");

// *Función para la pantalla* //
// *Controla que no se puedan escribir números enteros con 0 a la izquierda* //
function updateDisplay(value) {
  if (display.value === "Error") {
    clearDisplay();
  }
  if (display.value.length < 10) {
    if (display.value === "" && value === "00") {
      display.value = "0.0";
    } else if (display.value === "" && value === ".") {
      display.value = "0.";
    } else if (display.value === "0" && value === "0") {
      display.value = "0.0";
    } else if (display.value === "0" && value === "00") {
      display.value = "0.00";
    } else if (value === "." && display.value.includes(".")) {
      display.value = display.value;
    } else {
      display.value += value;
    }
  } else {
    display.value = "Error";
    log.insertAdjacentHTML("afterbegin", "Error max 10 digits<br>");
  }
  updateClearButton();
}

// *Función para cambiar el texto del botón de limpiar dependiendo de lo que hay en la pantalla* //
function updateClearButton() {
  const clearButton = document.getElementById("clear");
  if (display.value === "") {
    clearButton.textContent = "AC";
  } else {
    clearButton.textContent = "C";
  }
}

//* Función para limpiar la pantalla y el log dependiendo del botón* //
function clearDisplay() {
  if (display.value === "") {
    log.textContent = "";
  } else {
    display.value = "";
    firstValue = null;
    operator = null;
    updateClearButton();
}
  }


// *Funcionalidad de botones* //

//* Botón de borrar* //
function erase() {
  display.value = display.value.slice(0, -1);
  updateClearButton();
}

//* Operaciones *//
function setOperator(op) {
  if (operator && firstValue !== null && display.value !== "") {
    solve();
  }
  firstValue = parseFloat(display.value);
  operator = op;
  display.value = "";
}

function solve() {
  if (display.value === "Error") {
    return;
  }

  const secondValue = parseFloat(display.value);
  let result;

  if (operator && firstValue !== null && !isNaN(secondValue)) {

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
      case '%':
        result = percentage(firstValue, secondValue);
        break;
      default:
        result = NaN
    }

    if (isNaN(result)) {
      display.value = "Error";
      log.insertAdjacentHTML('afterbegin', "Error invalid operation<br>");
    } else {
      display.value = result
      log.insertAdjacentHTML('afterbegin', `${firstValue} ${operator} ${secondValue} = ${result}<br>`);
    }

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
    return NaN;
  }
}

function percentage(total, percentage) {
  const percentValue = total * (percentage / 100);
  return percentValue;
}

// *Funcionalidad para el uso del teclado numerico* //

document.addEventListener("keydown", function (event) {
  if (event.key >= 0 && event.key <= 9) {
    updateDisplay(event.key);
  } else if (event.key === "Enter") {
    solve();
  } else if (event.key === "Backspace") {
    erase();
  } else if (event.key === "Delete") {
    clearDisplay();
  } else if (event.key === ".") {
    updateDisplay(".");
  } else if (event.key === "%") {
    setOperator("%");
  } else if (event.key === "+") {
    setOperator("+");
  } else if (event.key === "-") {
    setOperator("-");
  } else if (event.key === "*") {
    setOperator("*");
  } else if (event.key === "/") {
    setOperator("/");
  }
})