// Made by Maxime Tschopp && Nikita Lurye

function addPublication(publication) {
    //console.log("addPublication:");
    //console.log(publication);
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
    publicationContainer.classList.add(
        "pub-containter_identifier-" +
            publication["year"] +
            "-" +
            publication["month"] +
            "-" +
            publication["week"]
    );
    publicationContainer.setAttribute("year", publication["year"]);
    publicationContainer.setAttribute("month", publication["month"]);
    publicationContainer.setAttribute("week", publication["week"]);
    publicationContainer.classList.add("publication-container");
    // publication release delay is quite broken, I'll get to it later.
    // if (publication["release_timestamp"] > Date.now()) {
    //     publicationContainer.classList.add("hidden");
    //     console.log(publication);
    //     setTimeout((publicationContainer) => {
    //         publicationContainer.classList.remove("hidden");
    //     }, publication["release_timestamp"] - Date.now());
    // }

    // Create PUBLICATION GRID / MAIN ARTICLE
    var publicationGrid = generateMainArticle(
        publication["main_article_title"],
        months[publication["month"] - 1] + " " + publication["day"],
        publication["main_article_url"],
        publication["main_article_type"],
        publication["main_article_thumbnail"],
        publication["articles"].length > 0
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
        linkIcon.classList.add("link-icon-container");

        var centeredIcon = document.createElement("img");
        centeredIcon.classList.add("centered-icon");
        centeredIcon.src = "resources/Icons/link_icon_fill.svg";
        linkIcon.appendChild(centeredIcon);

        return linkIcon;
    }
    console.warn(type + "article type is not supported");
}

function generateMainArticle(
    title,
    date,
    url,
    type,
    thumbnail,
    hasExtraArticles
) {
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

    if (hasExtraArticles) {
        var extrasButton = document.createElement("div");
        extrasButton.classList.add("ExtrasButton");
        extrasButton.innerHTML = "Extras";
        extrasButton.onclick = function () {
            toggleExpandArticle(this);
        };
        mainArticleDescription.appendChild(extrasButton);
    }

    mainArticleDescription.appendChild(mainArticleDate);
    mainArticleDescription.appendChild(mainArticleTitle);
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

var yearKeys = null;
var monthKeys = null;

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

function generateSidebar(dates) {
    var sidebarObj = document.getElementById("sidebar_text_container");
    let lastYear = null;
    let lastMonth = null;
    let thisYear = null;
    let thisMonth = null;
    let topYear = null;
    let topMonth = null;
    let topWeek = null;
    yearKeys = Object.keys(dates);
    yearKeys.reverse().forEach((year) => {
        monthKeys = Object.keys(dates[year]);
        monthKeys.reverse().forEach((month) => {
            dates[year][month].forEach((week) => {
                if (year != lastYear) {
                    var element = document.createElement("div");
                    element.classList.add("sidebar-year");
                    element.innerHTML = year;
                    sidebarObj.appendChild(element);
                    lastYear = year;
                    element.onclick = function (year, month, week) {
                        expandSidebarItem(year, month, week, true);
                    }.bind(this, year, month, week);
                    thisYear = element;
                }
                if (month != lastMonth) {
                    var element = document.createElement("div");
                    element.classList.add("sidebar-month");
                    element.innerHTML = months[month - 1];
                    sidebarObj.appendChild(element);
                    lastMonth = month;
                    element.onclick = function (year, month, week) {
                        expandSidebarItem(year, month, week, true);
                    }.bind(this, year, month, week);
                    thisMonth = element;
                }
                if (topYear == null) {
                    topYear = year;
                    topMonth = month;
                    topWeek = week;
                }
                var element = document.createElement("div");
                element.classList.add("sidebar-week");
                element.innerHTML = "Week " + week;
                sidebarObj.appendChild(element);
                element.onclick = function (year, month, week) {
                    expandSidebarItem(year, month, week, true);
                }.bind(this, year, month, week);
                thisYear.classList.add(
                    "sidebar-cd-" + year + "_" + month + "_" + week
                );
                thisMonth.classList.add(
                    "sidebar-cd-" + year + "_" + month + "_" + week
                );
                element.classList.add(
                    "sidebar-cd-" + year + "_" + month + "_" + week
                );
                thisYear.classList.add("sidebar-cd-" + year + "_" + month);
                thisMonth.classList.add("sidebar-cd-" + year + "_" + month);
                element.classList.add("sidebar-cd-" + year + "_" + month);
                thisYear.classList.add("sidebar-cd-" + year);
                thisMonth.classList.add("sidebar-cd-" + year);
            });
        });
    });
    expandSidebarItem(topYear, topMonth, topWeek, false);
    // the link to the previous website
    var before2022div = document.createElement("div");
    before2022div.innerText = "<2022";
    before2022div.classList.add("sidebar-year");
    before2022div.addEventListener("click", function () {
        window.open("https://lionsjournal.ch/", "_blank").focus();
    });
    sidebarObj.appendChild(before2022div);
}

function generatePageBottom(){
    var bottomDiv = document.createElement("div");
    bottomDiv.classList.add("bottom-div");
    document.body.appendChild(bottomDiv);
}

async function ready() {
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    /*const response = fetch('./data.json')
    .then((data) => function(){response.json()})
    .then(console.log(data));
    */
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
                    b["week"] -
                    a["year"] * 12 * 6 -
                    a["month"] * 6 -
                    a["week"]
                );
            });
            for (let i = 0; i < data.length; i++) {
                addPublication(data[i]);

                // check for new date for the sidebarDates
                year = data[i]["year"];
                month = data[i]["month"];
                week = data[i]["week"];
                if (!(year in sidebarDates)) {
                    sidebarDates[year] = {};
                }
                if (!(month in sidebarDates[year])) {
                    sidebarDates[year][month] = [];
                }
                sidebarDates[year][month].push(week);
            }
            generatePageBottom();
            generateSidebar(sidebarDates);
        });
    setTimeout(() => {
        showPage();
    }, 100);
}

var data = null;
var sidebarDates = {};
