// Render saved items in "saved-recipes-container"
const savedRecipesContainer = document.querySelector(
  ".saved-recipes-container"
);

// Get local storage data
let savedRecipesLS = JSON.parse(localStorage["savedRecipes"]) || [];

savedRecipesLS.forEach((element) => {
  let newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.setAttribute("style", "width: 18rem");

  newCard.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${element.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">
                <span class="calories">Calories: ${element.calories}</span> <br />
                <span class="servings">Servings: ${element.servings}</span><br />
                <span class="source">Source: ${element.source}</span><br />
            </p>
            <a href="${element.link}" class="btn btn-danger">Visit site</a>
        </div>
    </div>`;

  savedRecipesContainer.append(newCard);
});
