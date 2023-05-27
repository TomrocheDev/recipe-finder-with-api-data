// Render saved items in "saved-recipes-container"
const savedRecipesContainer = document.querySelector(
  ".saved-recipes-container"
);

// Get local storage data
let savedRecipesLS = JSON.parse(localStorage["savedRecipes"]) || [];

savedRecipesLS.forEach((element) => {
  let newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.setAttribute("style", "width: 18rem;");

  newCard.innerHTML = `
        <img src="${element.image}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">
                <span class="calories">Calories: ${element.calories}</span> <br />
                <span class="servings">Servings: ${element.servings}</span><br />
                <span class="source">Source: ${element.source}</span><br />
            </p>
            <div class="card-buttons">
                <a href="${element.link}" class="btn btn-outline-danger visit-btn" target="_blank">Visit site</a>
                <button class="btn btn-danger delete-btn">Delete recipe</button>
        </div>`;

  savedRecipesContainer.append(newCard);
});

// Make deleting recipes possible
console.log(savedRecipesLS);
savedRecipesContainer.addEventListener("click", (event) => {
  // Get index of clicked button
  clickedButton = event.target;
  const savedItemList = Array.from(document.querySelectorAll(".delete-btn"));
  let deleteIndex = savedItemList.indexOf(clickedButton);

  // Remove indexed position from savedRecipes
  savedRecipesLS.splice(deleteIndex, 1); // savedRecipes is declared in line 7

  // Set savedRecipes back in local storage
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipesLS));

  // Reload page after deletion
  document.location.reload();
});
