// Select Pomodoro display to edit timer content
const pomodoroDisplay = document.querySelector(".timer-display");

// Select start, pause & stop buttons
let startButton = document.querySelector(".start");
let stopButton = document.querySelector(".stop");
let pauseButton = document.querySelector(".pause");

// Set a flag to check if pomodoro was paused
let timerRunning = true;

// Set a flag to check if timer was stopped
let timerStopped = false;

// set pomodoro interval time
let timerSeconds = 10;

// Declare a variable for setInterval
let timerInterval = null;

// set function to initialize buttons at start of application
function initializeButtons() {
  startButton.style.display = "block";
  stopButton.style.display = "none";
  pauseButton.style.display = "none";
}

// set a display timer function to format time-
const displayTimer = function(timeInput) {
  // convert seconds into minutes
  var minutes = Math.floor(timeInput / 60);
  var remainingSeconds = timeInput - minutes * 60;
  // format time for single digit prepend by 0
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  // return display time
  return `${minutes}:${remainingSeconds}`;
};

// Reset timer Seconds
function resetTimerSeconds() {
  timerSeconds = 10;
}

// Set a time tracker function for pomodoro intervals
const timeTracker = function() {
  //Stop the timer
  if (timerStopped) {
    clearInterval(timerInterval);
    resetTimerSeconds();
    pomodoroDisplay.innerHTML = displayTimer(timerSeconds);
    timerStopped = false;
  } else {
    // start timer
    if (timerRunning) {
      timerInterval = setInterval(function() {
        timerSeconds--;
        pomodoroDisplay.innerHTML = displayTimer(timerSeconds);
        if (timerSeconds < 0) {
          clearInterval(timerInterval);
          resetTimerSeconds();
          initializeButtons();
          pomodoroDisplay.innerHTML = displayTimer(timerSeconds);
        }
      }, 1000);
    } else {
      // pause timer
      clearInterval(timerInterval);
    }
  }
};

// Listen for clicks on the document
document.addEventListener("click", function(event) {
  // Start pomodoro on click on start button
  if (event.target.classList.contains("start")) {
    timerRunning = true;
    timeTracker();
    startButton.style.display = "none";
    pauseButton.style.display = "block";
    stopButton.style.display = "block";
  }

  if (event.target.classList.contains("pause")) {
    timerRunning = false;
    timeTracker();
    pauseButton.style.display = "none";
    startButton.style.display = "block";
  }

  if (event.target.classList.contains("stop")) {
    timerStopped = true;
    timeTracker();
    initializeButtons();
  }
});

// display buttons at the start of timer
initializeButtons();

// display initial timer state at the start
pomodoroDisplay.innerHTML = displayTimer(timerSeconds);
