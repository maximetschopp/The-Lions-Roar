console.log("hello world!");

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
                    "articleinfo": "article-preview",
                    "article-info": "modal-editor",
}

function expandPanel(element){
    let panel = element.parentNode;
    let minWidth = getComputedStyle(panel).getPropertyValue('--panel-min-width');
    let maxWidth = getComputedStyle(panel).getPropertyValue('--panel-max-width');
    let minWidthpx = cssUnitsToPx(minWidth);
    let maxWidthpx = cssUnitsToPx(maxWidth);

    let currWidth = cssUnitsToPx(panel.offsetWidth);

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
        button.innerHTML = button.getAttribute('enabledText');
        button.classList.add('panel-toggle-button-enabled');
        console.log("enabled " + panelId);
    } else {
        panel.style.display = disabledDisplayType;
        button.innerHTML = button.getAttribute('disabledText');
        button.classList.remove('panel-toggle-button-enabled');
        console.log("disabled " + panelId);
        // disable 'children' panels

        collapseChildrenPanel(panelId);
    }
}

function collapseChildrenPanel(panelId){
    // break condition
    let hasChildren = panelId in windowTree;

    if(hasChildren){
        if(typeof windowTree[panelId] === 'object'){
    
            for (let i = 0; i < windowTree[panelId].length; i++) {
                collapseChildrenPanel(windowTree[panelId][i]);
            }
        } else {
            collapseChildrenPanel(windowTree[panelId]);
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

// function togglePublicationsList(element){
//     if(element.classList.contains('panel-toggle-button-enabled')){
//         element.classList.remove('panel-toggle-button-enabled');
//         element.innerHTML = 'Edit Publications';
//         document.getElementById('publications-list').style.display = 'none';
//         document.getElementById('publication-info').style.display = 'none';
//     } else {
//         element.classList.add('panel-toggle-button-enabled');
//         document.getElementById('publications-list').style.display = 'block';
//         document.getElementById('publication-info').style.display = 'block';
//         element.innerHTML = 'Done';
//     }
    
// }

// function togglePublicationPreview(element){
//     if(element.classList.contains('panel-toggle-button-enabled')){
//         element.classList.remove('panel-toggle-button-enabled');
//         element.innerHTML = 'Preview Publication';
//         document.getElementById('publication-preview').style.display = 'none';
//     } else {
//         element.classList.add('panel-toggle-button-enabled');
//         document.getElementById('publication-preview').style.display = 'block';
//         element.innerHTML = 'Cancel Preview';
//     }
// }


// function toggleSubArticles(element){
//     if(element.classList.contains('panel-toggle-button-enabled')){
//         element.classList.remove('panel-toggle-button-enabled');
//         element.innerHTML = 'Edit Sub-articles';
//         document.getElementById('articles-list').style.display = 'none';
//         document.getElementById('article-info').style.display = 'none';
//     } else {
//         element.classList.add('panel-toggle-button-enabled');
//         document.getElementById('articles-list').style.display = 'block';
//         document.getElementById('article-info').style.display = 'block';
//         element.innerHTML = 'Done';
//     }
// }


// function toggleArticlePreview(element){

// }

// function toggleModalEditor(element){

// }

function cssUnitsToPx(j){
    let result = j;
    if(typeof j === 'string' && j.includes('vh')){
        result = j.match(/\d+/)[0]/100 * window.innerHeight; // height bc width based on height of window
    } else if(typeof j === 'string' && j.includes('vw')){
        result = j.match(/\d+/)[0]/100 * window.innerWidth; // height bc width based on height of window
    }
    return result;
}