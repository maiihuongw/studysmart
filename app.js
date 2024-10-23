<<<<<<< HEAD
// Timer Functionality
let timer;
let timeLeft = 1500; // 25 minutes in seconds
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-timer');
const resetBtn = document.getElementById('reset-timer');

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            alert('Time is up!');
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 1500;
    isRunning = false;
    updateTimerDisplay();
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Study Plan Functionality
const goalInput = document.getElementById('goal-input');
const addGoalBtn = document.getElementById('add-goal');
const goalList = document.getElementById('goal-list');

function addGoal() {
    const goalText = goalInput.value;
    if (goalText === '') return;

    const li = document.createElement('li');
    li.textContent = goalText;
    goalList.appendChild(li);

    goalInput.value = '';
    saveGoals();
}

function saveGoals() {
    const goals = [];
    goalList.querySelectorAll('li').forEach(li => goals.push(li.textContent));
    localStorage.setItem('goals', JSON.stringify(goals));
}

function loadGoals() {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.forEach(goal => {
        const li = document.createElement('li');
        li.textContent = goal;
        goalList.appendChild(li);
    });
}

addGoalBtn.addEventListener('click', addGoal);
window.addEventListener('load', loadGoals);

// Reminder Functionality
const reminderTimeInput = document.getElementById('reminder-time');
const setReminderBtn = document.getElementById('set-reminder');

function setReminder() {
    const reminderTime = reminderTimeInput.value;
    if (reminderTime === '') return;

    const now = new Date();
    const [hours, minutes] = reminderTime.split(':').map(Number);
    const reminderDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

    const timeDifference = reminderDate - now;

    if (timeDifference > 0) {
        setTimeout(() => {
            alert('Time to study!');
        }, timeDifference);
    } else {
        alert('Please select a future time!');
    }
}

setReminderBtn.addEventListener('click', setReminder);

// Motivation Level
let motivationLevel = 0;
const motivationDisplay = document.getElementById('motivation-level');

function updateMotivation() {
    motivationLevel++;
    motivationDisplay.textContent = motivationLevel;
    localStorage.setItem('motivationLevel', motivationLevel);
}

function loadMotivation() {
    motivationLevel = parseInt(localStorage.getItem('motivationLevel')) || 0;
    motivationDisplay.textContent = motivationLevel;
}

window.addEventListener('load', loadMotivation);
let workTime = 1500; // 25 phút
let shortBreakTime = 300; // 5 phút
let longBreakTime = 900; // 15 phút
let cycles = 0; // Số vòng học đã hoàn thành

function startPomodoro() {
    if (isRunning) return;
    isRunning = true;

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;

            if (cycles === 4) {
                timeLeft = longBreakTime;
                alert('Take a long break!');
                cycles = 0;
            } else if (timeLeft === workTime) {
                timeLeft = shortBreakTime;
                alert('Take a short break!');
            } else {
                timeLeft = workTime;
                alert('Back to work!');
                cycles++;
            }
        }
    }, 1000);
}

startBtn.addEventListener('click', startPomodoro);
function saveStudyTime() {
    let currentDate = new Date().toLocaleDateString();
    let studyTime = JSON.parse(localStorage.getItem('studyTime')) || {};

    if (!studyTime[currentDate]) {
        studyTime[currentDate] = 0;
    }
    studyTime[currentDate] += (1500 - timeLeft); // Thời gian học trong phiên

    localStorage.setItem('studyTime', JSON.stringify(studyTime));
}

