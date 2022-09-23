var colortype = urlParams.get("colortype");
if (colortype == null) {
    colortype = 0;
}


// JAN - Chinese new year
// FEB - Chinese new year
// 17 MAR - st Patricks day
// JUN - Pride Month
// 31 OCT - Halloween (probably do the WHOLE month)
// DEC - Christmas

console.log(colortype);
document.addEventListener("DOMContentLoaded", function () {
    if (colortype == 0) {
        clearThemes();
    }
    if (colortype == 1) {
        stPatricksTheme();
    }
});

function clearThemes() {

}

function stPatricksTheme(){
    console.log("St. Patrick's Day");
    var sheet = document.createElement("style");
    document.getElementById("organic_shape_l3").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(60%) saturate(200%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_l2").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(80%) saturate(200%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_l1").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(100%) saturate(200%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_r3").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(60%) saturate(200%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_r2").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(80%) saturate(200%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_r1").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(100%) saturate(200%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    sheet.innerHTML = "";
    sheet.innerHTML += "* {--main-bg-color: #65da91;}\n";
    sheet.innerHTML += "* {--main-text-color: #ffffff;}\n";
    sheet.innerHTML += "#logo {filter: brightness(100000%)}\n";
    document.body.appendChild(sheet);
}