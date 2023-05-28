// Overall variables
let savedRecipesLS = JSON.parse(localStorage["savedRecipes"]) || [];
const savedRecipesContainer = document.querySelector(
  ".saved-recipes-container"
);

// Create function for rendering a card
function renderCard(container, element) {
  let newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.setAttribute("style", "width: 18rem;");

  newCard.innerHTML = `
        <img src="${element.image}" class="card-img-top">
        <div class="btn-group dropup">
            <button type="button" class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Mark
            </button>
            <ul class="dropdown-menu dropdown-menu-mark">
                <li class="dropdown-item">
                    <button class="btn">Delicious!</button>
                </li>
                <li class="dropdown-item">
                    <button class="btn">Liked it</button>
                </li>
                <li class="dropdown-item">
                    <button class="btn">Will try it again</button>
                </li>
                <li class="dropdown-item">
                    <button class="btn">Did not like it</button>
                </li>
            </ul>
        </div>
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">
                <span class="calories">Calories: ${(
                  parseFloat(element.calories) / parseFloat(element.servings)
                ).toFixed(2)} p.p.</span> <br />
                <span class="source">Source: ${element.source}</span><br />
                <span>Marked as: ${element.marked}</span>
            </p>
            <div class="card-buttons">
                <a href="${
                  element.link
                }" class="btn btn-outline-danger visit-btn" target="_blank">Visit site</a>
                <button class="btn btn-danger delete-btn">Delete recipe</button>
        </div>`;

  container.append(newCard);
}

// Render saved items in "saved-recipes-container"
savedRecipesLS.forEach((element) => {
  renderCard(savedRecipesContainer, element);
});

// Make deleting and rating recipes possible
savedRecipesContainer.addEventListener("click", (event) => {
  // Get index of clicked button
  clickedButton = event.target;
  if (clickedButton.classList.contains("delete-btn")) {
    const savedItemList = Array.from(document.querySelectorAll(".delete-btn"));
    let deleteIndex = savedItemList.indexOf(clickedButton);

    // Remove indexed position from savedRecipes
    savedRecipesLS.splice(deleteIndex, 1); // savedRecipes is declared in line 7

    // Set savedRecipes back in local storage
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipesLS));

    // Reload page after deletion
    document.location.reload();
  } else if (clickedButton.classList.contains("dropdown-toggle")) {
    // Get index of clicked btn
    const allBtns = Array.from(document.querySelectorAll(".dropdown-toggle"));
    let index = allBtns.indexOf(clickedButton);

    // Create array from all dropdown menu's
    const allMenus = Array.from(
      document.querySelectorAll(".dropdown-menu-mark")
    );

    // Attach eventlistener to clicked menu to check the clicked value inside the menu
    allMenus[index].addEventListener("click", (event) => {
      let insideMenuValue = event.target.innerText;

      // Edit recipe in local storage
      savedRecipesLS[index].marked = insideMenuValue;

      // Save edited recipe to localstorage
      localStorage.setItem("savedRecipes", JSON.stringify(savedRecipesLS));

      // Reload page after marking
      document.location.reload();
    });
  }
});

// Create function for filtering found recipes
function filterFoundRecipes() {
  const value = document.getElementById("found-recipes-filter").value;
  savedRecipesContainer.innerHTML = "";

  if (value == "reset") {
    savedRecipesLS.forEach((element) => {
      renderCard(savedRecipesContainer, element);
    });
  } else {
    savedRecipesLS.forEach((element) => {
      if (element.marked == value) {
        renderCard(savedRecipesContainer, element);
      }
    });
  }
}
