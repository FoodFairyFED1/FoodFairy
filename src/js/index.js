import { API_KEY } from "../../API_KEY.js";
import { toggleBurgerMenu } from "./header-and-footer.js";
import { toggleFavsMenu } from "./header-and-footer.js";
import { getFavourites } from "./header-and-footer.js";

const toggleBurgerMenuBTN = document.querySelector(".btn-toggle-burger-menu");
const toggleFavsMenuBTN = document.querySelector(".btn-toggle-fav-menu");
const randRecipeContainer = document.querySelector(".rand-recipe-section");
const loader = document.querySelector(".loader");

toggleBurgerMenuBTN.addEventListener("click", function () {
  toggleBurgerMenu();
});

toggleFavsMenuBTN.addEventListener("click", function () {
  toggleFavsMenu();
});

async function getRandRecipe() {
  loader.style.display = "flex";
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=4`
    );
    const result = await response.json();
    const recipeData = result.recipes;
    displayRandRecipe(recipeData);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  loader.style.display = "none";
}

getRandRecipe();

function displayRandRecipe(recipes) {
  randRecipeContainer.innerHTML = "";
  recipes.forEach((recipe) => {
    randRecipeContainer.innerHTML += `
        <a class="rand-recipe-card" href="pages/recipe-details.html?id=${recipe.id}">
            <div class="recipeCardStart">
                <img class="recipeCardImage" src="${recipe.image}">
            </div>
            <div class="recipeCardEnd">
                <h3 class="recipeCardTitle">${recipe.title}</h3>
                <div class="recipeCardCTA">See more</div>
            </div>
        </a>
        `;
  });
}

window.addEventListener('load', () => {
  getFavourites();
});

