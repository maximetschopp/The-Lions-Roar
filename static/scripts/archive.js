var topRightBtnState = ""; // calendar, check, search, cross
var prev_look_at = null;

addEventListener("scroll", (event) => {
    a = calcAspectRatio();
    if (a == "mobile") {
        updateTimeline();
    } else if (a == "tablet") {
        updateHighlightedItem();
        updateTimeline();
    } else {
        updateHighlightedItem();
        updateTimeline();
    }
});
addEventListener("resize", (event) => {
    a = calcAspectRatio();
    if (a == "mobile") {
        updateTimeline();
    } else if (a == "tablet") {
        updateHighlightedItem();
        updateTimeline();
    } else {
        updateHighlightedItem();
        updateTimeline();
    }
});

function ready(){
    updateHighlightedItem();
    updateTimeline(); 
    // document.querySelector('#search-bar').addEventListener('mouseleave', e => e.target.blur());
    document.querySelector('#search-bar').addEventListener("blur", function() {
        if(document.querySelector('#search-bar').value != ''){
            updateTopRightButton('cross');
        } else{
            updateTopRightButton('calendar');
        }
    });
}

function timelineScrollTo(timelineDate, offset) {
    if (typeof offset != "number") {
        let viewportHeight = window.innerHeight;
        offset = -(viewportHeight * 0.2); // scroll to 20% above the item
    }

    console.log(timelineDate.className.search("thing-"));
    var j = timelineDate.className.search("thing-"); // index of where the className starts
    var i = j + 6;
    var c = "thing-";
    while (
        i < timelineDate.className.length &&
        timelineDate.className.charAt(i) != " "
    ) {
        console.log(timelineDate.className.charAt(i));
        c += timelineDate.className.charAt(i);
        i++;
    }
    console.log(c);
    var item = document.getElementById(c);
    var itemY = item.getBoundingClientRect().top + window.scrollY;

    window.scroll({
        top: itemY + offset,
        left: 0,
        behavior: "smooth",
    });

    // if(item.classList.contains('popAnim')){
    //     item.classList.remove('popAnim');
    //     setTimeout( () => {item.classList.add('popAnim')}, 10);
    // } else {
    //     item.classList.add('popAnim');
    // }
}

