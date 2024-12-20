import { definition } from "./object-list.js";

const MY_FAV_BUTTON = document.getElementById("myFavButton");
const menuButton = document.getElementById("menuButton");
const ALL_RADIO_LETTERS = document.querySelectorAll(".radioLetter");
const ALL_BUTTON_TERMS = document.getElementById("allButton");
let favoriteTermsId = JSON.parse(localStorage.getItem("favoriteTerms"));
let isShowAllLetter = false;
console.log(definition)

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

function filterFavoritesByFirstLetter(firstLetter) {
  let favoriteTerms = definition.filter((term) =>
    favoriteTermsId.includes(String(term.id))
  );
  console.log(favoriteTerms)
  const termList = document.getElementById("terms-list");
  termList.innerHTML = "";
  favoriteTerms.forEach((item) => {
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

function allLetterDisplay() {
  let favoriteTerms = definition.filter((term) =>
    favoriteTermsId.includes(String(term.id))
  );
  const termList = document.getElementById("terms-list");
  if (isShowAllLetter) {
    termList.innerHTML = "";
    ALL_BUTTON_TERMS.innerHTML = "ALL TERMS";
  } else {
    termList.innerHTML = "";
    ALL_BUTTON_TERMS.innerHTML = "ALL TERMS ✖";
    let sortedDefinitions = favoriteTerms.sort(function (a, b) {
      return a.word.localeCompare(b.word);
    });
    sortedDefinitions.forEach((item) => {
      let li = document.createElement("li");
      li.textContent = item.word;
      termList.appendChild(li);
      li.addEventListener("click", () => {
        launchSkeletonPageById(item.id);
      });
    });
  }
  isShowAllLetter = !isShowAllLetter;
}

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

  allLetterDisplay();

  //  FIlter
  ALL_RADIO_LETTERS.forEach((radioButton) => {
    radioButton.addEventListener("click", () => {
      filterFavoritesByFirstLetter(radioButton.value);
    });
  });


  ALL_BUTTON_TERMS.addEventListener("click", () => {
    allLetterDisplay();
  });
}

menu();
