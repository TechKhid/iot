$('.toolbar').append([input("switch",'Switch 1'),input("switch",'Switch 2'),input("switch",'Switch 3'),input("button",'Button A'),input("button",'Button B'),input("button",'Button C'),input("button",'Button D'),input("button",'Button E'),input("button",'Button F'),input("volume"),input("volumeII",'Input 1'),input("volumeII",'Input 2'),input("volumeII",'Input 3'),input("volumeII",'Input 4')]);
$(".toolbar > .icon_tools ").ready(function() {
loadMenu();
menu_function();
//loading to work space
$(".toolbar .icon_tools").draggable({revert: 'invalid',});
$(".toolbar .icon_tools").on('click',function()
{
$('.workarea').append($(this));
});
//loading to work space
});
// //work space drop able
$( ".workarea" ).droppable({
accept:".icon_tools",
drop: function(event,ui){
var $destination = $(this);
ui.draggable.appendTo( $destination );
//drag function
woSDrag();
//manipulation function
t_ggle();
}
});