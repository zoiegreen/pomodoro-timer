//Initialize a global variable timoOut to use against setInterval and clearInterval functions
var timeOut;

window.onload = function() {
    //Initialize variables for display, start, plus and minus sign controllers and minutes and seconds
    var breakDisplay = document.querySelector('.break-display');
    var pomDisplay = document.querySelector('.pom-display');
    var start = document.querySelector('.start');
    var reset = document.querySelector('.reset');
    var plus = document.querySelectorAll('.plus');
    var minus = document.querySelectorAll('.minus');
    var pomodoro = document.querySelector('.pomodoro');
    var freeTime = document.querySelector('.break');
    pomodoro.innerHTML = 25;
    freeTime.innerHTML = 5
    var pomodoroMinutes = pomodoro.textContent;
    var breakMinutes = freeTime.textContent;

    //Event listeners for plus and minus button

    plus.forEach(function(elem) {
        //Since this a node list select each item individually and add event listener
        elem.addEventListener('click', function() {
            if (elem.classList.contains("break-time")) {
                var breakNum = Number(freeTime.innerText);
                freeTime.textContent = breakNum + 1;
                //Update breakMinutes everytime the value is changed
                breakMinutes = freeTime.textContent;
            } else if (elem.classList.contains("pom-time")) {
                var pomNum = Number(pomodoro.innerText);
                pomodoro.textContent = pomNum + 1;
                //Update pomodoroMinutes everytime the value is changed
                pomodoroMinutes = pomodoro.textContent;
            }
        });
    });

    minus.forEach(function(elem) {
        //Since this a node list select each item individually and add event listener
        elem.addEventListener('click', function() {
            if (elem.classList.contains("break-time")) {
                var breakNum = Number(freeTime.innerText);
                if (breakNum > 1) {
                    freeTime.textContent = breakNum - 1;
                }
                breakMinutes = freeTime.textContent;
            } else if (elem.classList.contains("pom-time")) {
                var pomNum = Number(pomodoro.innerText);
                if (pomNum > 1) {
                    pomodoro.textContent = pomNum - 1;
                }
                pomodoroMinutes = pomodoro.textContent;
            }
        });
    });

    //Function to start the progress bar

    function move() {
        var elem = document.getElementById("myBar");
        var width = 0;
        var id = setInterval(frame, 1000);

        function frame() {
            if (width > 100) {
                clearInterval(id);
            } else {
                width += (100/(pomodoroMinutes * 60));
                elem.style.width = width + '%';
                elem.innerHTML = Math.round(width * 1) + '%';
            }
        }
    }


    //Code to set the pomodoro clock time and break clock time

    function pomodoroCountDown() {
        var minutes = pomodoroMinutes - 1;
        var seconds = 60;
        //total variable keeps track of total time
        var total = (minutes * 60) + seconds;
        timeOut = setInterval(timer, 1000);

        function timer() {
            seconds = seconds - 1;
            total = total - 1;
            if (seconds === -1) {
                minutes = minutes - 1;
                seconds = 59;
            }
            var display = document.querySelector('.time-display');
            display.innerHTML = (minutes < 10 ? "0" + minutes.toString() : minutes) + ':' + (seconds < 10 ? "0" + seconds.toString() : seconds);
            if (total === 0) {
                //Clear pomodoro time and set session time display to none
                clearInterval(timeOut);
                pomDisplay.style.display = 'none';
                breakCountDown();
            }
        }
    }

    function breakCountDown() {
        var minutes = breakMinutes - 1;
        var seconds = 60;
        //total variable keeps track of total time
        var total = (minutes * 60) + seconds;
        breakDisplay.style.display = 'inline-block';
        timeOut = setInterval(timer, 1000);

        function timer() {
            seconds = seconds - 1;
            total = total - 1;
            if (seconds === -1) {
                minutes = minutes - 1;
                seconds = 59;
            }
            var display = document.querySelector('.time-display');
            display.innerHTML = (minutes < 10 ? "0" + minutes.toString() : minutes) + ':' + (seconds < 10 ? "0" + seconds.toString() : seconds);
            if (total === 0) {
                //Clear break time 
                clearInterval(timeOut);
            }
        }
    }

    //Add event listeners for the start and reset buttons

    start.addEventListener('click', function() {
        //Hide the plus and minus buttons when the start button is clicked
        minus.forEach(function(elem) {
            elem.style.display = 'none';
        });
        plus.forEach(function(elem) {
            elem.style.display = 'none';
        });

        //Only display session time and rest button
        breakDisplay.style.display = 'none';
        start.style.display = 'none';
        reset.style.display = 'inline-block';
        move();
        pomodoroCountDown();

    });

    reset.addEventListener('click', function() {
        //Refresh the page once the button is clicked
        window.location.reload(true);
    });

}










