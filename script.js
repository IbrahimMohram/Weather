let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let response;

function CurrentLocation() {
        let options={enableHighAccuracy: true
        }
    function current(l) {
        let lat = l.coords.latitude
        let lon = l.coords.longitude
        let cords = lat + "," + lon;
        (  async function () {
            let weatherData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=894aeafe7731451fa3f164647210810&days=3&q=${cords}`)
            if (weatherData.status == 200) {
                response = await weatherData.json();
                displayData()
            }
        })()
    }
    function error() {
        Search("Cairo");
        
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(current, error ,options)
        
    }

}
CurrentLocation()
async function Search(SearchValue) {
    if (SearchValue == "") {
        CurrentLocation()
    }
    let weatherData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=894aeafe7731451fa3f164647210810&days=3&q=${SearchValue}`)
    if (weatherData.status == 200) {
        response = await weatherData.json();
        displayData()
    }
}
let searchInput = document.getElementById("search").addEventListener("keyup", SearchValue => { Search(SearchValue.target.value) })
Search("cairo");

function displayData() {

    let getDay = document.getElementById("day");
    let getMonth = document.getElementById("month");
    let getLocation = document.getElementById("locationName");
    let temp = document.getElementById("temp-dgree");
    let icon = document.querySelector(".degree-img img");
    let Status = document.querySelector(".status-weather");
    let humidity = document.querySelector(".humidity");
    let windSpeed = document.querySelector(".wind-speed");
    let WindDirection = document.querySelector(".wind-direction");
    let SecDay = document.querySelector(".DateSecDay");
    let SecIcon = document.querySelector(".sec-day img");
    let maxTemp = document.querySelector(".sec-day span");
    let minTemp = document.querySelector(".sec-day h5 span");
    let statusSec = document.querySelector(".status_Sec")
    let ThridDate = document.querySelector(".DateThird")
    let thirdIcon = document.querySelector(".Third-day img")
    let thirdmaxTemp = document.querySelector(".Third-day span");
    let thirdminTemp = document.querySelector(".Third-day h5 span");
    let statusThird = document.querySelector(".third-Status")
    maxTemp.textContent = response.forecast.forecastday[1].day.maxtemp_c
    minTemp.textContent = response.forecast.forecastday[1].day.mintemp_c
    statusSec.textContent = response.forecast.forecastday[1].day.condition.text
    ThridDate.textContent = days[new Date(response.forecast.forecastday[2].hour[0].time).getDay()]
    thirdIcon.setAttribute("src", response.forecast.forecastday[2].day.condition.icon);
    thirdmaxTemp.textContent = response.forecast.forecastday[2].day.maxtemp_c
    thirdminTemp.textContent = response.forecast.forecastday[2].day.mintemp_c
    statusThird.textContent = response.forecast.forecastday[2].day.condition.text
    getDay.textContent = days[new Date(response.location.localtime).getDay()];
    getMonth.textContent = new Date(response.location.localtime).getDate() + " " + months[new Date(response.location.localtime).getMonth()];
    getLocation.textContent = response.location.name;
    temp.textContent = response.current.temp_c;
    icon.setAttribute("src", response.current.condition.icon);
    Status.textContent = response.current.condition.text;
    SecIcon.setAttribute("src", response.forecast.forecastday[1].day.condition.icon);
    humidity.textContent = response.current.humidity;
    windSpeed.textContent = response.current.wind_kph;
    WindDirection.textContent = response.current.wind_dir;
    SecDay.textContent = days[new Date(response.forecast.forecastday[1].hour[0].time).getDay()]
};



/*
let content = `
<div class="container">
<div class="row no-gutters">
<div class="col-md-4 mt-3">
<div class="weather-container">
     <div class="dates d-flex justify-content-between align-item-center">
        <span>${days[new Date(response.location.localtime).getDay()]}
        </span>
        <span>${new Date(response.location.localtime).getDate()} ${months[new Date(response.location.localtime).getMonth()]} </span>
                </div>
                <div class="w-card-body p-4">
                    <div class="location">
                        <p>${response.location.name}</p>
                    </div>
                    <div class="degree  d-flex flex-wrap justify-content-between align-item-center mb-4 ">
                        <h2>${response.current.temp_c}<sup>o</sup>C</h2>
                        <div class="degree-img ">
                        <img src ="${response.current.condition.icon}"/>
                        </div>
                    </div>
                    <div class="status-weather">
                        ${response.current.condition.text}
                    </div>
                    <div class="details">
                        <span class="mx-3">
                        <img src="icon-umberella.png" alt="Wind-humidity" srcset="">
                            ${response.current.humidity}%

                        </span>
                        <span class="mx-3">
                        <img src="icon-wind.png" alt="Wind-speed" srcset="">
                            ${}
                        </span>
                        <span class="mx-3">
                        <img src="icon-compass.png" alt="Wind-compass" srcset="">
                            ${response.current.wind_dir}

                        </span>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-md-4 mt-3">
            <div class="weather-container Weather">
                <div class="dates d-flex justify-content-center align-item-center">
                    <span>${days[new Date(response.forecast.forecastday[1].hour[0].time).getDay()]}</span>
                </div>
                <div class="w-card-body p-4">
                    <div class="degree another-day text-center mb-4 ">
                    <img src ="${response.forecast.forecastday[1].day.condition.icon}"/>

                        <h3 class="mb-3">${response.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h3>
                        <h5 class="mb-3">${response.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</h5>
                    </div>
                    <div class="status-weather text-center">
                    ${response.forecast.forecastday[1].day.condition.text}
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4 mt-3">
            <div class="weather-container">
                <div class="dates d-flex justify-content-center align-item-center">
                    <span>${days[new Date(response.forecast.forecastday[2].hour[0].time).getDay()]}</span>
                </div>
                <div class="w-card-body p-4">
                <div class="degree another-day text-center mb-4 ">
                <img src ="${response.forecast.forecastday[2].day.condition.icon}"/>

                    <h3 class="mb-3">${response.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h3>
                    <h5 class="mb-3">${response.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</h5>
                </div>
                <div class="status-weather text-center">
                ${response.forecast.forecastday[2].day.condition.text}
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>
`
let container = document.getElementById("Data-Res");
container.innerHTML = content;
*/
