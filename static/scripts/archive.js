var topRightBtnState = "calendar"; // calendar, check, search, cross
var prev_look_at = null;
var expandedYear = null;
var mTimelinePrevSelected = null;
var pubDates = {};
const months = ['Janruary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

addEventListener("scroll", (event) => {
    a = calcAspectRatio();
    if (a == "mobile") {
        updateTimeline();
    } else if (a == "tablet") {
        updateTimeline();
    } else {
        updateTimeline();
    }
});
addEventListener("resize", (event) => {
    a = calcAspectRatio();
    if (a == "mobile") {
        updateTimeline();
    } else if (a == "tablet") {
        updateTimeline();
    } else { //desktop
        updateTimeline();
        updateTopRightButton('calendar');
    }
});

function ready(){
    updateTimeline();

    // document.querySelector('#search-bar').addEventListener('mouseleave', e => e.target.blur());
    document.querySelector('#search-bar').addEventListener("blur", function() {
        // console.log('blurred');
        if(document.querySelector('#search-bar').value != ''){
            document.getElementById('cross-btn').classList.remove('hidden');
            document.getElementById('cross-btn-invis').classList.remove('hidden');
            toggleMobileTimeline(false);
        } else{
            updateTopRightButton('calendar');
            toggleMobileTimeline(false);
            document.getElementById('cross-btn').classList.add('hidden');
            document.getElementById('cross-btn-invis').classList.add('hidden');
        }
    });
    document.querySelector('#search-bar').addEventListener('focus', function() {
        // console.log(document.querySelector('#search-bar').value);
        // if(document.querySelector('#search-bar').value != ''){
            document.getElementById('cross-btn').classList.remove('hidden');
            document.getElementById('cross-btn-invis').classList.remove('hidden');
        // }
    });
}

function timelineScrollTo(timelineDate, offset) {
    if (typeof offset != "number") {
        let viewportHeight = window.innerHeight;
        offset = -(viewportHeight * 0.2); // scroll to 20% above the item
    }

    // console.log(timelineDate.className.search("thing-"));
    var j = timelineDate.className.search("thing-"); // index of where the className starts
    var i = j + 6;
    var c = "thing-";
    while (
        i < timelineDate.className.length &&
        timelineDate.className.charAt(i) != " "
    ) {
        // console.log(timelineDate.className.charAt(i));
        c += timelineDate.className.charAt(i);
        i++;
    }
    // console.log(c);
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
        // document.getElementById("m-timeline").classList.add('m-timeline-collapsed');
        document.getElementById("timeline").style.display = "none";
    } else {
        updateDesktopTimeline();
        document.getElementById("timeline").style = "";
        // document.getElementById("m-timeline").style.display = "none";
    }
}
function getActiveItem() {
    // updateTimeline();
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
        // pageContent.children[i].classList.remove("lookingAt");
    }

    return itemBeingLookedAt;

    // // scales up the thing ur looking at
    // itemBeingLookedAt.classList.add("lookingAt");

    //vibrate
    // if (prev_look_at != itemBeingLookedAt) {
    //     window.navigator.vibrate(20);
    //     console.log("buzz buzz");
    // }
    // bolding timeline

    // prev_look_at = itemBeingLookedAt;

    // for (
    //     let i = 0;
    //     i < document.getElementById("timeline").children.length;
    //     i++
    // ) {
    //     document
    //         .getElementById("timeline")
    //         .children[i].classList.remove("timeline-bold");
    // }
    // document
    //     .getElementById("timeline")
    //     .getElementsByClassName(itemBeingLookedAt.id)[0]
    //     .classList.add("timeline-bold");

    // document
    //     .getElementById("debug-dist-top")
    //     .style.setProperty("top", distanceFromTopToBeSelected + "px");
    // document
    //     .getElementById("debug-dist-top-closest")
    //     .style.setProperty(
    //         "top",
    //         itemBeingLookedAt.getBoundingClientRect().top +
    //             itemBeingLookedAt.offsetHeight / 2 +
    //             "px"
    //     );
}
function updateMobileMonthTxtPosition(){
    let expandedYear;

    for(let i = 0; i < document.getElementsByClassName('m-timeline-year-content').length; i++){
        if(!(document.getElementsByClassName('m-timeline-year-content')[i].classList.contains('m-timeline-year-hidden'))){
            expandedYear = document.getElementsByClassName('m-timeline-year-content')[i];
        }
    }

    // expandedYear.style.background = "#" + Math.floor(Math.random()*16777215).toString(16);

    let selector = expandedYear.getElementsByClassName('m-timeline-selector')[0];

    for(let i = 0; i < expandedYear.getElementsByClassName('m-timeline-month-container').length; i++){
    // for(let i = 0; i < 1; i++){
        let monthTxtContainer = expandedYear.getElementsByClassName('m-timeline-month-container')[i];
        let monthTxt = monthTxtContainer.getElementsByClassName('m-timeline-month')[0];

        let yTop = 0;
        let yBottom = monthTxtContainer.offsetHeight - document.getElementsByClassName('m-timeline-day')[0].offsetHeight;

        monthTxt.style.transform = 'translate(0px, 0px)';
        diff = selector.getBoundingClientRect().top - monthTxt.getBoundingClientRect().top;

        // console.log(diff);
        // Math.min(Math.max(num, min), max);
        diff = Math.min(Math.max(diff, yTop), yBottom);

        // console.log(diff);

        monthTxt.style.transform = 'translate(0px, '+ diff +'px)';
    }
}
function toggleMobileTimeline(override) {
    a = calcAspectRatio();  
    
    if (a == "mobile" || a == "tablet") {
        if(override!= undefined){
            if(!override){  // if false || if should hide the m-timeline
                document
                    .getElementById("m-timeline")
                    .classList.add("m-timeline-collapsed");
                document.querySelector("body").style = "";
            } else {
                document
                    .getElementById("m-timeline")
                    .classList.remove("m-timeline-collapsed");
            }
        } else {
            document
                .getElementById("m-timeline")
                .classList.toggle("m-timeline-collapsed");

            
        }
        if (document.querySelector("#m-timeline").classList.contains("m-timeline-collapsed")) {
            // document
            //     .querySelector("body")
            //     .style.setProperty("overflow", "hidden");
        } else {
            document
            .querySelector("body")
            .style.setProperty("overflow", "auto");
            updateTopRightButton("calendar");
        }
    }

    
}
function topRightButtonClicked(){
    console.log(topRightBtnState);
    if(topRightBtnState == "calendar" ){
        toggleMobileTimeline(true);
        updateTopRightButton('checkmark');
        
    } else if(topRightBtnState == "checkmark" ){
        
        let thing = getMTimelineSelected();
        toggleMobileTimeline(false);
        let offset = window.innerHeight * 0.05;
        window.scrollTo(0, thing.getBoundingClientRect().top  + window.scrollY - offset);
        // document.querySelector('#debug-selected-pub').style.top = thing.getBoundingClientRect().top + window.scrollY;
        updateTopRightButton('calendar');
    }
    else if (topRightBtnState == "search"){
        search();
    }
}
function timelineDesktopLiveSelect(){
    // console.log("timelineDesktopLiveSelect");
    a = calcAspectRatio();
    if( a == "desktop"){
        let thing = getMTimelineSelected();
        if( a === "desktop" && (mTimelinePrevSelected == null || thing != mTimelinePrevSelected)){
            let offset = window.innerHeight * 0.12;
            window.scrollTo({ top: thing.getBoundingClientRect().top  + window.scrollY - offset, behavior: 'smooth' });
        }
        mTimelinePrevSelected = thing;
    }
} 
function mTimelineToggleYear(elementYear, element) {
    // m-timeline-dropdown
    // m-timeline-dropdown-arrow
    expandedYear = elementYear;

    // RESET the direction of each dropdown arrow
    for (
        let i = 0;
        i < document.getElementsByClassName("m-timeline-dropdown-arrow").length;
        i++
    ) {
        // console.log(element.querySelector(".m-timeline-dropdown-arrow"));
        if (
            document.getElementsByClassName("m-timeline-dropdown-arrow")[i].isSameNode(
            element.querySelector(".m-timeline-dropdown-arrow"))
        ) {
            continue;
        }
        document.getElementsByClassName("m-timeline-dropdown-arrow")[i].classList.remove("rotateDown");
        document.getElementsByClassName("m-timeline-selector")[i].classList.add("m-selector-hidden");
        
    }
    element
        .querySelector(".m-timeline-dropdown-arrow")
        .classList.toggle("rotateDown");
    document.getElementsByClassName(elementYear)[1].querySelector(".m-timeline-selector").classList.toggle("m-selector-hidden");

    // HIDE all the content elements but the one oyu want
    let mTimeline = document.getElementById("m-timeline");
    for (let i = 0; i < mTimeline.children.length; i++) {
        let item = mTimeline.children[i];

        if (item.classList.contains("m-timeline-year-content")) {
            if (!item.classList.contains(elementYear)) {
                item.classList.add("m-timeline-year-hidden");
                continue;
            }
            item.classList.toggle("m-timeline-year-hidden");
            // Check for if exanding the element to add updateMobileMonthTxtPosition() function
            if(!item.classList.contains("m-timeline-year-hidden")){
                item.setAttribute("onscroll", "updateMobileMonthTxtPosition(); timelineDesktopLiveSelect()");
                updateMobileMonthTxtPosition();
            }
        }
    }

    

}
function updateTopRightButton(state) {
    // console.log(state);
    if (state == "calendar") {
        // document.querySelector("#search-bar").focus();
        document.getElementById("calendar-icon").classList.remove("hidden");
        document.getElementById("checkmark-icon").classList.add("hidden");
        document.getElementById("search-icon2").classList.add("hidden");
        topRightBtnState = "calendar";
        // window.scrollTo(0,0);
    } else if (state == "checkmark") {
        document.getElementById("checkmark-icon").classList.remove("hidden");
        document.getElementById("calendar-icon").classList.add("hidden");
        document.getElementById("search-icon2").classList.add("hidden");
        topRightBtnState = "checkmark";
    } else if (state == "search") {
        document.getElementById("search-icon2").classList.remove("hidden");
        document.getElementById("checkmark-icon").classList.add("hidden");
        document.getElementById("calendar-icon").classList.add("hidden");
        topRightBtnState = "search";
        
        a = calcAspectRatio();
        if (a != 'desktop'){
            toggleMobileTimeline(false);
        }
        
        const appleExpression = /Apple/i;
        const safariExpression = /Safari/i;
        if(appleExpression.test(navigator.vendor) && safariExpression.test(navigator.userAgent)){
            document.getElementById('cross-btn').classList.remove('hidden');
            document.getElementById('cross-btn-invis').classList.remove('hidden');
        }
    }
}
function search(){
    // TODO: @NIKITA
}
function clearQuery(){
    document.getElementById("search-bar").value = "";
    document.getElementById('cross-btn').classList.add('hidden');
    document.getElementById('cross-btn-invis').classList.add('hidden');
    updateTopRightButton('calendar');
}
function getMTimelineSelected(){
    if(expandedYear != undefined){
        // console.log(expandedYear);
        let thingID;
        let yearDateContainer = document.getElementsByClassName(expandedYear)[1];
        let selector = yearDateContainer.getElementsByClassName("m-timeline-selector")[0];

        let targety = selector.getBoundingClientRect().top;
        let closestDay = 0;
        let closestDayDelta = -1;

        for(let i = 0; i < yearDateContainer.getElementsByClassName("m-timeline-day").length; i++){
            let y = yearDateContainer.getElementsByClassName("m-timeline-day")[i].getBoundingClientRect().top;
            // console.log(i + "       " + y + "       " + Math.abs(y-targety));
            if(Math.abs(y-targety) < closestDayDelta || closestDayDelta == -1){
                closestDayDelta = Math.abs(y-targety);
                closestDay = i;

            } 
        }
        // console.log(yearDateContainer.getElementsByClassName("m-timeline-day")[closestDay].classList);
        let closestDayClasses = yearDateContainer.getElementsByClassName("m-timeline-day")[closestDay].classList;

        for(let i = 0; i < closestDayClasses.length; i++){
            if(closestDayClasses[i].startsWith('thing-')){
                thingID = closestDayClasses[i];
            }
        }
        let thing = document.getElementById(thingID);
        // console.log(thing);
        return thing;
        
    } else {
        // the default thing to show if nothing is selected on the timeline
        return document.getElementById('thing-1');
    }
}

