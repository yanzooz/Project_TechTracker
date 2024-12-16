import { definition } from "./object-list.js";

const myfavButton = document.getElementById("myFavButton");
const menuButton = document.getElementById("menuButton");

// fonction qui retourne un tableau d'oject en fontion de l'entrée de l'utilisateur
function searchDefinition(searchUser) {
  const resultDisplay = definition.filter((object) =>
    object.word.toLowerCase().includes(searchUser.toLowerCase())
  );
  if (searchUser) {
    return resultDisplay;
  }
}
// fonction qui affiche en temps réel le tableau d'objet retourné par sD()
function displayResults(result) {
  const autoCompDisplay = document.getElementById("autoCompDisplay");
  autoCompDisplay.innerHTML = "";
  result.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.word;
    autoCompDisplay.appendChild(li);
    li.addEventListener("click", ()=>{
        const searchUser = document.getElementById("searchUser")
        searchUser.value = item.word
        autoCompDisplay.innerHTML = ""
    })
  });
}

// Script Menu
function menu() {
  // Mes boutons de la navbar
  menuButton.addEventListener("click", () => {
    console.log("click menuButton");
    window.location.href = "index.html";
  });
  myfavButton.addEventListener("click", () => {
    console.log("click myFavButton");
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
  });
}

menu();

