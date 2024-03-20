import {API_KEY} from "../../API_KEY.js";
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

export async function getRandRecipe() {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=4`);
        const result = await response.json();
        const productData = result.recipes;
        console.log(productData);
        // displayRandRecipe(productData);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

getRandRecipe()
