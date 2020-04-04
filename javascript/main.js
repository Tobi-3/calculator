
// DOM elements
const container = document.getElementById('container');
const inputBtns = [...container.getElementsByTagName('button')];
const screen = document.getElementById('screen')
let [resultScreen, lowerScreen] = [...screen.getElementsByTagName('*')]
wildCardBtn = document.getElementById('smile');

//event listeners
    inputBtns.forEach(btn=>{
        btn.addEventListener('click', () => handleInput(btn.textContent))
    })

wildCardBtn.addEventListener('click' ,() => {
    const color1 = Math.floor(Math.random() * 256**3);
    const color2 = Math.floor(Math.random() * 256**3);
    screen.style.color = `#${color1.toString(16)}`;
    screen.style.backgroundColor = `#${color2.toString(16)}c9`;
});

document.addEventListener('keydown', (e) => handleInput(e.key));

const calculator = {
    expressionParts: [], 
    parenthesesCount: 0,
    currentItem: '',
    lastInput: () => {
        return calculator.expressionParts[calculator.expressionParts.length-1];
    },
    pushInput: (input) => {
        calculator.expressionParts.push(input); 
        inputFlags.decimal = false;
        calculator.currentItem = '';

        console.log('input:', calculator.expressionParts,);
    },
}

const inputFlags = {
    decimal: false, 
    anyParenOpen: false,
}

const isOperator = key => (/^[+*\-/%]$/g).test(key);
const isNumber = key => (/^-?\d*[.]?\d+$/).test(key);
const isDigit =  key => (/^[\d]$/).test(key);


function handleInput(key){
    
    const inputLength = lowerScreen.textContent.length;
    const lastInputChar = (inputLength > 0)? lowerScreen.textContent[inputLength-1]:lowerScreen.textContent;
    
    let text = lowerScreen.textContent;
    switch (lastInputChar) {
        case '':
        case '(':
            switch (key) {

                case ',':case '.':
                    if(!inputFlags.decimal) {
                        text += '.';
                        inputFlags.decimal = true;
                        calculator.currentItem += '.';
                    }
                    break;

                case '(':
                    inputFlags.anyParenOpen = true;
                    calculator.pushInput(key);
                    calculator.parenthesesCount++;
                    text += key;
                    break
            }
            if((/^[-\d]$/).test(key)){ //if a '-' or a digit were pressed build a number
                calculator.currentItem += key;
                text += key; 
            }
            break;
    
        case '+':case '-':case '/':case '*':case '%':
            switch (key) {
                case ',':
                case '.':
                    if(!inputFlags.decimal) {
                        text += '.';
                        calculator.currentItem += '.';
                        inputFlags.decimal = true;
                    }
                    break;
                    
                case '(':
                    calculator.parenthesesCount++;
                    inputFlags.anyParenOpen = true;
                    calculator.pushInput((calculator.currentItem === '-')?calculator.currentItem + key:key)
                    text += key;
                    break;
            }
            if(isDigit(key)){
                calculator.currentItem += key;
                text += key; 
            }
            break;
            
        case ')': 
            if(isOperator(key)) {
                calculator.pushInput(key)
                text += key;
            } else if(key === ')' && inputFlags.anyParenOpen) {
                calculator.pushInput(key);
                calculator.parenthesesCount--;
                if (calculator.parenthesesCount===0) {
                    inputFlags.anyParenOpen = false;
                }
                text += key;
             }
            break;

        case '.':case ',': 
            if(isDigit(key)) {
                calculator.currentItem += key;
                text += key;
            }
            break;
    }

    if(isDigit(lastInputChar)) {
        switch (key) {
            case ',':
            case '.':
                if(!inputFlags.decimal) {
                    calculator.currentItem += '.'
                    text += '.';
                    inputFlags.decimal = true;
                }
                break;

            case '+':case '-':case '/':case '*':case '%':
                calculator.pushInput(Number(calculator.currentItem));
                calculator.pushInput(key);
                text += key;
                
                break;
            case ')':   
                if(calculator.parenthesesCount > 0){
                    calculator.pushInput(Number(calculator.currentItem));
                    calculator.pushInput(key);

                    calculator.parenthesesCount--;
                    if(calculator.parenthesesCount === 0){
                        inputFlags.anyParenOpen = false;
                    }
                
                text += key;
                }
            
        }
        if (isDigit(key)) {
            calculator.currentItem += key;
            text += key;
        }
    }

    lowerScreen.textContent = text;

    switch (key) {
            
        case '=':
        case 'Enter':
            if(!inputFlags.anyParenOpen && (isDigit(lastInputChar)|| lastInputChar == ')') && lowerScreen.textContent!=''){
                if(isDigit(lastInputChar) && calculator.currentItem !== '') {
                    calculator.pushInput(Number(calculator.currentItem));
                }
                
                let output = evaluateInput(calculator.expressionParts);
                const decimals = 6;
                // round number to at most "decimals" decimals
                output = (isNaN(output))? output : Math.round(output * 10**decimals) / 10**decimals;
                resultScreen.textContent = `${lowerScreen.textContent} = ${output}`;
                calculator.expressionParts = [];
                calculator.currentItem = `${output}`;
                lowerScreen.textContent = output;
                if((/\./).test(calculator.currentItem)) inputFlags.decimal=true;
            }
            break;

        case 'Delete':
        case 'C':
                clearAll();

        case 'Backspace':
        case 'DEL':
            // TODO if-else neccessary?
            if(lowerScreen.textContent.length > 1){
                deleteLastInput();
            } else {
                clearAll() 
            }
            
            
            default:
            break;
        }
    }
    
    
