const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;

stopButton.setAttribute('disabled', true);

startButton.addEventListener('click', onStart);
stopButton.addEventListener('click', onStop);

function onStart() {
  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onStop() {
  stopButton.setAttribute('disabled', true);
  startButton.removeAttribute('disabled');
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
