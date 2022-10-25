screen.orientation.lock('vertical');

function share(Title, Url, button){

    console.log(button);
    button.classList.toggle('share-button-pressed');

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