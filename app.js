document.addEventListener("DOMContentLoaded", ready);

function ready() {

    console.log("DOMContentLoaded");


    loadThumbnails("vid", "https://www.youtube.com/watch?v=59j_Flbaqds");
    
}

function loadThumbnails(vidId, link){
    var video = document.getElementsByClassName("vid")[0];
    var thumbnail = video.getElementsByClassName('.thumbnail')[0];
    var youtube_video_id = link.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
    console.log(youtube_video_id);

    if (youtube_video_id.length == 11) {
        thumbnail.attr('src', "https://img.youtube.com/vi/" + youtube_video_id + "/0.jpg");
    }
}

function expandArticle(button){

    // replace button text

    if(button.innerHTML != "Hide Extras"){
        button.innerHTML = "Hide Extras";
    } else {
        button.innerHTML = "Extras";
    }

    // replace the get ids with just one parent object

    // toggle Logo & bg
    var logo = document.getElementById('logo');
    logo.classList.toggle('logoMinimized');
    var logoBg = document.getElementById('logoBg');
    logoBg.classList.toggle('logoBgHidden');

    var splashContainer = document.getElementsByClassName('publication-container')[0];
    splashContainer.classList.toggle('publication-container-expanded');

    var mainArticleGrid = document.getElementsByClassName('publication-grid')[0];
    mainArticleGrid.classList.toggle('publication-grid-minimized');

    var extraArticlesGrid = document.getElementsByClassName('extra-articles-grid')[0];
    extraArticlesGrid.classList.toggle('extra-articles-grid-shown');

}