function getStudyStats() {
    let studyTime = JSON.parse(localStorage.getItem('studyTime')) || {};
    let totalMinutes = 0;

    for (let date in studyTime) {
        totalMinutes += studyTime[date];
    }
    return totalMinutes / 60; // Tổng số giờ học
}
function displayStudyChart() {
    let studyTime = JSON.parse(localStorage.getItem('studyTime')) || {};
    let dates = Object.keys(studyTime);
    let studyData = Object.values(studyTime);

    var ctx = document.getElementById('studyChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line', // Loại biểu đồ (line, bar, pie, etc.)
        data: {
            labels: dates, // Ngày học
            datasets: [{
                label: 'Study Time (minutes)',
                data: studyData,
                borderColor: '#6a994e',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

window.addEventListener('load', displayStudyChart);
const subtaskList = document.getElementById('subtask-list');
const addSubtaskBtn = document.getElementById('add-subtask');

function addSubtask() {
    const subtaskInput = prompt('Enter a subtask:');
    if (subtaskInput === '') return;

    const li = document.createElement('li');
    li.textContent = subtaskInput;
    subtaskList.appendChild(li);

    saveSubtasks();
}

function saveSubtasks() {
    const subtasks = [];
    subtaskList.querySelectorAll('li').forEach(li => subtasks.push(li.textContent));
    localStorage.setItem('subtasks', JSON.stringify(subtasks));
}

function loadSubtasks() {
    const subtasks = JSON.parse(localStorage.getItem('subtasks')) || [];
    subtasks.forEach(subtask => {
        const li = document.createElement('li');
        li.textContent = subtask;
        subtaskList.appendChild(li);
    });
}

addSubtaskBtn.addEventListener('click', addSubtask);
window.addEventListener('load', loadSubtasks);
// Đăng nhập và lấy quyền truy cập Google Calendar
function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/calendar.events" })
        .then(() => console.log("Sign-in successful"))
        .catch((err) => console.error("Error signing in", err));
}

function loadClient() {
    gapi.client.setApiKey('YOUR_API_KEY');
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
        .then(() => console.log("GAPI client loaded for API"))
        .catch((err) => console.error("Error loading GAPI client", err));
}

// Thêm sự kiện vào Google Calendar
function addEventToCalendar(summary, description, startTime, endTime) {
    return gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': {
            'summary': summary,
            'description': description,
            'start': { 'dateTime': startTime },
            'end': { 'dateTime': endTime },
        }
    }).then(() => console.log("Event created"))
      .catch((err) => console.error("Error creating event", err));
}
const toggleDarkMode = document.getElementById('toggle-dark-mode');

function switchDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function loadDarkModeSetting() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

toggleDarkMode.addEventListener('click', switchDarkMode);
window.addEventListener('load', loadDarkModeSetting);

function updateMotivation() {
    motivationLevel++;
    document.getElementById('motivation-level').textContent = motivationLevel;
    localStorage.setItem('motivationLevel', motivationLevel);
}

function loadMotivation() {
    motivationLevel = parseInt(localStorage.getItem('motivationLevel')) || 0;
    document.getElementById('motivation-level').textContent = motivationLevel;
}

window.addEventListener('load', loadMotivation);

// Gọi hàm `updateMotivation()` mỗi khi người dùng hoàn thành một mục tiêu.
=======
// Timer Functionality
let timer;
let timeLeft = 1500; // 25 minutes in seconds
let isRunning = false;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-timer');
const resetBtn = document.getElementById('reset-timer');

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            alert('Time is up!');
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 1500;
    isRunning = false;
    updateTimerDisplay();
}

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

// Study Plan Functionality
const goalInput = document.getElementById('goal-input');
const addGoalBtn = document.getElementById('add-goal');
const goalList = document.getElementById('goal-list');

function addGoal() {
    const goalText = goalInput.value;
    if (goalText === '') return;

    const li = document.createElement('li');
    li.textContent = goalText;
    goalList.appendChild(li);

    goalInput.value = '';
    saveGoals();
}

function saveGoals() {
    const goals = [];
    goalList.querySelectorAll('li').forEach(li => goals.push(li.textContent));
    localStorage.setItem('goals', JSON.stringify(goals));
}

function loadGoals() {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.forEach(goal => {
        const li = document.createElement('li');
        li.textContent = goal;
        goalList.appendChild(li);
    });
}

addGoalBtn.addEventListener('click', addGoal);
window.addEventListener('load', loadGoals);

// Reminder Functionality
const reminderTimeInput = document.getElementById('reminder-time');
const setReminderBtn = document.getElementById('set-reminder');

function setReminder() {
    const reminderTime = reminderTimeInput.value;
    if (reminderTime === '') return;

    const now = new Date();
    const [hours, minutes] = reminderTime.split(':').map(Number);
    const reminderDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

    const timeDifference = reminderDate - now;

    if (timeDifference > 0) {
        setTimeout(() => {
            alert('Time to study!');
        }, timeDifference);
    } else {
        alert('Please select a future time!');
    }
}

setReminderBtn.addEventListener('click', setReminder);

// Motivation Level
let motivationLevel = 0;
const motivationDisplay = document.getElementById('motivation-level');

function updateMotivation() {
    motivationLevel++;
    motivationDisplay.textContent = motivationLevel;
    localStorage.setItem('motivationLevel', motivationLevel);
}

function loadMotivation() {
    motivationLevel = parseInt(localStorage.getItem('motivationLevel')) || 0;
    motivationDisplay.textContent = motivationLevel;
}

