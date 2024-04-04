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
    console.log("selected food items", selectedFoodItems)
    return selectedFoodItems;
}

async function getMyPantryRecipes() {
    const selectedFoodItems = await getSelectedFoodItems();
    console.log(selectedFoodItems);
    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${selectedFoodItems}&number=10`
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const recipeData = await response.json();
        console.log(recipeData);
        displayMyPantryRecipes(recipeData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


function displayMyPantryRecipes(recipes) {
    pantryRecipeContainer.innerHTML = "";
    recipes.forEach((recipe) => {
        pantryRecipeContainer.innerHTML += `
        <a class="pantry-recipe-card" href="pages/recipe-details.html?id=${recipe.id}">
            <div class="pantryRecipeCardStart">
                <img class="pantryRecipeCardImage" src="${recipe.image}">
            </div>
            <div class="pantryRecipeCardEnd">
                <h3 class="pantryRecipeCardTitle">${recipe.title}</h3>
                <div class="pantryRecipeCardCTA">See more</div>
            </div>
        </a>
        `;
    });
}

findRecipeButton.addEventListener("click", function () {
    console.log("Before calling getMyPantryRecipes");
    getMyPantryRecipes();
    console.log("After calling getMyPantryRecipes");
})