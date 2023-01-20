
const loadEvent = function (){

const root = document.getElementById("root");

const citySearch = document.createElement("input");
citySearch.type = "text";
citySearch.id = "city-search",
citySearch.placeholder = "Search for a city...";
root.appendChild(citySearch);

const apiKey = '8961c699a656421ebc195937232001';
const apiUrl = `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=London`;

fetch(apiUrl,  {method: "GET"})
.then(response => response.json())
.then (data => {
console.log("hello");

})
.catch(error => console.error(error));


}


window.addEventListener("load", loadEvent);