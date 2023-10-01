
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const dateTimeEl = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");


flatpickr(dateTimeEl, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {

    const dateDiff = selectedDates[0].getTime() - Date.now();

        if (dateDiff <= 0) {
            Notify.warning("Please choose a date in the future");
            startBtn.disabled = true;

        } else {
            startBtn.disabled = false;
        }
    }, 
});



 const timer = {
    deadline: new Date(),
        intervalId: null,
        days: document.querySelector("[data-days]"),
        hours: document.querySelector("[data-hours]"),
        minutes: document.querySelector("[data-minutes]"),
        seconds: document.querySelector("[data-seconds]"),
        start() {
        this.intervalId = setInterval(() => {
            const dateDiff = this.deadline - Date.now();

            if (dateDiff <= 0) {
                this.stop();

                return;
            }

            let { days, hours, minutes, seconds } = this.convertMs(dateDiff);
            this.updateTimerDisplay(days, hours, minutes, seconds);
         }, 1000);

        },
         stop() {
            clearInterval(this.intervalId);
        },
        
        updateTimerDisplay(days, hours, minutes, seconds) {
             this.days.textContent = this.addLeadingZero(days);
             this.hours.textContent = this.addLeadingZero(hours);
             this.minutes.textContent = this.addLeadingZero(minutes);
             this.seconds.textContent = this.addLeadingZero(seconds);
         },
        
         addLeadingZero(value) {
         return value.toString().padStart(2, "0");
         },


        convertMs(ms) {
            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;


            const days = Math.floor(ms / day);
            const hours = Math.floor((ms % day) / hour);
            const minutes = Math.floor(((ms % day) % hour) / minute);
            const seconds = Math.floor((((ms % day) % hour) % minute) / second);

            return { days, hours, minutes, seconds };
            }
        
        };

      


    startBtn.addEventListener('click', () => {
        const selectedHours = parseInt(document.querySelector(".flatpickr-time input.flatpickr-hour").value, 10);
        const selectedMinutes = parseInt(document.querySelector(".flatpickr-time input.flatpickr-minute").value, 10);
        const selectedDateTime = flatpickr.parseDate(dateTimeEl.value);
        selectedDateTime.setHours(selectedHours, selectedMinutes);
        timer.deadline = selectedDateTime;
        timer.start()
    });