function share(Title, Url, button){

    console.log(button);
    button.classList.add('share-button-pressed');
    setTimeout(function(){button.classList.remove('share-button-pressed');}, 250);

    if(Title == null){
        Title = "Rick Roll";
    }
    if(Url == null){
        Url = "https://youtu.be/dQw4w9WgXcQ";
    }

    if (navigator.share) {
        // Web Share API is supported
        navigator.share({
            title: Title,
            url: Url
          })
      } else {
        // Fallback
        console.error("navigator.share is not supported");
      }
}