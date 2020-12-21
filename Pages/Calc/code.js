    const decimalBtn = document.getElementById('.');
    const clearBtn = document.getElementById('CE');
    const clearAllBtn = document.getElementById('C');
    const delBtn = document.getElementById('delete');
    const switchBtn = document.getElementById('|');
    let outputDisplay = document.getElementById('output');
    let historyDisplay = document.getElementById('history');
    const percentBtn = document.getElementById('%');
    const rootBtn = document.getElementById('root');
    const squared = document.getElementById('squared');
    const oneDivX = document.getElementById('1/x');

    const numBtns = document.getElementsByClassName('number');
    const operatorBtns = document.getElementsByClassName('operator');

    let output = 0;
    let evalArr = [];
    let historyArr = [];
    let caseCount = 0;
    let tempOutput = [];
    let addBool = true; 
    let font = 50;
    let isOverFlown = false;
    
    const updateDisplay = (clickedObj) => {
        var text = clickedObj.target.innerText;

        if(output == 0){
            output = '';
        }
        let len = (output + '').replace('.', '').length;
        if(len < 17){
            output += text;
            outputDisplay.innerText = output;
            fontSizeCheck();
        }
    }
    const caseDisplay = () =>{
        if(caseCount == 1){
            tempOutput = evalArr.join(' ');
            outputDisplay.innerText = eval(tempOutput);
            fontSizeCheck();
        }
        else{
            caseCount++;
        }
    }
    const addBoolCheck = (type) =>{
        if(addBool == false){
            historyTemp = type + "(" + historyTemp + ")";
            historyDisplay.innerText = historyArr + " " + historyTemp;
        }
        else{
            historyTemp = type + "(" + output + ")";
            historyDisplay.innerText =  historyArr + " " + historyTemp;
        }
    }

    const fontSizeCheck = () =>{
        element = outputDisplay;
        isOverFlown = isOverflown();

        if(isOverFlown == true){
            console.log(1);
            while (isOverFlown == true){
                font -= 1;
                outputDisplay.style.fontSize = font + "px";
                outputDisplay.innerText = output;
                isOverFlown = isOverflown();
            }
            return;
        }
        else if(!(font == 50)){
            console.log(2);
            while (isOverFlown == false && font < 52){
                font += 1;
                outputDisplay.style.fontSize = font + "px";
                outputDisplay.innerText = output;
                isOverFlown = isOverflown();
            }
            font -= 2;
            return;
        }
        else{
            return
        }
    }

    const isOverflown = () => { return outputDisplay.scrollHeight > outputDisplay.clientHeight || outputDisplay.scrollWidth > outputDisplay.clientWidth;}

    const calculateDisplay = (clickedObj) => {
        var text = clickedObj.target.innerText;
        evalArr.push(output);
        if(addBool == false){
            historyArr.push(historyTemp);
            addBool = true;
            historyTemp = '';
        }
        else{
            historyArr.push(output);
        }

        if(!(text == '=')){
            historyArr.push(text);
            historyDisplay.innerText = historyArr.join(' ');
            output = 0;
            outputDisplay.innerText = '0';
            switch(text){
                case '+':
                    caseDisplay();
                    evalArr.push('+');
                    break;
                
                case '-':
                    caseDisplay();
                    evalArr.push('-');
                    break;
                
                case '×':
                    caseDisplay();
                    evalArr.push('*');
                    break;

                case '÷':
                    caseDisplay();
                    evalArr.push('/');
                    break;
            }
        }
        else{
            evalArr = evalArr.join(' ');
            output = eval(evalArr);
            outputDisplay.innerText = output;
            fontSizeCheck();
            historyArr.push(text);
            historyArr = historyArr.join(' ');
            historyDisplay.innerText = historyArr;
            caseCount = 0;
            evalArr = [];
            historyArr = [];
        }

    }
    for(let i = 0; i < numBtns.length; i++){
        numBtns[i].addEventListener('click', updateDisplay, false);
    }
    for(let i = 0; i < operatorBtns.length; i++){
        operatorBtns[i].addEventListener('click', calculateDisplay, false);
    }

    oneDivX.addEventListener('click', () => {
        addBoolCheck('1/');
        output = 1/output;
        addBool = false;
        outputDisplay.innerText = output;
        fontSizeCheck();
    }, false )

    clearBtn.addEventListener('click', () => {
        output = '0';
        outputDisplay.innerText = output;
        addBool = true;
        font = 50;
        outputDisplay.style.fontSize = font + "px";
    }, false)

    percentBtn.addEventListener('click', () => {
        output = output / 100;
        outputDisplay.innerText = output;
        fontSizeCheck();
    }, false)

    rootBtn.addEventListener('click', () => {
        addBoolCheck('√');
        output = Math.sqrt(output);
        addBool = false;
        outputDisplay.innerText = output;
        fontSizeCheck();
    }, false)

    squared.addEventListener('click', () => {
        addBoolCheck('sqr');
        output = output * output;
        addBool = false;
        outputDisplay.innerText = output;
        fontSizeCheck();
    }, false)

    delBtn.addEventListener('click', () => {
        output = output.slice(0, output.length - 1);
        if(output == ''){
            output = '0';
        }
        outputDisplay.innerText = output;
        fontSizeCheck();
    }, false)

    switchBtn.addEventListener('click', () => {
        output = output - output*2;
        outputDisplay.innerText = output;
        fontSizeCheck();
    }, false)

    clearAllBtn.addEventListener('click', () => {
        output = 0;
        evalArr = [];
        historyArr = [];
        outputDisplay.innerText = '0';
        historyDisplay.innerText = '';
        historyTemp = '';
        addBool = true;
        font = 50;
        outputDisplay.style.fontSize = font + "px";
    }, false)

    decimalBtn.addEventListener('click', () => {
        if(!output.includes('.')){
            output += '.';
            outputDisplay.innerText = output;
        }
        fontSizeCheck();
    }, false)
