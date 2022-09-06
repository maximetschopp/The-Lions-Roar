document.addEventListener("DOMContentLoaded", ready);

function ready() {

    addPublication(2022, 9, 1, true);

}

function addPublication(year, month, week, isAfter){
    console.log("addPublication: " + year + " " + month + " " + week + " " + isAfter);
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

    // Create PUBLICATION GRID
    // PUBLICATION GRID includes the icon and the description
    var publicationGrid = document.createElement("div");
    publicationGrid.classList.add("publication-grid");
    // add Main Article Icon
    var articleIcon = generateArticleIcon("video", "https://www.youtube.com/watch?v=HLzq3NDCdvU");
    publicationGrid.appendChild(articleIcon);
    // add Main Article Description
    var mainArticleDescriptionContainer = document.createElement("div");
    mainArticleDescriptionContainer.classList.add("main-article-desc-container");
    var mainArticleDescription = document.createElement("div");
    var mainArticleDate = document.createElement("h1");
    mainArticleDate.innerHTML = "5 Sep";                             /// GET THE DATE OF THE PUBLICATION
    var mainArticleTitle = document.createElement("h2");
    mainArticleTitle.innerHTML = "Title of Main Article here";       /// GET THE TITLE OF MAIN ARTICLE
    var extrasButton = document.createElement("div");
    extrasButton.classList.add("ExtrasButton");
    extrasButton.innerHTML = "Extras";
    extrasButton.onclick = function(){toggleExpandArticle(this)};

    mainArticleDescription.appendChild(mainArticleDate);
    mainArticleDescription.appendChild(mainArticleTitle);
    mainArticleDescription.appendChild(extrasButton);
    mainArticleDescriptionContainer.appendChild(mainArticleDescription);
    publicationGrid.appendChild(mainArticleDescriptionContainer); 

    // Create EXTRA ARTICLES
    // EXTRA ARTICLES contains a list of extra articles
    var extraArticlesGrid = document.createElement('div');
    extraArticlesGrid.className = 'extra-articles-grid';
    
    for (let numArticles = 0; numArticles < 2; numArticles++) {      /// GET THE NUMBER OF EXTRA ARTICLES
        generateArticle();
    }

    publicationContainer.appendChild(publicationGrid);
    publicationContainer.appendChild(extraArticlesGrid);
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

function generateArticle(){

}