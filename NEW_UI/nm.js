function share(Title, Url){

    console.log("clicked");

    if(Title = null){
        Title = "Rick Roll";
    }
    if(Url = null){
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