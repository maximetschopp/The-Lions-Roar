var colortype = urlParams.get("colortype");
if (colortype == null) {
    colortype = 0;
}

// Christmas
// Swiss national day
// Chinese new year
// halloween
// saint patricks day

console.log(colortype);
document.addEventListener("DOMContentLoaded", function () {
    if (colortype == 1) {
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
        document.body.appendChild(sheet);
        //document.body.style.backgroundColor = "#65da91";
    }
});
