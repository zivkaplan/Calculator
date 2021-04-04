const calculator = document.querySelector(".calculator")
const previousScreen = calculator.querySelector(".previous")
const currentScreen = calculator.querySelector(".current")
const one = document.querySelector(".one")
const two = document.querySelector(".two")
const three = document.querySelector(".three")
const four = document.querySelector(".four")
const five = document.querySelector(".five")
const six = document.querySelector(".six")
const seven = document.querySelector(".seven")
const eight = document.querySelector(".eight")
const nine = document.querySelector(".nine")
const zero = document.querySelector(".zero")
const addBtn = document.querySelector(".add")
const substractBtn = document.querySelector(".substract")
const multiplyBtn = document.querySelector(".multiply")
const divideBtn = document.querySelector(".divide")
const equalsBtn = document.querySelector(".equals")
const backspaceBtn = document.querySelector(".backspace")
const clearBtn = document.querySelector(".clear")



window.addEventListener("keyup", (event) => {
    if (!event.shiftKey) {
        if (event.keyCode === 48) btnClick(zero)
        if (event.keyCode === 49) btnClick(one)
        if (event.keyCode === 50) btnClick(two)
        if (event.keyCode === 51) btnClick(three)
        if (event.keyCode === 52) btnClick(four)
        if (event.keyCode === 53) btnClick(five)
        if (event.keyCode === 54) btnClick(six)
        if (event.keyCode === 55) btnClick(seven)
        if (event.keyCode === 56) btnClick(eight)
        if (event.keyCode === 57) btnClick(nine)
        if (event.keyCode === 61 || event.keyCode === 13) btnClick(equalsBtn)
        if (event.keyCode === 173) btnClick(substractBtn)
        if (event.keyCode === 220) btnClick(divideBtn)
        if (event.keyCode === 8) btnClick(backspaceBtn)
    }
    else {
        if (event.keyCode === 67) btnClick(clearBtn)
        if (event.keyCode === 61) btnClick(addBtn)
        if (event.keyCode === 56) btnClick(multiplyBtn)
        if (event.keyCode === 57) btnClick(nine)
    }

    async function btnClick(btn) {
        btn.classList.toggle("jsClick")
        btn.click();
        await setTimeout(() => btn.classList.toggle("jsClick"), 150)
    }
})

calculator.addEventListener('click', (event) => {
    if (!event.target.closest('button')) return

    const keyValue = event.target.id;
    const { type } = event.target.dataset;
    const { previousKeyType } = calculator.dataset;

    if (type === 'number') {
        if (!calculator.dataset.operator) {
            if (previousKeyType === 'equals') clear();
            if (!calculator.dataset.firstNumber) calculator.dataset.firstNumber = keyValue;
            else { calculator.dataset.firstNumber += keyValue }
        } else {
            if (!calculator.dataset.secondNumber) calculator.dataset.secondNumber = keyValue;
            else { calculator.dataset.secondNumber += keyValue }
        }
    }
    if (type === 'operator') {
        if (!calculator.dataset.firstNumber) return;
        if (!calculator.dataset.secondNumber || calculator.dataset.secondNumber.length < 1) {
            calculator.dataset.operator = keyValue;
        } else if (previousKeyType === "number") {
            calculator.dataset.firstNumber = calculate();
            calculator.dataset.operator = keyValue;
        }
    }

    if (type === 'clear') {
        clear();
    }

    if (type === 'backspace') {
        if (!calculator.dataset.firstNumber) return
        else {
            if (calculator.dataset.operator) {
                if (calculator.dataset.secondNumber) calculator.dataset.secondNumber = calculator.dataset.secondNumber.slice(0, -1);
            }
            else { calculator.dataset.firstNumber = calculator.dataset.firstNumber.slice(0, -1); }
        }
    }

    if (type === 'equals') {
        if (!calculator.dataset.secondNumber) return
        else { calculator.dataset.firstNumber = calculate() }
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

function calculate() {
    const { firstNumber, operator, secondNumber } = calculator.dataset;
    clear();
    return operate(parseFloat(firstNumber), operator, parseFloat(secondNumber));

}