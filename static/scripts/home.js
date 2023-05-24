// Detect click on "save" button and get needed data to save
document.querySelector("body").addEventListener("click", (event) => {
  let click = event.target;
  if (click.closest("button").classList.contains("save-btn")) {
    let clickedCard = click.closest(".card-container");
    clickedCard.classList.add("clicked");

    // Loop through al cards and check for "clicked" class
    const allCards = document.querySelectorAll(".card");
    const allTitles = document.querySelectorAll(".card-title");
    const allCalories = document.querySelectorAll(".value-calories");
    const allServings = document.querySelectorAll(".value-servings");
    const allSources = document.querySelectorAll(".value-source");
    const allImages = document.querySelectorAll(".card-img-top");
    const allLinks = document.querySelectorAll(".card-link");

    for (let index = 0; index < allCards.length; index++) {
      if (allCards[index].classList.contains("clicked")) {
        let title = allTitles[index].innerHTML;
        let calories = allCalories[index].innerHTML;
        let servings = allServings[index].innerHTML;
        let source = allSources[index].innerHTML;
        let image = allImages[index].getAttribute("src");
        let link = allLinks[index].getAttribute("href");

        // Define local storage variables
        let savedRecipes = [];
        let recipeObject = {
          title: title,
          calories: calories,
          servings: servings,
          source: source,
          image: image,
          link: link,
        };

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

        setTimeout(() => {
          successContainer.style.top = "-10rem";
        }, 3000);

        // Remove "clicked" class from card
        clickedCard.classList.remove("clicked");
      }
    }
  }
});