function deleteLastInput() {

    if (calculator.currentItem.length > 0) {
        if ((/^[.,]$/).test(calculator.currentItem[calculator.currentItem.length-1])) {
            inputFlags.decimal = false;
        }
        calculator.currentItem = calculator.currentItem.substr(0, calculator.currentItem.length-1);
    } else {
        const lastInput = calculator.lastInput();
        
            switch(lastInput) {
                case '(': case '-(':
                    calculator.parenthesesCount--; 
                    if (calculator.parenthesesCount === 0) {
                        inputFlags.anyParenOpen = false;
                    }
                    if (lastInput[0]=='-') {
                        calculator.currentItem = '-';
                    }
                    calculator.expressionParts.pop();
                    break;
    
                case ')': 
                    calculator.parenthesesCount++;
                    inputFlags.anyParenOpen = true;
                    calculator.expressionParts.pop();
                    if((/\./).test(`${calculator.lastInput()}`)) inputFlags.decimal=true;
                    break;
            }
            if(typeof(lastInput)=== 'number'){
                calculator.expressionParts.pop();
                calculator.currentItem = `${lastInput}`.substr(0, `${lastInput}`.length-1);
                
            } else if (isOperator(lastInput)) { //if should be redundant but leaving in for now // TODO maybe remove? 
                calculator.expressionParts.pop();
                if((/\./).test(`${calculator.lastInput()}`)) inputFlags.decimal=true;
                console.log('true?', inputFlags.decimal);
            }
            console.log('lastInput:', lastInput);
    }

    console.log('calc:', calculator, 'flags:', inputFlags);
    lowerScreen.textContent = lowerScreen.textContent.slice(0, lowerScreen.textContent.length-1);
}


function clearScreen(){
    lowerScreen.textContent = '';
}

function clearAll() {
    calculator.expressionParts = [];
    calculator.expressionParts = [];
    calculator.currentItem = '';
    inputFlags.decimal = false;
    inputFlags.anyParenOpen = false;
    calculator.parenthesesCount = 0;
    resultScreen.textContent = '';
    clearScreen();
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
    // evaluate all parenthesized subexpressions
    let inputCopy = input;
    while(inputCopy.find(element => (/\(/).test(element))) {
        let i=0;
        inputCopy = evalNextParenthesizedExpression(inputCopy);
        console.log('this is:', (++i), 'and input:', inputCopy);
    }
    
    if (inputCopy.length === 1) {
        return inputCopy[0];
    } 
    // choose last used operator in input as location to split 
    // the expression in two parts
    let lastOperator = inputCopy[inputCopy.length-2];
    let splittingIndex = inputCopy.length-2;
    console.log('operator:', lastOperator, 'index:', splittingIndex)

    // if there's "-" pr "+" change location to split to it
    for (let index = inputCopy.length; index > 0; index--) {
        if ((/^[-+]$/).test(inputCopy[index])) {
            splittingIndex = index;
            lastOperator = inputCopy[index];
            break;
        }
    }
    console.log('operator:', lastOperator, 'index:', splittingIndex)
    const lefthandExpr = inputCopy.slice(0, splittingIndex);
    const righthandExpr = inputCopy.slice(splittingIndex+1);
    console.log('left', lefthandExpr, 'right', righthandExpr);  
    
    const result = operate(lastOperator, evaluateInput(lefthandExpr), evaluateInput(righthandExpr));
    console.log(result);
    return result;
}

/**  
 *  search for parenthesized expression in array
 * return the arry with the evaluated subexpression
 */
function evalNextParenthesizedExpression(expr){
    //find first and last index of subexpression
    let subexprStart = expr.indexOf(expr.find(element => (/^-?\($/).test(element)));
    let subexprEnd;
    let bracketCount = 1;
    for (let index = subexprStart+1; index < expr.length; index++) {
        if ((/\(/).test(expr[index])){
            bracketCount++;
        } else if(expr[index]===')') {
            bracketCount--;
            if (bracketCount===0) {
                subexprEnd = index;
                break;
            }
        }        
    }

    //split array in it's parts with evaluated subexpr;
    const negative = expr[subexprStart][0] === '-';
    const subexpr = expr.slice(subexprStart+1, subexprEnd)   
    console.log('the subexpression...', subexpr);
    const returnValue = [...expr.slice(0, subexprStart), 
        (negative)?(operate('*', -1, evaluateInput(subexpr))):evaluateInput(subexpr), 
        ...expr.slice(subexprEnd+1) ];
    console.log('the returnvAL...', returnValue);
    return returnValue;
    
}
