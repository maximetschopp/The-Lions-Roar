async function ready() {
    document.documentElement.style.setProperty('--antimationDuration', animationTime/1000 + 's');

    //load JSON
    fetch(
        "https://raw.githubusercontent.com/2canupea/Lions-Roar-Site-Data/main/data.json" +
        "?id=" +
        new Date().getTime()
    )
        .then((response) => response.json())
        .then((data) => {
    //delete if not enabled
            for (let i = 0; i < data.length; i++) {
                if (!data[i]["enabled"]) {
                    delete data[i];
                }
            }
    //sort data by date
            data.sort(function (a, b) {
                return (
                    b["year"] * 12 * 30 +
                    b["month"] * 30 +
                    b["day"] -
                    a["year"] * 12 * 30 -
                    a["month"] * 30 -
                    a["day"]
                );
            });
    //get most current publication
    //generate a Queue of each article from it

    //if true that means its in testing mode, and gets the most 'future publication' 
    //which is our test publication
            generateQueue(getMostCurrentPublicaiton(data, isTesting));
            preload();
            generateQueueArticles();
            nextArticle(true);
        });
}
function getMostCurrentPublicaiton(data, isTesting){
    let date = new Date();
    var dueYear = Number(date.getFullYear());
    var dueMonth = Number(date.getMonth() + 1);
    var dueDay = Number(date.getDate());

    var month = dueMonth;
    var day = dueDay;
    var year = dueYear;

    if(isTesting){
        return data[0];
    }
    for(let i = 0; i < data.length; i++){
        // if in the future, and not 'out yet'
        let publication = data[i];
        if (  
            !(
                publication["year"] < year ||
                (publication["year"] == year && publication["month"] < month) ||
                (publication["year"] == year &&
                    publication["month"] == month &&
                    publication["day"] <= day)
            )
        ) {
            continue;
        }

        // for testing
        // publication = data[1];

        // if not then it must be the most current, enabled publication
        return publication;
    }
}
function generateQueue(publication){

    // console.log("publication data: ");
     console.log(publication);
    // console.log("amount of extra articles: " + publication["articles"].length);
    // console.log('extra articles:' );

    // // first queue item is going to be the main publication
    let mainArticle = {};
        mainArticle['title'] = publication["main_article_title"];
        mainArticle['author'] = "Various Authors";
        mainArticle['date'] = publication["day"] + " " + short_months[publication["month"]-1];
        mainArticle['url'] = publication["main_article_url"];
        mainArticle['type'] = publication["main_article_type"];
        mainArticle['tags'] = publication["main_article_tags"];
        //set thumbnail
        if (publication["main_article_thumbnail"] == null) {
            if (publication["main_article_url"].slice(0, 17) === 'https://youtu.be/') {
                youtube_video_id = publication["main_article_url"].slice(17);
            }
            else {
                var youtube_video_id = publication["main_article_url"].match(
                    /youtube\.com.*(\?v=|\/embed\/)(.{11})/
                    );
                    youtube_video_id = youtube_video_id ? youtube_video_id.pop() : null;
                }
                mainArticle["thumbnail"] =
                "https://img.youtube.com/vi/" +
                youtube_video_id +
                "/maxresdefault.jpg";
        } else {
            mainArticle["thumbnail"] = publication['main_article_thumbnail'];
        }

        queue.push(mainArticle);
        console.log(queue);

    // for all of the extra articles
    for (let i = 0; i < publication["articles"].length; i++){
        let queueItem = {};
        let article = publication["articles"][i];
        console.log(article);

        queueItem['title'] = article["title"];
        queueItem['author'] = article["author"];
        queueItem['date'] = article["date"];
        queueItem['url'] = article["url"];
        queueItem['type'] = article["type"];
        if (article['thumbnail'] == null) {
            if (article["url"].slice(0, 17) === 'https://youtu.be/') {
                youtube_video_id = article["url"].slice(17);
            }
            else {
                var youtube_video_id = article["url"].match(
                    /youtube\.com.*(\?v=|\/embed\/)(.{11})/
                    );
                    youtube_video_id = youtube_video_id ? youtube_video_id.pop() : null;
                }
                queueItem["thumbnail"] =
                "https://img.youtube.com/vi/" +
                youtube_video_id +
                "/maxresdefault.jpg";
        } else {
           queueItem["thumbnail"] = article["thumbnail"];
        }
        queue.push(queueItem);
    }

    // generate TLR
    let tlrItem = {}; 
    tlrItem["title"] = "thelionsroar.ch";
    tlrItem["thumbnail"] = "display/resources/Logo.png";
    tlrItem["author"] = "The cast of the Lions Roar";
    tlrItem["date"] = "since 17 August 2022"
    tlrItem["url"] = "thelionsroar.ch";
    queue.push(tlrItem);
}
function generateQueueArticles(){
    let queueGrid = document.getElementById('queue-grid');
    for(let i = 1; i < queue.length; i++){
        let queueItem = document.createElement("div");
        queueItem.classList.add('queue-container');
        let queueThumbnail = document.createElement("div");
        queueThumbnail.classList.add('queue-thumbnail');
        queueThumbnail.style.setProperty("background-image", "url(" + queue[i]["thumbnail"] + ")");

        if(i > 3){
            queueItem.style.setProperty("display", "none");
        }
        queueItem.appendChild(queueThumbnail);
        queueGrid.appendChild(queueItem);
    }
    return 0;
}
function textChangeAnim(element, text){

    // TO DO: implement delete animation
    element.innerHTML = "";


    // Typewrite animation
    let numAttempts = text.length * Math.floor(Math.random() * 3 + 5);
    let time = animationTime;
    let timeBetweenAttempts = time/numAttempts; //amount of time for character try

    // console.log("time between attempts: " + timeBetweenAttempts);
    // console.log("numAttempts: " + numAttempts);
    // console.log("text: " + text);
    typewrite(element, text, numAttempts, timeBetweenAttempts, 0, 0, 0);

}
function typewrite(element, text, numAttempts, timeBetweenAttempts, i, k, r){
    
    k++; // k is the attempt it is on
    r--; // when r = 0  the correct character is inserted

    

    //if fully guessed 
    if(i >= text.length){
        return;
    }
    // if on last attempt / recursion
    if(k >= numAttempts){ 
        element.innerHTML = text;  // set title to the text
        return;
    }
    //if there are only enough attempts left for each character
    if(text.length - i >= numAttempts - k){ 
        r = 0; // dont do randomness
    }
    // if the last character guess was correct or its the first iteration
    else if(k == 1 || (element.innerHTML.charAt(i) === text.charAt(i))){ 
        r = Math.floor(Math.random() * 8 + 1); // reset the random index (1-8)
    }
    
    // if there are still attempts to guess 
    if(r > 0){
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.!-_?,';
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        // add a random character to the end of the title
        element.innerHTML = element.innerHTML.slice(0, i) + result;
        setTimeout(typewrite, timeBetweenAttempts, element, text, numAttempts, timeBetweenAttempts, i, k, r);
    }
    // if there are no attempts left to guess
    else if (r == 0){
        // add the correct character to the end of the title
        element.innerHTML = element.innerHTML.slice(0, i) + text.charAt(i);
        i++;
        r = Math.floor(Math.random() * 8 + 1); // reset the random index
        setTimeout(typewrite, timeBetweenAttempts, element, text, numAttempts, timeBetweenAttempts, i, k, r);
    }
}
function updateMainArticle(){
    //change thumbnail
    //console.log(queue[0]["thumbnail"]);
    document.getElementById("main-thumbnail").style.setProperty("background-image", "url(" + queue[0]["thumbnail"] + ")");
    //change title
    textChangeAnim(document.getElementById("main-title"), queue[0]["title"]);
    //change desc
    textChangeAnim(document.getElementById("main-desc"),  queue[0]["author"] + "   •   " + queue[0]["date"]);
    // //change QR code
    //delete old QR code
    document.getElementById("qrcode").innerHTML = "";
    var QR = new QRCode(document.getElementById("qrcode"), {
        text: queue[0]["url"],
        width: document.getElementById("qrcode").getBoundingClientRect().width,
        height: document.getElementById("qrcode").getBoundingClientRect().width,
        colorDark : "#000000",
        colorLight : "rgb(230, 230, 230)"
    });
}
function updateQueue(){

    let queueGrid = document.getElementById('queue-grid');
    if(queueGrid.childElementCount > 0){
        queueGrid.children[0].classList.add("queueAnimateOut");
        queueGrid.children[0].children[0].classList.add("queueThumbnailAnimateOut");
    }

    // after animation
    setTimeout(function(){

        // delete the article that just transitioned
        if(queueGrid.childElementCount > 0){
            queueGrid.removeChild(queueGrid.children[0]);
        }

        if(queueGrid.childElementCount > 2){
            queueGrid.children[2].style.setProperty("display", "flex");
        }

    }, animationTime - antiFlickerDeletionPreDelay);
}
function nextArticle(firstTime){
    // nothing left in queue
    if (queue.length == 0 && !firstTime && autoRefresh) {
        location.reload();
        return false;
    }
    updateMainArticle();

    queue.splice(0, 1);

    if(queue.length >= 0){
        if(firstTime){
            setTimeout(updateQueue, mainArticlePause - animationTime)
            setTimeout(nextArticle, mainArticlePause - antiFlickerDeletionPreDelay);
        } else{
            setTimeout(updateQueue, pause - animationTime);
            setTimeout(nextArticle, pause - antiFlickerDeletionPreDelay);
        }
    }
}
function preload(){
    for(let i = 0; i < queue.length; i++){
        thumbnailSrc = queue[i]["thumbnail"];
        let linkElement = document.createElement("link");
        linkElement.setAttribute("rel", "preload");
        linkElement.setAttribute("as", "image");
        linkElement.setAttribute("href", thumbnailSrc);
        document.head.appendChild(linkElement);
    }
}

var mainArticlePause = 7000; // time in milliseconds until the next item in the queue is shown
var pause = 5000; // time in milliseconds until the next item in the queue is shown
var animationTime = 1000;
var short_months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
var queue = [];
var data = null;
var antiFlickerDeletionPreDelay = 3;
var autoRefresh = true;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var isTesting = urlParams.get('test');
if(isTesting == null){
    isTesting = false;
}

document.addEventListener("DOMContentLoaded", ready);