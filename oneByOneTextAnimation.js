let element = document.querySelector(".animateText");
let text = element.innerHTML;
let arrayText = document.querySelector(".animateText").getAttribute("data-textarray");
arrayText = arrayText.split(",");



let textArray = [];
let intervalCounter = 0;
let speed = element.getAttribute("data-speed");
let backspeed = speed / 4;
let backward = false;
let repeatCounter = 1;
textLoopCounter = 0;
let coreFunction = (arrayOfText) => {
        let coreFunctionArrayLooper = (textLoopCounter) => {
            textArray = [];
            text = arrayText[textLoopCounter];
            let forwardInstance;
            let backwardInstace;
            let repeatCounter = 1;

            for (let i = 0; i < text.length; i++) {
                textArray[i] = text.substr(i, 1)
            }
            console.log(textArray)
            let forwardInterval = setInterval(() => {
                if (backward == false) {
                    let currentText = arrayText[textLoopCounter];

                    if (intervalCounter >= textArray.length) {
                        intervalCounter = 0;
                        backward = true;
                        forwardInstance = "done";
                        clearInterval(forwardInterval)
                    } else {
                        document.querySelector(".animateText").innerHTML += textArray[intervalCounter];
                        intervalCounter++;

                    }
                }
            }, speed)

            let backwardInterval = setInterval(() => {
                if (backward == true) {
                    let currentText = document.querySelector(".animateText").innerHTML;

                    if (currentText <= 0) {
                        backward = false;
                        backwardInstace = "done";
                        currentText = "";
                        clearInterval(backwardInterval)
                    } else {
                        currentText = currentText.substr(0, text.length - intervalCounter)
                        document.querySelector(".animateText").innerHTML = currentText;
                        intervalCounter++;
                    }
                }
            }, backspeed)

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


                console.log(repeatCounter)
                repeatCounter++;
            }, 10 * speed)
        }
    }
    // if (textLoopCounter % 1 == 0) {
    //     if (arrayText[textLoopCounter] != undefined) {
    //         text = arrayText[textLoopCounter];
    //     }
    //     for (let i = 0; i < text.length; i++) {
    //         textArray[i] = text.substr(i, 1)
    //     }
    // }





// delay executer
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

        setTimeout(() => {
            fn();
        }, delaytext)
    }

    delay(function() {
        coreFunction();
    })
}