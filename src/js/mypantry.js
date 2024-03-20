import {toggleBurgerMenu} from "./header-and-footer.js";
import {toggleFavsMenu} from "./header-and-footer.js";

const toggleBurgerMenuBTN = document.querySelector(".btn-toggle-burger-menu")
const toggleFavsMenuBTN = document.querySelector(".btn-toggle-fav-menu")

toggleBurgerMenuBTN.addEventListener("click", function(){
    toggleBurgerMenu()
})

toggleFavsMenuBTN.addEventListener("click", function (){
    toggleFavsMenu()
})