var menu;

function loadMenu() {
    var socket;
    menu = '<div></div><div></div><div></div> <div class="options_list"><ul><li>Remove</li><li>Properties</li><li>Info</li></ul></div>';
    $('.option_dots').append(menu);
    $('.option_dots').each(function(index, val) {
        var m = eval($(this).attr("menu_data"));
        var c_this = $(this);
        $.each(m, function(index, m_m) {
            c_this.children("div[class='options_list']").children('ul').append("<li>" + m_m + "</li>");
        });
    });
}