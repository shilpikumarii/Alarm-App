let alarmTime = null;
let alarmTimeout = null;
const alarmSound = new Audio(); // Create an empty Audio object

document.getElementById('setAlarm').addEventListener('click', () => {
    const time = document.getElementById('alarmTime').value;
    const selectedSound = document.getElementById('alarmSoundSelect').value;

    if (!time) {
        alert('Please select a valid time.');
        return;
    }

    alarmTime = time;
    document.getElementById('status').textContent = `Alarm set for ${time}`;
    document.getElementById('stopAlarm').disabled = false;
    
    startAlarm(selectedSound);
});

document.getElementById('stopAlarm').addEventListener('click', () => {
    stopAlarm();
});

function startAlarm(soundFile) {
    const now = new Date();
    const [alarmHour, alarmMinute] = alarmTime.split(":").map(Number);

    const alarmDate = new Date();
    alarmDate.setHours(alarmHour, alarmMinute, 0, 0);

    if (alarmDate < now) {
        alarmDate.setDate(alarmDate.getDate() + 1); // Set for next day if time has passed
    }

    const timeDifference = alarmDate - now;

    alarmTimeout = setTimeout(() => {
        alarmSound.src = soundFile; // Assign sound file
        alarmSound.play();
        alarmSound.loop = true;
        document.getElementById('status').textContent = 'Alarm is ringing!';
        navigator.vibrate([500, 500, 500]); // Vibrate for 1.5 seconds
    }, timeDifference);
}

function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    clearTimeout(alarmTimeout);
    document.getElementById('status').textContent = 'Alarm stopped.';
    document.getElementById('stopAlarm').disabled = true;
}
