document.addEventListener("DOMContentLoaded", ready);

function ready() {

    console.log("DOMContentLoaded");


    loadThumbnails("splash-vid", "https://www.youtube.com/watch?v=59j_Flbaqds");
    
}

function loadThumbnails(vidId, link){
    var video = $('#' + vidId);
    var thumbnail = video.find('.thumbnail');
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

    // toggle Logo
    var logo = document.getElementById('logo');
    logo.classList.toggle('logoMinimized');

    var splashContainer = document.getElementById('publication-container');
    splashContainer.classList.toggle('publication-container-expanded');

    var mainArticleGrid = document.getElementById('publication-grid');
    mainArticleGrid.classList.toggle('publication-grid-minimized');

    var extraArticlesGrid = document.getElementById('extra-articles-grid');
    extraArticlesGrid.classList.toggle('extra-articles-grid-shown');

}