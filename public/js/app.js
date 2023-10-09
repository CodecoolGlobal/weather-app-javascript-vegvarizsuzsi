import { searchFetch } from './api.js';
import { citySearch, weatherCardContainer } from './dom.js';

const loadEvent = function () {
    citySearch.addEventListener("input", () => {
        if (citySearch.value.length >= 3) {
            searchFetch(citySearch.value);
        } else {
            weatherCardContainer.innerHTML = "";
        }
    });
};

window.addEventListener("load", loadEvent);