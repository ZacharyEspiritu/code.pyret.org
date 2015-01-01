$( document ).ready( function() {
  $( "#REPL" ).css( "left", "50%");
  var editorEvenSplit = true;
  var replHeight = $( "#REPL" ).height();
  $( "#REPL" ).resizable({
    maxHeight: replHeight,
    maxWidth: window.innerWidth - 128,
    minHeight: replHeight,
    minWidth: 100,
    handles: {"w": "#handle"}});

  $( ".ui-resizable-handle").css("cursor", "ew-resize");
  $( ".ui-resizable-w" ).css("height", "calc(100% - 55px)");
  $( ".ui-resizable-w" ).css("top", "55px");
  $( ".ui-resizable-w" ).css("width", "5px");
  $( ".ui-resizable-w" ).css("left", "0px");
  $( ".ui-resizable-w" ).css("background", "black");
  $( ".repl" ).css("padding-left", "10px");

  $( "#REPL" ).on( "resize", leftResize);
  $( "#REPL" ).on( "resize", function() {editorEvenSplit = false;});

  function leftResize(event, ui) {
  var leftWidth = (window.innerWidth - ui.size.width)
    $(".replMain").css("width", leftWidth + "px");
      }

  $( "#REPL" ).on( "resizestop", toPercent);

  var rightResizePct;
  var leftResizePct;
  function toPercent(event, ui) {
    var winWidth = window.innerWidth
    rightResizePct = (ui.size.width / winWidth) * 100
    leftResizePct = 100 - rightResizePct
    setSize(leftResizePct, rightResizePct);
  }

  $(window).on("keydown", function(e) {
    if(e.ctrlKey) {
      if(e.keyCode === 77) { // Ctrl-m
        toggleEditorSize();
        e.stopImmediatePropagation();
        e.preventDefault();
      }
      else if (e.keyCode === 13) {
        e.preventDefault();
      }
    }
  });

  function toggleEditorSize() {
    if(editorEvenSplit) {
      editorEvenSplit = false;
      setSize(leftResizePct, rightResizePct);
    }
    else {
      editorEvenSplit = true;
      setSize("50", "50");
    }
  }


  function setSize(leftPct, rightPct) {
    $( "#REPL" ).css( "width", rightPct + "%");
    $( "#REPL" ).css( "left", leftPct + "%");
    $(".replMain").css("width", leftPct + "%");
  }

  $( window ).resize( function() {
    $( "#REPL" ).resizable( "option", "maxWidth", window.innerWidth - 128);
  });
});