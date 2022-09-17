var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
var publications = null;
var using_pubs = [];
function ready() {
    console.log("DOMContentLoaded");

    fetch(
        "https://raw.githubusercontent.com/2canupea/Lions-Roar-Site-Data/main/data.json" +
            "?id=" +
            new Date().getTime()
    )
        .then((response) => response.json())
        .then((data) => {
            //sort data by date
            data.sort(function (a, b) {
                return (
                    b["year"] * 12 * 6 +
                    b["month"] * 6 +
                    b["day"] -
                    a["year"] * 12 * 6 -
                    a["month"] * 6 -
                    a["day"]
                );
            });
            for (let i = 0; i < data.length; i++) {
                let pub = data[i];
                if (!pub["enabled"]) {
                    continue;
                }
                var dateObj = new Date();
                var month = dateObj.getUTCMonth() + 1; //months from 1-12
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear();
                if (
                    !(
                        pub["year"] < year ||
                        (pub["year"] == year && pub["month"] < month) ||
                        (pub["year"] == year &&
                            pub["month"] == month &&
                            pub["day"] <= day)
                    )
                ) {
                    continue;
                }
                using_pubs.push(pub);
                let option = document.createElement("option");
                option.innerText =
                    pub["day"] +
                    " " +
                    months[pub["month"] - 1] +
                    " " +
                    pub["year"];
                document
                    .getElementById("selectPublication")
                    .appendChild(option);
            }
            publications = data;
            loadPublication(using_pubs[0]);
            document.getElementById("selectPublication").onchange = function (
                e
            ) {
                unloadPublications();
                var selectedOption = this[this.selectedIndex];
                loadPublication(using_pubs[selectedOption.index]);
            };
        });
}

function loadPublication(publication) {
    console.log("hello");

    loadMainArticle(publication);

    var extraArticlesGrid = document.getElementById("extraArticlesContainer");

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
}

function loadMainArticle(publication) {
    var mainArticleContainer = document.getElementById("mainArticleContainer");
    mainArticleContainer.appendChild(
        generateArticleIcon("video", publication["main_article_url"], null)
    );
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
        linkIcon.classList.add("link-icon-container");

        var centeredIcon = document.createElement("img");
        centeredIcon.classList.add("centered-icon");
        centeredIcon.src = "resources/Icons/link_icon_fill.svg";
        linkIcon.appendChild(centeredIcon);

        return linkIcon;
    }
    console.warn(type + " article type is not supported");
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

function unloadPublications() {
    var extraArticlesGrid = document.getElementById("extraArticlesContainer");
    // to prevent removing the extra text
    while (extraArticlesGrid.children.length > 1) {
        extraArticlesGrid.removeChild(extraArticlesGrid.children[1]);
    }
    var mainArticleContainer = document.getElementById("mainArticleContainer");
    while (mainArticleContainer.firstChild) {
        mainArticleContainer.removeChild(mainArticleContainer.firstChild);
    }
}
