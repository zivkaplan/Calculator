const calculator = document.querySelector(".calculator")
const previousScreen = calculator.querySelector(".previous")
const currentScreen = calculator.querySelector(".current")

calculator.addEventListener('click', (event) => {
    if (!event.target.closest('button')) return

    const keyValue = event.target.id;
    const { type } = event.target.dataset;
    const { previousKeyType } = calculator.dataset;

    if (type === 'number') {
        if (!calculator.dataset.operator) {
            if (previousKeyType === 'equals') clear()
            if (!calculator.dataset.firstNumber) calculator.dataset.firstNumber = keyValue;
            else { calculator.dataset.firstNumber += keyValue }
        } else {
            if (!calculator.dataset.secondNumber) calculator.dataset.secondNumber = keyValue;
            else { calculator.dataset.secondNumber += keyValue }
        }
    }
    if (type === 'operator' && (!calculator.dataset.secondNumber || calculator.dataset.secondNumber.length < 1)) {
        calculator.dataset.operator = keyValue;
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

function operate(firstNumber, operator, secondNumber) {
    switch (operator) {
        case "+":
            return (firstNumber + secondNumber)
        case "-":
            return (firstNumber - secondNumber)
        case "×":
            return (firstNumber * secondNumber)
        case "÷":
            return (firstNumber / secondNumber)
    }
}
function clear() {
    calculator.dataset.firstNumber = "";
    calculator.dataset.secondNumber = "";
    calculator.dataset.operator = "";
    currentScreen.innerText = "";
    previousScreen.innerText = "";
}