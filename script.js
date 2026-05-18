// Get display element
let display = document.getElementById('display');

// Get all buttons
let buttons = document.querySelectorAll('.btn');

// Variables
let currentInput = '';
let operator = '';
let previousInput = '';

// Add click event to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        let value = button.innerText;
        
        if (button.classList.contains('number')) {
            handleNumber(value);
        } 
        else if (button.classList.contains('operator')) {
            handleOperator(value);
        }
        else if (button.classList.contains('clear')) {
            clearAll();
        }
        else if (button.classList.contains('delete')) {
            deleteLast();
        }
        else if (button.classList.contains('equals')) {
            calculate();
        }
        
        updateDisplay();
    });
});

function handleNumber(num) {
    if (num === '.' && currentInput.includes('.')) return;
    currentInput += num;
}

function handleOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;
    
    let prev = parseFloat(previousInput);
    let curr = parseFloat(currentInput);
    let result;
    
    switch(operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '×':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                alert('Cannot divide by zero!');
                clearAll();
                return;
            }
            result = prev / curr;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operator = '';
    previousInput = '';
}

function clearAll() {
    currentInput = '';
    operator = '';
    previousInput = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
}

function updateDisplay() {
    if (currentInput === '') {
        display.value = '0';
    } else {
        display.value = currentInput;
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
    if (e.key === '.') handleNumber('.');
    if (e.key === '+') handleOperator('+');
    if (e.key === '-') handleOperator('-');
    if (e.key === '*') handleOperator('×');
    if (e.key === '/') handleOperator('/');
    if (e.key === 'Enter') calculate();
    if (e.key === 'Escape') clearAll();
    if (e.key === 'Backspace') deleteLast();
    updateDisplay();
});