function clearDisplay() {
  const display = document.getElementById("display");
  display.value = "";
  updateClearButton();
}

function updateClearButton() {
  const display = document.getElementById("display");
  const clearButton = document.getElementById("clear");
  clearButton.textContent = display.value === "" ? "AC" : "C";
}

function updateDisplay(value) {
  const display = document.getElementById("display");
  display.value += value;
  updateClearButton();
}