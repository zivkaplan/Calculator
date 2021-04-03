const calculator = document.querySelector(".calculator")
const previousScreen = calculator.querySelector(".previous")
const currentScreen = calculator.querySelector(".current")

calculator.addEventListener('click', (event) => {
    if (!event.target.closest('button')) return

    const keyValue = event.target.id;
    const { type } = event.target.dataset;
    const { previousKeyType } = calculator.dataset;

    if (type === 'number') {
        if (previousKeyType === 'operator') {
            if (!calculator.dataset.secondNumber) calculator.dataset.secondNumber = keyValue;
            else calculator.dataset.firstNumber += keyValue;
        } else {
            calculator.dataset.onFirstNumber = 'true';
            if (!calculator.dataset.firstNumber) calculator.dataset.firstNumber = keyValue;
            else calculator.dataset.firstNumber += keyValue;
        }
    }

    if (type === 'operator') {
        calculator.dataset.operator = keyValue;
        calculator.dataset.onFirstNumber = 'false';
    }
    if (type === 'clear') {
        clear();
    }

    if (type === 'backspace') {
        if (!previousKeyType === 'operator') {
            if (calculator.dataset.onFirstNumber) {
                calculator.dataset.firstNumber = calculator.dataset.firstNumber.slice(0, -1);
            } else {
                calculator.dataset.secondNumber = calculator.dataset.secondNumber.slice(0, -1);
            }
        }
    }

    if (type === 'equals') {
        const { firstNumber, operator, secondNumber } = calculator.dataset;
        clear();
        result = operate(parseFloat(firstNumber), operator, parseFloat(secondNumber));
        calculator.dataset.firstNumber = result;
    }
    calculator.dataset.previousKeyType = type;
    if (!calculator.dataset.operator) currentScreen.innerText = calculator.dataset.firstNumber;
    else {
        previousScreen.innerText = calculator.dataset.firstNumber + " " + calculator.dataset.operator;
        currentScreen.innerText = '';
        if (calculator.dataset.secondNumber) currentScreen.innerText = calculator.dataset.secondNumber;
    }
})

const add = ((a, b) => {
    return a + b
})

const subtract = ((a, b) => {
    return a - b
})


const multiply = ((a, b) => {
    return a * b
})

const divide = ((a, b) => {
    return a / b
})

function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber)
        case "-":
            return subtract(firstNumber, secondNumber)
        case "×":
            return multiply(firstNumber, secondNumber)
        case "÷":
            return divide(firstNumber, secondNumber)
    }
}
function clear() {
    calculator.dataset.firstNumber = "";
    calculator.dataset.secondNumber = "";
    calculator.dataset.operator = "";
    currentScreen.innerText = "";
    previousScreen.innerText = "";
    calculator.dataset.onFirstNumber = "true";
}