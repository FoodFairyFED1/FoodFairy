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

    const index = favRecipes.indexOf(recipeId);
    const favStar = document.querySelector(".favourite-recipe-btn");
    if (index === -1){
        favRecipes.push(recipeId);
        favStar.src = "../assets/images/star-icon-orange-filled.svg";
    } else {
        favRecipes.splice(index, 1);
        favStar.src = "../assets/images/star-icon-orange.svg";
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
        let href;
        if (window.location.pathname.includes("index.html")) {
            href = `pages/recipe-details.html?id=${recipe.id}`;
        } else {
            href = `../pages/recipe-details.html?id=${recipe.id}`;
        }
        favs_container.innerHTML += `
            <a class="favRecipeCard" href="${href}">
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


