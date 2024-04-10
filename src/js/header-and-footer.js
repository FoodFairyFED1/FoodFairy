import {API_KEY} from "../../API_KEY.js";

const body = document.body;
const burger_menu = document.querySelector(".burger-menu");
const favs_menu = document.querySelector(".favs-menu");
const favs_container = document.querySelector(".favs-container");

export function toggleBurgerMenu() {

    if (burger_menu.style.display === "none" || burger_menu.style.display === "") {
        burger_menu.style.display = "flex";
        body.style.overflow = "hidden";
    } else {
        burger_menu.style.display = "none";
        body.style.overflow = "auto";
    }
}

export function toggleFavsMenu() {

    if (favs_menu.style.display === "none" || favs_menu.style.display === "") {
        favs_menu.style.display = "flex";
        body.style.overflow = "hidden";
    } else {
        favs_menu.style.display = "none";
        body.style.overflow = "auto";
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
    favs_container.innerHTML = "";
    recipes.forEach((recipe) => {
        favs_container.innerHTML += `
        <a class="favRecipeCard" href="pages/recipe-details.html?id=${recipe.id}">
            <div class="favRecipeCardStart">
                <img class="favRecipeCardImage" src="${recipe.image}">
            </div>
            <div class="favRecipeCardEnd">
                <h3 class="favRecipeCardTitle">${recipe.title}</h3>
            </div>
        </a>
        `;
    });
}

