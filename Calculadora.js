let firstValue = null;
let operator = null;

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

function setOperator(op) {
  const display = document.getElementById("display");
  firstValue = parseFloat(display.value);
  operator = op;
  display.value = ""; // Limpia el display para el segundo valor
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
  //
}