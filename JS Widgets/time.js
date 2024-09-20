const timeZone = 'America%2FLos_Angeles'


let hour;
let minute;
let second;
function getTime(){
    const url = 'https://timeapi.io/api/time/current/zone?timeZone=' + timeZone;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Extract relevant data
            hour = data.hour;
            minute = data.minute;
            second = data.seconds;
            //const description = data.weather[0].description;
            //const icon = data.weather[0].icon;

            // Update the DOM
            answer = hour + ":" + minute+ ":" + second;
            document.getElementById('time-widget').innerHTML = `
                <h1>${answer}</h1>
            `;
            document.getElementById('date').innerHTML = `
                <h3>Friday, September 20 2024</h3>
            `;
        })
        .catch(error => {
            console.error('Error fetching time data:', error);
            });
            
}
function incrementTime(){
    second++;
    if(second>59){
        second = 0
        minute++;
    }
    if(minute > 59){
        minute=0;
        getTime();
    }
    if(hour > 12){
        hour = hour - 12;
    }
    if(hour == 0){
        hour = 12;
    }
    second = second.toString().padStart(2, '0');
    minute = minute.toString().padStart(2, '0');
    answer = hour + ":" + minute+ ":" + second;
    document.getElementById('time-widget').innerHTML = `
        <h1 style="font-size: 150px"; id="current-time">${answer}</h1>
    `;


}


window.onload = getTime();

//Increment Time Value Locally
setInterval(incrementTime, 1000);

//Update to Exact Time Every Hour - 1 API Call every 5 mins
setInterval(getTime, 300000);
