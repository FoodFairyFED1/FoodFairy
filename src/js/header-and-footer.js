import {API_KEY} from "../../API_KEY.js";

const burger_menu = document.querySelector(".burger-menu");
const favs_menu = document.querySelector(".favs-menu");

export function toggleBurgerMenu() {
    if (burger_menu.style.display === "none" || burger_menu.style.display === "") {
        burger_menu.style.display = "flex";
    } else {
        burger_menu.style.display = "none";
    }
}

export function toggleFavsMenu() {
    if (favs_menu.style.display === "none" || favs_menu.style.display === "") {
        favs_menu.style.display = "flex";
    } else {
        favs_menu.style.display = "none";
    }
}

export function saveFavourites() {
    let favRecipes = JSON.parse(window.localStorage.getItem("FoodFairyFavs")) || [];
    const parameterString = window.location.search;
    const searchParameter = new URLSearchParams(parameterString);
    const recipeId = searchParameter.get("id");

    if (!favRecipes.includes(recipeId)) {
        favRecipes.push(recipeId);
    }

    window.localStorage.setItem("FoodFairyFavs", JSON.stringify(favRecipes));

    getFavourites();
}

export async function getFavourites() {
    const favRecipesString = JSON.parse(window.localStorage.getItem("FoodFairyFavs")) || [];
    const favRecipes = favRecipesString.join();
        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/informationBulk?ids=${favRecipes}&apiKey=${API_KEY}`
            );
            const recipeData = await response.json();
            displayFavourites(recipeData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
}

function displayFavourites(recipes) {
    favs_menu.innerHTML = "";
    recipes.forEach((recipe) => {
        favs_menu.innerHTML += `
        <a class="recipe-card" href="pages/recipe-details.html?id=${recipe.id}">
            <div class="recipeCardStart">
                <img class="recipeCardImage" src="${recipe.image}">
            </div>
            <div class="recipeCardEnd">
                <h3 class="recipeCardTitle">${recipe.title}</h3>
            </div>
        </a>
        `;
    });
}
