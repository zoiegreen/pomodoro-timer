// add event listener to start button to set a new pomodoro
// Write a pomodoro function
// -- Pomodor begins at 25 minutes
// -- Users see a countdown from 25 to 00
// -- Users can pause the running countdown
// -- The pomodoro display is in 00:00 format

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

// set pause and stop display to none
stopButton.style.display = "none";
pauseButton.style.display = "none";

// Set a time tracker function for pomodoro intervals
const timeTracker = function() {
  //Stop the timer
  if (timerStopped) {
    clearInterval(timerInterval);
    timerSeconds = 10;
    timerStopped = false;
  } else {
    // start timer
    if (timerRunning) {
      timerInterval = setInterval(function() {
        timerSeconds--;
        pomodoroDisplay.innerHTML = timerSeconds;
        if (timerSeconds === 0) {
          clearInterval(timerInterval);
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
  // Start pomodor on click on start button
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
    stopButton.style.display = "none";
    pauseButton.style.display = "none";
    startButton.style.display = "block";
  }
});
