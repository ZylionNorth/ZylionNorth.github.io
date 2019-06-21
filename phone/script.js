
function phoneFormat(number) {
    number = number.toString().padStart(10, "0");
    let number1 = number.slice(0, 3);
    let number2 = number.slice(3, 6);
    let number3 = number.slice(6, 10);
    return `(${number1}) ${number2}-${number3}`;
}

function phoneUnformat(formatted) {
    formatted = formatted.replace(/\(/g, "");
    formatted = formatted.replace(/\)/g, "");
    formatted = formatted.replace(/ /g, "");
    formatted = formatted.replace(/-/g, "");
    return parseInt(formatted);
}

function disablePhone() {
    let methodsDiv = document.getElementById("methods");
    for (let div of methodsDiv.getElementsByTagName("div")) {
        if (div.id.startsWith("method-")) {
            div.setAttribute("style", "display: none;");
        }
    }
}

function enablePhone(method) {
    disablePhone();
    let methodDiv = document.getElementById(`method-${method}`);
    methodDiv.setAttribute("style", "display: block;");
}

function updateMethods() {
    hideRun();
    let methods = document.getElementById("method-select");
    if (methods.value == 0) {
        disablePhone();
        hideSubmit();
    } else {
        enablePhone(methods.value);
        showSubmit();
    }
}

function hideRun() {
    document.getElementById("run").setAttribute("style", "display: none;");
}

function showRun() {
    document.getElementById("run").setAttribute("style", "display: block;");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    console.log(position.coords.latitude + ", " + position.coords.longitude);
}

function hideSubmit() {
    document.getElementById("submit-button").setAttribute("style", "display: none;");
}

function showSubmit() {
    document.getElementById("submit-button").setAttribute("style", "display: block;");
}

function populateSelects() {
    let option;
    for (let select of document.getElementsByClassName("three-digits")) {
        for (let i = 0; i < 1000; i++) {
            option = document.createElement("option");
            option.innerHTML = i.toString().padStart(3, "0");
            select.appendChild(option);
        }
    }
    for (let select of document.getElementsByClassName("four-digits")) {
        for (let i = 0; i < 10000; i++) {
            option = document.createElement("option");
            option.innerHTML = i.toString().padStart(4, "0");
            select.appendChild(option);
        }
    }
}

function updateSlider() {
    let sliderValue = document.getElementById("slider").value;
    let formattedValue = phoneFormat(sliderValue);
    document.getElementById("slider-label").innerHTML = formattedValue;
}

function incrementNumber() {
    let numberPlus = document.getElementById("number-plus");
    let value = phoneUnformat(numberPlus.value);
    numberPlus.value = phoneFormat(value + 1);
}

function updateRandom() {
    let value = Math.floor(Math.random() * 10000000000);
    document.getElementById("random-number").value = phoneFormat(value);
}

function main () {
    populateSelects();
    updateRandom();
}

window.addEventListener("load", main);
