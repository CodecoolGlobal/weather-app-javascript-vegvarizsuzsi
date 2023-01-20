
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
                            childNode.style.color = "lightgrey";
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
                                    const temperature = document.createElement("div");
                                    temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
                                    const conditions = document.createElement("div");
                                    conditions.textContent = `Conditions: ${data.current.condition.text}`;
                                    const conditionIcon = document.createElement("img");
                                    conditionIcon.src = data.current.condition.icon;
                                    conditionIcon.setAttribute("style", "width: 50px; height: 50px;")
                                    // Append the elements to the weathercard
                                    weatherCard.appendChild(cityName);
                                    weatherCard.appendChild(temperature);
                                    weatherCard.appendChild(conditions);
                                    weatherCard.appendChild(conditionIcon);
                                    // Append the weather card to the weather card container
                                    weatherCardContainer.appendChild(weatherCard);
                                    //Clear the suggestions and hide the suggestions container
                                    suggestion.innerHTML = "";
                                    suggestion.style.display = "none";
                                })
                                .catch(error => console.error(error));
                        });
                    });

                }).catch(error => console.error(error));
        };
    });
};


window.addEventListener("load", loadEvent);