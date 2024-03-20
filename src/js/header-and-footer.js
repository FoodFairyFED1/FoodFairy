const burger_menu = document.querySelector(".burger-menu");
const favs_menu = document.querySelector(".favs-menu")

export function toggleBurgerMenu() {
    if (burger_menu.style.display === "none" || burger_menu.style.display === "") {
        burger_menu.style.display = "flex";
    } else {
        burger_menu.style.display = "none";
    }
}

export function toggleFavsMenu() {
    if (favs_menu.style.display === "none" || favs_menu.style.display === "") {
        favs_menu.style.display = "flex";
    } else {
        favs_menu.style.display = "none";
    }
}