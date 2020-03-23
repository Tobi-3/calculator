
// DOM elements
const container = document.getElementById('container');
const inputBtns = [...container.getElementsByTagName('button')];
const screen = document.getElementById('screen')
let [cache, input] = [...screen.getElementsByTagName('*')]
inputBtns.forEach(btn=>{
    btn.addEventListener('click', () => handleInput(btn.textContent))
})

wildCardBtn = document.getElementById('smile');
wildCardBtn.addEventListener('click' ,() => {
    const color1 = Math.floor(Math.random() * 256**3);
    const color2 = Math.floor(Math.random() * 256**3);
    screen.style.color = `#${color1.toString(16)}`;
    screen.style.backgroundColor = `#${color2.toString(16)}c9`;
});
document.addEventListener('keydown', (e) => handleInput(e.key));

const calculator = {input: []}


function updateCache() {
    cache.textContent = calculator.input.join('');
}

function clearScreen(){
    input.textContent = '';
}

function clearInput(){
    calculator.input = [];
}

function clearAll() {
    clearInput();
    clearScreen();
    updateCache()
}


const inputFlags = {
    decimal: false, 
    operator: false,
    newInput: false,
    bracketsOpen: 0, 
}
const isOperator = key => (/^[\+|-|\*|\/|%]$/).test(key);
const isNumber = key => (/^-?\d*[.]?\d+$/).test(key);

function handleInput(key){
    let currentText = input.textContent;
    if((/^[\d]$/).test(key)) {
        if(isOperator(currentText) && currentText != '-' ){
                calculator.input.push(currentText)
                updateCache();
                clearScreen();
                inputFlags['decimal'] = false;
        }
        input.textContent += key;
    } else if (isOperator(key)) {
        
        if (isNumber(currentText)){
            calculator.input.push(+currentText);
            updateCache();
            input.textContent = key;
        } else if(currentText === '' && key === '-'){
            input.textContent += key;
        } 
        
    } else if((/[,.]/).test(key)) {
        input.textContent += (!inputFlags.decimal)? '.' : '';
        inputFlags['decimal'] = true;
    } else {
        switch (key) {
               
            case '=':
            case 'Enter':
                if(isNumber(currentText)){
                    calculator.input.push(+currentText);
                    clearScreen()
                    updateCache()
                    cache.textContent += ' = ';
                    let output = evaluateInput(calculator.input);
                    const decimals = 1000000;
                    input.textContent = (isNaN(output))?output:Math.round(output * decimals) / decimals ;
                    calculator['input'] = [];
                }
                break;
    
            case 'Backspace':
            case 'DEL':
                
                if(currentText.length > 1){
                    input.textContent = currentText.slice(0, currentText.length-1);
                    
                } else {
                    clearScreen();
                    input.textContent = (0 != calculator.input.length )? 
                        calculator.input.pop() : input.textContent;
                    updateCache()
                }
                break;
            case 'Delete':
            case 'C':    
                clearAll()
                
                break;
        
            default:
                break;
        }
    }
}


function operate(op, num1, num2) {
    let result;
    
    switch (op) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            const zeroDividedBy0ErrText = ' 0/0 is Undefined';
            result = (num1 === 0 && num2 === 0 )? zeroDividedBy0ErrText: num1 / num2;
            break;
        
        case '%':
            result = num1 % num2;
            break;
        
        default:
            break;
    }

    return result;
}

function evaluateInput(input) {
    console.log(input);
    if(input.length ===1) {
        // parenthesized expression?
        if( (/\(/).test(input[0]) ){
            // remove outer brackets then evaluate
            return evaluateInput(input[0].slice(1,input.length-1))
        } 
        return input[0];
    }
    
    const lastOperator = input[input.length-2];
    const index = input.lastIndexOf(lastOperator);
    let operator;
    let left, right;
    
    // split input into it's binary expressions 
    // in such a way that it's evaluate left to right
    switch (lastOperator) {
        case '+':
        case '-': 
            operator = lastOperator;
            left = input.slice(0, index);
            right = input.slice(index+1);
            break;
        
        case '*':
        case '/': 
        case '%': 
            operator = lastOperator;
            left = input.slice(0, index);
            right = input.slice(index+1);

            break;
     
        default:
            console.log('not an operator: ' + lastOperator);
            break;
    }
    console.log(operate(lastOperator, evaluateInput(left), evaluateInput(right)));
    return operate(lastOperator, evaluateInput(left), evaluateInput(right));
}
