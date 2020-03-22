import {evaluateInput} from './evaluate.js';
import { evaluate } from "./evaluate";

const container = document.getElementById('container');

const inputBtns = [...container.getElementsByTagName('button')].filter(btn => {
    return (/^[+\d-*/.()=]$/).test(btn.textContent);
});

let [cache, input] = [...document.getElementById('screen').getElementsByTagName('*')]
const calculator = {input: []}

inputBtns.forEach(btn=>{
    btn.addEventListener('click', () => handleInput(btn.textContent))
})

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
            result = (num1 === 0 && num2 === 0 )?'Not defined yet': num1 / num2;
            break;
        
        default:
            break;
    }

    return result;
}

function updateCache() {
    cache.textContent = calculator.input.join('');
}

function clearScreen(){
    input.textContent = ''
}

function clearInput(){
    calculator.input = [];
}

function clearAll() {
    clearInput();
    clearScreen();
}


const inputFlags = {decimal: false, bracketsOpen: 0, operator: false,}
const isOperator = key => (/\+|-|\*|\//).test(key);
const isNumber = key => (/^\d*[.]?\d+$/).test(key);

function handleInput(key){
    console.log(key);
    const currentText = input.textContent;
    if((/[\d]/).test(key)) {
        if(isOperator(currentText)){
            calculator.input.push(currentText)
            updateCache();
            clearScreen();
            inputFlags['decimal'] = false;
        }
        input.textContent += key;
    } else if (isOperator(key)) {
        // is Number? => push
        if (isNumber(currentText)){
            
            calculator.input.push(currentText);
            updateCache();
            input.textContent = key;
        } else if (isOperator) {
            input.textContent = key;
            
        }
    } else if((/[,.]/).test(key)) {
        console.log('period');
        input.textContent += (!inputFlags.decimal)? key : '';
        inputFlags['decimal'] = true;
    } else {
        switch (key) {
               
            case 'Enter':
            case '=':
                if(isNumber(currentText) ){
                    calculator.input.push(input.textContent);
                    clearScreen()
                    updateCache()
                    cache.textContent += ' = ';}
                    input.textContent = evaluateInput(calculator.input)
                break;
    
            case 'Backspace':
            case 'DEL':
                
                if(currentText.length > 0){
                    input.textContent = currentText.slice(0, text.length-1);
                     currenText = input.textContent;
                     input.textContent = (currentText=='' && 0 != calculator.input.length )? 
                        calculator.input.pop() : input.textContent;
                        updateCache()
                    }
                break;
            case 'Delete':
            case 'C':    
                clearAll()
                break;
            
            case 'CE':    
                clearScreen()
                break;
        
            default:
                break;
        }
    }
}

document.addEventListener('keydown', (e) => handleInput(e.key));