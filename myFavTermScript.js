import { definition } from "./object-list.js";

const MY_FAV_BUTTON = document.getElementById("myFavButton");
const menuButton = document.getElementById("menuButton");
const ALL_RADIO_LETTERS = document.querySelectorAll(".radioLetter");
const ALL_BUTTON_TERMS = document.getElementById("allButton");
let favoriteTermsId = JSON.parse(localStorage.getItem("favoriteTerms"));

let isShowAllLetter = false;


function filterFavoritesByFirstLetter(firstLetter) {
  let favoriteTerms = definition.filter((term) =>
    favoriteTermsId.includes(term.id)
  );
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
  const termList = document.getElementById("terms-list");
  if (isShowAllLetter) {
    termList.innerHTML = "";
    ALL_BUTTON_TERMS.innerHTML = "ALL TERMS";
  } else {
    termList.innerHTML = "";
    ALL_BUTTON_TERMS.innerHTML = "ALL TERMS ✖";
    let sortedDefinitions = definition.sort(function (a, b) {
      return a.word.localeCompare(b.word);
    });

    let step = 0;
    const interval = setInterval(() => {
      let li = document.createElement("li");
      li.textContent = sortedDefinitions[step].word;
      termList.appendChild(li);

      step++;

      if (step >= sortedDefinitions.length) {
        clearInterval(interval);
      }
    }, 10);
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
