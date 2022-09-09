document.addEventListener("DOMContentLoaded", ready);
function ready() {
  console.log("DOMContentLoaded");
}

var expanded = 0;
var scroll = 0;
window.addEventListener("scroll", (e) => {
  scroll = this.scrollY;
  updateExpanded();
});

function updateExpanded() {
  // toggle Logo & bg
  var minimizePercent = 0.11; // percent to scroll until logo minimizes

  if (expanded + scroll / (window.innerHeight * minimizePercent) < 1) { 
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
  if(expanded > 0){
    document.getElementById("spacer").classList.add("spacerMinimized");
  } else {
    document.getElementById("spacer").classList.remove("spacerMinimized");
  }
  // toggle the grids
  var splashContainer = button.closest(".publication-container");
  splashContainer.classList.toggle("publication-container-expanded");

  var mainArticleGrid = button.closest(".publication-grid");
  mainArticleGrid.classList.toggle("publication-grid-minimized");

  var extraArticlesGrid = splashContainer.getElementsByClassName("extra-articles-grid")[0];
  extraArticlesGrid.classList.toggle("extra-articles-grid-shown");

}

function clickedOnDate(date){
  console.log(date.innerHTML);
  
  if(date.innerHTML == "week 1"){
    //document.getElementsByClassName('publication-container')[2].scrollIntoView({behavior: 'smooth', block: "start", inline: "nearest"});
    var y = document.getElementsByClassName('publication-container')[2].getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: 'smooth'});
  } 
  if(date.innerHTML == "week 2"){
    //document.getElementsByClassName('publication-container')[1].scrollIntoView({behavior: 'smooth', block: "start", inline: "nearest"});
    var y = document.getElementsByClassName('publication-container')[1].getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: 'smooth'});
  } 
  if(date.innerHTML == "week 3"){
    //document.getElementsByClassName('publication-container')[0].scrollIntoView({behavior: 'smooth', block: "start", inline: "nearest"});
    var y = document.getElementsByClassName('publication-container')[0].getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: 'smooth'});
  } 
}