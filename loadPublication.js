function addPublication(publication) {
    console.log("addPublication:");
    console.log(publication);
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

    //----------------------------------------------------------------
    //                      JSON PARSER
    //----------------------------------------------------------------

    // Create publication container
    var publicationContainer = document.createElement("div");
    publicationContainer.classList.add("publication-container");

    // Create PUBLICATION GRID / MAIN ARTICLE
    var publicationGrid = generateMainArticle(
        publication["main_article_title"],
        publication["main_article_date"],
        publication["main_article_url"],
        publication["main_article_type"],
        publication["main_article_thumbnail"]
    );

    // Create EXTRA ARTICLES
    // EXTRA ARTICLES contains a list of extra articles
    var extraArticlesGrid = document.createElement("div");
    extraArticlesGrid.className = "extra-articles-grid";
    for (
        let numArticles = 0;
        numArticles < publication["articles"].length;
        numArticles++
    ) {
        /// GET THE NUMBER OF EXTRA ARTICLES
        //title, author, date, url, type, thumbnail, tags
        article = publication["articles"][numArticles]; 
        extraArticlesGrid.appendChild(
            generateArticle(
                article["title"],
                article["author"],
                article["date"],
                article["url"],
                article["type"],
                article["thumbnail"],
                article["tags"]
            )
        );
    }

    publicationContainer.appendChild(publicationGrid);
    publicationContainer.appendChild(extraArticlesGrid);
    // appends the publication to the end of the document FOR NOW,
    // isAfter is a bool to see if the publication should be loaded in before
    // or after the current publication that the user in on (viewing)
    document.body.appendChild(publicationContainer);
}

function generateArticleIcon(type, url, thumbnail) {
    if (type == "video") {
        var vidIcon = document.createElement("div");
        vidIcon.classList.add("video-icon-container");

        if (url != null) {
            vidIcon.addEventListener(
                "click",
                function (url) {
                    window.open(url);
                }.bind(this, url)
            );
        }
        var thumbnailImage = document.createElement("img");
        thumbnailImage.classList.add("thumbnail");

        // checks if there is an alternative thumbnail available
        // if not, then gets the thumbnail from the video url (youtube servers)
        if (thumbnail == null) {
            var youtube_video_id = url
                .match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)
                .pop();
            thumbnailImage.src =
                "https://img.youtube.com/vi/" + youtube_video_id + "/0.jpg";
        } else {
            thumbnailImage.src = thumbnail;
        }
        vidIcon.appendChild(thumbnailImage);

        var centeredIcon = document.createElement("img");
        centeredIcon.classList.add("centered-icon");
        centeredIcon.src = "resources/Icons/video_icon_fill.svg";
        vidIcon.appendChild(centeredIcon);

        return vidIcon;
    } else if (type == "image") {
        var imageIcon = document.createElement("div");
        imageIcon.classList.add("image-icon-container");
        var thumbnailImage = document.createElement("img");
        thumbnailImage.classList.add("thumbnail");
        thumbnailImage.src = thumbnail;

        imageIcon.appendChild(thumbnailImage);

        var centeredIcon = document.createElement("img");
        centeredIcon.classList.add("centered-icon");
        centeredIcon.src = "resources/Icons/image_icon_fill.svg";
        imageIcon.appendChild(centeredIcon);

        return imageIcon;
    } else if (type == "audio") {
        var audioIcon = document.createElement("div");
        audioIcon.classList.add("audio-icon-container");

        var centeredIcon = document.createElement("img");
        centeredIcon.classList.add("centered-icon");
        centeredIcon.src = "resources/Icons/audio_icon_fill.svg";
        audioIcon.appendChild(centeredIcon);

        return audioIcon;
    } else if (type == "text") {
        var textIcon = document.createElement("div");
        textIcon.classList.add("text-icon-container");
        var thumbnailImage = document.createElement("img");
        thumbnailImage.classList.add("thumbnail");
        if (thumbnail == null) {
            thumbnailImage.src =
                "resources/default_thumbnails/text_thumbnail.png";
        } else {
            thumbnailImage.src = thumbnail;
        }
        textIcon.appendChild(thumbnailImage);
        var centeredIcon = document.createElement("img");
        centeredIcon.classList.add("centered-icon");
        centeredIcon.src = "resources/Icons/text_icon_fill.svg";
        textIcon.appendChild(centeredIcon);

        return textIcon;
    } // else its a link
    else if (type == "link" || type == null) {
        var linkIcon = document.createElement("div");
        linkIcon.classList.add("text-icon-container");

        var centeredIcon = document.createElement("img");
        centeredIcon.classList.add("centered-icon");
        centeredIcon.src = "resources/Icons/link_icon_fill.svg";
        linkIcon.appendChild(centeredIcon);

        return linkIcon;
    }
}

