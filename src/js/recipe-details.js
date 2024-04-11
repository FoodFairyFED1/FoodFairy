import {API_KEY} from "../../API_KEY.js";
import {toggleBurgerMenu} from "./header-and-footer.js";
import {toggleFavsMenu} from "./header-and-footer.js";
import {saveFavourites} from "./header-and-footer.js";
import {getFavourites} from "./header-and-footer.js";

const toggleBurgerMenuBTN = document.querySelector(".btn-toggle-burger-menu");
const toggleFavsMenuBTN = document.querySelector(".btn-toggle-fav-menu");
const recipeDetailInfo = document.querySelector(".recipe-detail-info-section");
const recipeDetailIngredients = document.querySelector(".recipe-detail-ingredients-section");
const recipeDetailInstruction = document.querySelector(".recipe-detail-instruction-section");
const favouriteBTN = document.querySelector(".favourite-recipe-btn");
const body = document.querySelector("body");
const loader = document.querySelector(".loader");

function getFavStarSrc() {
    const favRecipes = JSON.parse(window.localStorage.getItem("FoodFairyFavs")) || [];
    const parameterString = window.location.search;
    const searchParameter = new URLSearchParams(parameterString);
    const recipeId = searchParameter.get("id");

    let favStarSrc = "../assets/images/star-icon-orange.svg";
    if (favRecipes.includes(recipeId)) {
        favStarSrc = "../assets/images/star-icon-orange-filled.svg";
    }
    return favStarSrc
}

toggleBurgerMenuBTN.addEventListener("click", function () {
    toggleBurgerMenu();
});

toggleFavsMenuBTN.addEventListener("click", function () {
    toggleFavsMenu();
});

window.addEventListener('load', () => {
    getFavourites();
});

async function getRecipe() {
    loader.style.display = "flex";
    try {
        const parameterString = window.location.search;
        const searchParameter = new URLSearchParams(parameterString);
        const recipeId = searchParameter.get("id");

        const response = await fetch(
            `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
        );
        const data = await response.json();
        console.log(data);
        displayRecipe(data, recipeId); // Pass recipeId as an argument
    } catch (error) {
        console.log("Error: " + error);
    }
    loader.style.display = "none";
}

getRecipe();

function displayRecipe(recipe, recipeId) {
    const favStarSrc = getFavStarSrc(recipeId); // Pass recipeId as an argument

    recipeDetailInfo.innerHTML += `
        <img src="${recipe.image}" alt="food">
        <div class="img-fav-div">
            <h1 class="recipe-title">${recipe.title}</h1>
            <img src="${favStarSrc}" alt="" class="favourite-recipe-btn">
        </div>
        <div class="recipe-detail-info">
            <div class="recipe-quick-info">
                <p>
                    <span>Ready in: </span>
                    ${recipe.readyInMinutes} minutes
                </p>
                <p>
                    <span>Servings: </span> ${recipe.servings}
                </p>
                <p>
                    <span>Dish: </span>
                    ${recipe.dishTypes.join(", ")} 
                </p>
            </div>
            <p>${recipe.summary}</p>
        </div>
    `;

    //I have no idea why this works, but it does, so dont question it
    let ingredientAmount = [];
    for (let i = 0; i < recipe.extendedIngredients.length; i++) {
        ingredientAmount.push(
            `<div class="recipe-detail-ingredients">
      <p class="ingredient-amount-measurements">${recipe.extendedIngredients[i].measures.metric.amount} ${recipe.extendedIngredients[i].measures.metric.unitLong}</p>
      <p class="ingredient-amount-ingredient">${recipe.extendedIngredients[i].name}</p>
      </div>`
        );
    }

    recipeDetailIngredients.innerHTML += `
  <div >
  <div class="ingredient-amounts">${ingredientAmount.join(" ")}</div>
  </div>
  `;

    recipeDetailInstruction.innerHTML += `<div class="recipe-instuctions"><p>${recipe.instructions}</p></div>`;

}

body.addEventListener("click", event => {
    if (event.target.classList.contains("favourite-recipe-btn")) {
        saveFavourites()
    }
})

