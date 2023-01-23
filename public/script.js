
const loadEvent = function () {

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
    favoritesContainer.appendChild(favoritesList);



    citySearch.addEventListener("input", () => {
        if (citySearch.value.length >= 3) {

            const apiKey = '8961c699a656421ebc195937232001';
            const apiUrl = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${citySearch.value}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
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

                            // Make API call to fetch weather data for selected city

                            const weatherApiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${selectedCity}&aqi=no`;

                            fetch(weatherApiUrl)
                                .then(response => response.json())
                                .then(data => {
                                    // Create a weather card element
                                    const weatherCard = document.createElement("div");
                                    weatherCard.classList.add("weather-card");
                                    // Create elements to display city name, temperature, and conditions
                                    const cityName = document.createElement("div");
                                    cityName.textContent = data.location.name;
                                    const time = document.createElement("div");
                                    time.textContent = data.current.last_updated;
                                    const temperature = document.createElement("div");
                                    temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
                                    const conditions = document.createElement("div");
                                    conditions.textContent = `Conditions: ${data.current.condition.text}`;
                                    const conditionIcon = document.createElement("img");
                                    conditionIcon.src = data.current.condition.icon;
                                    conditionIcon.setAttribute("style", "width: 50px; height: 50px;")
                                    // Append the elements to the weathercard
                                    weatherCard.appendChild(cityName);
                                    weatherCard.appendChild(time);
                                    weatherCard.appendChild(temperature);
                                    weatherCard.appendChild(conditions);
                                    weatherCard.appendChild(conditionIcon);
                                    // Append the weather card to the weather card container
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
                                        favoriteItem.style.listStyle = "square inside";
                                        favoriteItem.style.color = "green";
                                        favoritesList.appendChild(favoriteItem);
                                        favoritesContainer.style.display = "block";
                                        favoriteClicked = true;
                                        favoriteButton.classList.add('clicked');                                        
                                        }

                                    });



                                })
                                .catch(error => console.error(error));
                        });
                    });

                }).catch(error => console.error(error));
        } else {
            weatherCardContainer.innerHTML = "";
        }
    });
};


window.addEventListener("load", loadEvent);