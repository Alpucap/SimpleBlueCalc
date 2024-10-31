
document.addEventListener("DOMContentLoaded", function(){
    const one = document.querySelector('.one');
    const two = document.querySelector('.two');
    const three = document.querySelector('.three');
    const four = document.querySelector('.four');
    const five = document.querySelector('.five');
    const six = document.querySelector('.six');
    const seven = document.querySelector('.seven');
    const eight = document.querySelector('.eight');
    const nine = document.querySelector('.nine');
    const zero = document.querySelector('.zero');

    const erase = document.querySelector('.erase');
    const addition = document.querySelector('.addition');
    const subtraction = document.querySelector('.subtraction');
    const multiplication = document.querySelector('.multiplication');
    const division = document.querySelector('.division');
    const modulus = document.querySelector('.modulus');
    const power = document.querySelector('.power');
    const equal = document.querySelector('.equal');

    let screen = document.querySelector('.screen');
    let expression = "";

    //fungsi umum yang ada di stack
    class calStack{
        constructor(){
            this.item = [];
        }
        push(e){
            this.item.push(e);
        }
        
        pop(){
            if (this.item.length == 0){
                console.log('Nothing in it')
            }
            return this.item.pop();
        }
        peek(){
            return this.item[this.item.length - 1];
        }
    }

    //memanggil object (stack)
    const stack = new calStack();

    //merubah infix to postfix (3 + 4 => 3 4 +)
    function infixToPostfix(infix){
        const precedence = {
            "^": 4, 
            "*": 3, 
            "/": 3, 
            "%": 3, 
            "+": 2, 
            "-": 2  
        };
        const output = [];
        const operatorStack = new calStack();

        infix.split(" ").forEach((token) => {
            if(!isNaN(token)){
                output.push(token);
            }
            else{
                while(
                    operatorStack.item.length && precendence[operatorStack.peek() >= precendence[token]]
                ) {
                    output.push(operatorStack.pop());
                }
                operatorStack.push(token);
            }
        });
        while(operatorStack.item.length){
            output.push(operatorStack.pop());
        }
        return output.join(" ")
    }

    function postfixevaluation(expression){
        const tokens = expression.trim().split(" ")

        tokens.forEach((token) => {
            if(!isNaN(token)){
                stack.push(parseFloat(token));
            }
            else{
                const b = stack.pop();
                const a = stack.pop();

                switch (token) {
                    case "+":
                        stack.push(a + b);
                        break;
                    case "-":
                        stack.push(a - b);
                        break;
                    case "*":
                        stack.push(a * b);
                        break;
                    case "/":
                        stack.push(a / b);
                        break;
                    case "%":
                        stack.push(a % b);
                        break;
                    case "^":
                        stack.push(a ** b);
                        break;
                    default:
                        throw new Error(`Invalid operator: ${token}`);
                }
            }
        });

        return stack.pop();
    }

    //Masukkin angkanya ke dalam expression
    function addToExpression(value){
        if(!isNaN(value)){
            expression += `${value}`;
        }
        else{
            expression += ` ${value} `;
        }
        updateScreen();
    }

    //update screen
    function updateScreen(){
        screen.textContent = expression;
    }

    //event handler
    one.addEventListener("click", () => addToExpression(1));
    two.addEventListener("click", () => addToExpression(2));
    three.addEventListener("click", () => addToExpression(3));
    four.addEventListener("click", () => addToExpression(4));
    five.addEventListener("click", () => addToExpression(5));
    six.addEventListener("click", () => addToExpression(6));
    seven.addEventListener("click", () => addToExpression(7));
    eight.addEventListener("click", () => addToExpression(8));
    nine.addEventListener("click", () => addToExpression(9));
    zero.addEventListener("click", () => addToExpression(0));

    addition.addEventListener("click", () => addToExpression("+"));
    subtraction.addEventListener("click", () => addToExpression("-"));
    multiplication.addEventListener("click", () => addToExpression("*"));
    division.addEventListener("click", () => addToExpression("/"));
    modulus.addEventListener("click", () => addToExpression("%"));
    power.addEventListener("click", () => addToExpression("^"));

    erase.addEventListener("click", () => {
        expression = "";
        updateScreen();
    });

    equal.addEventListener("click", () => {
        try {
            const postfixExpression = infixToPostfix(expression.trim());
            const result = postfixevaluation(postfixExpression);
            expression = `${result} `;
            updateScreen();
        } catch (error) {
            console.error(error.message);
            screen.textContent = "Error";
        }
    });
});