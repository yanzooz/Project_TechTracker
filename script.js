import { definition } from "./object-list.js";

const MY_FAV_BUTTON = document.getElementById("myFavButton");
const menuButton = document.getElementById("menuButton");
const ALL_BUTTON_TERMS = document.getElementById("allButton");
let isShowAllLetter = false;
let favoriteTermsId = JSON.parse(localStorage.getItem("favoriteTerms"));

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
        let favoriteTerms = JSON.parse(localStorage.getItem("favoriteTerms"));
        console.log(favoriteTerms);
        window.location.href = `termTechnique.html?id=${id}`;
      }
    });
  }
}
// fonction qui filtre la liste et affiche en fonction des termes techniques
function filterByFirstLetter(firstLetter) {
  const termList = document.getElementById("terms-list");
  termList.innerHTML = "";
  termList.style.height = "auto";
  termList.style.overflowY = "hidden";
  definition.forEach((item) => {
    if (item.word[0].toLowerCase() === firstLetter.toLowerCase()) {
      const li = document.createElement("li");
      console.log(
        `item.id: ${item.id.toString()} / favoriteTermsId: ${favoriteTermsId} `
      );
      if (favoriteTermsId.includes(item.id.toString())) {
        li.textContent = `${item.word} ❤️`;
        li.style.backgroundColor = "#ffff";
      } else {
        li.textContent = item.word;
      }
      termList.appendChild(li);
      li.addEventListener("click", () => {
        launchSkeletonPageById(item.id);
      });
    }
  });
}

function allLetterDisplay() {
  const termList = document.getElementById("terms-list");
  termList.style.height = "40vh";
  termList.style.overflowY = "scroll";
  if (isShowAllLetter) {
    termList.innerHTML = "";
    ALL_BUTTON_TERMS.innerHTML = "AFFICHER TOUS";
  } else {
    termList.innerHTML = "";
    ALL_BUTTON_TERMS.innerHTML = " REDUIRE TOUS ✖";
    let sortedDefinitions = definition.sort(function (a, b) {
      return a.word.localeCompare(b.word);
    });
    sortedDefinitions.forEach((item) => {
      let li = document.createElement("li");
      if (favoriteTermsId) {
        if (favoriteTermsId.includes(item.id.toString())) {
          li.textContent = `${item.word} ❤️`;
          li.style.backgroundColor = "#ffff";
        }
      } else {
        li.textContent = item.word;
      }
      termList.appendChild(li);
      li.addEventListener("click", () => {
        launchSkeletonPageById(item.id);
      });
    });
  }
  isShowAllLetter = !isShowAllLetter;
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
    window.location.href = "myFavTerm.html";
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

  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page
    console.log("Formulaire soumis sans rechargement !");
  });
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      console.log("entrer key");
      launchSkeletonPageByUserInput(searchUser.value.toLowerCase());
    }
  });

  const ALL_RADIO_LETTERS = document.querySelectorAll(".radioLetter");
  ALL_RADIO_LETTERS.forEach((radioButton) => {
    radioButton.addEventListener("click", () => {
      console.log("click letter");
      filterByFirstLetter(radioButton.value);
    });
  });

  allLetterDisplay();
  ALL_BUTTON_TERMS.addEventListener("click", () => {
    allLetterDisplay();
  });
}

menu();
