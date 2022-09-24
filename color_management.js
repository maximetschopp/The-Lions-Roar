var colortype = urlParams.get("colortype");
if (colortype == null) {
    if (dueDay == 17 && dueMonth == 3) {
        colortype = 1; // St. Patrick's Day
    } else if (dueMonth == 1 || dueMonth == 2) {
        colortype = 2; // Chinese New Year
    } else if (dueMonth == 6) {
        colortype = 3; // Pride Month
    } else if (dueDay > 10 && dueMonth == 10) {
        colortype = 4; // Halloween
    } else if (dueMonth == 12) {
        colortype = 5; // Christmas
    } else {
        colortype = 0; // Default
    }
}

// JAN - Chinese new year
// FEB - Chinese new year
// 17 MAR - st Patricks day
// JUN - Pride Month
// 31 OCT - Halloween (probably do the WHOLE month)
// DEC - Christmas

document.addEventListener("DOMContentLoaded", function () {
    if (colortype == 1) {
        stPatricksTheme();
    } else if (colortype == 2) {
        chineseNewYearTheme();
    } else if (colortype == 4) {
        halloweenTheme();
    }
});

function stPatricksTheme() {
    console.log("Happy St. Patrick's Day!");

    document.getElementById("logo").src = "resources/Logos/TLR_st_patricks.svg";

    var sheet = document.createElement("style");
    document.getElementById("organic_shape_l3").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(80%) saturate(180%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_l2").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(100%) saturate(200%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_l1").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(120%) saturate(200%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_r3").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(80%) saturate(180%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_r2").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(100%) saturate(200%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_r1").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(120%) saturate(200%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";

    sheet.innerHTML = "";
    sheet.innerHTML += "* {--main-bg-color: #ffffff;}\n";
    sheet.innerHTML += "* {--logo-bg-color: #ffffff;}\n";
    sheet.innerHTML += "* {--drop-shadow-color: #00b46f;}\n";
    sheet.innerHTML += "* {--main-text-color: #000000;}\n";
    sheet.innerHTML += "* {--secondary-text-color: #999999;}\n";
    sheet.innerHTML += "* {--sidebar-text-color-highlighted: #ffffff;}\n";
    sheet.innerHTML += "* {--sidebar-text-color: #e0e0e0;}\n";
    document.body.appendChild(sheet);
}

function halloweenTheme() {
    console.log("Trick or Treat!");

    document.getElementById("logo").src = "resources/Logos/TLR_halloween.svg";

    var sheet = document.createElement("style");
    document.getElementById("organic_shape_l3").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(70%) saturate(0%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_l2").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(90%) saturate(0%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_l1").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(120%) saturate(0%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_r3").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(70%) saturate(0%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_r2").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(90%) saturate(0%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_r1").style.filter =
        "brightness(50%) sepia(1) hue-rotate(90deg) brightness(120%) saturate(0%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";

    sheet.innerHTML = "";
    sheet.innerHTML += "* {--main-bg-color: #ffffff;}\n";
    sheet.innerHTML += "* {--logo-bg-color: #ffffff;}\n";
    sheet.innerHTML += "* {--drop-shadow-color: #f77100;}\n";
    sheet.innerHTML += "* {--main-text-color: #000000;}\n";
    sheet.innerHTML += "* {--secondary-text-color: #999999;}\n";
    sheet.innerHTML += "* {--sidebar-text-color-highlighted: #ffffff;}\n";
    sheet.innerHTML += "* {--sidebar-text-color: #cecece;}\n";
    document.body.appendChild(sheet);
}

function chineseNewYearTheme() {
    console.log("恭喜发财!");
    console.log("Happy Chinese New Year!");

    document.getElementById("logo").src =
        "resources/Logos/TLR_chinese_new_year.svg";

    var sheet = document.createElement("style");
    document.getElementById("organic_shape_l3").style.filter =
    "brightness(50%) sepia(1) saturate(10000%) brightness(60%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_l2").style.filter =
    "brightness(50%) sepia(1) saturate(10000%) brightness(70%)  drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_l1").style.filter =
    "brightness(50%) sepia(1) saturate(10000%) brightness(90%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_r3").style.filter =
    "brightness(50%) sepia(1) saturate(10000%) brightness(60%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_r2").style.filter =
    "brightness(50%) sepia(1) saturate(10000%) brightness(70%)  drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";
    document.getElementById("organic_shape_r1").style.filter =
    "brightness(50%) sepia(1) saturate(10000%) brightness(90%) drop-shadow(0 0 50px rgba(0, 0, 0, 0.19))";

    sheet.innerHTML = "";
    sheet.innerHTML += "* {--main-bg-color: ##870000;}\n";
    sheet.innerHTML += "* {--logo-bg-color: #ffffff;}\n";
    sheet.innerHTML += "* {--drop-shadow-color: #f9ed78;}\n";
    sheet.innerHTML += "* {--main-text-color: #000000;}\n";
    sheet.innerHTML += "* {--secondary-text-color: #999999;}\n";
    sheet.innerHTML += "* {--sidebar-text-color-highlighted: #ffffff;}\n";
    sheet.innerHTML += "* {--sidebar-text-color: #e0e0e0;}\n";
    document.body.appendChild(sheet);
}