function updateTimeline() {
    let aspectRatio = calcAspectRatio();
    // console.log(aspectRatio);
    if (aspectRatio == "mobile" || aspectRatio == "tablet") {
        document.getElementById("m-timeline").style = "";
        document.getElementById("timeline").style.display = "none";
    } else {
        document.getElementById("timeline").style = "";
        document.getElementById("m-timeline").style.display = "none";
    }
}
function updateHighlightedItem() {
    updateTimeline();
    let pageContent = document.getElementById("pageContent");

    var distanceFromTopToBeSelected = innerHeight / 4;

    var itemBeingLookedAt = pageContent.children[1];

    // skip first child bc thats the timeline
    for (let i = 0; i < pageContent.childElementCount; i++) {
        if (pageContent.children[i].id == "timeline") {
            continue;
        }

        //check if better option in the center
        if (
            Math.abs(
                distanceFromTopToBeSelected -
                    (pageContent.children[i].getBoundingClientRect().top +
                        pageContent.children[i].offsetHeight / 2)
            ) <
            Math.abs(
                distanceFromTopToBeSelected -
                    (itemBeingLookedAt.getBoundingClientRect().top +
                        itemBeingLookedAt.offsetHeight / 2)
            )
        ) {
            itemBeingLookedAt = pageContent.children[i];
        }
        // remove the 'lookingAt' tag from all the other elements
        pageContent.children[i].classList.remove("lookingAt");
    }

    // scales up the thing ur looking at
    itemBeingLookedAt.classList.add("lookingAt");

    //vibrate
    if (prev_look_at != itemBeingLookedAt) {
        window.navigator.vibrate(20);
        console.log("buzz buzz");
    }
    prev_look_at = itemBeingLookedAt;
    // bolding timeline
    for (
        let i = 0;
        i < document.getElementById("timeline").children.length;
        i++
    ) {
        document
            .getElementById("timeline")
            .children[i].classList.remove("timeline-bold");
    }
    document
        .getElementById("timeline")
        .getElementsByClassName(itemBeingLookedAt.id)[0]
        .classList.add("timeline-bold");

    document
        .getElementById("debug-dist-top")
        .style.setProperty("top", distanceFromTopToBeSelected + "px");
    document
        .getElementById("debug-dist-top-closest")
        .style.setProperty(
            "top",
            itemBeingLookedAt.getBoundingClientRect().top +
                itemBeingLookedAt.offsetHeight / 2 +
                "px"
        );
}
function toggleMobileTimeline(override) {
    a = calcAspectRatio();
    if (a == "mobile" || a == "tablet") {
        document
            .getElementById("m-timeline")
            .classList.toggle("m-timeline-collapsed");

        if (document.querySelector("body").style.overflow == "hidden") {
            document.querySelector("body").style = "";
            updateTopRightButton("calendar");
        } else {
            document.querySelector("body").style = "";
            document
                .querySelector("body")
                .style.setProperty("overflow", "hidden");
            updateTopRightButton("checkmark");
        }
    }
}
function mTimelineToggleYear(elementYear, element) {
    // m-timeline-dropdown
    // m-timeline-dropdown-arrow
    for (
        let i = 0;
        i < document.getElementsByClassName("m-timeline-dropdown-arrow").length;
        i++
    ) {
        if (
            document.getElementsByClassName("m-timeline-dropdown-arrow")[i] ==
            element.querySelector(".m-timeline-dropdown-arrow")
        ) {
            continue;
        }
        document
            .getElementsByClassName("m-timeline-dropdown-arrow")
            [i].classList.remove("rotateDown");
    }
    element
        .querySelector(".m-timeline-dropdown-arrow")
        .classList.toggle("rotateDown");

    let mTimeline = document.getElementById("m-timeline");
    for (let i = 0; i < mTimeline.children.length; i++) {
        let item = mTimeline.children[i];

        if (item.classList.contains("m-timeline-year-content")) {
            if (!item.classList.contains(elementYear)) {
                item.classList.add("hidden");
                continue;
            }
            item.classList.toggle("hidden");
        }
    }
}
function updateTopRightButton(state) {
    window.scrollTo(0,0);
    console.log(state);
    if (state == "calendar") {
        document.getElementById("calendar-icon").classList.remove("hidden");
        document.getElementById("checkmark-icon").classList.add("hidden");
        document.getElementById("cross-icon").classList.add("hidden");
        document.getElementById("search-icon2").classList.add("hidden");
        topRightBtnState = "calendar";
        document
            .getElementById("topRightInvis")
            .setAttribute("onclick", "toggleMobileTimeline()");
    } else if (state == "checkmark") {
        document.getElementById("checkmark-icon").classList.remove("hidden");
        document.getElementById("calendar-icon").classList.add("hidden");
        document.getElementById("cross-icon").classList.add("hidden");
        document.getElementById("search-icon2").classList.add("hidden");
        topRightBtnState = "checkmark";
        document
            .getElementById("topRightInvis")
            .setAttribute("onclick", "toggleMobileTimeline()");
    } else if (state == "search") {
        document.getElementById("search-icon2").classList.remove("hidden");
        document.getElementById("checkmark-icon").classList.add("hidden");
        document.getElementById("calendar-icon").classList.add("hidden");
        document.getElementById("cross-icon").classList.add("hidden");
        topRightBtnState = "checkmark";
        document.getElementById("topRightInvis").setAttribute("onclick", "");
    } else if (state == "cross") {
        document.getElementById("cross-icon").classList.remove("hidden");
        document.getElementById("checkmark-icon").classList.add("hidden");
        document.getElementById("calendar-icon").classList.add("hidden");
        document.getElementById("search-icon2").classList.add("hidden");
        topRightBtnState = "checkmark";
        document.getElementById("topRightInvis").setAttribute("onclick", "document.querySelector('#search-bar').value = ''; updateTopRightButton('calendar')" );
    }
}

function calcAspectRatio() {
    let ratio = window.innerWidth / window.innerHeight;
    if (ratio <= 1) {
        return "mobile";
    } else if (ratio > 1 && ratio <= 3 / 2) {
        return "tablet";
    } else if (ratio > 3 / 2 && ratio <= 5 / 2) {
        return "desktop";
    } else {
        return "ultrawide";
    }
}
function toggleDebug() {
    document.getElementById("debug-dist-top").classList.toggle("hidden");
    document
        .getElementById("debug-dist-top-closest")
        .classList.toggle("hidden");
}
