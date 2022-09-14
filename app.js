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
    if (expanded > 0) {
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

function expandSidebarItem(year, month, week) {
    collapseAll();
    var elements = document.getElementsByClassName("sidebar-cd-" + year+"_"+month+"_"+week);
    Array.prototype.slice.call(elements).forEach(element => {
        element.classList.remove("hidden");
        element.classList.add("sidebar-bold");
    });
    var elements = document.getElementsByClassName("sidebar-cd-" + year+"_"+month);
    Array.prototype.slice.call(elements).forEach(element => {
        element.classList.remove("hidden");
    });
    var elements = document.getElementsByClassName("sidebar-cd-" + year);
    Array.prototype.slice.call(elements).forEach(element => {
        element.classList.remove("hidden");
    });
}

function collapseAll(){
    var elements = document.getElementById("sidebar").children;
    for(let i = 0; i < elements.length; i++){
        elements[i].classList.remove("sidebar-bold");
        if (elements[i].classList.contains("sidebar-year")){
            continue;
        }
        elements[i].classList.add("hidden");
    }
}