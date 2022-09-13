document.addEventListener("DOMContentLoaded", ready);
function ready() {
  console.log("DOMContentLoaded");
}

var expanded = 0;
var scroll = 0;
var lastExpandedSiderbarItem = null;
var lastExpandedSiderbarItemType = "year";

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

function clickedOnSidebar(itemClicked, year, month, week){
  //console.log("year " + year + " month " + month + " week " + week);

  var type = null;
  // Update Bold text
  //itemClicked.classList.toggle("sidebar-bold");
  if(month == null && week == null){
    type = "year";
  } else if(week == null){
    type = "month";
  } else {
    type = "week";
  }

  if(type == "year"){
    toggleExpandedSidebar(itemClicked, year, null, null, type);
  } else if (type == "month"){
    toggleExpandedSidebar(itemClicked, year, month, null, type);
  } else if (type == "week"){
    toggleExpandedSidebar(itemClicked, year, month, week, type);
    scrollToArticle(year, month, week);
  }

  //lastExpandedSiderbarItem = itemClicked;
  //lastExpandedSiderbarItemType = type;
}

function toggleExpandedSidebar(itemClicked, year, month, week, type){
  
  // clear previous bold && collapse 
  collapseAll();

  
  // bold the selected text && expand
  console.log(type);
  if(type == "year"){
    itemClicked.classList.add("sidebar-bold");
    itemClicked.classList.remove("hidden");
    itemClicked.children[0].classList.add("sidebar-bold");
    itemClicked.children[0].children[0].classList.add("sidebar-bold");

    // reveal all other months in the year
    for (let i = 0; i < itemClicked.children.length; i++) {
      itemClicked.children[i].classList.remove("hidden");
    }

    // reveal all weeks in the latest month
    for (let f = 0; f < itemClicked.children[0].children.length; f++) {
      itemClicked.children[0].children[f].classList.remove("hidden");
    }
  } 
  else if (type == "month"){
    itemClicked.children[0].classList.add("sidebar-bold");
    itemClicked.children[0].classList.remove("hidden");
    itemClicked.classList.add("sidebar-bold");
    itemClicked.classList.remove("hidden");
    itemClicked.parentElement.classList.add("sidebar-bold");

    // reveal all the weeks in the selected month
    for (let f = 0; f < itemClicked.children.length; f++) {
      itemClicked.children[f].classList.remove("hidden");
    }
  } 
  else if (type == "week"){
    itemClicked.classList.add("sidebar-bold");
    itemClicked.classList.remove("hidden");
    itemClicked.parentElement.classList.add("sidebar-bold");
    itemClicked.parentElement.classList.remove("hidden");
    itemClicked.parentElement.parentElement.classList.add("sidebar-bold");
    itemClicked.parentElement.parentElement.classList.remove("hidden");
    

    // reveal all the sibling weeks in the selected month
    for (let f = 0; f < itemClicked.parentElement.children.length; f++) {
      itemClicked.parentElement.children[f].classList.remove("hidden");
    }
  }
}


function collapseAll(){
  // it does not collapse the year
  var sidebar = document.getElementById('sidebar');
  console.log(sidebar);
  for( let a = 0; a < sidebar.children.length; a++){
    var yearDiv = sidebar.children[a]; 
    yearDiv.classList.remove("sidebar-bold");

    for (let b = 0; b < yearDiv.children.length; b++){
      var monthDiv = yearDiv.children[b]; 
      monthDiv.classList.remove("sidebar-bold");
      monthDiv.classList.add("hidden");

      for(let c = 0; c < monthDiv.children.length; c++){
        var weekDiv = monthDiv.children[c]; 
        weekDiv.classList.remove("sidebar-bold");
        weekDiv.classList.add("hidden");
      }

    }
  }
  
}


function scrollToArticle(year, month, week){
  var scrollOffset = window.innerHeight * 0.1;

  //var y = document.getElementsByClassName('publication-container')[2].offsetTop - scrollOffset;
  //window.scrollTo({ top: y, behavior: 'smooth'});
}