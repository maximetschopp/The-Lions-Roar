function timelineScrollTo(timelineDate, offset){

    if (typeof offset != 'number'){
        let viewportHeight = window.innerHeight;
        offset = -(viewportHeight * 0.2); // scroll to 20% above the item
    }

    console.log(timelineDate.className.search('thing-'));
    var j = timelineDate.className.search('thing-'); // index of where the className starts
    var i = j + 6;
    var c = "thing-";
    while (i < timelineDate.className.length && timelineDate.className.charAt(i) != " "){
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
        behavior: 'smooth'
    });

    if(item.classList.contains('popAnim')){
        item.classList.remove('popAnim');
        setTimeout( () => {item.classList.add('popAnim')}, 10);
    } else {
        item.classList.add('popAnim');
    }
}

addEventListener('scroll', (event) => {
    updateHighlightedItem();
});
addEventListener("resize", (event) => {
    updateHighlightedItem();
});

function updateHighlightedItem () {
    let pageContent = document.getElementById('pageContent');

    var distanceFromTopToBeSelected = innerHeight/4;

    var itemBeingLookedAt = pageContent.children[1];

    // skip first child bc thats the timeline
    for(let i = 1; i < pageContent.childElementCount; i++){

        //check if better option in the center
        if(Math.abs(distanceFromTopToBeSelected - (pageContent.children[i].getBoundingClientRect().top + pageContent.children[i].offsetHeight/2)) 
        < Math.abs(distanceFromTopToBeSelected - (itemBeingLookedAt.getBoundingClientRect().top + itemBeingLookedAt.offsetHeight/2)))
        {
            itemBeingLookedAt = pageContent.children[i];
        }
        // remove the 'lookingAt' tag from all the other elements
        pageContent.children[i].classList.remove('lookingAt');
        
    }

    // scales up the thing ur looking at
    itemBeingLookedAt.classList.add('lookingAt');

    // bolding sidebar
    for(let i = 0; i < document.getElementById('timeline').children.length; i++){
        document.getElementById('timeline').children[i].classList.remove('timeline-bold');
    }
    document.getElementById('timeline').getElementsByClassName(itemBeingLookedAt.id)[0].classList.add('timeline-bold');


    document.getElementById('debug-dist-top').style.setProperty('top', distanceFromTopToBeSelected + 'px');
    document.getElementById('debug-dist-top-closest').style.setProperty('top', itemBeingLookedAt.getBoundingClientRect().top + itemBeingLookedAt.offsetHeight/2 + 'px');
}

function toggleDebug() {
    document.getElementById('debug-dist-top').classList.toggle('hidden');
    document.getElementById('debug-dist-top-closest').classList.toggle('hidden');
}