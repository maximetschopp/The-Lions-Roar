document.addEventListener("DOMContentLoaded", ready);

function ready() {

    console.log("DOMContentLoaded");


    //loadThumbnails("vid", "https://www.youtube.com/watch?v=59j_Flbaqds");
    
}

function loadThumbnails(vidId, link){
    var video = document.getElementsByClassName("vid")[0];
    var thumbnail = document.getElementsByClassName('.thumbnail')[0];
    var youtube_video_id = link.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
    console.log(youtube_video_id);

    if (youtube_video_id.length == 11) {
        thumbnail.attr('src', "https://img.youtube.com/vi/" + youtube_video_id + "/0.jpg");
    }
}

function expandArticle(button){

    console.log("expanding article");
    console.log(button);

    // replace button text
    if(button.innerHTML != "Hide Extras"){
        button.innerHTML = "Hide Extras";
    } else {
        button.innerHTML = "Extras";
    }

    // toggle Logo & bg
    var logo = document.getElementById('logo');
    logo.classList.toggle('logoMinimized');
    var logoBg = document.getElementById('logoBg');
    logoBg.classList.toggle('logoBgHidden');

    // toggle the grids
    var splashContainer = button.closest('.publication-container');
    splashContainer.classList.toggle('publication-container-expanded');

    var mainArticleGrid = button.closest('.publication-grid');
    mainArticleGrid.classList.toggle('publication-grid-minimized');

    var extraArticlesGrid = splashContainer.getElementsByClassName('extra-articles-grid')[0];
    extraArticlesGrid.classList.toggle('extra-articles-grid-shown');

}