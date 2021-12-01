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
                } else if(request.readyState = 4 && request.status == 200) {
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