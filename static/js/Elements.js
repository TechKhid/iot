function input(input,name = null)
{
var name ;
var name_;
if(name != null)
{
name_ = name.replace(" ","_");
}
else
{
name_ = null;
}
var input;
var input_switch = '<div class="toolbar_icon switch icon_tools">\
	<div class="option_dots" menu_data = " ">\
		</div><input type="checkbox" id="'+name_+'" class="switch_checkbox"/><label for="'+name_+'" style="width:fit-content;height:fit-content;padding:0;margin:0;border:0"><div class="swthButton " >\
		<div class="swthNob">\
		</div>\
	</div>\
</div>';
var button= '<div class="press toolbar_icon icon_tools" >\
	<div class="option_dots" menu_data = " ">\
	</div>\
<button class="p_Btn" id="'+name_+'" >'+name+'</button></div>' ;
var volumeI = '<div class="volume toolbar_icon icon_tools">\
	<div class="option_dots" menu_data = " ">\
	</div>\
	<div class="volume_range" ></div>\
</div>';
var volumeII = '<div class="volumeII toolbar_icon icon_tools">\
	<div class="option_dots" menu_data = " ">\
	</div>\
	<div class="index_range" ><input type="range" id="'+name_+'" min="0" max="100"  value="50"/></div>\
</div>';
switch(input)
{
case "switch":
return input_switch;
break;
case "button":
return button;
break;
case "volume":
return volumeI;
case "volumeII":
return volumeII;
break;
default:
// code block
}
}