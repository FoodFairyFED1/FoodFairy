import { toggleBurgerMenu } from "./header-and-footer.js";
import { toggleFavsMenu } from "./header-and-footer.js";

const toggleBurgerMenuBTN = document.querySelector(".btn-toggle-burger-menu");
const toggleFavsMenuBTN = document.querySelector(".btn-toggle-fav-menu");
const btnTogglePantry = document.querySelector(".btn-toggle-pantry");
const filterMenu = document.querySelector(".filter-menu");
const categoryToggles = document.querySelectorAll(".food-item-category-btn");

toggleBurgerMenuBTN.addEventListener("click", function () {
  toggleBurgerMenu();
});

toggleFavsMenuBTN.addEventListener("click", function () {
  toggleFavsMenu();
});

btnTogglePantry.addEventListener("click", ()=> {
  filterMenu.classList.toggle("active");
});

categoryToggles.forEach(btn => {
  const container = btn.nextElementSibling;
  container.style.display = "none";

  btn.addEventListener("click", function () {
    container.style.display = (container.style.display === "none") ? "block" : "none";
  });
});

