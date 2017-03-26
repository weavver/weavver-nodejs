var expandedMode = true;
var hoverBackCover = "";
var normalBackCover = "";
var offsetX = 0;
var offsetY = 0;


function getPseudoGuid() {
     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
     });
}

$(document).ready(function () {
     jQuery.expr[':'].focus = function (elem) {
          return elem === document.activeElement && (elem.type || elem.href);
     };

     $.ctrl = function (key, callback, args) {
          $(document).keydown(function (e) {
               if (!args) args = []; // IE barks when args is null
               if (e.keyCode == key.charCodeAt(0) && e.ctrlKey) {
                    callback.apply(this, args);
                    return false;
               }
          });
     };

     //initialization
     $('.menu').menu({
          focus: function (event, ui) {
               var menu = $(this);
               var timeout = menu.data('timer');
               if (timeout) {
                    clearTimeout(timeout);
                    menu.data('timer', null);
               }
          },
          blur: function (event, ui) {
               var menu = $(this);
               timer = setTimeout(function () {
                    menu.menu().hide();
                    menu.data('state', 'hidden');
                    menu.data('timer', null);
               }, 300);
               menu.data('timer', timer);
          }
     }).removeClass('ui-corner-all').hide();

     $('.menuLink').hover
     (
          function () {
               $(this).css("background-Color", "#FFFFFF");
               $(this).css("color", "black");
               //$('.addMenu', $(this)).css('visibility', '');
          },
          function () {
               $(this).css("background-Color", "");
               $(this).css("color", "white");
               //                    if (expandedMode == false) {
               //                         $('.addMenu', $(this)).css('visibility', 'hidden');
               //                    }
          }
     );

     $('.menuLink').bind({
          click: function () {
               var menu = $(this).next('.menu');

               var state = menu.data('state');
               if (state == "shown") {
                    $(this).css('background-color', 'white');
                    menu.menu().hide();
                    menu.data('state', 'hidden');
               }
               else {
                    var left = $(this).offset().left;
                    menu.menu().css('left', left);
                    var top = $('#topbar').offset().top + $('#topbar').height();
                    menu.menu().css('top', top);
                    menu.menu().show();
                    menu.data('state', 'shown');
                    $(this).css('background-color', '');
               }
          }
     });

     //                         menu.css('position', 'absolute');
     //                         menu.slideDown("fast");

     $(document).keyup(function (e) {
          //alert(e.keyCode);

          if (e.keyCode == 27) // escape // clear any fields from focus
          {
               $("input").blur();
          }

          if (e.keyCode == 77) { // m Key
               if (!$("input").is(":focus")) {
                    toggleMenu();
                    e.stopPropagation();
               }
          }
     });

     //          $.ctrl('M', function (event) {
     //               //alert('box has focus');
     //               if (!$("input").is(":focus")) {
     //                    toggleMenu();
     //                    event.stopPropagation();
     //               }
     //          });

     //createPopup('fff', 300, 300, 'asdf');
});

function preventIFrameMouseEvents() {
     $('iframe').css('pointer-events', 'none');
}

function allowIFrameMouseEvents() {
     $('iframe').css('pointer-events', 'auto');
}

function closeIFrame(windowId, parentId) {
     refreshParent(parentId);
     $('#' + windowId).remove();
}

function refreshParent(parentId) {
     var obj = $('iframe', '#' + parentId);
     obj.attr('src', obj.attr('src'));

     //$(obj)[0].contentWindow.document.forms[0].submit()
     //$('input[type=submit]').click();
     //$(obj)[0].WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$Content$DList$searchButton", "", true, "", "", false, false));
}

function createPopup(url, width, height, myId) {

     isDialogLoaded = true;
     if (width == 0) {
          width = $(document).width() - 10;
          if (width > 800)
               width = 800;
     }
     if (height == 0)
          height = 500;

     //$('#ContentTable').remove();

     var windowId = getPseudoGuid();

     frameDialogs.push(windowId);

     var newPopup = $('#TheIFrame').clone();
     newPopup.attr("id", windowId);
     newPopup.attr("style", newPopup.attr("style") + "; ");
     newPopup.attr("isdialog", 'yes');

     // navigate to the frame
     if (url.match(/\?/))
          url = url + '&IFrame=true&WindowId=' + windowId;
     else
          url = url + '?IFrame=true&WindowId=' + windowId;
     if (myId)
          url = url + '&ParentId=' + myId;

     $('iframe', newPopup).attr('src', url);

     newPopup.dialog({
               open: function (event, ui) {
                    //$(this).parent().find('.ui-dialog-titlebar').append($('#ItemTitle'));
                    $(".ui-dialog-content").css("padding", 0);
                    $(this).css('overflow', 'hidden');
                    isDialogLoaded = true;
               },
               close: function (event, ui) {
                    frameDialogs.pop(myId);
               },
               title: "Loading..",
               dragStart: preventIFrameMouseEvents,
               dragStop: allowIFrameMouseEvents,
               resizeStart: preventIFrameMouseEvents,
               resizeStop: allowIFrameMouseEvents,
               position: [offsetX + 5, offsetY + 120],
               width: width,
               height: height
          })    //.attr('id', 'dialogId').attr('name', 'dialogId');
          .dialogExtend({
               "closable": true,
               "maximizable": true,
               "minimizable": true,
               "collapsable": true,
               "dblclick": "collapse",
               "minimizeLocation": "right",
               "icons": {
                    "close": "ui-icon-circle-close",
                    "maximize": "ui-icon-circle-plus",
                    "minimize": "ui-icon-circle-minus",
                    "collapse": "ui-icon-triangle-1-s",
                    "restore": "ui-icon-bullet"
               }
          });
     //newPopup.draggable("option", "containment", [50, 50, 300, 300]);


     newPopup.resize(function () {
          clearTimeout(doit);
          doit = setTimeout(resizedw, 100);
     });

//          $('div', 'iframe').ready(function () {
//               $(this).dialog('option', 'title', $(this).attr('title'));
//          });

     //$('#ContentDIV').append(newPopup);

     offsetX = (offsetX > 100) ? 0 : offsetX + 20;
     offsetY = (offsetY > 100) ? 0 : offsetY + 20;

}
var frameDialogs = [];


