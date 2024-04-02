import { API_KEY } from "../../API_KEY.js";
import { toggleBurgerMenu } from "./header-and-footer.js";
import { toggleFavsMenu } from "./header-and-footer.js";

const toggleBurgerMenuBTN = document.querySelector(".btn-toggle-burger-menu");
const toggleFavsMenuBTN = document.querySelector(".btn-toggle-fav-menu");
const recipeDetailInfo = document.querySelector(".recipe-detail-info");
const recipeDetailIngredients = document.querySelector(
  ".recipe-detail-ingredients"
);
const recipeDetailInstruction = document.querySelector(
  ".recipe-detail-instruction"
);

toggleBurgerMenuBTN.addEventListener("click", function () {
  toggleBurgerMenu();
});

toggleFavsMenuBTN.addEventListener("click", function () {
  toggleFavsMenu();
});

async function getRecipe() {
  const parameterString = window.location.search;
  const searchParameter = new URLSearchParams(parameterString);
  const recipeId = searchParameter.get("id");
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    displayRecipe(data);
  } catch (error) {
    console.log("Error: " + error);
  }
  return recipeId;
}

getRecipe();

function displayRecipe(recipe) {
  recipeDetailInfo.innerHTML = `
<h1>${recipe.title}</h1>
<img src="${recipe.image}" alt="food">
<div>
    <p>
        <span>Ready in: </span>
        ${recipe.readyInMinutes}
    </p>
    <p>
        <span>Servings: </span>
        ${recipe.servings}
    </p>
    <p>
        <span>Dish: </span>
        ${recipe.dishTypes.join(", ")} 
    </p>
    <p>${recipe.summary}</p>
</div>
`;

  const ingredient = recipe.extendedIngredients
    .map((ingredient) => `<p>${ingredient.name}</p>`)
    .join(" ");

  recipeDetailIngredients.innerHTML += ingredient;
  console.log(recipeDetailInstruction);
  console.log(recipe.instructions);
  recipeDetailInstruction.innerHTML += `<div>${recipe.instructions}</div>`;
}
