// Made by Maxime Tschopp && Nikita Lurye

document.addEventListener("DOMContentLoaded", ready);
function ready() {
    if (Math.random() < 0.001) {
        document
            .getElementById("logo")
            .setAttribute("src", "resources/Logos/TLR_Logo_svg_rawr.svg");
    }
}

var expanded = 0;
var scroll = 0;
var lastExpandedSiderbarItem = null;
var lastExpandedSiderbarItemType = "year";
var addedScroll = 0;

window.addEventListener("scroll", (e) => {
    let elements = document.getElementsByClassName("publication-container");
    let closest = null;
    let verticalOffset = null;
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        let rect = element.getBoundingClientRect();
        //calculate the distance between the element and the top of the page
        let offset = Math.abs(
            (rect.top + rect.bottom) / 2 - window.innerHeight * 0.35
        );
        if (verticalOffset == null || offset < verticalOffset) {
            verticalOffset = offset;
            closest = element;
            // console.log(offset, closest);
        }
    }
    if (closest != null) {
        let year = closest.getAttribute("year");
        let month = closest.getAttribute("month");
        let day = closest.getAttribute("day");
        expandSidebarItem(year, month, day, false);
    }
});

setInterval(() => {
    addedScroll = lerp(
        addedScroll,
        Math.min(1, expanded) * window.innerHeight * 0.4,
        0.05
    );
    updateExpanded();
}, 1);

function lerp(a, b, p) {
    return a * (1 - p) + b * p;
}

function scale(min_in, max_in, min_out, max_out, value) {
    return Math.max(
        min_out,
        Math.min(
            max_out,
            ((value - min_in) / (max_in - min_in)) * (max_out - min_out) +
                min_out
        )
    );
}

function updateExpanded() {
    // toggle Logo & bg
    scroll = this.scrollY;
    let useScroll = scroll + addedScroll;
    var logo = document.getElementById("logo");
    var logoBg = document.getElementById("logoBg");
    logo.style.top =
        lerp(
            11,
            2,
            scale(
                window.innerHeight * 0.1,
                window.innerHeight * 0.3,
                0,
                1,
                useScroll
            )
        ) + "%";
    logo.style.width =
        lerp(
            80,
            30,
            scale(
                window.innerHeight * 0.1,
                window.innerHeight * 0.3,
                0,
                1,
                useScroll
            )
        ) + "vh";

    if (useScroll >= window.innerHeight * 0.3) {
        logoBg.classList.remove("logoBgHidden");
    } else {
        logoBg.classList.add("logoBgHidden");
    }

    // var minimizePercent = 0.11; // percent to scroll until logo minimizes

    // if (expanded + scroll / (window.innerHeight * minimizePercent) < 1) {
    //     var logo = document.getElementById("logo");
    //     logo.classList.remove("logoMinimized");
    //     var logoBg = document.getElementById("logoBg");
    //     logoBg.classList.add("logoBgHidden");
    // } else {
    //     var logo = document.getElementById("logo");
    //     logo.classList.add("logoMinimized");
    //     var logoBg = document.getElementById("logoBg");
    //     logoBg.classList.remove("logoBgHidden");
    // }
}

function toggleExpandArticle(button) {
    // replace button text
    if (button.innerHTML != "Hide Extras") {
        button.innerHTML = "Hide Extras";
        expanded++;
    } else {
        button.innerHTML = "Extras";
        expanded--;
    }
    updateExpanded();
    if (expanded > 0) {
        document.getElementById("spacer").classList.add("spacerMinimized");
    } else {
        document.getElementById("spacer").classList.remove("spacerMinimized");
    }
    // toggle the grids
    var splashContainer = button.closest(".publication-container");
    splashContainer.classList.toggle("publication-container-expanded");

    var mainArticleGrid = button.closest(".publication-grid");
    mainArticleGrid.classList.toggle("publication-grid-minimized");

    var extraArticlesGrid = splashContainer.getElementsByClassName(
        "extra-articles-grid"
    )[0];
    extraArticlesGrid.classList.toggle("extra-articles-grid-shown");
}

function expandSidebarItem(year, month, day, need_scroll) {
    if (need_scroll) {
        if (year == topYear && month == topMonth && day == topDay) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            var scroll_to = document.getElementsByClassName(
                "pub-containter_identifier-" + year + "-" + month + "-" + day
            )[0];
            scroll_to.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    } else {
        collapseAll();
        var elements = document.getElementsByClassName(
            "sidebar-cd-" + year + "_" + month + "_" + day
        );
        Array.prototype.slice.call(elements).forEach((element) => {
            element.classList.remove("hidden");
            element.classList.add("sidebar-bold");
        });
        var elements = document.getElementsByClassName(
            "sidebar-cd-" + year + "_" + month
        );
        Array.prototype.slice.call(elements).forEach((element) => {
            element.classList.remove("hidden");
        });
        var elements = document.getElementsByClassName("sidebar-cd-" + year);
        Array.prototype.slice.call(elements).forEach((element) => {
            element.classList.remove("hidden");
        });
    }
}

function collapseAll() {
    var elements = document.getElementById("sidebar_text_container").children;
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("sidebar-bold");
        if (elements[i].classList.contains("sidebar-year")) {
            continue;
        }
        elements[i].classList.add("hidden");
    }
}

function logoClicked() {
    console.log("logoClicked");
    //window.scrollTo(0,0);
    window.scrollTo({ top: 0, behavior: "smooth" });
}
