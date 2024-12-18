import { definition } from "./object-list.js";

const MY_FAV_BUTTON = document.getElementById("myFavButton");
const menuButton = document.getElementById("menuButton");

// fonction qui retourne un tableau d'oject en fontion de l'entrée de l'utilisateur
function searchDefinition(searchUser) {
  if (!searchUser) return []; // Retourner un tableau vide si la recherche est vide
  const resultDisplay = definition.filter((object) =>
    object.word.toLowerCase().startsWith(searchUser.toLowerCase())
  );
  return resultDisplay;
}
// fonction qui affiche en temps réel le tableau d'objet retourné par sD()
function displayResults(result) {
  const autoCompDisplay = document.getElementById("autoCompDisplay");
  autoCompDisplay.innerHTML = "";
  result.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.word;
    autoCompDisplay.appendChild(li);
    li.addEventListener("click", () => {
      const searchUser = document.getElementById("searchUser");
      searchUser.value = item.word;
      autoCompDisplay.innerHTML = "";
    });
  });
}
// fonction qui lance un squelette d'une page en fonction de la recherche de l'user
function launchSkeletonPageByUserInput(searchUser) {
  if (searchUser) {
    definition.forEach((item) => {
      const def = item.word.toLowerCase();
      const id = item.id;
      console.log(searchUser);
      if (searchUser === def) {
        window.location.href = `termTechnique.html?id=${id}`;
      }
    });
  }
}

function launchSkeletonPageById(id) {
  if (id) {
    definition.forEach((item) => {
      if (id === item.id) {
        // Ce code recoit un un id / il initilize un local storage avec une paire clé valeur / 
        // si le local storage est vide ou contient pas le meme id  on crée un tableau contenant un id  /
        // si le tableau n'est pas vide et l'id et different de tous les id du tableau on push alors l'id dans le tableau 
        let favoriteTerms = JSON.parse(localStorage.getItem("favoriteTerms"));
        console.log(favoriteTerms);
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

        window.location.href = `termTechnique.html?id=${id}`;
      }
    });
  }
}
// fonction qui filtre la liste et affiche en fonction des termes techniques
function filterByFirstLetter(firstLetter) {
  const termList = document.getElementById("terms-list");
  termList.innerHTML = "";
  definition.forEach((item) => {
    if (item.word[0].toLowerCase() === firstLetter.toLowerCase()) {
      const li = document.createElement("li");
      li.textContent = item.word;
      termList.appendChild(li);
      li.addEventListener("click", () => {
        launchSkeletonPageById(item.id);
      });
    }
  });
}

// Script Menu
function menu() {
  // Mes boutons de la navbar
  menuButton.addEventListener("click", () => {
    console.log("click menuButton");
    window.location.href = "index.html";
  });
  MY_FAV_BUTTON.addEventListener("click", () => {
    console.log("click MY_FAV_BUTTON");
    window.location.href = "termTechnique.html";
  });

  //   Section Search
  const searchInput = document.getElementById("searchUser");
  searchInput.addEventListener("input", () => {
    let searchUser = searchInput.value.trim();
    const results = searchDefinition(searchUser);
    displayResults(results);
  });

  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", () => {
    console.log("click searchButton");
    launchSkeletonPageByUserInput(searchUser.value.toLowerCase());
  });

  const ALL_RADIO_LETTERS = document.querySelectorAll(".radioLetter");
  ALL_RADIO_LETTERS.forEach((radioButton) => {
    radioButton.addEventListener("click", () => {
      filterByFirstLetter(radioButton.value);
    });
  });
}

menu();
