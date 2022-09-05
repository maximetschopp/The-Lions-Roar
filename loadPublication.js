document.addEventListener("DOMContentLoaded", ready);

function ready() {

    addPublication();

}

function addPublication(year, month, week, isAfter){
    // isAfter is a bool to see if the publication should be loaded in before
    // or after the current publication that the user in on (viewing)

    
    // Create publication container
    var publicationContainer = document.createElement("div");
    publicationContainer.classList.add("publication-container");

    // Create publicationGrid
    var publicationGrid = document.createElement("div");
    publicationGrid.classList.add("publication-grid");

    // MAIN ARTICLE SECTION includes the icon and the description
    // add Main Article Icon
    var articleIcon = generateArticleIcon("video", "https://img.youtube.com/vi/59j_Flbaqds/0.jpg");
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
        thumbnail.src = link;

        vid.appendChild(thumbnail);
        return vid;
    }
}