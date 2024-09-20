function getNews(){
    const url = 'https://gnews.io/api/v4/search?q=%22tech%22%20OR%20%22politics%22%20OR%20%22stocks%22&apikey=da0768c1267f536e354e20e57a855b82&sortby=publishedAt&lang=en&country=us'
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Extract relevant data
            const title = data.articles[0].title;
            const desc = data.articles[0].description;
            const link = data.articles[0].url;
            const source = data.articles[0].source.name;
            //const description = data.weather[0].description;
            //const icon = data.weather[0].icon;

            // Update the DOM
            document.getElementById('news-widget').innerHTML = `
                <h2>${source}</h2>
                <h3>${title}</h3>
                <div class="cont" id="cont">
                    <p>${desc}</p>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link}" alt="News Placeholder", style="max-width: 100%; max-height: 100%;">
                 </div>
            `;
        })
        .catch(error => {
        console.error('Error fetching weather data:', error);
        });
}

// Uncomment these to activate - dont want to waste API calls for every reload

//window.onload = getNews();
//setInterval(getNews(), (30 * 60000)); //30 mins
