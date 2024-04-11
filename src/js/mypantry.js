import {toggleFavsMenu, getFavourites, toggleBurgerMenu} from "./header-and-footer.js";
import {API_KEY} from "../../API_KEY.js";

const toggleBurgerMenuBTN = document.querySelector(".btn-toggle-burger-menu");
const toggleFavsMenuBTN = document.querySelector(".btn-toggle-fav-menu");
const btnTogglePantry = document.querySelector(".btn-toggle-pantry");
const filterMenu = document.querySelector(".filter-menu");
const categoryToggles = document.querySelectorAll(".food-item-category-btn");
const foodItemCheckboxes = document.querySelectorAll(".food-list-checkbox");
const pantryRecipeContainer = document.querySelector(".pantry-recipes-container");
const findRecipeButton = document.querySelector(".find-recipe-btn");
const loader = document.querySelector(".loader");


toggleBurgerMenuBTN.addEventListener("click", function () {
    toggleBurgerMenu();
});

toggleFavsMenuBTN.addEventListener("click", function () {
    toggleFavsMenu();
});

btnTogglePantry.addEventListener("click", () => {
    filterMenu.classList.toggle("active");
});

categoryToggles.forEach(btn => {
    const container = btn.nextElementSibling;
    container.style.display = "none";

    btn.addEventListener("click", function () {
        container.style.display = (container.style.display === "none") ? "block" : "none";
    });
});

window.addEventListener('load', () => {
    getFavourites();
});

async function getSelectedFoodItems() {
    let selectedFoodItems = '';

    foodItemCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedFoodItems += checkbox.value + ',' + '+';
        }
    });

    selectedFoodItems = selectedFoodItems.slice(0, -2);
    return selectedFoodItems;
}

async function getMyPantryRecipes() {
    loader.style.display = "flex";
    const selectedFoodItems = await getSelectedFoodItems();
    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${selectedFoodItems}&number=10`
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const recipeData = await response.json();
        displayMyPantryRecipes(recipeData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    loader.style.display = "none";
}

function displayMyPantryRecipes(recipes) {
    pantryRecipeContainer.innerHTML = "";

    recipes.forEach((recipe) => {
        let usedIngredientsList = recipe.usedIngredients.map(ingredient => `<li>${ingredient.name}</li>`).join('');
        let missingIngredientsList = recipe.missedIngredients.map(ingredient => `<li>${ingredient.name}</li>`).join('');

        pantryRecipeContainer.innerHTML += `
            <a class="pantry-recipe-card" href="../pages/recipe-details.html?id=${recipe.id}">
                    <img class="pantryRecipeCardImage" src="${recipe.image}">
                </div>
                    <h3 class="pantryRecipeCardTitle">${recipe.title}</h3>
                    <div class="pantryRecipeCardIngredientsContainer">
                    <div class="usedIngredientsListContainer">
                    <h4>Used Ingredients:</h4>
                    <ul class="usedIngredientsList">
                        ${usedIngredientsList}
                    </ul>
                    </div>
                    <div class="missingIngredientsListContainer">
                    <h4>Missing Ingredients:</h4>
                    <ul class="missingIngredientsList">
                        ${missingIngredientsList}
                    </ul>
                    </div>
                    </div>
                    <div class="pantryRecipeCardCTA">See more</div>
                </div>
            </a>
        `;
    });
}


findRecipeButton.addEventListener("click", function () {
    getMyPantryRecipes();
    filterMenu.classList.toggle("active");
})

const checkAllToggle = document.querySelector(".check-all-toggle");

checkAllToggle.addEventListener("click", () => {
    console.log("it works");
    if (checkAllToggle.innerText === "Check all") {
        checkAllToggle.innerText = `Uncheck all`;
        foodItemCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        })
    } else {
        checkAllToggle.innerText = `Check all`;
        foodItemCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        })
    }
})

