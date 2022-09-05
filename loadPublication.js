document.addEventListener("DOMContentLoaded", ready);

function ready() {

    addPublication();

}

function addPublication(year, month, week, isAfter){
    // STRUCTURE FOR A PUBLICATION IS: 
    //                              Publication container
    //                                       ||
    //                  |-----------------------------------|
    //             publcation grid                   extra articles grid
    //                  |                                   |
    //    |------------------------|                 List of extra articles
    // Main Article Icon      Main Article Desc             |
    //                                             |-----------------|
    //                                     Article Icon            Article Desc 

    
    // Create publication container
    var publicationContainer = document.createElement("div");
    publicationContainer.classList.add("publication-container");

    // Create publicationGrid
    var publicationGrid = document.createElement("div");
    publicationGrid.classList.add("publication-grid");

    // MAIN ARTICLE SECTION includes the icon and the description
    // add Main Article Icon
    var articleIcon = generateArticleIcon("video", "https://www.youtube.com/watch?v=HLzq3NDCdvU");
    publicationGrid.appendChild(articleIcon);
    // add Main Article Description
    var mainArticleDescriptionContainer = document.createElement("div");
    mainArticleDescriptionContainer.classList.add("main-article-desc-container");
    var mainArticleDescription = document.createElement("div");
    var mainArticleDate = document.createElement("h1");
    mainArticleDate.innerHTML = "5 Sep";
    var mainArticleTitle = document.createElement("h2");
    mainArticleTitle.innerHTML = "Title of video here";
    var extrasButton = document.createElement("div");
    extrasButton.classList.add("ExtrasButton");
    extrasButton.innerHTML = "Extras";
    extrasButton.onclick = "expandArticle(this)";

    mainArticleDescription.appendChild(mainArticleDate);
    mainArticleDescription.appendChild(mainArticleTitle);
    mainArticleDescription.appendChild(extrasButton);
    mainArticleDescriptionContainer.appendChild(mainArticleDescription);
    
    publicationGrid.appendChild(mainArticleDescriptionContainer); 


    publicationContainer.appendChild(publicationGrid);
    // appends the publication to the end of the document FOR NOW
    // isAfter is a bool to see if the publication should be loaded in before
    // or after the current publication that the user in on (viewing)
    document.body.appendChild(publicationContainer);
}

function generateArticleIcon(type, link){
    if(type == "video"){
        var vid = document.createElement("div");
        vid.classList.add("vid");
        var thumbnail = document.createElement("img");
        thumbnail.classList.add("thumbnail");

        // gets the thumbnail from the video url
        var youtube_video_id = link.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();

        thumbnail.src = "https://img.youtube.com/vi/" + youtube_video_id + "/0.jpg";

        vid.appendChild(thumbnail);
        return vid;
    }
}