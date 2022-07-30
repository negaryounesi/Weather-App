// api.openweathermap.org/data/2.5/weather?q=tehran&appid=edc228562ac0a8aa3116d41c0687cf56&units=metric
// `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`

let form = document.querySelector("form")
let input = document.querySelector(".inputText input");
let submitBtn = document.querySelector(".submitBtn button")
let weatherCards = document.querySelector(".weatherCards .cities");
let msg=document.querySelector(".msg")
let apiKey = "edc228562ac0a8aa3116d41c0687cf56";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`

    fetch(url)
        .then((response) => response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
            console.log(icon)
            const li = document.createElement("li");
            li.classList.add("city")
            const markup = `
            <h2 data-name=${name},${sys.country}>
            <span>${name}</span>
            <span>${sys.country}</span>
            </h2>
            <div class='city-temp'>${Math.round(main.temp)}</div>
            <figure>
            <img class='city-icon' src='${icon}' alt ='iconWeathercity' >

            <figcaption>${weather[0]["description"]}</figcaption>
            </figure>`
            li.innerHTML = markup;
            weatherCards.appendChild(li)
            msg.innerHTML = ""

        })
            .catch(() => {
                msg.innerHTML = "search for a valid city";
            })
            input.value = ""

})

