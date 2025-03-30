// script.js
const alarmTimeInput = document.getElementById('alarm-time');
const alarmLabelInput = document.getElementById('alarm-label');
const alarmToneSelect = document.getElementById('alarm-tone');
const vibrationCheckbox = document.getElementById('vibration');
const setAlarmButton = document.getElementById('set-alarm');
const alarmsList = document.getElementById('alarms');
const snoozeButton = document.getElementById('snooze-button');
const alarmAudio = document.getElementById('alarm-audio');

let alarms = [];

// Set Alarm
setAlarmButton.addEventListener('click', () => {
  const time = alarmTimeInput.value;
  const label = alarmLabelInput.value || 'Alarm';
  const tone = alarmToneSelect.value;
  const vibration = vibrationCheckbox.checked;

  if (!time) {
    alert('Please set a time for the alarm.');
    return;
  }

  const alarm = {
    time,
    label,
    tone,
    vibration,
    active: true,
  };

  alarms.push(alarm);
  renderAlarms();
  alarmTimeInput.value = '';
  alarmLabelInput.value = '';
});

// Render Alarms
function renderAlarms() {
  alarmsList.innerHTML = '';
  alarms.forEach((alarm, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${alarm.label} - ${alarm.time}</span>
      <button onclick="deleteAlarm(${index})">Delete</button>
    `;
    alarmsList.appendChild(li);
  });
}

// Delete Alarm
function deleteAlarm(index) {
  alarms.splice(index, 1);
  renderAlarms();
}

// Check Alarms
function checkAlarms() {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);

  alarms.forEach((alarm) => {
    if (alarm.time === currentTime && alarm.active) {
      triggerAlarm(alarm);
    }
  });
}

// Trigger Alarm
function triggerAlarm(alarm) {
  alarmAudio.src = alarm.tone;
  alarmAudio.play();

  if (alarm.vibration) {
    navigator.vibrate([200, 100, 200]); // Vibrate pattern
  }

  snoozeButton.classList.remove('hidden');
  alarm.active = false; // Deactivate alarm after triggering
}

// Snooze Alarm
snoozeButton.addEventListener('click', () => {
  alarmAudio.pause();
  snoozeButton.classList.add('hidden');

  const now = new Date();
  const snoozeTime = new Date(now.getTime() + 5 * 60000); // 5 minutes
  const snoozeAlarm = {
    time: snoozeTime.toTimeString().slice(0, 5),
    label: 'Snooze',
    tone: alarmAudio.src,
    vibration: vibrationCheckbox.checked,
    active: true,
  };

  alarms.push(snoozeAlarm);
  renderAlarms();
});

// Check Alarms Every Second
setInterval(checkAlarms, 1000);