// settings menu stuff

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
    //if hidden
    if(document.getElementById('settings-container').classList.contains('sm-hidden')){
        for(let i = 0; i < document.getElementsByClassName('menu-item').length; i++){
            document.getElementsByClassName('menu-item')[i].classList.add("menu-item-hidden");
        }
        for(let i = 0; i < document.getElementsByClassName('switch').length; i++){
            document.getElementsByClassName('switch')[i].classList.add("switch-hidden");
        }
        for(let i = 0; i < document.getElementsByClassName('sm-text').length; i++){
            document.getElementsByClassName('sm-text')[i].classList.add("sm-text-hidden");
        }
        document.getElementById('sm-footer').classList.add("sm-footer-hidden");
    } else { // if notn hidden
        for(let i = 0; i < document.getElementsByClassName('menu-item').length; i++){
            document.getElementsByClassName('menu-item')[i].classList.remove("menu-item-hidden");
        }
        for(let i = 0; i < document.getElementsByClassName('switch').length; i++){
            document.getElementsByClassName('switch')[i].classList.remove("switch-hidden");
        }
        for(let i = 0; i < document.getElementsByClassName('sm-text').length; i++){
            document.getElementsByClassName('sm-text')[i].classList.remove("sm-text-hidden");
        }
        document.getElementById('sm-footer').classList.remove("sm-footer-hidden");
    }
}

function toggleTransitions(){
    if(document.getElementById("transition-switch").checked){
        document.body.classList.remove("notransition");
        console.log("Transitions On");
        return 0;
    }
    document.body.classList.add("notransition");
    console.log("Transitions Off");
    return 0;
}

function toggleFlatShading(){
    if(document.getElementById("flat-shading-switch").checked){
        document.body.classList.remove("flat");
        console.log("Blur Effects On");
        return 0;
    }
    document.body.classList.add("flat");
    console.log("Blur Effects Off");
    return 0;
}