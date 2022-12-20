
function toggleLightmode() {
    if(document.getElementById("dm-switch").checked){
        document.body.classList.remove("lightmode");
        return 0;
    }
    document.body.classList.add("lightmode");
    return 0;
}

function toggleSettingsMenu(){
    document.getElementById('settings-container').classList.toggle("sm-hidden");
    for(let i = 0; i < document.getElementsByClassName('menu-item').length; i++){
        document.getElementsByClassName('menu-item')[i].classList.toggle("menu-item-hidden");
    }
    for(let i = 0; i < document.getElementsByClassName('switch').length; i++){
        document.getElementsByClassName('switch')[i].classList.toggle("switch-hidden");
    }
    document.getElementById('sm-footer').classList.toggle("sm-footer-hidden");
}