let element = document.querySelector(".animateText");
let text = element.innerHTML;
let arrayText = element.getAttribute("data-textarray");

let delayTime = element.getAttribute("data-textPauseFor");

if (delayTime == 0 || null || undefined) {
    delayTime = 0;
}

if (arrayText != null) {
    arrayText = arrayText.split(",");
}
let textArray = [];
let intervalCounter = 0;
let speed = element.getAttribute("data-speed");
let backspeed = speed / 3;
let backward = false;

let backwardDelay = 1;
let repeatCounter = 1;
textLoopCounter = 0;
let repeatLast = true;

let coreFunction = (arrayOfText) => {

    let coreFunctionArrayLooper = (textLoopCounter) => {
        textArray = [];
        text = arrayText[textLoopCounter];
        let forwardInstance = 0;
        let backwardInstace;
        let repeatCounter = 1;

        for (let i = 0; i < text.length; i++) {
            textArray[i] = text.substr(i, 1)
        }

        let forwardInterval = setInterval(() => {

            if (backward == false) {
                let currentText = arrayText[textLoopCounter];

                if (intervalCounter >= textArray.length) {
                    intervalCounter = 0;

                    backward = true;


                    clearInterval(forwardInterval);

                } else {
                    document.querySelector(".animateText").innerHTML += textArray[intervalCounter];
                    intervalCounter++;
                }
            }

        }, speed)

        let backwardInterval = setInterval(() => {
                if (backward == true) {
                    if (backwardDelay > delayTime) {
                        let currentText = document.querySelector(".animateText").innerHTML;
                        if (currentText <= 0) {
                            backward = false;
                            currentText = "";

                            console.log(backward);

                            clearInterval(backwardInterval)
                        } else {
                            currentText = currentText.substr(0, text.length - intervalCounter)
                            document.querySelector(".animateText").innerHTML = currentText;
                            intervalCounter++;
                        }
                    } else {
                        backwardDelay++;
                        console.log(backwardDelay)
                    }
                }
            },
            backspeed)
    }


    document.querySelector(".animateText").innerHTML = "";

    if (!arrayText) {
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

    } else {

        coreFunctionArrayLooper(textLoopCounter);

        setInterval(() => {
            if (backward == false) {
                console.log("he")
                backwardDelay = 0;
                if (repeatCounter == 2) {
                    textLoopCounter++;
                    if (textLoopCounter == arrayText.length) {
                        textLoopCounter = 0;
                    }
                }

                coreFunctionArrayLooper(textLoopCounter);
                if (repeatCounter == 3) {
                    repeatCounter = 1;
                }
                repeatCounter++;
            }
        }, 5 * speed)
    }
}

// delay executer
if (!element.getAttribute("data-startDelay")) {
    coreFunction();
} else {


    let delayFunction = (fn) => {
        let delaytext
        let delayElem = element.getAttribute("data-startDelay");
        delaytext = 0;

        for (let i = 0; i < delayElem.length - 1; i++) {
            delaytext += delayElem.substr(i, 1);
        }

        delaytext = (delaytext - 1) * 1000;

        setTimeout(() => {
            fn();
        }, delaytext)
    }

    delayFunction(coreFunction)
}