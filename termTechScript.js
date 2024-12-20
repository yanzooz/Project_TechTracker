import { definition } from "./object-list.js";

const menuButton = document.getElementById("menuButton");
const backButton = document.getElementById("back");
const addFavButton = document.getElementById("addFav");
const MY_FAV_BUTTON = document.getElementById("myFavButton");

const TTWord = document.getElementById("termTechniqueWord");
const TTDef = document.getElementById("termTechniqueDefinition");

function getAndDisplay() {
  let searchParams = new URLSearchParams(window.location.search);
  const paramValue = searchParams.get("id");
  definition.forEach((item) => {
    // === comparaison avec typage / toString() convertit un nombre en chaine de caracatere
    if (paramValue === item.id.toString()) {
      TTWord.innerHTML = item.word;
      TTDef.innerHTML = item.meaning;
    }
  });
  return paramValue;
}

function addToFavoriteList(paramValue) {
  // Récupère le tableau des favoris depuis le localStorage
  let favoriteTerms = JSON.parse(localStorage.getItem("favoriteTerms")) || [];
  if (favoriteTerms.includes(paramValue)) {
    // Cas 2 : paramValue est déjà dans le tableau, on le retire
    favoriteTerms = favoriteTerms.filter((term) => term !== paramValue); // Supprime l'élément
    localStorage.setItem("favoriteTerms", JSON.stringify(favoriteTerms)); // Met à jour le localStorage
    console.log(`${paramValue} has been removed from your favorites`);
    addFavButton.innerHTML = "Ajout aux favoris ❤"
  } else {
    // Cas 1 : paramValue n'est pas dans le tableau, on l'ajoute
    favoriteTerms.push(paramValue); // Ajoute l'élément
    localStorage.setItem("favoriteTerms", JSON.stringify(favoriteTerms)); // Met à jour le localStorage
    console.log(`${paramValue} has been added to your favorites`);
    addFavButton.innerHTML = "Retirez des favoris ✖"
  }
}

function menu() {
  // Mes boutons de la navbar
  MY_FAV_BUTTON.addEventListener("click", () => {
    window.location.href = "myFavTerm.html";
  });

  menuButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  backButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  getAndDisplay();

  addFavButton.addEventListener("click", () => {
    console.log(getAndDisplay());
    addToFavoriteList(getAndDisplay());
  });
}

menu();
