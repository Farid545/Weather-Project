const wrapper = document.querySelector(".wrapper"),
    inputPart = wrapper.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button")
wIcon = document.querySelector(".weather-part img")
arrowBack = document.querySelector("header i")
let api;

document.body.onload = function () {
    let rightNow = new Date();
    let hour = rightNow.getHours();
    let body = document.body

    if (hour >= 6 && hour < 10) {
        changeToSunRiseTheme()
        body.style.backgroundImage = "url(./images/sunRise.jpg)";
    }
    else if (hour >= 10 && hour < 16) {
        changeToDayTheme()
        body.style.backgroundImage = "url(./images/day.jpg)";
    }
    else if (hour >= 16 && hour < 20) {
        changeToSunsetTheme()
        body.style.backgroundImage = "url(./images/sunset.jpg)";
    }
    else if (hour >= 20 || hour < 6) {
        changeToNightTheme()
        body.style.backgroundImage = "url(./images/evening.jpg)";
    }

}

function changeToNightTheme() {
    let wrapper = document.getElementById("wrapper");
    let title = document.getElementById("header");
    let button = document.getElementById("button");
    wrapper.style.backgroundColor = "#240340"
    wrapper.style.borderColor = "black"
    wrapper.style.color = "white"
    title.style.color = "white"
    button.style.backgroundColor = "#B49ACA"
}
function changeToDayTheme() {
    let wrapper = document.getElementById("wrapper");
    let title = document.getElementById("header");
    let button = document.getElementById("button");
    wrapper.style.backgroundColor = "white"
    wrapper.style.borderColor = "#00d9ff"
    wrapper.style.color = "#00d9ff"
    title.style.color = "#00d9ff"
    button.style.backgroundColor = "#00d9ff"
}

function changeToSunsetTheme() {
    let wrapper = document.getElementById("wrapper");
    let title = document.getElementById("header");
    let button = document.getElementById("button");
    wrapper.style.backgroundColor = "#DF688A"
    wrapper.style.borderColor = "#9C2C60"
    wrapper.style.color = "#5B1A38"
    title.style.color = "#5B1A38"
    button.style.backgroundColor = "#9C2C60"
}

function changeToSunRiseTheme() {
    let wrapper = document.getElementById("wrapper");
    let title = document.getElementById("header");
    let button = document.getElementById("button");
    wrapper.style.backgroundColor = "#E3CEFA"
    wrapper.style.borderColor = "#9134FA"
    wrapper.style.color = "#572095"
    title.style.color = "#572095"
    button.style.backgroundColor = "#9134FA"
}

inputField.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value)
    }
})

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    } else {
        console.log("Tarayıcınız geolocation'ı desteklemiyor...")
    }
})

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=a16e33bdb752c9b5778d38c42614a6e4`;
    fetchData()
}

function onError(error) {
    infoTxt.innerText = error.message
    infoTxt.classList.add("error")
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a16e33bdb752c9b5778d38c42614a6e4`;
    fetchData()
}

function fetchData() {
    infoTxt.innerText = "Sonuçlar getiriliyor..."
    infoTxt.classList.add("pending")
    fetch(api).then(response => response.json()).then(result => weatherDetails(result))
}

function weatherDetails(info) {
    if (info.cod == "404") {
        infoTxt.classList.replace("pending", "error")
        infoTxt.innerText = `${inputField.value} şehri bulunamadı...`
    } else {
        const city = info.name
        const country = info.sys.country
        const { description, id } = info.weather[0]
        const { feels_like, humidity, temp } = info.main

        if (id == 800) {
            wIcon.src = "icons/clear.svg"
        } else if (id => 200 && id <= 232) {
            wIcon.src = "icons/storm.svg"
        } else if (id => 600 && id <= 622) {
            wIcon.src = "icons/snow.svg"
        } else if (id => 701 && id <= 781) {
            wIcon.src = "icons/haze.svg"
        } else if (id => 801 && id <= 804) {
            wIcon.src = "icons/cloud.svg"
        } else if (id => 300 && id <= 321 || (id => 500 && id <= 531)) {
            wIcon.src = "icons/rain.svg"
        }


        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp)
        wrapper.querySelector(".weather").innerText = description
        wrapper.querySelector(".location").innerText = `${city}, ${country}`
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like)
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`


        infoTxt.classList.remove("pending", "error")
        wrapper.classList.add("active")

    }

}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active")
})