document.addEventListener("DOMContentLoaded", ready);
function ready() {
    console.log("DOMContentLoaded");
}

var lastExpanded = null;

function toggleExpandArticle(button){

    console.log("expanding article");
    console.log(button);

    // toggle Logo & bg
    var logo = document.getElementById('logo');
    logo.classList.toggle('logoMinimized');
    var logoBg = document.getElementById('logoBg');
    logoBg.classList.toggle('logoBgHidden');

    // replace button text
    if(button.innerHTML != "Hide Extras"){
        button.innerHTML = "Hide Extras";
    } else {
        button.innerHTML = "Extras";
    }


    // toggle the grids
    var splashContainer = button.closest('.publication-container');
    splashContainer.classList.toggle('publication-container-expanded');

    var mainArticleGrid = button.closest('.publication-grid');
    mainArticleGrid.classList.toggle('publication-grid-minimized');

    var extraArticlesGrid = splashContainer.getElementsByClassName('extra-articles-grid')[0];
    extraArticlesGrid.classList.toggle('extra-articles-grid-shown');

    lastExpanded = button; // SO we can close the previous one when the user
    // click on a new one in the infinite scrolling
}