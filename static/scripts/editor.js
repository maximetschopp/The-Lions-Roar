var dragging = false;
var dragBarSelected;
var panelMinWidth = 250;
var panelMaxWidth = 900;


addEventListener('DOMContentLoaded', (event) => {ready()});

function dragstart(e, dragbarNumber) {
  e.preventDefault();
  dragBarSelected = dragbarNumber;
  dragging = true;
}
function dragmove(e) {
  if (dragging) 
  {  
    var percentage = ((e.pageX-document.getElementsByClassName("panel")[dragBarSelected].getBoundingClientRect()['x']) / window.innerWidth) * 100;
    console.log(e.pageX);
    if (percentage > 5 && percentage < 98) {
      document.getElementsByClassName("panel")[dragBarSelected].style.width = percentage + "%";
    }

  }
}
function dragend() {
  dragging = false;
  dragBarSelected = -1;
  var vend = navigator.vendor;
  if (window.editor && vend.indexOf("Apple") == -1) {
      window.editor.refresh();
  }
}

function ready() {

  if (window.addEventListener) {       
    
    for(let i = 0; i < document.getElementsByClassName('dragbar').length; i++) {
      document.getElementsByClassName('dragbar')[i].addEventListener("mousedown", function(e) {dragstart(e, i);});
      document.getElementsByClassName('dragbar')[i].addEventListener("touchstart", function(e) {dragstart(e, i);});

    }
    
      window.addEventListener("mousemove", function(e) {dragmove(e);});
      window.addEventListener("touchmove", function(e) {dragmove(e);});
      window.addEventListener("mouseup", dragend);  
      window.addEventListener("touchend", dragend);
  }

}
