"use strict";
let timers = [];
let intervals = new Map();
let timerElements = new Map();
let startTimer = (timerId) => {
    let display = timerElements.get(timerId);
    let duration = { "duration": parseInt(display.getAttribute("time")) };
    countdown(duration, display, timerId);
};
function countdown(duration, display, timerId) {
    let timer = duration.duration, minutes, seconds;
    let timeTick = () => {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            timer = duration;
        }
        display.setAttribute("time", timer);
    };
    timeTick();
    let intervalId = setInterval(timeTick, 1000);
    intervals.set(timerId, intervalId);
}
let resetTimer = (timerId) => {
    stopCountdown(timerId);
    let display = document.querySelector('#time' + timerId);
    display.textContent = "30:00";
    display.setAttribute("time", (30 * 60).toString());
};
function stopCountdown(timerId) {
    clearInterval(intervals.get(timerId));
}
let stopTimer = (timerId) => {
    stopCountdown(timerId);
};
let addTimer = () => {
    let el = document.createElement('tr');
    let nameInput = document.body.querySelector("#name");
    let name = nameInput.value;
    nameInput.value = "";
    let nameSpan = document.createElement('span');
    nameSpan.textContent = name;
    let time = document.createElement('span');
    let timerId = timers.length;
    time.textContent = "30:00";
    time.id = "time" + timers.length;
    time.setAttribute("timerId", timerId.toString());
    time.setAttribute("time", (60 * 30).toString());
    timers.push(timers.length);
    timerElements.set(timerId, time);
    let startButton = document.createElement('button');
    startButton.onclick = () => { startTimer(timerId); };
    startButton.textContent = "Start";
    let stopButton = document.createElement('button');
    stopButton.onclick = () => { stopTimer(timerId); };
    stopButton.textContent = "Stop";
    let resetButton = document.createElement('button');
    resetButton.onclick = () => { resetTimer(timerId); };
    resetButton.textContent = "Reset";
    let elements = [];
    elements.push(nameSpan);
    elements.push(startButton);
    elements.push(stopButton);
    elements.push(resetButton);
    elements.push(time);
    for (let i = 0; i < elements.length; i++) {
        const cell = document.createElement("td");
        cell.appendChild(elements[i]);
        el.appendChild(cell);
    }
    document.body.querySelector("table").appendChild(el);
};
