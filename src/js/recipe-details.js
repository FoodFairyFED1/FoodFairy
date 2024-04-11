import { API_KEY } from "../../API_KEY.js";
import { toggleBurgerMenu } from "./header-and-footer.js";
import { toggleFavsMenu } from "./header-and-footer.js";
import { saveFavourites } from "./header-and-footer.js";

const toggleBurgerMenuBTN = document.querySelector(".btn-toggle-burger-menu");
const toggleFavsMenuBTN = document.querySelector(".btn-toggle-fav-menu");
const recipeDetailInfo = document.querySelector(".recipe-detail-info-section");
const recipeDetailIngredients = document.querySelector(
  ".recipe-detail-ingredients-section"
);
const recipeDetailInstruction = document.querySelector(
  ".recipe-detail-instruction-section"
);
const favouriteBTN = document.querySelector(".favourite-recipe-btn");
const loader = document.querySelector(".loader");
const reSummarySection = document.querySelector(".recipe-summary-section");
const recipeSummary = document.querySelector(".recipe-summary");
const recipeSummaryBtn = document.querySelector(".summary-more-btn");

toggleBurgerMenuBTN.addEventListener("click", function () {
  toggleBurgerMenu();
});

toggleFavsMenuBTN.addEventListener("click", function () {
  toggleFavsMenu();
});

let recipeData;

async function getRecipe() {
  loader.style.display = "flex";
  const parameterString = window.location.search;
  const searchParameter = new URLSearchParams(parameterString);
  const recipeId = searchParameter.get("id");
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    );
    recipeData = await response.json();

    displayRecipe(recipeData);
  } catch (error) {
    console.log("Error: " + error);
  }
  loader.style.display = "none";
  return recipeId;
}

getRecipe();

function shortenText(text) {
  const words = text.split(" ");
  const wordsShort = words.slice(0, 20).join(" ") + "...";
  return wordsShort;
}

let recipeSummaryLong;

function displayRecipe(recipe) {
  const recipeSummaryShort = shortenText(recipe.summary);

  recipeDetailInfo.innerHTML += `
<img src="${recipe.image}" alt="food">
<div class="img-fav-div">
<h1 class="recipe-title">${recipe.title}</h1>
<img src="../assets/images/star-icon-orange.svg" alt="" class="favourite-recipe-btn">
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
</div>
`;

  recipeSummaryLong = `${recipe.summary}`;

  recipeSummary.innerHTML = `${recipeSummaryShort}`;

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

recipeSummaryBtn.addEventListener("click", function () {
  recipeSummary.innerHTML = `${recipeSummaryLong}`;
});

favouriteBTN.addEventListener("click", function () {
  saveFavourites();
});
