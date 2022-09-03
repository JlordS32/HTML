// this file was purposely made to do debugs

let textbox = document.getElementById("calcTxtBoxID");

let numberButtons = Array.from(document.getElementsByClassName("justAButton"));

let someButtons = document.getElementById("1");

someButtons.addEventListener('click', () => {

});

let count = 0;
numberButtons.map( x => {
    x.addEventListener('click', (e) => {
        switch(e.target.innerText){
            case "*":
                textbox.value += "*";
                break
            case "+":
                textbox.value += "+";
                break;
            case "/":
                textbox.value += "/";
                break;
            case "-":
                textbox.value += "-";
                break;
            case ".":
                textbox.value += ".";
                break;
            case "=":
                textbox.value = eval(textbox.value);
                break;
            case "AC":
                textbox.value = "";
                break;
            default:
                textbox.value += e.target.innerText;
        };
    });
});