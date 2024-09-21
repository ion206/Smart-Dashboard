//const apiKey = c58798324f8ccf5509f1b1ff27d60ff7  //API KEY
const city = 'Gilroy' //city - can update later
lat = 37.0030
lon = 121.5566

function convertISO(iso){
    mer = " AM";
    val = iso.toString();
    hour = val.substr(-4,1);
    if(hour > 12){
        mer = " PM";
        hour -= 12;
    }
    return (hour.toString() + mer);
}

function getWeather(){
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=37.0058&longitude=-121.5683&current=temperature_2m,precipitation&daily=sunrise,sunset&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FLos_Angeles&forecast_days=1&hourly=temperature_2m,precipitation'
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Extract relevant data
            const temp = data.current.temperature_2m;
            //const description = data.weather[0].description;
            //const icon = data.weather[0].icon;
            const times = data.hourly.time; //[]
            const temps =  data.hourly.temperature_2m; //[]
            const precips =  data.hourly.precipitation; //[]

            // Update the DOM
            document.getElementById('weather-widget').innerHTML = `
                <h2 style="font-size: 25px">Weather in ${city}</h2>
                <h3 style="font-size: 60px; font-weight: bold">${temp}<span style="vertical-align: top; font-size: 35px">°F</span> <span style="vertical-align: -20%;font-size: 90px"; class="material-symbols-outlined">sunny</span></h3>
                <div class="forecasts">
                <div class="hour">
                    <h4>${convertISO(times[1])}</h4>
                    <h5>${temps[1]}</h4>
                </div>
                <div class="hour">
                    <h4>${convertISO(times[2])}</h4>
                    <h5>${temps[2]}</h4>
                </div>
                <div class="hour">
                    <h4>${convertISO(times[3])}</h4>
                    <h5>${temps[3]}</h4>
                </div>
                <div class="hour">
                    <h4>${convertISO(times[4])}</h4>
                    <h5>${temps[4]}</h4>
                </div>
            `;
        })
        .catch(error => {
        console.error('Error fetching weather data:', error);
        });
}

// Call fetchWeather on page load
window.onload = getWeather();
setInterval(getWeather(), 600000);