window.addEventListener('load', loadMotivation);
let workTime = 1500; // 25 phút
let shortBreakTime = 300; // 5 phút
let longBreakTime = 900; // 15 phút
let cycles = 0; // Số vòng học đã hoàn thành

function startPomodoro() {
    if (isRunning) return;
    isRunning = true;

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;

            if (cycles === 4) {
                timeLeft = longBreakTime;
                alert('Take a long break!');
                cycles = 0;
            } else if (timeLeft === workTime) {
                timeLeft = shortBreakTime;
                alert('Take a short break!');
            } else {
                timeLeft = workTime;
                alert('Back to work!');
                cycles++;
            }
        }
    }, 1000);
}

startBtn.addEventListener('click', startPomodoro);
function saveStudyTime() {
    let currentDate = new Date().toLocaleDateString();
    let studyTime = JSON.parse(localStorage.getItem('studyTime')) || {};

    if (!studyTime[currentDate]) {
        studyTime[currentDate] = 0;
    }
    studyTime[currentDate] += (1500 - timeLeft); // Thời gian học trong phiên

    localStorage.setItem('studyTime', JSON.stringify(studyTime));
}

function getStudyStats() {
    let studyTime = JSON.parse(localStorage.getItem('studyTime')) || {};
    let totalMinutes = 0;

    for (let date in studyTime) {
        totalMinutes += studyTime[date];
    }
    return totalMinutes / 60; // Tổng số giờ học
}
function displayStudyChart() {
    let studyTime = JSON.parse(localStorage.getItem('studyTime')) || {};
    let dates = Object.keys(studyTime);
    let studyData = Object.values(studyTime);

    var ctx = document.getElementById('studyChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line', // Loại biểu đồ (line, bar, pie, etc.)
        data: {
            labels: dates, // Ngày học
            datasets: [{
                label: 'Study Time (minutes)',
                data: studyData,
                borderColor: '#6a994e',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

window.addEventListener('load', displayStudyChart);
const subtaskList = document.getElementById('subtask-list');
const addSubtaskBtn = document.getElementById('add-subtask');

function addSubtask() {
    const subtaskInput = prompt('Enter a subtask:');
    if (subtaskInput === '') return;

    const li = document.createElement('li');
    li.textContent = subtaskInput;
    subtaskList.appendChild(li);

    saveSubtasks();
}

function saveSubtasks() {
    const subtasks = [];
    subtaskList.querySelectorAll('li').forEach(li => subtasks.push(li.textContent));
    localStorage.setItem('subtasks', JSON.stringify(subtasks));
}

function loadSubtasks() {
    const subtasks = JSON.parse(localStorage.getItem('subtasks')) || [];
    subtasks.forEach(subtask => {
        const li = document.createElement('li');
        li.textContent = subtask;
        subtaskList.appendChild(li);
    });
}

addSubtaskBtn.addEventListener('click', addSubtask);
window.addEventListener('load', loadSubtasks);
// Đăng nhập và lấy quyền truy cập Google Calendar
function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/calendar.events" })
        .then(() => console.log("Sign-in successful"))
        .catch((err) => console.error("Error signing in", err));
}

function loadClient() {
    gapi.client.setApiKey('YOUR_API_KEY');
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
        .then(() => console.log("GAPI client loaded for API"))
        .catch((err) => console.error("Error loading GAPI client", err));
}

// Thêm sự kiện vào Google Calendar
function addEventToCalendar(summary, description, startTime, endTime) {
    return gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': {
            'summary': summary,
            'description': description,
            'start': { 'dateTime': startTime },
            'end': { 'dateTime': endTime },
        }
    }).then(() => console.log("Event created"))
      .catch((err) => console.error("Error creating event", err));
}
const toggleDarkMode = document.getElementById('toggle-dark-mode');

function switchDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function loadDarkModeSetting() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

toggleDarkMode.addEventListener('click', switchDarkMode);
window.addEventListener('load', loadDarkModeSetting);
let motivationLevel = 0;

function updateMotivation() {
    motivationLevel++;
    document.getElementById('motivation-level').textContent = motivationLevel;
    localStorage.setItem('motivationLevel', motivationLevel);
}

function loadMotivation() {
    motivationLevel = parseInt(localStorage.getItem('motivationLevel')) || 0;
    document.getElementById('motivation-level').textContent = motivationLevel;
}

window.addEventListener('load', loadMotivation);

// Gọi hàm `updateMotivation()` mỗi khi người dùng hoàn thành một mục tiêu.
>>>>>>> 67821856cb753b6c4f455ba0620c395e3cf0aacc
