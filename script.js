let button1 = document.getElementsByClassName("are-we-bout-to-start")[0]
let minutes = document.getElementsByClassName("minutes")[0]
let seconds = document.getElementsByClassName("seconds")[0]
let listOfJobs = document.getElementsByClassName("jobs")[0]
let circleLeft = document.getElementsByClassName("left-side")
let circleRight = document.getElementsByClassName("right-side")
let message = document.getElementsByClassName("message")[0]
let background = document.querySelector("html")
let submitButton = document.getElementById("submitting")
let colorsArray = ["rgb(15, 172, 159)","darkcyan","rgb(35, 87, 185)", "darkblue"]
const sessionMinute = minutes.innerText

let jobs = []
let isItDone = false
let degree = 0
let myInterval 
let totalTimeLeft
let sessionTiming = Number.parseInt(minutes.textContent)
let variableTimePassing = 360 / (sessionTiming * 60)
let stillContinuing = true
const start = {isStart : true, value : 0}

/* The app function is the system of the pomodoro that makes the clock work
and affect rest of the elements to change depending on the time left.
For example the circle shape is getting blacker as time passes to symbolise the
time is running out. The resetting part is to make the system ready for the next
session. */
function app(){
  if (stillContinuing && jobs.length > 0){
    //The code below is to calculate the time on the clock
    totalTimeLeft--;
    minutes.innerText = Math.floor(totalTimeLeft / 60)
    seconds.innerText = totalTimeLeft % 60
    //The below nested flow is to make the circle change it's color depending how many seconds left
    if (!isItDone){
      degree += variableTimePassing
        circleLeft[1].style.transform = "rotate(" + degree +"deg)"
        if (degree === 180){
          isItDone = true
          degree = 0;
          circleLeft[0].style.zIndex = 2;
      }
    } else {
      degree += variableTimePassing
      circleLeft[0].style.transform = "rotate(" + degree +"deg)"
      circleRight[0].style.transform = "rotate(" + degree +"deg)"
    }
   //The below code is to reset the system when all the time is run out for session
    if (totalTimeLeft === 0){
      if (jobs.length > 1){
      a--;
      stillContinuing = false;
      clearInterval(myInterval);
      clearInterval(colorInterval);
      start.isStart = true;
      start.value = 0;
      minutes.innerText = sessionMinute;
      seconds.innerText = "00";
      button1.innerText = "start";
      jobs.shift();
      message.innerText = "press to start"
      circleRight[0].style.transform = "rotate(0deg)"
      circleLeft[0].style.transform = "rotate(0deg)"
      circleLeft[0].style.zIndex = 1
      circleLeft[1].style.zIndex = 1;
      circleLeft[1].style.transform = "rotate(0deg)"
      degree = 0;
      isItDone = false;
    } else {
      stillContinuing = false;
      clearInterval(myInterval);
      clearInterval(colorInterval);
      start.isStart = true;
      start.value = 0;
      minutes.innerText = sessionMinute;
      seconds.innerText = "00";
      button1.innerText = "start";
      jobs.shift();
      message.innerText = "You are done with all of your tasks, congrats!";
      circleRight[0].style.transform = "rotate(0deg)";
      circleLeft[0].style.transform = "rotate(0deg)";
      circleLeft[0].style.zIndex = 1;
      circleLeft[1].style.zIndex = 1;
      circleLeft[1].style.transform = "rotate(0deg)";
      degree = 0;
      isItDone = false;
    }
  } 
 }
}

/*The coloring function is to make the site more dynamic, when the timer starts to count
the site's color change.*/
function coloring(){
  let holder = []
  if (stillContinuing){
    let secondHolder = colorsArray[0]
    for(let i = colorsArray.length - 1; i >= -1; i--){
      if (i !== 0){
        holder[i - 1] = colorsArray[i]
      } else{
        holder[colorsArray.length - 1] = secondHolder
      }
    }
  }
  background.style.background = "linear-gradient( to right, " +  holder.join(", ") + ")";
  colorsArray = holder
}

//Below event listener is to check if the user wants to continue their session or not.

button1.addEventListener("click", function (){
  button1.style.color = "beige"
  setTimeout(() => {
    button1.style.color = "#4c0999"
  }, 100);
  if (jobs.length > 0){
    if (start.isStart){
    stillContinuing = true
    start.isStart = false
    sessionTiming = Number.parseInt(minutes.textContent)
      if(start.value === 0){
       message.innerText = jobs[0]
       totalTimeLeft = sessionTiming * 60
      }
    myInterval = setInterval(app, 1000)
    colorInterval = setInterval(coloring, 1050)
    button1.innerText = "stop"
    }
   else{
    stillContinuing = false
    start.value++
    start.isStart = true
    clearInterval(myInterval);
    clearInterval(colorInterval);
    button1.innerText = "start"
    }
  } else{
    alert('Please enter a work to do! If you are done with the tasks on your list then please refresh the website.')
  }
});

//Below event listener is belong to enter button, it adds new tasks to the list and make it appear on screen.
let a = 0

submitButton.addEventListener("click",function() {
  submitButton.style.background = "beige"
  submitButton.style.color = "rgb(1, 7, 32)"
  setTimeout(() => {
    submitButton.style.background = "rgb(1, 7, 32)";
    submitButton.style.color = "white"
  }, 200);
  if (message.innerText === "You are done with all of your tasks, congrats!"){
    a--;
  }
  var job = document.getElementsByClassName("work")[0]
  jobs.push(job.value)
  listOfJobs.innerHTML += '<li class = "task">' + jobs[a] + '</li>'
  a++
  job.value = ""
  let task = document.getElementsByClassName("task")
}
);

