let text = document.querySelector(".animateText").innerHTML;
document.querySelector(".animateText").innerHTML = "";
let textArray = [];
let intervalCounter = 0;
let speed = document.querySelector(".animateText").getAttribute("data-speed");

let backspeed = speed / 4;
let backward = false;

for (let i = 0; i < text.length; i++) {
    textArray[i] = text.substr(i, 1)
}

setInterval(() => {
    let currentText = document.querySelector(".animateText").innerHTML;
    console.log(currentText.length)
    if (backward == false) {

        if (intervalCounter >= textArray.length) {
            intervalCounter = 0;
            backward = true;
        } else {
            document.querySelector(".animateText").innerHTML += textArray[intervalCounter];
            intervalCounter++;
        }
    }


}, speed)

setInterval(() => {
    let currentText = document.querySelector(".animateText").innerHTML;

    if (backward == true) {
        if (currentText.length <= 0) {
            backward = false;
        } else {
            currentText = currentText.substr(0, text.length - intervalCounter)
            document.querySelector(".animateText").innerHTML = currentText;
            intervalCounter++;
        }
    }
}, backspeed)