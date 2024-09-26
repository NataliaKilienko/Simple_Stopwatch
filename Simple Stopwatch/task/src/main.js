let timerInterval;
let startTime;
let elapsedTime = 0;
let running = false;

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateTimer() {
    const timePassed = Date.now() - startTime + elapsedTime;
    document.getElementById('timer').textContent = formatTime(timePassed);
}

document.body.querySelector('#start').innerText = "Start";
// document.getElementById('start').innerText = "Start";
document.getElementById('start').addEventListener('click', function() {
    if (!running) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 10);
        running = true;
    }
});

document.getElementById('stop').addEventListener('click', function() {
    if (running) {
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        running = false;
    }
});

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = "00:00:00";
    elapsedTime = 0;
    running = false;

    document.getElementById('laps').innerHTML = '';
});

document.getElementById('lap').addEventListener('click', function() {
    if (running) {
        const lapTime = document.getElementById('timer').textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        document.getElementById('laps').appendChild(lapItem);
    }
});
