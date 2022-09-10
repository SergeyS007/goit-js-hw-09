import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');

const date = Date.now();
startButton.setAttribute('disabled', false);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (date > selectedDates[0]) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
      startButton.addEventListener('click', onStart);
      const startTime = selectedDates[0];
      function onStart() {
        timerId = setInterval(() => {
          const currentTime = Date.now();
          const deltaTime = startTime - currentTime;
          console.log(deltaTime);
          const a = convertMs(deltaTime);
          console.log(a);
          updateDataClock(dataDays, a.days);
          updateDataClock(dataHours, a.hours);
          updateDataClock(dataMinutes, a.minutes);
          updateDataClock(dataSeconds, a.seconds);
          if (deltaTime <= 0) {
            clearInterval(timerId);
          }
        }, 1000);
      }
    }
  },
};

const myInput = document.querySelector('#datetime-picker');
const fp = flatpickr(myInput, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function updateDataClock(place, value) {
  place.textContent = value;
}
// updateDataClock(dataDays, 10);
