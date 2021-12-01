/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/parts/calc.js":
/*!**************************!*\
  !*** ./js/parts/calc.js ***!
  \**************************/
/***/ ((module) => {

function calc() {
    let persons = document.querySelectorAll(".counter-block-input")[0],
    restDays = document.querySelectorAll(".counter-block-input")[1],
    place = document.getElementById("select"),
    totalValue = document.getElementById("total"),
    personsSum = 0,
    daysSum = 0,
    total = 0;

    totalValue.innerHTML = 0;

    if(restDays.value == "" || persons.value == ""){
        totalValue.innerHTML = 0;
    }

    persons.addEventListener("change", function() {
        personsSum = +this.value;
        total = (daysSum + personsSum)*4000;

        if(restDays.value == "" || persons.value == "") {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total
        }
    });

    restDays.addEventListener("change", function() {
        daysSum = +this.value;
        total = (daysSum + personsSum)*4000;

        if(restDays.value == "" || persons.value == "") {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total
        }
    });

    place.addEventListener("change", function() {
        if(restDays.value == "" || persons.value == ""){
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    })
}

module.exports = calc;

/***/ }),

/***/ "./js/parts/form.js":
/*!**************************!*\
  !*** ./js/parts/form.js ***!
  \**************************/
/***/ ((module) => {

function form() { 
    let message = {
        loading: "Загрузка...",
        succses: "Спасибо! Скоро мы с вами свяжемся!",
        failure: "Что-то пошло не так..."
    };

    let form = document.querySelectorAll("form"),
        input = document.getElementsByTagName("input"),
        statusMessage = document.createElement("div");
    
        statusMessage.classList.add("status");
        for(let i = 0; i < form.length; i++){
           form[i].addEventListener("submit", function(e){
            e.preventDefault();
            form[i].appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open("POST", "server.php");
            request.setRequestHeader("Content-Type", "application/json; charset=utf-8");

            let formData = new FormData(form[i]);

            let obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value
            });
            let json = JSON.stringify(obj)

            request.send(json);

            request.addEventListener("readystatechange", function() {
                if(request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if(request.readyState =  true && request.status == 200) {
                    statusMessage.innerHTML = message.succses;
                } else {
                    statusMessage.innerHTML = message.failure;
                }

                for(let i = 0 ; i < input.length; i++){
                    input[i].value = "";
                }
            })
        }) 
        }
}

module.exports = form;

/***/ }),

/***/ "./js/parts/modal.js":
/*!***************************!*\
  !*** ./js/parts/modal.js ***!
  \***************************/
/***/ ((module) => {

function modal () {
    let more = document.querySelector(".more"),
        overlay = document.querySelector(".overlay"),
        close = document.querySelector(".popup-close");

    more.addEventListener("click", function() {
        overlay.style.display = "block";
        this.classList.add("more-splash");
        document.body.style.overflow = "hidden";
    });

    close.addEventListener("click", function () {
        overlay.style.display = "none";
        more.classList.remove("more-splash");
        document.body.style.overflow = "";
    });
}

module.exports = modal;

/***/ }),

/***/ "./js/parts/slider.js":
/*!****************************!*\
  !*** ./js/parts/slider.js ***!
  \****************************/
/***/ ((module) => {

function slider() {
    let slideIndex = 1;
    let slides = document.querySelectorAll(".slider-item");
    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");
    let dotsWrap = document.querySelector(".slider-dots");
    let dots = document.querySelectorAll(".dot");

    showSlides(slideIndex)

    function showSlides (n) {
        if(n > slides.length) {
            slideIndex = 1;
        }
        if(n < 1) {
            slideIndex = slides.length;
        }
        
        slides.forEach((item) => item.style.display = "none");
        dots.forEach((item) => item.classList.remove("dot-active"));

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("dot-active")
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n)
    }

    prev. addEventListener("click", () => {
        plusSlides(-1);
    })

    next. addEventListener("click", () => {
        plusSlides(1);
    });

    dotsWrap.addEventListener("click", (e) => {
        for(let i = 0; i < dots.length + 1; i++){
            if(e.target.classList.contains("dot") && e.target == dots[i-1]) {
                currentSlide(i);
            }

        }
    })

}

module.exports = slider;

/***/ }),

/***/ "./js/parts/tabs.js":
/*!**************************!*\
  !*** ./js/parts/tabs.js ***!
  \**************************/
/***/ ((module) => {

function tabs() {
    let tab = document.querySelectorAll(".info-header-tab"),
        info = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent");

        function hideTabContent(a) {
        for(let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
        }
        hideTabContent(1);

        function showTabContent(b) {
            if(tabContent[b].classList.contains("hide")){
                tabContent[b].classList.remove("hide");
                tabContent[b].classList.add("show");
            }
        } 

        info.addEventListener("click", function(event) {
            let target = event.target;
            if(target && target.classList.contains("info-header-tab")){
                 for(let i = 0; i < tab.length; i++ ){
                     if(target === tab[i]){
                         hideTabContent(0);
                         showTabContent(i);
                         break;
                     }
                 }
            }
        });
}

module.exports = tabs;

/***/ }),

/***/ "./js/parts/timer.js":
/*!***************************!*\
  !*** ./js/parts/timer.js ***!
  \***************************/
/***/ ((module) => {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener("DOMContentLoaded", function() {
    'use strict';
    let calc = __webpack_require__(/*! ./parts/calc */ "./js/parts/calc.js"),
        form = __webpack_require__(/*! ./parts/form */ "./js/parts/form.js"),
        slider = __webpack_require__(/*! ./parts/slider */ "./js/parts/slider.js"),
        tabs = __webpack_require__(/*! ./parts/tabs */ "./js/parts/tabs.js"),
        timer = __webpack_require__(/*! ./parts/timer */ "./js/parts/timer.js"),
        modal = __webpack_require__(/*! ./parts/modal */ "./js/parts/modal.js");

        calc();
        form();
        slider();
        tabs();
        timer();
        modal();
    
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map