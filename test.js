// ! De momento hay un pequeño bug que no permite comenzar una nueva operación sin antes limpiar la pantalla manualmente. Pero el resto de funcionalidades están trabajando correctamente !//

// *Variables globales* //
let firstValue = null;
let operator = null;
let isResultDisplayed = false;
const display = document.getElementById("display");
const log = document.getElementById("log");
const clearButton = document.getElementById("clear");

// *Función para la pantalla* //
// *Controla que no se puedan escribir números enteros con 0 a la izquierda, números con más de 10 digitos o decimales con 2 puntos* //
function updateDisplay(value) {
  if (display.value === "Error" || isResultDisplayed) {
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

//* Funciones para limpiar la pantalla y el log dependiendo del botón* //

// *Función para cambiar el texto del botón de limpiar dependiendo de lo que hay en la pantalla* //
function updateClearButton() {
  if (display.value === "") {
    clearButton.textContent = "AC";
  } else {
    clearButton.textContent = "C";
  }
}

//* Función para limpiar la pantalla *//
function clearDisplay() {
  display.value = "";
  firstValue = null;
  operator = null;
  isResultDisplayed = false;
  updateClearButton();
}

//* Función para limpiar el log *//
function clearLog() {
  clearDisplay();
  log.textContent = "";
}

//* Función para controlar el botón de limpiar *//
function handleClearButton() {
  if (display.value === "" && clearButton.textContent === "AC") {
    clearLog();
  } else {
    clearDisplay();
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
  console.log(`Setting operator: ${op}`);
  if (isResultDisplayed) {
    firstValue = parseFloat(display.value);
    operator = op;
    display.value = "";
    isResultDisplayed = false;
    console.log(`New operation started with firstValue: ${firstValue}`);
  } else if (operator && firstValue !== null && display.value !== "") {
    console.log(`Existing operation with firstValue: ${firstValue}, operator: ${operator}, display value: ${display.value}`);
    solve();
    operator = op;
    display.value = "";
    console.log(`Operator updated to: ${operator}`);
  } else {
    firstValue = parseFloat(display.value);
    operator = op;
    display.value = "";
    console.log(`First value set to: ${firstValue}, operator set to: ${operator}`);
  }
}

function solve() {
  console.log(`Solving existing operation with firstValue: ${firstValue}, display value: ${display.value}`);
  if (display.value === "Error") {
    console.log("Error in display value, returning");
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
      console.log("Error in calculation, setting display value to Error");
      display.value = "Error";
      log.insertAdjacentHTML('afterbegin', "Error invalid operation<br>");
    } else {
      console.log(`Setting display value to result: ${result}`);
      display.value = result
      log.insertAdjacentHTML('afterbegin', `${firstValue} ${operator} ${secondValue} = ${result}<br>`);
      console.log(`Setting firstValue to result: ${result}`);
      firstValue = result;
      isResultDisplayed = true;
    }
    console.log(`Setting operator to null`);
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