const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");

const previousOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");

let perstAccount = 0;

class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }

  /*formatar números com pontos flutuantes*/
  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  /*limpar todos os displayes*/
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  //limpar apenas o ultimo número da string
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  //verificar se já tem operando ou guardar operando
  doOperation(operation) {
    if (this.currentOperand === "") return;

    if (this.previousOperand != "") {
      this.calculate();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  // calcular operação de acordo com a operação clicada
  calculate() {
    let result;

    const floatPreviousOperand = parseFloat(this.previousOperand);
    const floatCurrentOperand = parseFloat(this.currentOperand);

    if (isNaN(floatPreviousOperand) || isNaN(floatCurrentOperand)) return;

    switch (this.operation) {
      case "+":
        result = floatPreviousOperand + floatCurrentOperand;
        break;
      case "-":
        result = floatPreviousOperand - floatCurrentOperand;
        break;
      case "*":
        result = floatPreviousOperand * floatCurrentOperand;
        break;
      case "÷":
        if (floatCurrentOperand != 0) {
          result = floatPreviousOperand / floatCurrentOperand;
        } else {
          return;
        }
        break;
      case "%":
        result = floatPreviousOperand % floatCurrentOperand;
        break;
      case "^":
        result = Math.pow(floatPreviousOperand, floatCurrentOperand);
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  //adicionar número ao display
  addNumberDisplay(number) {
    /*Para não colocar vários números flutuates*/
    if (this.currentOperand.includes(".") && number === ".") return;

    /*colocar número no final da string de operação*/
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  /*Modificar o display após operações*/
  updateDisplay() {
    this.previousOperandText.innerText = `${this.previousOperand}${
      this.operation || ""
    }`;
    this.currentOperandText.innerText = this.currentOperand;
  }
}

// instanciando a calculadora e passando os dois campos de textos que são alterados de acordo com os cliks
const calculator = new Calculator(previousOperandText, currentOperandText);

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.doOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.addNumberDisplay(numberButton.innerText);
    calculator.updateDisplay();
  });
}

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
