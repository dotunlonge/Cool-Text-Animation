let text = document.querySelector(".animateText").innerHTML;
document.querySelector(".animateText").innerHTML = "";
let textArray = [];
let intervalCounter = 0;
let speed = document.querySelector(".animateText").getAttribute("data-speed");

for (let i = 0; i < text.length; i++) {
    textArray[i] = text.substr(i, 1)
}

let releaser = setInterval(() => {
    if (intervalCounter >= textArray.length) {
        intervalCounter = 0;
        document.querySelector(".animateText").innerHTML = "";
    } else {
        document.querySelector(".animateText").innerHTML += textArray[intervalCounter];
        intervalCounter++;
    }
}, speed)