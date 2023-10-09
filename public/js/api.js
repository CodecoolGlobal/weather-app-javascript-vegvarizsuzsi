import { API_KEY, API_KEY_BG } from './config.js';
import { weatherCardContainer, favoritesList, favoritesContainer } from './dom.js';

export async function searchFetch(city) {
    const apiUrl = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${city}`;

    const response = await fetch(apiUrl)
    const data = await response.json()
    // Clear previous suggestions
    suggestion.innerHTML = "";
    weatherCardContainer.innerHTML = "";
    // Create an unordered list element                   
    const list = document.createElement("ul");
    // Iterate through the list of cities
    for (const city of data) {
        // Create a list item for each city
        const item = document.createElement("li");
        item.textContent = city.name;
        // Append the list item to the unordered list
        list.appendChild(item);
    }
    // Display the unordered list in the suggestions container
    suggestion.appendChild(list);
    // Show the suggestions container
    suggestion.style.display = "block";
    // Add a click event listener to each list item
    list.childNodes.forEach(childNode => {
        childNode.addEventListener("click", event => {
            // Get the selected city name
            const selectedCity = event.target.textContent;
            // Clear the previous weather card
            weatherCardContainer.innerHTML = "";

            fetchAPI(selectedCity)
            fetchPicture(API_KEY_BG, selectedCity)
        });
    });

}
async function fetchAPI(selectedCity) {
    // Make API call to fetch weather data for selected city
    const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${selectedCity}&aqi=no`;
    const response = await fetch(weatherApiUrl);
    const data = await response.json();
    // Create a weather card element
    const weatherCard = document.createElement("div");
    weatherCard.id = "weather-card";
    // Create a details card element
    const detailsCard = document.createElement("div");
    detailsCard.id = "details-card";
    // Create elements to display city name, temperature, and conditions
    const cityName = document.createElement("div");
    cityName.textContent = data.location.name;
    cityName.className = "cityname"
    
    const time = document.createElement("div");
    time.textContent = data.current.last_updated;
    time.className = "time"

    const temperature = document.createElement("div");
    temperature.textContent = `${data.current.temp_c}°C`;
    temperature.className = "temp"

    const conditions = document.createElement("div");
    conditions.textContent = `${data.current.condition.text}`;
    conditions.className = "condition"

    const conditionIcon = document.createElement("img");
    conditionIcon.src = data.current.condition.icon;
    conditionIcon.className = "icon"

    // Append the elements to the weathercard
    detailsCard.appendChild(cityName);
    detailsCard.appendChild(time);
    detailsCard.appendChild(temperature);
    detailsCard.appendChild(conditions);
    detailsCard.appendChild(conditionIcon);
    // Append the weather card and details card to the weather card container
    weatherCardContainer.appendChild(detailsCard);
    weatherCardContainer.appendChild(weatherCard);
    //Clear the suggestions and hide the suggestions container
    suggestion.innerHTML = "";
    suggestion.style.display = "none";

    const favoriteButton = document.createElement("button");
    favoriteButton.textContent = "Add to Favorites";
    weatherCardContainer.appendChild(favoriteButton);

    let favoriteClicked = false;

    favoriteButton.addEventListener("click", () => {
        if (!favoriteClicked) {
            const favoriteItem = document.createElement("li");
            favoriteItem.textContent = selectedCity;                     
            favoritesList.appendChild(favoriteItem);
            favoritesContainer.style.display = "block";
            favoriteClicked = true;
            favoriteButton.classList.add("clicked")
        }
    });
}



async function fetchPicture(apiKey, selectedCity) {
    try {
        // Fetch the image data
        const response = await fetch(`https://api.pexels.com/v1/search?query=${selectedCity}`, {
            headers: {
                'Authorization': apiKey
            }
        });
        const data = await response.json();
        const originalImageURL = data.photos[0].src.large;
        
        document.getElementById("weather-card").style.opacity = "0";

        // Preload the image
        await preload(originalImageURL)

        document.getElementById("weather-card").style.backgroundImage = `url(${originalImageURL})`;
        document.getElementById("weather-card").style.backgroundSize = "cover";

        setTimeout(() => {
            document.getElementById("weather-card").style.opacity = "1";
        }, 0);

    } catch (error) {
        console.log(error);
    }
}


function preload(src) {
    return new Promise((resolve) => {
        const img = document.createElement("img");
        img.src = src;
        img.onload = () => {
            resolve();
        };
    });
}


