const myfavButton = document.getElementById("myFavButton")
const menuButton =  document.getElementById("menuButton")

function menu(){
    // Mes boutons de la navbar
    menuButton.addEventListener("click",()=>{
        console.log("click menuButton")
        window.location.href = "index.html"
    })
    myfavButton.addEventListener("click",()=>{
        console.log("click myFavButton")
        window.location.href = "termTechnique.html"
    })
    const searchButton = document.getElementById("searchButton")
    searchButton.addEventListener("click", ()=>{
        const searchTerm = document.getElementById("searchTerm").value
        console.log ("click searchButton")
        console.log(searchTerm)
    })
    
}

menu()