function generateMainArticle(title, date, url, type, thumbnail) {
    // Create PUBLICATION GRID
    // PUBLICATION GRID includes the icon and the description
    var publicationGrid = document.createElement("div");
    publicationGrid.classList.add("publication-grid");
    // add Main Article Icon
    var articleIcon = generateArticleIcon(type, url, thumbnail);
    publicationGrid.appendChild(articleIcon);
    // add Main Article Description
    var mainArticleDescriptionContainer = document.createElement("div");
    mainArticleDescriptionContainer.classList.add(
        "main-article-desc-container"
    );
    var mainArticleDescription = document.createElement("div");
    var mainArticleDate = document.createElement("h1");
    mainArticleDate.innerHTML = date; /// GET THE DATE OF THE PUBLICATION
    var mainArticleTitle = document.createElement("h2");
    mainArticleTitle.innerHTML = title; /// GET THE TITLE OF MAIN ARTICLE
    var extrasButton = document.createElement("div");
    extrasButton.classList.add("ExtrasButton");
    extrasButton.innerHTML = "Extras";
    extrasButton.onclick = function () {
        toggleExpandArticle(this);
    };

    mainArticleDescription.appendChild(mainArticleDate);
    mainArticleDescription.appendChild(mainArticleTitle);
    mainArticleDescription.appendChild(extrasButton);
    mainArticleDescriptionContainer.appendChild(mainArticleDescription);
    publicationGrid.appendChild(mainArticleDescriptionContainer);

    return publicationGrid;
}

function generateArticle(title, author, date, url, type, thumbnail, tags) {
    var article = document.createElement("div");
    article.classList.add("extra-article");
    var articleGrid = document.createElement("div");
    articleGrid.classList.add("extra-article-grid");
    if (url != null) {
        article.addEventListener(
            "click",
            function (url) {
                window.open(url);
            }.bind(this, url)
        );
    }
    var icon = generateArticleIcon(type, url, thumbnail);
    articleGrid.appendChild(icon);

    //desc
    var articleTitle = document.createElement("h3");
    articleTitle.innerHTML = title;
    var articleAuthor = document.createElement("h4");
    articleAuthor.innerHTML = author;
    var articleDate = document.createElement("h5");
    articleDate.innerHTML = date;

    var descriptionContainer = document.createElement("div");
    descriptionContainer.appendChild(articleTitle);
    descriptionContainer.appendChild(articleAuthor);
    descriptionContainer.appendChild(articleDate);

    articleGrid.appendChild(descriptionContainer);

    article.appendChild(articleGrid);

    return article;
}

async function ready() {
    /*const response = fetch('./data.json')
    .then((data) => function(){response.json()})
    .then(console.log(data));
    */
    fetch(
        "https://raw.githubusercontent.com/maximetschopp/The-Lions-Roar/main/data.json" +
            "?" +
            new Date().getTime()
    )
        .then((response) => response.json())
        .then((data) => {
            //sort data by date
            data.sort(function (a, b) {
                return (
                    b["year"] * 12 * 6 +
                    b["month"] * 6 +
                    b["week"] -
                    a["year"] * 12 * 6 -
                    a["month"] * 6 -
                    a["week"]
                );
            });
            for (let i = 0; i < data.length; i++) {
                addPublication(data[i]);
            }
        });
}

var data = null;

document.addEventListener("DOMContentLoaded", ready);
