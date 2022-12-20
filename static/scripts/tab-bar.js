
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
}