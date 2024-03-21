
import { API_KEY } from "../../API_KEY.js";
import { toggleBurgerMenu } from "./header-and-footer.js";
import { toggleFavsMenu } from "./header-and-footer.js";

const toggleBurgerMenuBTN = document.querySelector(".btn-toggle-burger-menu");
const toggleFavsMenuBTN = document.querySelector(".btn-toggle-fav-menu");

toggleBurgerMenuBTN.addEventListener("click", function () {
  toggleBurgerMenu();
});

toggleFavsMenuBTN.addEventListener("click", function () {
  toggleFavsMenu();
});

const parameterString = window.location.search;
const searchParameter = new URLSearchParams(parameterString);
const id = searchParameter.get("id");

async function getRecipe(id) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const data = await response.json();
  } catch (error) {
    console.log("an error has happened: " + error);
  }
}
