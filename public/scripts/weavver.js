
var socket = io();


socket.on('account_loggedin', function(msg) {

});

socket.on('show_message', function(msg) {
     alert(JSON.stringify(msg));
});
