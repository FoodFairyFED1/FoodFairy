import {API_KEY} from "../../API_KEY.js";
import {toggleBurgerMenu} from "./header-and-footer.js";
import {toggleFavsMenu} from "./header-and-footer.js";

const toggleBurgerMenuBTN = document.querySelector(".btn-toggle-burger-menu");
const toggleFavsMenuBTN = document.querySelector(".btn-toggle-fav-menu");
const randRecipeContainer = document.querySelector(".rand-recipe-section");

toggleBurgerMenuBTN.addEventListener("click", function () {
    toggleBurgerMenu()
});

toggleFavsMenuBTN.addEventListener("click", function () {
    toggleFavsMenu()
});

async function getRandRecipe() {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=4`);
        const result = await response.json();
        const recipeData = result.recipes;
        console.log(recipeData);
        displayRandRecipe(recipeData);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

getRandRecipe()

function displayRandRecipe(recipes) {
    randRecipeContainer.innerHTML = '';
    recipes.forEach((recipe) => {
        const summaryWords = recipe.summary.split(' ');
        const firstXWords = summaryWords.slice(0, 4);
        const truncatedSummary = firstXWords.join(' ') + '...';
        randRecipeContainer.innerHTML += `
        <div class="rand-recipe-card">
            <div class="recipeCardStart">
                <img class="recipeCardImage" src="${recipe.image}">
            </div>
            <div class="recipeCardEnd">
                <h3>${recipe.title}</h3>
                <span>${truncatedSummary}</span>
                <button>See more</button>
            </div>
        </div>
        `;
    });
}


