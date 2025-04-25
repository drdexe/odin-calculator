let leftOperand = "";
let rightOperand = "";
let currOperator = "";
let result = "";

const expressionContainer = document.querySelector(".expression");
const resultContainer = document.querySelector(".result");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const digitBtns = document.querySelectorAll(".digit");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.querySelector(".equals");

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

function round(num) {
  return Math.round(num * 1000) / 1000;
}

function clear() {
  expressionContainer.textContent = "";
  resultContainer.textContent = "";
  leftOperand = "";
  rightOperand = "";
  currOperator = "";
  result = "";
}

clearBtn.addEventListener("click", clear);

digitBtns.forEach(digit => {
  digit.addEventListener("click", () => {
    if (result) clear();
    expressionContainer.textContent += digit.value;
    if (currOperator) {
      rightOperand += digit.value;
    } else {
      leftOperand += digit.value;
    }
  });
});

operatorBtns.forEach(operator => {
  operator.addEventListener("click", () => {
    if (rightOperand) {
      result = round(operate(currOperator, +leftOperand, +rightOperand)).toString();
      resultContainer.textContent = result;
      leftOperand = result;
      rightOperand = "";
      currOperator = "";
    }
    if (result) {
      expressionContainer.textContent = result;
      leftOperand = result;
      result = 0;
    }
    if (leftOperand && !currOperator) {
      expressionContainer.textContent += ` ${operator.textContent} `;
      currOperator = operator.value;
    }
  });
});

equalsBtn.addEventListener("click", () => {
  if (!(leftOperand && rightOperand && currOperator)) return;
  result = round(operate(currOperator, +leftOperand, +rightOperand)).toString();
  resultContainer.textContent = result;
  leftOperand = "";
  rightOperand = "";
  currOperator = "";
});