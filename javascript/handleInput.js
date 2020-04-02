// /* function handleInput(key){
    
//     const inputLength = input.textContent.length;
//     let currentChar = (inputLength > 0)? input.textContent[inputLength-1]:input.textContent;
//     console.log('cc:', currentChar, 'inL:', input.textContent[inputLength-1]);
    
//     let text = input.textContent;
//     switch (currentChar) {
//         case '':
//         case '(':
//             switch (key) {
//                 case ',':
//                 case '.':
//                     if(!inputFlags.decimal) {
//                         text += key;
//                         inputFlags['decimal'] = true;
//                     }
//                     break;
//                 case '(':
//                     calculator['parenthesesCount']++;
//                     text += key;
//                     break
//             }
//             if((/^[-\d]$/).test(key)){
//                 text += key; 
//             }
//             break;
    
//         case '+':
//         case '-':
//         case '/':
//         case '*':
//         case '%':
//             switch (key) {
//                 case ',':
//                 case '.':
//                     if(!inputFlags.decimal) {
//                         text += '.';
//                         inputFlags['decimal'] = true;
//                         inputFlags['decimal'] = true;
//                     }
//                     break;
//                 case '(':
//                     calculator['parenthesesCount']++;
//                     text += key;
//                     break
//             }
//             if(isDigit(key)){
//                 text += key; 
//             }
//             break;
            
//         case ')': 
//             if(isOperator(key)) {
//                text += key;
//             }

//             if(key === ')' && calculator.parenthesesCount > 0) {
//                 text += key;
//              }
//             break;

//         case '.': 
//             if(isDigit(key)) {
//                text += key;
//             }
//             break;
//     }

//     if(isDigit(currentChar)) {
//         switch (key) {
//             case ',':
//             case '.':
//                 if(!inputFlags.decimal) {
//                     text += '.';
//                     inputFlags['decimal'] = true;
//                 }
//                 break;

//             case '+':
//             case '-':
//             case '/':
//             case '*':
//             case '%':
                
//                 text += key;
//                 inputFlags['decimal'] = false;
                
//                 break;
//             case ')':   
//             if(calculator.parenthesesCount > 0){
//                 text += key;
                
//                 calculator['parenthesesCount']--;
//                 inputFlags['allParenthesisClosed'] = true;
//             }
//         }

//         if (isDigit(key) ) {
//             text += key;
//         }
//     }
//     // TODO changeModeTo(key) 
//     input.textContent = text;
// } */

// switch(calculator.lastInput()) {
// case '(': 
//     calculator['parenthesesCount']--; 
//     if (calculator.parenthesesCount === 0) {
//         inputFlags['anyParenOpen'] = false;
//     }
//     break;
// case ')': 
//     calculator['parenthesesCount']++;
//     inputFlags['anyParenOpen'] = true;
//     break;
// case '.': inputFlags['decimal'] = true; break}

function inputTest(input){
    console.log(input);
    input = 2;
    console.log(input);
}

inputTest('yeehaw');