
addEventListener("resize", (event) => {
    updateVideoPlayerSizes();
});


function toggleModal(override) {
    setTimeout(updateVideoPlayerSizes, 100);
    if (override !== undefined) {
        if(override){
            document.getElementById('modal-container').classList.remove('modal-container-hidden');
            document.getElementById('modal').classList.remove('modal-hidden');
            document.body.style.overflowY = 'hidden';
        } else {
            document.getElementById('modal-container').classList.add('modal-container-hidden');
            document.getElementById('modal').classList.add('modal-hidden');
            document.body.style.overflowY = 'auto';
        }
    } else {
        document.getElementById('modal-container').classList.toggle('modal-container-hidden');
        document.getElementById('modal').classList.toggle('modal-hidden');
        if(document.getElementById('modal-container').classList.contains('modal-container-hidden')){
            document.body.style.overflowY = 'auto';
        } else {
            document.body.style.overflowY = 'hidden';
        }
    }
}
function updateVideoPlayerSizes(){
    let ratio = window.innerWidth / window.innerHeight;


    for(let i = 0; i < document.getElementsByClassName('modal-video').length; i++){
        let videoplayer = document.getElementsByClassName('modal-video')[i].children[0];
        let w = document.getElementById('modal').offsetWidth;
        let h = (w/16) * 9;
        videoplayer.setAttribute('width', w);
        videoplayer.setAttribute('height', h);
    }
    
}