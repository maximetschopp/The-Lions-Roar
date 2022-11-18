addEventListener("scroll", (event) => {
    updateHighlightedItem();
    updateTimeline();
});
addEventListener("resize", (event) => {
    updateHighlightedItem();
    updateTimeline();
});

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

    if (item.classList.contains("popAnim")) {
        item.classList.remove("popAnim");
        setTimeout(() => {
            item.classList.add("popAnim");
        }, 10);
    } else {
        item.classList.add("popAnim");
    }
}
function updateHighlightedItem() {
    let pageContent = document.getElementById("pageContent");

    var distanceFromTopToBeSelected = innerHeight / 4;

    var itemBeingLookedAt = pageContent.children[1];

    let prev_look_at = itemBeingLookedAt;
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
        window.navigator.vibrate(50);
        console.log("buzz buzz");
    }
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
function updateTimeline() {
    let aspectRatio = calcAspectRatio();
    // console.log(aspectRatio);
    if (aspectRatio == "mobile" || aspectRatio == "tablet") {
        let x = document
            .getElementById("timeline")
            .getBoundingClientRect().right;
        let y =
            document.getElementById("timeline").getBoundingClientRect().top -
            window.scrollY;

        let xDelta =
            x -
            document.getElementById("date-btn").getBoundingClientRect().right;
        let yDelta =
            y -
            document.getElementById("date-btn").getBoundingClientRect().top -
            window.scrollY +
            (document.getElementById("pageContent").getBoundingClientRect()
                .top +
                window.scrollY);

        document
            .getElementById("timeline")
            .style.setProperty("right", window.innerWidth - (x - xDelta));
        document
            .getElementById("timeline")
            .style.setProperty("top", y - yDelta);

        // console.log(y + '          ' + (document.getElementById('date-btn').getBoundingClientRect().top - window.scrollY));
        // console.log(yDelta);
        console.log(y - yDelta);
        if (
            document
                .getElementById("timeline")
                .classList.contains("timeline-collapsed")
        ) {
            document
                .getElementById("timeline")
                .style.setProperty(
                    "--date-btn-width",
                    document.getElementById("date-btn").offsetWidth
                );
            document
                .getElementById("timeline")
                .style.setProperty(
                    "--date-btn-height",
                    document.getElementById("date-btn").offsetHeight
                );
        }
    } else {
        document
            .getElementById("timeline")
            .classList.remove("timeline-collapsed");
        document.getElementById("timeline").style = "";
    }
}
function toggleTimeline(override) {
    a = calcAspectRatio();
    if (a == "mobile" || a == "tablet") {
        document
            .getElementById("timeline")
            .classList.toggle("timeline-collapsed");
    }
    console.log("toggled Timeline");
}

function toggleDebug() {
    document.getElementById("debug-dist-top").classList.toggle("hidden");
    document
        .getElementById("debug-dist-top-closest")
        .classList.toggle("hidden");
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