function updateDesktopTimeline(){
    // console.log('hi');
    let item = getActiveItem();

    let thing_id = item.id;
    let itemIndex;

    let isInFuture = true;
    let isInPresent = false;

    let futureYears = [];
    let futureMonths = [];
    let currYear = item.attributes.getNamedItem('pubDate').value.split('-')[2];
    let currMonth = item.attributes.getNamedItem('pubDate').value.split('-')[1];
    let pastYears = [];
    let pastMonths = [];


    for(let i = 0; i < document.getElementsByClassName('archive-publication').length; i++){
        let j = document.getElementsByClassName('archive-publication')[i];

        // console.log(j.id + "  " + thing_id + " " + (j.id === thing_id));  
        if(j.id === thing_id){
            isInFuture = false;
            continue;
        }

        newDate = j.attributes.getNamedItem('pubDate').value.split('-');
        // console.log(newDate);

        // check if year already exits in future, if not add
        if(isInFuture && newDate[2] != currYear && !futureYears.includes(newDate[2])){
            futureYears.push(newDate[2]);
        }
        //check if month doesnt exist yet in future, if not add
        if(isInFuture && newDate[2] === currYear && newDate[1] != currMonth && !futureMonths.includes(newDate[1])){
            futureMonths.push(newDate[1]);
        }

        //check if year already exists in past, if not add
        if(!isInFuture && newDate[2] != currYear && !pastYears.includes(newDate[2])){
            pastYears.push(newDate[2]);
        }
        //check if month doesnt exist yet, if not add
        if(!isInFuture && newDate[2] === currYear && newDate[1] != currMonth && !pastMonths.includes(newDate[1])){
            pastMonths.push(newDate[1]);
        }
    }

    let timeline = document.getElementById('timeline');
    timeline.innerHTML = '';

    //CONSTRUCTING DEKSTOP TIMELINE
    for(let i = 0; i < futureYears.length; i++){
        let yearDiv = document.createElement('div');
        yearDiv.classList.add('timeline-year');
        yearDiv.innerHTML = futureYears[i];
        timeline.appendChild(yearDiv);
    }

    let yearDiv = document.createElement('div');
    yearDiv.classList.add('timeline-year');
    yearDiv.innerHTML = currYear;
    timeline.appendChild(yearDiv);

    for(let i = 0; i < futureMonths.length; i++){
        let monthDiv = document.createElement('div');
        monthDiv.classList.add('timeline-month');
        timeline.appendChild(monthDiv);
    }

    let indicator = document.createElement('div');
    indicator.id = 'timeline-indicator';
    indicator.innerHTML = months[currMonth];
    timeline.appendChild(indicator);
    
    for(let i = 0; i < pastMonths.length; i++){
        let monthDiv = document.createElement('div');
        monthDiv.classList.add('timeline-month');
        timeline.appendChild(monthDiv);
    }
    for(let i = 0; i < pastYears.length; i++){
        let yearDiv = document.createElement('div');
        yearDiv.classList.add('timeline-year');
        yearDiv.innerHTML = pastYears[i];
        timeline.appendChild(yearDiv);
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
    document.querySelector("#debug-selected-pub").classList.toggle("hidden");
}
