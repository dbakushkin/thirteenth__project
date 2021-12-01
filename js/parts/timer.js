function timer() {
    let deadline = "2021-11-12";
    function getTimeremaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((t/1000) % 60);
        let minutes = Math.floor((t/1000/60) % 60);
        let hours = Math.floor((t/(1000*60*60)));
        return {
            "total" : t,
            "hours" : hours,
            "minutes" : minutes,
            "seconds" : seconds
        };
    }
    function setClock(id, endtime){
        let timer = document.getElementById(id);
        let hours = timer.querySelector(".hours");
        let minutes = timer.querySelector(".minutes");
        let seconds = timer.querySelector(".seconds");
        let timeInteval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeremaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            function zero(num) {
                if(num < 10) {
                     return `0${num}`;
                } else return num
            };

            hours.textContent = zero(t.hours);
            minutes.textContent = zero(t.minutes);
            seconds.textContent = zero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timeInteval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
            

        }
    }
    setClock("timer", deadline);

}

module.exports = timer;