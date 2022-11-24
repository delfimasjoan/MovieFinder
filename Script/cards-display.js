const cards = document.querySelector(".movies");

let layout = "multicard";

// function to change card layout
function toggleDisplay() {
  // declared inside the function because card doesnt exist when JS is loaded, it has to wait for the API.
  // document.getElementsByClassName doesnt work because it returns a HTMLCollection, not an array, so we have to convert it to an array.
  const cardsArray = Array.from(document.getElementsByClassName("movie"));
  if (layout === "multicard") {

    // changing container classes from multi to single
    cards.classList.remove("all-movies-row");
    cards.classList.add("all-movies-col");

    // changing classes for each card
    cardsArray.forEach((card) => {
      card.classList.remove("movie-row");
      card.classList.add("movie-col");
    });

    // reassignin the value of the variable to single layout
    layout = "singlecard";
  } else {

    cards.classList.remove("all-movies-col");
    cards.classList.add("all-movies-row");

    cardsArray.forEach((card) => {
      card.classList.remove("movie-col");
      card.classList.add("movie-row");
    });

    layout = "multicard";
  }
}