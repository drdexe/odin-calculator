let leftOperand = "";
let rightOperand = "";
let operator = "";
let hasOperator = false;

const expression = document.querySelector(".expression");
const result = document.querySelector(".result");
const buttons = document.querySelector(".buttons");
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

clearBtn.addEventListener("click", () => {
  expression.textContent = "";
  result.textContent = "";
  hasOperator = false;
});

digitBtns.forEach(digit => {
  digit.addEventListener("click", () => {
    expression.textContent += digit.value;
    if (hasOperator) {
      leftOperand += digit.value;
    } else {
      rightOperand += digit.value;
    }
  });
});

operatorBtns.forEach(operator => {
  operator.addEventListener("click", () => {
    if (!hasOperator) {
      expression.textContent += ` ${operator.textContent} `;
      hasOperator = true;
    }
  });
});