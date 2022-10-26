screen.orientation.lock("portrait");

function share(title, url, button){

    // trigger button animation
    button.classList.add('share-button-pressed');
    setTimeout(function(){button.classList.remove('share-button-pressed');}, 250);

    // try to use Native OS share API if available
    if(title == null){
        title = "Rick Roll";
    }
    if(url == null){
        url = "https://youtu.be/dQw4w9WgXcQ";
    }

    if (navigator.share) {
        // Web Share API is supported
        navigator.share({
            title: title,
            url: url
          })
      } else {
        // Fallback
        // // copy to clipboard
        // navigator.clipboard.writeText(url);
      
        // // Alert the copied text
        // alert("Copied the text: " + url);
    }

}