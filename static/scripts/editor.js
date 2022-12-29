console.log("hello world!");

function togglePublicationPreview(element){
    if(element.classList.contains('panel-toggle-button-enabled')){
        element.classList.remove('panel-toggle-button-enabled');
        element.innerHTML = 'Preview Publication';
        document.getElementById('publication-preview').style.display = 'none';
    } else {
        element.classList.add('panel-toggle-button-enabled');
        document.getElementById('publication-preview').style.display = 'block';
        element.innerHTML = 'Cancel Preview';
    }
}

function expandPanel(element){
    let panel = element.parentNode;
    let minWidth = getComputedStyle(panel).getPropertyValue('--panel-min-width');
    let maxWidth = getComputedStyle(panel).getPropertyValue('--panel-max-width');
    let minWidthpx = cssUnitsToPx(minWidth);
    let maxWidthpx = cssUnitsToPx(maxWidth);

    // if(maxWidth.includes('vh')){
    //     minWidthpx = minWidth.match(/\d+/)[0]/100 * window.innerHeight; // height bc width based on height of window
    // } else if(minWidth.includes('vw')){
    //     minWidthpx = minWidth.match(/\d+/)[0]/100 * window.innerWidth; // height bc width based on height of window
    // }
    // if(maxWidth.includes('vh')){
    //     maxWidthpx = maxWidth.match(/\d+/)[0]/100 * window.innerHeight; // height bc width based on height of window
    // } else if(minWidth.includes('vw')){
    //     maxWidthpx = maxWidth.match(/\d+/)[0]/100 * window.innerWidth; // height bc width based on height of window
    // }

    let currWidth = cssUnitsToPx(panel.offsetWidth);

    // console.log(cssUnitsToPx(minWidth));
    // console.log(minWidthpx);

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

function cssUnitsToPx(j){
    let result = j;
    if(typeof j === 'string' && j.includes('vh')){
        result = j.match(/\d+/)[0]/100 * window.innerHeight; // height bc width based on height of window
    } else if(typeof j === 'string' && j.includes('vw')){
        result = j.match(/\d+/)[0]/100 * window.innerWidth; // height bc width based on height of window
    }
    return result;
}