// Handle save when a save button is clicked
// Get the container element
const foundRecipes = document.querySelector(".found-recipes");

// Attach eventlistener in found-recipes container
foundRecipes.addEventListener("click", (event) => {
  // Determine which button is clicked
  let clickedButton = event.target;

  let list = Array.from(document.querySelectorAll(".save-btn"));
  let index = list.indexOf(clickedButton);

  // Declare variables
  let title = document.querySelector(`.card-title-${index + 1}`).innerHTML;
  let calories = document.querySelector(`.calories-${index + 1}`).innerHTML;
  let servings = document.querySelector(`.servings-${index + 1}`).innerHTML;
  let source = document.querySelector(`.source-${index + 1}`).innerHTML;
  let image = document.querySelector(`.image-${index + 1}`).getAttribute("src");
  let link = document.querySelector(`.link-${index + 1}`).getAttribute("href");

  // Create object
  let recipeObject = {
    title: title,
    calories: calories,
    servings: servings,
    source: source,
    image: image,
    link: link,
    marked: "Not marked",
  };

  // Set empty recipe storage array
  let savedRecipes = [];

  // Check if local storage object exists
  if (!localStorage["savedRecipes"]) {
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }

  // Get old recipe list
  let oldRecipeList = JSON.parse(localStorage["savedRecipes"]);

  // Push recipe object into old list and convert to new list
  oldRecipeList.push(recipeObject);
  newRecipeList = oldRecipeList;

  // Push new list into storage
  localStorage.setItem("savedRecipes", JSON.stringify(newRecipeList));

  // Display success message
  const successContainer = document.querySelector(".alert-success");
  successContainer.innerHTML = `${title} is successfully added to your saved recipes!`;
  successContainer.style.top = "2rem";

  // Undo animation by restoring elements place
  setTimeout(() => {
    successContainer.style.top = "-10rem";
  }, 3000);
});
