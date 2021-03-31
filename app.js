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

function operate(num1, operator, num2) {
    if (!["+", "-", "*", "/"].includes(operator)) {
        console.log("invalid operator")
    }
    switch (operator) {
        case "+":
            return add(num1, num2)
        case "-":
            return subtract(num1, num2)
        case "*":
            return multiply(num1, num2)
        case "/":
            return divide(num1, num2)
    }
}
