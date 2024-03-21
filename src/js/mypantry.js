import { toggleBurgerMenu } from "./header-and-footer.js";
import { toggleFavsMenu } from "./header-and-footer.js";

const toggleBurgerMenuBTN = document.querySelector(".btn-toggle-burger-menu");
const toggleFavsMenuBTN = document.querySelector(".btn-toggle-fav-menu");
const btnTogglePantry = document.querySelector(".btn-toggle-pantry");
const toggleFilterMenu = document.querySelector(".toggle-filter-menu");
const categoryToggleDairy = document.querySelector(".category-toggle-dairy");
const categoryToggleVegetables = document.querySelector(".category-toggle-vegetables");
const categoryToggleMeat = document.querySelector(".category-toggle-meat");
const categoryToggleRice = document.querySelector(".category-toggle-rice");
const dairyContainer = document.querySelector(".dairy-container");
const vegetablesContainer = document.querySelector(".vegetables-container");
const meatContainer = document.querySelector(".meat-container");
const riceContainer = document.querySelector(".rice-container");

toggleBurgerMenuBTN.addEventListener("click", function () {
  toggleBurgerMenu();
});

toggleFavsMenuBTN.addEventListener("click", function () {
  toggleFavsMenu();
});

btnTogglePantry.addEventListener("click", ()=> {
  if (toggleFilterMenu.style.display === "none"){
    toggleFilterMenu.style.display = "block";
  } else {
    toggleFilterMenu.style.display = "none";
  }
});

categoryToggleDairy.addEventListener("click", ()=> {
  if (dairyContainer.style.display === "none"){
    dairyContainer.style.display = "block";
  } else {
    dairyContainer.style.display = "none";
  }
});

categoryToggleVegetables.addEventListener("click", ()=> {
  if (vegetablesContainer.style.display === "none"){
    vegetablesContainer.style.display = "block";
  } else {
    vegetablesContainer.style.display = "none";
  }
});

categoryToggleMeat.addEventListener("click", ()=> {
  if (meatContainer.style.display === "none"){
    meatContainer.style.display = "block";
  } else {
    meatContainer.style.display = "none";
  }
});

categoryToggleRice.addEventListener("click", ()=> {
  if (riceContainer.style.display === "none"){
    riceContainer.style.display = "block";
  } else {
    riceContainer.style.display = "none";
  }
});

