function timelineScrollTo(timelineDate, offset){

    if (typeof offset != 'number'){
        let viewportHeight = window.innerHeight;
        offset = -(viewportHeight * 0.2); // scroll to 20% above the item
    }

    console.log(timelineDate.className.search('thing-'));
    var j = timelineDate.className.search('thing-'); // index of where the className starts
    var i = j + 6;
    var c = "thing-";
    while (i < timelineDate.className.length && timelineDate.className.charAt(i+1) != " "){
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
        console.log('yuh');
        item.classList.remove('popAnim');
        setTimeout( () => {item.classList.add('popAnim')}, 10);
    } else {
        item.classList.add('popAnim');
    }
}

