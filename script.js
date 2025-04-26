let leftOperand = "";
let rightOperand = "";
let currOperator = "";
let result = "";
const hasExpression = () => leftOperand && rightOperand && currOperator;

const expressionContainer = document.querySelector(".expression");
const resultContainer = document.querySelector(".result");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const digitBtns = document.querySelectorAll(".digit");
const decimalBtn = document.querySelector(".decimal");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");

clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteDigit);
decimalBtn.addEventListener("click", appendDecimal);
equalsBtn.addEventListener("click", calculate);

digitBtns.forEach(btn => {
  btn.addEventListener("click", () => appendDigit(btn.value));
});

operatorBtns.forEach(btn => {
  btn.addEventListener("click", () => setOperator(btn.value));
});

document.addEventListener("keydown", e => {
  if (e.key >= 0 && e.key <= 9) appendDigit(e.key);
  else if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "*" ||
    e.key === "/"
  ) setOperator(e.key);
  else if (e.key === ".") appendDecimal();
  else if (e.key === "=" || e.key === "Enter") calculate();
  else if (e.key === "Backspace") deleteDigit();
});

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

function round(num, decimals) {
  return Math.round(num * 10 ** decimals) / 10 ** decimals;
}

function convertOperator(operator) {
  switch (operator) {
    case "+":
      return "\u002B";
    case "-":
      return "\u2212";
    case "*":
      return "\u00D7";
    case "/":
      return "\u00F7";
    default:
      return "";
  }
}

function displayExpression() {
  expressionContainer.textContent =
    leftOperand +
    ` ${convertOperator(currOperator)} ` +
    rightOperand;
}

function displayResult() {
  resultContainer.textContent = result;
}

function initialize() {
  leftOperand = "";
  rightOperand = "";
  currOperator = "";
  result = "";
}

function clear() {
  initialize();
  displayExpression();
  displayResult();
}

function deleteDigit() {
  if (result) clear();
  if (!currOperator) {
    leftOperand = leftOperand.slice(0, -1);
  } else {
    rightOperand = rightOperand.slice(0, -1);
  }
  displayExpression();
}

function appendDigit(digit) {
  if (result) clear();
  if (!currOperator) {
    leftOperand += digit;
  } else {
    rightOperand += digit;
  }
  displayExpression();
}

function appendDecimal() {
  if (result) clear();
  if (!currOperator && !leftOperand.includes(".")) {
    leftOperand += ".";
  } else if (currOperator && !rightOperand.includes(".")) {
    rightOperand += ".";
  }
  displayExpression();
}

function setOperator(operator) {
  if (hasExpression() && !result) calculate();
  if (result) {
    leftOperand = result;
    rightOperand = "";
    result = "";
  }
  if (leftOperand) currOperator = operator;
  displayExpression();
}

function calculate() {
  if (!hasExpression()) return;
  const value = operate(currOperator, +leftOperand, +rightOperand);
  if (isNaN(value) || value === Infinity) {
    resultContainer.textContent = "Error";
    initialize();
  } else {
    result = round(value, 5).toString();
    displayResult();
  }
}