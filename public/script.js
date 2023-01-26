
const root = document.getElementById("root");

const citySearch = document.createElement("input");
citySearch.type = "search";
citySearch.id = "city-search",
    citySearch.placeholder = "Search for a city...";
root.appendChild(citySearch);

const suggestion = document.createElement("div");
suggestion.id = "suggestion";
root.appendChild(suggestion);


const weatherCardContainer = document.createElement("div");
weatherCardContainer.id = "weather-card-container"
root.appendChild(weatherCardContainer)

const favoritesContainer = document.createElement("div");
favoritesContainer.id = "favorites-container";
favoritesContainer.style.display = "none";
root.appendChild(favoritesContainer);

const favoritesList = document.createElement("ul");
favoritesList.className = "favoritList"
favoritesContainer.appendChild(favoritesList);

const apiKey = '8961c699a656421ebc195937232001';


async function searchFetch() {
    const apiUrl = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${citySearch.value}`;

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
            fetchPicture(apiKeyBG, selectedCity)
        });
    });

}
async function fetchAPI(selectedCity) {
    // Make API call to fetch weather data for selected city
    const weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${selectedCity}&aqi=no`;
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

const apiKeyBG = 'BgIDPVSazOmwwp3xFHj8Imho6PwNk1DQ2IhOZu5CsW5tGMMQM06rroXf';

async function fetchPicture(apiKey, selectedCity) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=${selectedCity}`, {
            headers: {
                'Authorization': apiKey
            }
        });
        const data = await response.json();
        const originalImageURL = data.photos[0].src.original;
        
        document.getElementById("weather-card").style.backgroundImage = `url(${originalImageURL})`;
        document.getElementById("weather-card").style.backgroundSize = "cover";
        await preload(originalImageURL)

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

const loadEvent = function () {
    citySearch.addEventListener("input", () => {
        if (citySearch.value.length >= 3) {

            searchFetch()

        } else {
            weatherCardContainer.innerHTML = "";
        }
    });
};


window.addEventListener("load", loadEvent);