const screen = document.querySelector(".Screen");
const buttons = document.querySelectorAll("button");
const backspace = document.querySelector(".Clear");

buttons.forEach(button => {
    button.addEventListener('click',(e) => {
        userInput = e.target.textContent;
        operate(e);
    });
});
window.addEventListener('keydown',(e) => {
    specialKeys(e);
    operate(e);  
});

backspace.addEventListener('click',clear);

let userInput = '';
let firstNumber = '';
let secondNumber = '';
let operator = '';
let buttonsArr = [];
let bracketsArr = ['(',')'];
let b = 0;
const operators = ['+','-','x','÷','^','√','='];


function initialize(e) {
    screen.textContent = '';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    buttonsArr = [];
    //console.table(buttonsArr);
}

function specialKeys(e) {
    if (e.key === 'Shift') userInput = '';
    else if (e.key === 'Enter') userInput = '='
    else if (e.key === '*') userInput = 'x';
    else if (e.key === '/') userInput = '÷';
    else if ((/\d/g).test(e.key) || operators.includes(e.key)) userInput = e.key;
}

function clear(e) {
    if (secondNumber === '' && operator === '') {
        firstNumber=firstNumber.split('');
        firstNumber.pop();
        firstNumber = firstNumber.join('');
        buttonsArr[0] = firstNumber;
        console.log(buttonsArr[0+b])
    }
    else if (secondNumber === '' && operator !== '') {
        operator = '';
        buttonsArr.pop();
    }
    else if (secondNumber !== '') {
        secondNumber=secondNumber.split('');
        secondNumber.pop();
        secondNumber = secondNumber.join('');
        buttonsArr[2+b] = secondNumber;
    }
    screen.textContent = buttonsArr.join('');
}

function clearAll() {
    if (userInput === 'AC' || userInput === 'Escape') return true;
}


function longEquation(e) {
    if (result.toString().includes(".")) fixDecimals(e);
    //else if ()
    initialize(e);
    firstNumber = result;
    buttonsArr[0+b] = firstNumber;
    operator = userInput;
    buttonsArr.push(operator)
}

function fixDecimals(e) {
    let decimals = result.toString().split('.')[1];
    result = Number(result);
    if (decimals.length > 6) result = result.toFixed(4);
}

function brackets(e) {
    console.log(userInput)
    b = 1;
    if (userInput === '(') {
        if (firstNumber === '') buttonsArr[0] = userInput;
        else {
            buttonsArr[0] = userInput;
            bracketsArr.push(operator);
        } //buttonsArr.push(userInput);
    }
    else if (userInput === ')') buttonsArr.push(userInput);
    console.table(buttonsArr);
}

function userInputs(e) {
    console.log(userInput)
    
     if (userInput === 'Backspace' || userInput === 'Delete') clear(e);
    else if (clearAll(e)) {
        initialize(e)
        return;
    }
    else if (userInput === '√') {
        operator = userInput;
        buttonsArr.push(operator);
    }
    /* else if (userInput === '(') {
        brackets(e);
    } */
    else if (operator !== '' && userInput !== '=' 
    && !(clearAll(e)) && userInput !== 'Backspace'
    && !(isNaN(userInput)) && operator !== ''
    || userInput === '.' && operator !== ''
    || bracketsArr.includes(userInput) && operator !== '') {
        if (secondNumber.includes('.') && userInput === '.') return;
        else if (bracketsArr.includes(userInput)) brackets(e);
        else { 
            //console.log(operator)
            secondNumber += userInput;
            buttonsArr[2+b] = secondNumber;
        }
    }
    else if (!(isNaN(userInput)) || userInput === '.'  || userInput === '('  && operator === '' ) {
        if (bracketsArr.includes(userInput)) brackets(e);
        else if (firstNumber.includes('.') && userInput === '.') return;
        else { 
            firstNumber += userInput;
            buttonsArr[0+b] = firstNumber;
        } 
    }
    else if (userInput === '=' ) {
        if (secondNumber === '') return;
        else if (operator !== '=') {
            operator = userInput;
            buttonsArr.push(operator);
        }
        else if (operator === '='){
            initialize(e);
            firstNumber = result;
            buttonsArr[0+b] = firstNumber;
        }
        
    }
 
    else if (userInput !== 'Backspace' &&
    !(clearAll(e)) && operator === '') {
        operator = userInput;
        buttonsArr.push(operator);
        console.log(operator)
    }
    else if (userInput !== 'Backspace' && !(clearAll(e)) 
    && operators.includes(userInput) && operator !== '') {
        longEquation(e);
    }
}

let result = 0;


function operate(e) {
    userInputs(e);
    switch (operator) {
        case '+' :
            result = Number(firstNumber) + Number(secondNumber);
            break;
        case '-':
            if (firstNumber === '') {
                firstNumber = 0;

            }
            result = firstNumber - secondNumber;
            break;
        case 'x':
            result = firstNumber * secondNumber;
            break;
        case '÷':
            if (secondNumber == 0) result = 'Error';
            else result = firstNumber / secondNumber;
            break;
        case '^':
            if (firstNumber == 0 && secondNumber == 0) result = 'Error';
            else result = firstNumber ** secondNumber;
            break;
        case '√':
            result = Math.sqrt(secondNumber);
            break;
    }
    console.log(result);
    
    if (buttonsArr.includes("=")) {
        result = result.toString();
        if (result.includes(".")) fixDecimals(e);
        buttonsArr.push(result);
    } 
    console.table(buttonsArr);
    screen.textContent = buttonsArr.join('');
}
