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
    } else if (dueMonth == 12 && dueDay <= 25) {
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
    } else if (colortype == 5) {
        christmasTheme();
    }
});

function stPatricksTheme() {
    console.log("Happy St. Patrick's Day!");

    document.getElementById("logo").src = "resources/Logos/TLR_st_patricks.svg";

    var lFill1 = "#09DC8A";  // Left Shape 1 Fill Color
    var lDS1 = "#00e07b";    // Left Shape 1 Drop Shadow Color
    var rFill1 = "#09DC8A";  // Right Shape 1 Fill Color
    var rDS1 = "#00e07b";    // Right Shape 1 Drop Shadow Color

    var lFill2 = "#11B772";  // Left Shape 2 Fill Color
    var lDS2 = "#00ff8c";    // Left Shape 2 Drop Shadow Color
    var rFill2 = "#11B772";  // Right Shape 2 Fill Color
    var rDS2 = "#00ff8c";    // Right Shape 2 Drop Shadow Color

    var lFill3 = "#27905F";  // Left Shape 3 Fill Color
    var lDS3 = "#00e07b";    //     Left Shape 3 Drop Shadow Color
    var rFill3 = "#27905F";  // Right Shape 3 Fill Color
    var rDS3 = "#00e07b";    // Right Shape 3 Drop Shadow Color


    setColors(lFill1, lDS1, lFill2, lDS2, lFill3, lDS3, rFill1, rDS1, rFill2, rDS2, rFill3, rDS3);


    var sheet = document.createElement("style");

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

    // Change Logo
    document.getElementById("logo").src = "resources/Logos/TLR_halloween.svg";

    var lFill1 = "#bdbdbd";  // Left Shape 1 Fill Color
    var lDS1 = "#fff";    // Left Shape 1 Drop Shadow Color
    var rFill1 = "#bdbdbd";  // Right Shape 1 Fill Color
    var rDS1 = "#fff";    // Right Shape 1 Drop Shadow Color

    var lFill2 = "#8f8f8f";  // Left Shape 2 Fill Color
    var lDS2 = "#fff";    // Left Shape 2 Drop Shadow Color
    var rFill2 = "#8f8f8f";  // Right Shape 2 Fill Color
    var rDS2 = "#fff";    // Right Shape 2 Drop Shadow Color

    var lFill3 = "#6c6c6c";  // Left Shape 3 Fill Color
    var lDS3 = "#fff";    //     Left Shape 3 Drop Shadow Color
    var rFill3 = "#6c6c6c";  // Right Shape 3 Fill Color
    var rDS3 = "#fff";    // Right Shape 3 Drop Shadow Color


    setColors(lFill1, lDS1, lFill2, lDS2, lFill3, lDS3, rFill1, rDS1, rFill2, rDS2, rFill3, rDS3);

    var sheet = document.createElement("style");

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

    // Change Logo
    document.getElementById("logo").src = "resources/Logos/TLR_chinese_new_year.svg";

    var lFill1 = "#ca2a28";  // Left Shape 1 Fill Color
    var lDS1 = "#d2593a";    // Left Shape 1 Drop Shadow Color
    var rFill1 = "#ca2a28";  // Right Shape 1 Fill Color
    var rDS1 = "#d2593a";    // Right Shape 1 Drop Shadow Color

    var lFill2 = "#b40402";  // Left Shape 2 Fill Color
    var lDS2 = "#da9052";    // Left Shape 2 Drop Shadow Color
    var rFill2 = "#b40402";  // Right Shape 2 Fill Color
    var rDS2 = "#da9052";    // Right Shape 2 Drop Shadow Color

    var lFill3 = "#990000";  // Left Shape 3 Fill Color
    var lDS3 = "#d54f2c";    // Left Shape 3 Drop Shadow Color
    var rFill3 = "#990000";  // Right Shape 3 Fill Color
    var rDS3 = "#d54f2c";    // Right Shape 3 Drop Shadow Color


    setColors(lFill1, lDS1, lFill2, lDS2, lFill3, lDS3, rFill1, rDS1, rFill2, rDS2, rFill3, rDS3);


    var sheet = document.createElement("style");

    sheet.innerHTML = "";
    sheet.innerHTML += "* {--main-bg-color: #fff;}\n";
    sheet.innerHTML += "* {--logo-bg-color: #ffffff;}\n";
    sheet.innerHTML += "* {--drop-shadow-color: #ff6935;}\n";
    sheet.innerHTML += "* {--main-text-color: #000000;}\n";
    sheet.innerHTML += "* {--secondary-text-color: #999999;}\n";
    sheet.innerHTML += "* {--sidebar-text-color-highlighted: #ffffff;}\n";
    sheet.innerHTML += "* {--sidebar-text-color: #e0e0e0;}\n";
    document.body.appendChild(sheet);
}

