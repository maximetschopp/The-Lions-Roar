console.log("TLR Editor   Version 0.62");

// const windowTree = 
// {"root-panel": 
//     {"publications-list":
//         {"publication-info":
//             ["publication-preview",
//             {"articles-list": 
//                 {"article-info": 
//                     ["article-preview", "modal-editor"]
//                 }
//             }
//             ]
//         }
//     }
// }
const windowTree = 
{
    "root-panel": "publications-list",
        "publications-list": "publication-info",
            "publication-info": ["publication-preview", "articles-list"],
                "articles-list": "article-info",
                    "article-info": ["article-preview","modal-editor"]
}

function expandPanel(element, override){
    let panel = element.parentNode;
    let minWidth = getComputedStyle(panel).getPropertyValue('--panel-min-width');
    let maxWidth = getComputedStyle(panel).getPropertyValue('--panel-max-width');
    let minWidthpx = cssUnitsToPx(minWidth);
    let maxWidthpx = cssUnitsToPx(maxWidth);

    let currWidth = cssUnitsToPx(panel.offsetWidth);

    if(override){
        if(override === 'phone'){
            panel.style.width = minWidth; // 50vh
        } else if (override === 'tablet'){
            panel.style.width = '110vh';
        } else if (override === 'desktop'){
            panel.style.width = '200vh';
        }
        return;
    }

    if(Math.abs(minWidthpx - currWidth) <= 50){    // if almost minWidth
        console.log("almost minWidth");
        panel.style.width = maxWidthpx;
    } else if (Math.abs(maxWidthpx - currWidth) <= 50){    // if almost maxWidth
        console.log("almost maxWidth");
        panel.style.width = minWidthpx;
    } else {
        panel.style.width = maxWidth;
    }
}

function togglePanel(id, enable){
    let panelId = id.replace('-button', '');
    let panel = document.getElementById(panelId);
    let button = document.getElementById(panelId + '-button');
    let enabledDisplayType = 'block';
    let disabledDisplayType = 'none';

    if (typeof enable == 'undefined'){
        enable = !(panel.classList.contains('panel-toggle-button-enabled'));
    }

    if(enable && panel.style.display === disabledDisplayType){
        panel.style.display = enabledDisplayType;
        if(button != undefined){
            button.innerHTML = button.getAttribute('enabledText');
            button.classList.add('panel-toggle-button-enabled');
        }
        console.log("enabled " + panelId);
    } else {
        console.log("disabled " + panelId);
        // disable 'children' panels

        collapsePanel(panelId);
    }
}

function collapsePanel(panelId){
    // break condition

    childPanelId = windowTree[panelId];

    if(panelId in windowTree){ // if it has children panels
        if(typeof windowTree[panelId] === 'object'){
            for (let i = 0; i < windowTree[panelId].length; i++) {
                collapsePanel(windowTree[panelId][i]);
            }
        } else {
            collapsePanel(windowTree[panelId]);
        }
    }

    let panel = document.getElementById(panelId);
    let button = document.getElementById(panelId + '-button');
    let disabledDisplayType = 'none';

    panel.style.display = disabledDisplayType;
    if(button != undefined){
        button.innerHTML = button.getAttribute('disabledText');
        button.classList.remove('panel-toggle-button-enabled');
    }

    console.log("disabled " + panelId);

}

function notify(message, color, displayMS){
    let notif = document.createElement('div');
    notif.classList.add('notif', color +'-notif');
    notif.innerHTML = message;
    let notifId = 'notif-' + Math.floor(Math.random() * 99999999999)
    notif.id = notifId;
    document.getElementById('notif-container').appendChild(notif);
    setTimeout(() => {
        document.getElementById(notifId).remove()
    }, displayMS);
}

function cssUnitsToPx(j){
    let result = j;
    if(typeof j === 'string' && j.includes('vh')){
        result = j.match(/\d+/)[0]/100 * window.innerHeight; // height bc width based on height of window
    } else if(typeof j === 'string' && j.includes('vw')){
        result = j.match(/\d+/)[0]/100 * window.innerWidth; // height bc width based on height of window
    }
    return result;
}