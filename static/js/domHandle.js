function woSDrag() {
    //loading menu
    //movement on the page
    $(".workarea > .icon_tools").draggable({
        containment: "parent",
        snapTolerance: 50,
        snap: true,
        revert: 'invalid',
        snapMode: "outside",
        drag: function() {
            var offset = $(this).offset();
            var xPos = offset.left;
            var yPos = offset.top;
            console.log(xPos, yPos);
        },
    }).resizable();
}
//input manipulation
function t_ggle() {
    //

    //the volume container
    $('.volume_range').rotatable({
        wheelRotate: true,
        handle: $(document.createElement('div')).attr('class', 'input_range'),
        degrees: -45,
        rotate: function(e, ui) {
            var degrees = ui.angle.current * 180 / Math.PI
            console.log(degrees)
            if (degrees <= 0) degrees += 180
            if (degrees <= 0) {
                console.log(degrees)
                ui.angle.current = -0.785398
            } else if (degrees >= 180) {
                ui.angle.current = 2.35619
            }
        },
    });
}

function menu_function() {
    function l_properties(old_id, object) {
        $('.properties  .settings_p  h3').text(object);
        $('.properties  .settings_p  input[type="text"]').attr({
            'placeholder': old_id
        });
        $('.settings_p div').show();
        $('.Pmessage_').hide();
    }
    $(".input_b_update").on('click', function(e) {
        if ($('#new_v').val() != '') {
            var a = $('.properties fieldset.settings_p div h3').text();
            var b = $(this).parents(".toolbar_icon");
            var name = $('#new_v').attr('placeholder');
            var name_ = name.replace(" ", "_");
            var new_name = $('#new_v').val();
            var new_name_ = new_name.replace(" ", "_");
            if (a == "Switch") {
                //when switch properties is clicked
                $("#" + name_).attr({
                    'id': new_name_
                });

                $("#" + new_name_).next("label").attr({
                    'for': new_name_
                });

                $('#new_v').val("");
                $("#" + new_name_).prev(".option_dots").find('li:nth-child(2)').trigger('click');

            } else if (a == "Button") {
                //when button properties is clicked
                $("#" + name_).text(new_name);
                $("#" + name_).attr({
                    'id': new_name_
                });
                $('#new_v').val("");
                $("#" + new_name_).prev(".option_dots").find('li:nth-child(2)').trigger('click');
            } else if (a == "Volume") {
                //when volume properties is clicked
                alert("v")
            } else if (a == "Range") {
                //when input range properties is clicked
                $("#" + name_).attr({
                    'id': new_name_
                });
                $('#new_v').val("");
                $("#" + new_name_).parents(".index_range").prev('.option_dots').find('li:nth-child(2)').trigger('click');

            }
        }
    });


    $(".workarea").on('click', '.option_dots ul li:nth-child(2)', function(e) {
        var b = $(this).parents(".toolbar_icon");

        $('#new_v').val("");
        if (b.hasClass("switch")) {
            //when switch properties is clicked
            var object = "Switch";
            var old_id = b.children('input').attr('id');
            l_properties(old_id, object);
        } else if (b.hasClass("press")) {
            //when button properties is clicked
            var object = "Button";
            var old_id = b.children('.p_Btn').text();
            l_properties(old_id, object);
        } else if (b.hasClass("volume")) {
            //when volume properties is clicked
            var object = "Volume";
            var old_id = "unset";
            l_properties(old_id, object);
        } else if (b.hasClass("volumeII")) {
            //when input range properties is clicked
            var object = "Range";
            var old_id = $(b).find('input').attr('id');
            l_properties(old_id, object);
        }
    });
    $(".workarea").on('click', '.option_dots ul li:nth-child(1)', function(e) {
        e.stopPropagation();
        var a = $(e.target).parents(".toolbar_icon");
        var b = a;
        a.remove();
        $('.settings_p div').hide();
        $('.Pmessage_').show();
        //console.log( "adfasdfasdfasdf"+a);
        //console.log( b.children('.p_Btn').text());
        if (b.hasClass("switch")) {
            $('.toolbar').append(input("switch", b.children('input').attr('id')));
        } else if (b.hasClass("press")) {
            $('.toolbar').append(input("button", b.children('.p_Btn').text()));
        } else if (b.hasClass("volume")) {
            $('.toolbar').append(input("volume"));
        } else if (b.hasClass("volumeII")) {
            $('.toolbar').append(input("volumeII", $(b).find('input').attr('id')));
        }
        //start function
        var c_dom = $('.toolbar > .icon_tools:last >.option_dots');

        function loadMenu_() {
            menu = '<div></div><div></div><div></div>  <div class="options_list"><ul><li>Remove</li><li>Properties</li><li>Info</li></ul></div>';
            c_dom.append(menu);
            var m = eval(c_dom.attr("menu_data"));
            //console.log(m));
            var c_this = c_dom;
            $.each(m, function(index, m_m) {
                //console.log(m_m);
                c_this.children(" div[class='options_list']").children('ul').append("<li>" + m_m + "</li>");
            });
        }
        loadMenu_();
        //loading to work space
        $(".toolbar .icon_tools").draggable({ revert: 'invalid' });
        $(".toolbar .icon_tools").on('click', function() {
            $('.workarea').append($(this));
        });
        //loading to work space
    });
}