function christmasTheme(){
    console.log("Merry Christmas!");

    // Change Logo
    document.getElementById("logo").src =
        "resources/Logos/TLR_christmas.svg";

        var lFill1 = "#09DC8A";  // Left Shape 1 Fill Color
        var lDS1 = "#00e07b";    // Left Shape 1 Drop Shadow Color
        var rFill1 = "#09DC8A";  // Right Shape 1 Fill Color
        var rDS1 = "#00e07b";    // Right Shape 1 Drop Shadow Color
        
        var lFill2 = "#11B772";  // Left Shape 2 Fill Color
        var lDS2 = "#00ff8c";    // Left Shape 2 Drop Shadow Color
        var rFill2 = "#11B772";  // Right Shape 2 Fill Color
        var rDS2 = "#00ff8c";    // Right Shape 2 Drop Shadow Color
        
        var lFill3 = "#27905F";  // Left Shape 3 Fill Color
        var lDS3 = "#00e07b";    //     Left Shape 3 Drop Shadow Color
        var rFill3 = "#27905F";  // Right Shape 3 Fill Color
        var rDS3 = "#00e07b";    // Right Shape 3 Drop Shadow Color
        
    
    
        setColors(lFill1, lDS1, lFill2, lDS2, lFill3, lDS3, rFill1, rDS1, rFill2, rDS2, rFill3, rDS3);

    var sheet = document.createElement("style");

    sheet.innerHTML = "";
    sheet.innerHTML += "* {--main-bg-color: #fff;}\n";
    sheet.innerHTML += "* {--logo-bg-color: #ffffff;}\n";
    sheet.innerHTML += "* {--drop-shadow-color: #ff0000;}\n";
    sheet.innerHTML += "* {--main-text-color: #000000;}\n";
    sheet.innerHTML += "* {--secondary-text-color: #999999;}\n";
    sheet.innerHTML += "* {--sidebar-text-color-highlighted: #ffffff;}\n";
    sheet.innerHTML += "* {--sidebar-text-color: #e0e0e0;}\n";
    document.body.appendChild(sheet);
}

function setColors(lFill1, lDS1, lFill2, lDS2, lFill3, lDS3, rFill1, rDS1, rFill2, rDS2, rFill3, rDS3){
    // Left Side
    
    var l1 = document.getElementById("organic_shape_l1");
    l1.style.setProperty("filter","drop-shadow(0px 0px 50px " + lDS1 + ")");
    l1.addEventListener("load",function(){
        l1.contentDocument.getElementsByClassName("cls-1")[0].style = "fill: " + lFill1 + " !important";
    }, false);

    var l2 = document.getElementById("organic_shape_l2");
    l2.style.setProperty("filter","drop-shadow(0px 0px 50px " + lDS2 + ")");
    l2.addEventListener("load",function(){
        l2.contentDocument.getElementsByClassName("cls-1")[0].style = "fill: " + lFill2 + " !important";
    }, false);

    var l3 = document.getElementById("organic_shape_l3");
    l3.style.setProperty("filter","drop-shadow(0px 0px 50px " + lDS3 + ")");
    l3.addEventListener("load",function(){
        l3.contentDocument.getElementsByClassName("cls-1")[0].style = "fill: " + lFill3 + " !important";
    }, false);

    // Right Side

    var r1 = document.getElementById("organic_shape_r1");
    r1.style.setProperty("filter","drop-shadow(0px 0px 50px " + rDS1 + ")");
    r1.addEventListener("load",function(){
        r1.contentDocument.getElementsByClassName("cls-1")[0].style = "fill: " + rFill1 + " !important";
    }, false);

    var r2 = document.getElementById("organic_shape_r2");
    r2.style.setProperty("filter","drop-shadow(0px 0px 50px " + rDS2 + ")");
    r2.addEventListener("load",function(){
        r2.contentDocument.getElementsByClassName("cls-1")[0].style = "fill: " + rFill2 + " !important";
    }, false);

    var r3 = document.getElementById("organic_shape_r3");
    r3.style.setProperty("filter","drop-shadow(0px 0px 50px " + rDS3 + ")");
    r3.addEventListener("load",function(){
        r3.contentDocument.getElementsByClassName("cls-1")[0].style = "fill: " + rFill3 + " !important";
    }, false);
}