var isPageLoaded = false; // we use this so the test suite tests don't time out
var isDialogLoaded = false;

//var pageX = 0;
//var pageY = 0;

function getPseudoGuid() {
     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
     });
}

function prm_initializeRequest(sender, args)
{
     isPageLoaded = false;
     isDialogLoaded = false;

     var orderForm = $('#Content_OrderForm');
     if (orderForm.length > 0)
          OrderFormLoading();
}

function prm_EndRequest(sender, args) {
     var orderForm = $('#Content_OrderForm');
     if (orderForm.length > 0)
          OrderFormLoaded();

     isPageLoaded = true;
}

function getParameterByName(name) {
     name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
     return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var origNoticeText = null;

jQuery.fn.center = function ($) {
     var w = $(window);
     this.css({
          'position': 'absolute',
          'display': '',
          'top': Math.abs(((w.height() - this.outerHeight()) / 2) + w.scrollTop()),
          'left': Math.abs(((w.width() - this.outerWidth()) / 2) + w.scrollLeft())
     });
     return this;
}

//signalr stuff
$(function () {
     var chat = $.connection.chatHub;
     chat.client.debug = function (message) {
          console.log(message);
     };
     chat.client.broadcastMessage = function (name, message) {
          alert(message);
     };
     chat.client.openLogIn = function (name, message) {
          LoginOpen(this);
     }
     $.connection.hub.start().done(function () {
          $('#sendmessage').click(function () {
               chat.server.send("joe", $('#message').val());
               $('#message').val('').focus();
          });
     });
});

function LoginOpen(o) {
     $find('MasterHeader1_LogIn_MPELogIn').show();
     
     //.center();

     document.getElementById('MasterHeader1_LogIn_Login1_UserName').focus();
//    var SignInLink = document.getElementById("LoginView1_SignInLink");
//    var LoginBox = document.getElementById("LogIn_LoginBox");
//    var SignInArea = document.getElementById("SignInArea");
//    var Navigation = document.getElementById("NavigationBox");
//    var Notice = document.getElementById("Notice");

//    if (origNoticeText == null && Notice != null) {
//        origNoticeText = Notice.innerHTML;
//    }
//    
//    LoginBox.style.top = "65px";

//    if (SignInLink.innerHTML == "Log In") {
//        if (Notice == null) {
//            Navigation.style.visibility = "hidden";
//        }
//        LoginBox.style.left = SignInArea.offsetLeft + SignInArea.offsetWidth - 580 + "px";
//        LoginBox.style.visibility = "visible";
//        SignInLink.innerHTML = "[Close]";
//        var txtBox = document.getElementById("Login1_UserName");
//        if (txtBox != null) txtBox.focus();
//        
//    }
//    else {
//        LoginBox.style.visibility = "hidden";
//        if (Notice == null) {
//            Navigation.style.visibility = "visible";
//        }
//        SignInLink.innerHTML = "Log In";
//        
//    }
}

function mouseOver(o, cssClass)
{
     o.className = cssClass;
}
function mouseOut(o, cssClass)
{
     o.className = cssClass;
}

function checkKey() {
//      var keyCode = window.event.keyCode;
//     if (keyCode == 113) document.location = '';
}

document.onkeyup = checkKey;

$(document).ready(function () {
     // this apparently only fires on page load once so we use the following
     // methods to set up the events for ajax functions
     Sys.WebForms.PageRequestManager.getInstance().add_initializeRequest(prm_initializeRequest);
     Sys.WebForms.PageRequestManager.getInstance().add_endRequest(prm_EndRequest);

     isPageLoaded = true;
});


$(document).mousemove(function (e) {
     document.pageX = e.pageX;
     document.pageY = e.pageY;
});

//$(document).ready(function() {
//     $("#MyTreeDiv A").contextMenu({
//          menu: 'myMenu'
//     }, function(action, el, pos) {
//          alert(
//               'Action: ' + action + '\n\n' +
//               'Element text: ' + $(el).text() + '\n\n' + 
//               'GUID: ' + getGUID($(el).attr("href")) + '\n\n' + 
//               'X: ' + pos.x + ' Y: ' + pos.y + ' (relative to element)\n\n' + 
//               'X: ' + pos.docX + ' Y: ' + pos.docY+ ' (relative to document)');
//          });
//});

function getGUID(mystr) {
     var reGUID = /\w{8}[-]\w{4}[-]\w{4}[-]\w{4}[-]\w{12}/g 
     var retArr = [];
     var retval = '';
     retArr = mystr.match(reGUID);
     if(retArr != null)
     {
          retval = retArr[retArr.length - 1];
     }
     return retval;
}

function AutoCompleteTextBox_itemSelected(sender, e)
{
     // alert('Key: ' + e.get_text() + ' val: ' + e.get_value());
     var controlId = sender._id;// "ctl00_Content_ctl00_Content_AutoText_AutoCompl"
     controlId = controlId.substr(6);
     controlId = controlId.substr(0, controlId.length - 15);
     // alert(controlId);
     
     var textBox = document.getElementById(controlId);
     
     __doPostBack(textBox.name, e.get_value());
}

function handleEnter(targetBtn, event)
{
     var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
     if (keyCode == 13) {
          document.getElementById(targetBtn).click();
          return false;
     }
     else
          return true;
 }
 // alert((new Date()).getTimezoneOffset());
 
 
 var timezone = jstz.determine_timezone(); // Now you have an instance of the TimeZone object.

if (document.cookie.indexOf("TimeZoneName=") == -1) {
    document.cookie = "TimeZoneName=" + timezone.name();

    if (document.cookie)
        document.location.reload(true);
}

var OrderFormLoading = function () {
    var orderForm = $('#Content_OrderForm');

//    var image = $('<img />').attr('src', '/images/loading.gif')
//    .load(function()
//    {
//        this.attr('id', 'loading');

//        // add the overlay with loading image to the page
//        var overlay = $('<div />').attr('id', 'orderOverlay');
//        overlay.append(this);
//        overlay.append('<br />Loading..');
//                
//        $(overlay).appendTo('body');

//        $("#orderOverlay").css({
//            opacity: 0.5,
//            left: orderForm.offset().left,
//            top: orderForm.offset().top,
//            width: orderForm.outerWidth(),
//            height: orderForm.outerHeight()
//        });

//        // click on the overlay to remove it
//        $('#orderOverlay').click(function () {
//            //$(this).remove();
//        });

//        // hit escape to close the overlay
//        $(document).keyup(function (e) {
//            if (e.which === 27) {
//                $('#orderOverlay').remove();
//            }
//        });
//    });
};

var OrderFormLoaded = function ()
{
     var orderOverlay = $('#orderOverlay');
     if (orderOverlay.length != 0)
     {
          orderOverlay.remove();
     }
}

// jquery example
//function timeFormatLocal(timeStr) {
//    var dt = new Date(timeStr);
//    return dt.toLocaleString();
//}

//    
//function timeReformatLocal(selector) { $(selector).each(function () { $(this).html(timeFormatLocal($(this).html())); }); }



$(document).ready(function () {
//     $("img").load(function () { $(this).data('status', 'loaded'); })
//     $("img").error(function () { $(this).data('status', 'error'); })


     if (navigator.userAgent.indexOf('iPhone') != -1) {
          addEventListener("load", function () {
               setTimeout(hideURLbar, 0);
          }, false);
     }

     function hideURLbar() {
          window.scrollTo(0, 1);
     }
});


function showMessage($title, $body, $redirurl)
{
     //$.fx.speeds._default = 1000;

     $("#modalBox").dialog({
          autoOpen: false,
          show: "blind",
          title: "[untitled]",
          modal: true,
          open: function () { isDialogLoaded = true; },
          buttons: {
               OK: {
                    text: "OK",
                    id: "modalBoxOK",
                    click: function () {
                         //$(this).dialog("close");
                         if ($redirurl) {
                              if ($redirurl == "refresh")
                                   location.reload();
                              else
                                   window.location.replace($redirurl);
                         }
                         else {
                              $(this).dialog("close");
                         }
                    }
               }
          }
     });

     $('#modalBox').dialog('option', 'title', $title);
     $("#modalBox").html($body);
     $("#modalBox").dialog("open");
}

function run() {
     $('.menuLink').hover(function () {
          $(this).css('background-color', 'white');
          $(this).css('color', 'black');
     }, function () {
          $(this).css('background-color', '');
          $(this).css('color', '#FFFFFF');
     });
}