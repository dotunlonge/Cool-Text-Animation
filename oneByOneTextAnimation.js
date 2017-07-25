let element = document.querySelector(".animateText");
let text = element.innerHTML;
let arrayText = document.querySelector(".animateText").getAttribute("data-textarray");

let textArray = [];
let intervalCounter = 0;
let speed = element.getAttribute("data-speed");
let backspeed = speed / 4;
let backward = false;

let coreFunction = () => {
    document.querySelector(".animateText").innerHTML = "";
    for (let i = 0; i < text.length; i++) {
        textArray[i] = text.substr(i, 1)
    }

    setInterval(() => {
        let currentText = document.querySelector(".animateText").innerHTML;
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
}

if (!element.getAttribute("data-delay")) {
    coreFunction();
} else {


    let delay = (fn) => {
        let delaytext
        let delayElem = element.getAttribute("data-delay");
        delaytext = 0;

        for (let i = 0; i < delayElem.length - 1; i++) {
            delaytext += delayElem.substr(i, 1);
        }

        delaytext = delaytext * 1000;
        console.log(delaytext)
        setTimeout(() => {
            fn();
        }, delaytext)
    }

    delay(function() {
        coreFunction();
    })
}