const cards = document.querySelector(".movies");
let text = document.querySelector("#movie-text");
const bt_row= document.querySelector("#row-bt");
const bt_col= document.querySelector("#col-bt");

let layout = "column";

// function to change card layout
function toggleDisplay() {
  // declared inside the function because card doesnt exist when JS is loaded, it has to wait for the API.
  // document.getElementsByClassName doesnt work because it returns a HTMLCollection, not an array, so we have to convert it to an array.
  const cardsArray = Array.from(document.getElementsByClassName("movie"));
  if (layout === "column") {

    // changing container classes from multi to single
    cards.classList.remove("all-movies-row");
    cards.classList.add("all-movies-col");

    // changing classes for each card
    cardsArray.forEach((card) => {
      card.classList.remove("movie-row");
      card.classList.add("movie-col");
    });

    // reassignin the value of the variable to single layout
    layout = "row";

    bt_col.innerHTML= `<svg width="59" height="36" viewBox="0 0 59 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="6" width="45" height="24" rx="2" fill="#D9D9D9"/></svg>`
    bt_row.innerHTML= `<svg width="58" height="37" viewBox="0 0 58 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="0.508118" width="58" height="35.9733" rx="3" fill="#373737"/>
    <rect x="39" y="6.50812" width="12" height="24" rx="2" fill="#D9D9D9"/>
    <rect x="23" y="6.50812" width="12" height="24" rx="2" fill="#D9D9D9"/>
    <rect x="7" y="6.50812" width="12" height="24" rx="2" fill="#D9D9D9"/>
</svg>`

  } else {

    cards.classList.remove("all-movies-col");
    cards.classList.add("all-movies-row");

    cardsArray.forEach((card) => {
      card.classList.remove("movie-col");
      card.classList.add("movie-row");
      // text.style.width= "48.30rem";
    });

    layout = "column";

    bt_row.innerHTML= `<svg width="59" height="36" viewBox="0 0 59 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="6" width="45" height="24" rx="2" fill="#D9D9D9"/></svg>`
    bt_col.innerHTML= `<svg width="59" height="37" viewBox="0 0 59 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="7" y="6.50812" width="45" height="24" rx="2" fill="#D9D9D9"/>
                        </svg>`
  }
}