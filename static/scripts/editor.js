addEventListener('resize', setbodyWidth);


function setbodyWidth(){
    let totalWidth = 0;
    for(let i=0; i < document.getElementsByClassName('panel').length; i++){
        totalWidth += document.getElementsByClassName('panel')[i].offsetWidth;
    }
    totalWidth = Math.max(width, window.innerWidth);
    document.body.style.width = totalWidth + 'px';
    console.log(totalWidth);
}