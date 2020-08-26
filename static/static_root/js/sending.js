var loc = window.location
var wsStart = 'ws://'
if (loc.protocol == 'https:') {
    wsStart = 'wss://'
}
var endpoint = wsStart + loc.host + loc.pathname + 'ws/hello/'
socket = new ReconnectingWebSocket('ws://' +
    window.location.host +
    '/ws/' +
    "hello" +
    '/')



socket.onmessage = function(e) {
    //console.log('message', e);
    //console.log(e.data);

    const data = JSON.parse(e.data);
    //console.log(data["de_device"] === undefined)

    if (data["device"] !== undefined) {
        var chk = $('#device_loadBox');

        if (chk.children().length == 0) {
            $('.Dmessage_').hide();
            $('#device_loadBox').show();

            var sec = '<p class="' + data.device + '"><span class="ico-holder-container"><i class="ico-holder"><i class="ico-"></i> </i></span>' + data.device + '</p>'
            $('#device_loadBox').append(sec);
        } else {

            if (!$('#device_loadBox p').hasClass(data.device)) {
                var sec = '<p class="' + data.device + '"><span class="ico-holder-container"><i class="ico-holder"><i class="ico-"></i> </i></span>' + data.device + '</p>'
                $('#device_loadBox').append(sec);
            }
        }


    } else if (data["de_device"] !== undefined) {
        if (!$('#device_loadBox p').hasClass(data.device)) {
            $("." + data.de_device).remove();
            if ($('#device_loadBox p').children().length == 0) {
                $('.Dmessage_').show();
                $('#device_loadBox').hide();
            }

        }

    }




}

socket.onopen = function(e) {
    console.log('onopen', e)
    var key;
    var value;

    function server_trans(key, value) {

        var dict = {};
        dict["msg_type"] = "data_send";
        dict["element_name"] = key;
        dict["element_data"] = value;

        //console.log(dict);

        socket.send(JSON.stringify(dict));
    }

    //Switch
    $('.swthButton').on('click', function(e) {
        e.stopPropagation();
        var g = $(this).parents('label').siblings('input');

        var id = g.attr('id');
        if (!g.is(':checked')) {
            //checked
            //console.log(": 1 ");

            //sockets here
            server_trans(id, "1");
            //sockets here

        } else {

            //sockets here
            server_trans(id, "0");
            //sockets here

            // unchecked
            //console.log(g.attr('id'));
            //console.log(": 0 ");
        }


    });

    // //


    var check_btn_down = 0
        // buttons function
    function sendB(check_btn_down, dom) {
        var object = dom.replace(" ", "_");
        //console.log("hi: " + object);

        //console.log("hello: " + check_btn_down);
        /*
                socket.send(JSON.stringify({
                    object: check_btn_down
                }));
        */
        ///
        //sockets here
        server_trans(object, check_btn_down);
        //sockets here

        /////////////
        /////////////
        /////////////
    }
    $('.p_Btn').mouseup(function(event) {
        /* Act on the event */
        check_btn_down = 0;
        var object = $(event.target).text();
        sendB(check_btn_down, object);
    });
    $('.p_Btn').mousedown(function(event) {
        /* Act on the event */
        check_btn_down = 1;
        var object = $(event.target).text();
        sendB(check_btn_down, object);
    });

    //sockets here

    /////////////
    /////////////
    /////////////



    //
    $('.index_range input').on('input', function(e) {

        var id = $(this).attr('id');
        var value = $(this).val();
        //////console.log(id);
        //////console.log(value);
        //sockets here
        server_trans(id, value);

        //sockets here
    });







}

socket.onerror = function(e) {
    console.log('error', e)
}

socket.onclose = function(e) {
    console.log('close', e)
}

/*
const roomName = "hello";

const chatSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/' +
    "hello" +
    '/'
);
console.log(chatSocket);

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    document.querySelector('#chat-log').value += (data.message + '\n');
};

chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function(e) {
    if (e.keyCode === 13) { // enter, return
        document.querySelector('#chat-message-submit').click();
    }
};

document.querySelector('#chat-message-submit').onclick = function(e) {
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        'message': message
    }));
    messageInputDom.value = '';
};*/