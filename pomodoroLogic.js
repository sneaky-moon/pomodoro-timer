const secondsInAMinute = 60;
//set time in minutes of your desired session+break here
const minutesDesired = 50;
const minutesDesiredBreak = 10;

const pomodoroDuration = minutesDesired * secondsInAMinute;
const pomodoroBreakDuration = minutesDesiredBreak * secondsInAMinute;

let interval;
let currentTime;
let isPaused = false;
let sessionStartedFresh = false;
let currentDuration;

let display;
let displayBreak;
let text;

function clickStartPomodoroTimer() {
    if (!sessionStartedFresh) {
        if(isPaused){
            startTimer(currentDuration, display);
            isPaused = false;
        }
        else
        {
            startTimer(pomodoroDuration, display);
        }
        sessionStartedFresh = true;
        text.innerHTML = "PAUSE";
    }
    else
    {
        isPaused = true;
        clearInterval(interval);
        currentDuration = currentTime;
        text.innerHTML = "START";
        sessionStartedFresh = false;
    }
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = minutes + ":" + seconds;
        
        timer--;
        currentTime = timer;
        if (timer < 0) {
            clearInterval(interval);
            document.getElementById('pomodoro-beep').play();
            text.innerHTML = "COMPLETE";
        }
    }, 1000);
}

function resetTimer() {
    var display = document.getElementById("time");
    clearInterval(interval);
    isPaused = false;
    sessionStartedFresh = false;
    text.innerHTML = "START";
    setTimerDisplay();
}

function setTimerDisplay() {
    var timer = pomodoroDuration, minutes, seconds;
    var breakTimer = pomodoroBreakDuration, minutes, seconds;

    if (display != null) {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = minutes + ":" + seconds;
    }
    else {
        minutes = parseInt(breakTimer / 60, 10)
        seconds = parseInt(breakTimer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        displayBreak.innerHTML = minutes + ":" + seconds;
    }
}

function clickStartPomodoroBreakTimer() {
    if (!sessionStartedFresh) {
        if(isPaused){
            startBreakTimer(currentDuration, displayBreak);
            isPaused = false;
        }
        else
        {
            startBreakTimer(pomodoroBreakDuration, displayBreak);
        }
        sessionStartedFresh = true;
        text.innerHTML = "PAUSE";
    }
    else
    {
        isPaused = true;
        clearInterval(interval);
        currentDuration = currentTime;
        text.innerHTML = "START";
        sessionStartedFresh = false;
    }
}

function startBreakTimer(duration, displayBreak) {
    var timer = duration, minutes, seconds;
    interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        displayBreak.innerHTML = minutes + ":" + seconds;
        
        timer--;
        currentTime = timer;
        if (timer < 0) {
            clearInterval(interval);
            document.getElementById('pomodoro-beep-break').play();
            text.innerHTML = "COMPLETE";
        }
    }, 1000);
}

window.addEventListener('load', (event) => {
    display = document.getElementById("time");
    displayBreak = document.getElementById("break-time");
    text = document.getElementById("start-pause");
    
    setTimerDisplay();
});