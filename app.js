document.addEventListener("DOMContentLoaded", ready);
function ready() {
  console.log("DOMContentLoaded");
}

var lastExpanded = null;
var expanded = 0;
var scroll = 0;
window.addEventListener("scroll", (e) => {
  scroll = this.scrollY;
  updateExpanded();
});

function updateExpanded() {
  // toggle Logo & bg
  if (expanded + scroll / 100 < 1) {
    var logo = document.getElementById("logo");
    logo.classList.remove("logoMinimized");
    var logoBg = document.getElementById("logoBg");
    logoBg.classList.add("logoBgHidden");
  } else {
    var logo = document.getElementById("logo");
    logo.classList.add("logoMinimized");
    var logoBg = document.getElementById("logoBg");
    logoBg.classList.remove("logoBgHidden");
  }
}

function toggleExpandArticle(button) {
  console.log("expanding article");
  console.log(button);

  // replace button text
  if (button.innerHTML != "Hide Extras") {
    button.innerHTML = "Hide Extras";
    expanded++;
  } else {
    button.innerHTML = "Extras";
    expanded--;
  }
  updateExpanded();
  // toggle the grids
  var splashContainer = button.closest(".publication-container");
  splashContainer.classList.toggle("publication-container-expanded");

  var mainArticleGrid = button.closest(".publication-grid");
  mainArticleGrid.classList.toggle("publication-grid-minimized");

  var extraArticlesGrid = splashContainer.getElementsByClassName(
    "extra-articles-grid"
  )[0];
  extraArticlesGrid.classList.toggle("extra-articles-grid-shown");

  lastExpanded = button; // SO we can close the previous one when the user
  // click on a new one in the infinite scrolling
}
