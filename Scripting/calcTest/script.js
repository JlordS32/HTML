let textbox = document.getElementById("calcTxtBoxID");

let numberButtons = Array.from(document.getElementsByClassName("calcButtons"));

let count = 0;
numberButtons.map( button => {
    button.addEventListener('click', (e) => {
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
                count++;
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