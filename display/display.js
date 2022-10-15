async function ready() {
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
            generateQueue(getMostCurrentPublicaiton(data, true));
            updateMainArticle(true);
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
        // if not then it must be the most current, enabled publication
        console.log(publication)
        return publication;
    }
}
function generateQueue(publication){

    console.log("publication data: ");
    console.log(publication);
    console.log("amount of extra articles: " + publication["articles"].length);
    console.log('extra articles:' );

    // // first queue item is going to be the main publication
    let mainArticle = {};
        mainArticle['title'] = publication["main_article_title"];
        mainArticle['author'] = "Various Authors";
        mainArticle['date'] = publication["day"] + " " + short_months[publication["month"]];
        mainArticle['url'] = publication["main_article_url"];
        mainArticle['type'] = publication["main_article_type"];
        mainArticle['tags'] = publication["main_article_tags"];
        if (publication['main_article_thumbnail'] == null) {
            if (publication["main_article_url"].slice(0, 17) == 'https://youtu.be/') {
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
           mainArticle["thumbnail"] = publication['main_article_url'];
        }
        queue.push(mainArticle);

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
        if(article["tags"] != null){
            queueItem['tags'] = article["tags"];
        }
        queueItem['thumbnail'] = article["thumbnail"];
        if (article['thumbnail'] == null) {
            if (article["url"].slice(0, 17) == 'https://youtu.be/') {
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
           queueItem["thumbnail"] = article;
        }

        queue.push(queueItem);
    }

    console.log(queue);
}
function updateMainArticle(firstTime){
    console.log("queue length: " + queue.length);  
    if (queue.length == 0 && !firstTime) {
        location.reload();
        return false;
    }
    document.getElementById("main-thumbnail").style.setProperty("background-image", "url(" + queue[0]["thumbnail"] + ")");
    
    //document.getElementById("main-title").innerHTML = queue[0]["title"];
    // console.log(queue[0]["title"]);
    textChangeAnim(document.getElementById("main-title"), queue[0]["title"]);

    //document.getElementById("main-desc").innerHTML = queue[0]["author"] + "   •   " + queue[0]["date"];

    textChangeAnim(document.getElementById("main-desc"),  queue[0]["author"] + "   •   " + queue[0]["date"]);
    
    queue.splice(0, 1);

    if(queue.length >= 0){
        if(firstTime){
            setTimeout(updateMainArticle, mainArticlePause);
        } else{
            setTimeout(updateMainArticle, pause);
        }
    }
}
function textChangeAnim(element, text){

    // TO DO: implement delete animation
    element.innerHTML = "";


    // Typewrite animation
    let numAttempts = text.length * Math.floor(Math.random() * 3 + 5);
    let time = animationTime / 2;
    let timeBetweenAttempts = time/numAttempts; //amount of time for character try

    console.log("time between attempts: " + timeBetweenAttempts);
    console.log("numAttempts: " + numAttempts);
    console.log("text: " + text);
    typewrite(element, text, numAttempts, timeBetweenAttempts, 0, 0, 0);

}
function typewrite(element, text, numAttempts, timeBetweenAttempts, i, k, r){
    
    k++; // k is the attempt it is on
    r--; // when r = 0  the correct character is inserted

    console.log("k: " + k + "      r: " + r + "      i:" + i);
    console.log("correct inner: " + element.innerHTML);

    //if fully guessed 
    if(i >= text.length){
        return;
    }
    // if on last attempt / recursion
    if(k >= numAttempts){ 
        console.log("on the last attempt");
        element.innerHTML = text;  // set title to the text
        return;
    }
    //if there are only enough attempts left for each character
    if(text.length - i >= numAttempts - k){ 
        console.log("there are only enough attempts left for each character");
        r = 0; // dont do randomness
    }
    // if the last character guess was correct or its the first iteration
    else if(k == 1 || (element.innerHTML.charAt(i) === text.charAt(i))){ 
        console.log("on the first iteration");
        r = Math.floor(Math.random() * 8 + 1); // reset the random index (1-8)
        console.log(r);
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
        console.log("ran out of attempts");
        // add the correct character to the end of the title
        console.log("correct character: " + text.charAt(i));
        element.innerHTML = element.innerHTML.slice(0, i) + text.charAt(i);
        i++;
        r = Math.floor(Math.random() * 8 + 1); // reset the random index
        setTimeout(typewrite, timeBetweenAttempts, element, text, numAttempts, timeBetweenAttempts, i, k, r);
    }
}

var mainArticlePause = 7000; // time in milliseconds until the next item in the queue is shown
var pause = 5000; // time in milliseconds until the next item in the queue is shown
var animationTime = 2000;
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
document.addEventListener("DOMContentLoaded", ready);