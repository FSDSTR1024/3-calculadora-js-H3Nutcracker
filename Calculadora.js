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
  updateClearButton();
}

function erase() {
  const display = document.getElementById("display");
  //
}

function percentage(total, percent) {
  //
}

function divide(a, b) {
  //
}

function multiply(a, b) {
  //
}

function substract(a, b) {
  //
}

function add(a, b) {
  //
}

function solve() {
  //
}