import { definition } from "./object-list.js";

const MY_FAV_BUTTON = document.getElementById("myFavButton");
const menuButton = document.getElementById("menuButton");
const backButton = document.getElementById("back");
const addFavButton = document.getElementById("addFav");

const TTWord = document.getElementById("termTechniqueWord");
const TTDef = document.getElementById("termTechniqueDefinition");

function getAndDisplay() {
  let searchParams = new URLSearchParams(window.location.search);
  const paramValue = searchParams.get("id");
  definition.forEach((item) => {
    // === comparaison avec typage / toString() convertit un nombre en chaine de caracatere
    if (paramValue === item.id.toString()) {
      console.log(`TTword = ${item.word}`);
      TTWord.innerHTML = item.word;
      TTDef.innerHTML = item.meaning;
      addFavButton.addEventListener("click", () => {
        console.log(`${item.id} has been add to your favorite`);
        let favoriteTerms = JSON.parse(localStorage.getItem("favoriteTerms"));
        if (favoriteTerms) {
          if (!favoriteTerms.includes(item.id)) {
            favoriteTerms.push(item.id);
            localStorage.setItem(
              "favoriteTerms",
              JSON.stringify(favoriteTerms)
            );
          }
        } else {
          localStorage.setItem("favoriteTerms", JSON.stringify([item.id]));
        }
      console.log(favoriteTerms) 
      });
    }
  });
}

function menu() {
  // Mes boutons de la navbar
  menuButton.addEventListener("click", () => {
    console.log("click menuButton");
    window.location.href = "index.html";
  });
  backButton.addEventListener("click", () => {
    console.log("click menuButton");
    window.location.href = "index.html";
  });
  getAndDisplay();
}

menu();
