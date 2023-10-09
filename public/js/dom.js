
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

export { citySearch, weatherCardContainer, favoritesList, favoritesContainer };