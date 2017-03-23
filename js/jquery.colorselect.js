/*
 * $-color 0.1 - New Wave Javascript
 *
 * Copyright (c) 2008 King Wong
 * 修改后实现：
 *     1.兼容IE6，IE7，FF
 *     2.鼠标离开颜色选择器，则颜色选择器自动消失
 *     3.调整了颜色选择器的初始位置
 *     4.将颜色选择器的颜色值显示项的属性更改为只读
 *     5.默认选择框ipunt字体加粗
 *     6.默认选择框字体颜色为所选颜色
 *     7.默认选择框字体大写 
 *     8.不会被 <select>遮盖
 * $Date: 2008-10-1  $
 * 版权属于原作者
 * 修改：飞飞（QQ：276230416）
 * 
 */

(function($){
	  $.fn.extend({
		  selectColor:function(){
			var _d = new Date();
			var _tem = _d.getTime();
			var t;
			  return this.each(function(){
				var showColor = function(_obj){
					var _left = parseInt($(_obj).offset().left);
					var _top = parseInt($(_obj).offset().top);
					var _width = parseInt($(_obj).width())/2;
					var _height = parseInt($(_obj).height());
					var _maxindex = function(){
						var ___index = 0;
						$.each($("*"),function(i,n){
							 var __tem = $(n).css("z-index");
							 if(__tem>0)
							 {
								if(__tem > ___index)
								{
									___index = __tem + 1;	
								}
							 }
						 });
						return ___index;
					}();
					
					var colorH = new Array('00','33','66','99','CC','FF');
					var ScolorH = new Array('FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF');
					var _str = new Array();
					for(var n = 0 ; n < 6 ; n++)
					{
						_str.push('<tr height="11">');
						_str.push('<td style="width:11px;border:1px solid #333;background-color:#'+colorH[n]+colorH[n]+colorH[n]+'"></td>');
						for(var i = 0 ; i < 3; i++)
						{
							for(var j = 0 ; j < 6 ; j++)
							{
								_str.push('<td style="width:11px;border:1px solid #333;background-color:#'+colorH[i]+colorH[j]+colorH[n]+'"></td>');
							}
						}
						_str.push('</tr>');
					}
					for(var n = 0 ; n < 6 ; n++)
					{
						_str.push('<tr height="11">');
						_str.push('<td style="width:11px;border:1px solid #333;background-color:#'+ScolorH[n]+'"></td>')
						for(var i = 3 ; i < 6; i++)
						{
							for(var j = 0 ; j < 6 ; j++)
							{
								_str.push('<td style="width:11px;border:1px solid #333;background-color:#'+colorH[i]+colorH[j]+colorH[n]+'"></td>');
							}
						}
						_str.push('</tr>');
					}
					var colorStr = '<div id="colorShowDiv_'+_tem+'" style="width:229px;position:absolute;z-index:'+_maxindex+';left:'+(_left+_width)+'px;top:'+(_top+_height)+'px;">'
					//colorStr = colorStr+'<iframe style="position:absolute;z-index: -1;top:0;left:0;scrolling:no;border:0px;width:100%;height:100%;background-color:#ff0000" src="http://www.baidu.com" frameborder=0></iframe>sssssss'
					colorStr = colorStr+'<iframe style="position:absolute;z-index: -1;top:0;left:0;scrolling:no;width:100%;" frameborder=0></iframe>';
					colorStr = colorStr+'<table border="0" style="width:100%; height:30px; background-color:#CCCCCC;border-collapse:collapse;border:1px solid #333;border-bottom:0">'
					colorStr = colorStr+'<tr>'
					colorStr = colorStr+'<td style="width:40%;"><div id="colorShow_'+_tem+'" style="width:80px; height:18px; border:solid 1px #000000; background-color:#FFFFFF;"></div></td>'
					colorStr = colorStr +'<td style="width:60%;"><input id="color_txt_'+_tem+'" type="text" style="width:100px; height:20px;" value="#FFFFFF" readonly /></td>'
					colorStr = colorStr+'</tr>'
					colorStr = colorStr+'</table>'
					colorStr = colorStr+'<table border="0" id="colorShowTable_'+_tem+'" cellpadding="0" cellspacing="0" style="background-color:#000000;border:1px #333 solid;border-collapse:collapse">'+_str.join('')+'</table>'
					colorStr = colorStr + '</div>'
					$("body").append(colorStr);
					var _currColor;
					var _currColor2;
					$("#colorShowTable_"+_tem+" td").mouseover(function(){
						var _color = $(this).css("background-color");
						if(_color.indexOf("rgb")>=0)
						{
							var _tmeColor = _color;
							_tmeColor = _color.replace("rgb","");
							_tmeColor = _tmeColor.replace("(","");
							_tmeColor = _tmeColor.replace(")","");
							_tmeColor = _tmeColor.replace(new RegExp(" ","gm"),"");
							var _arr = _tmeColor.split(",");
							var _tmeColorStr = "#";
							for(var ii = 0 ; ii < _arr.length ; ii++)
							{
								var _temstr = parseInt(_arr[ii]).toString(16);
								_temstr = _temstr.length < 2 ? "0"+_temstr : _temstr;
								_tmeColorStr += _temstr;
							}
						}
						else
						{
							_tmeColorStr = _color
						}
						$("#color_txt_"+_tem).val(_tmeColorStr.toUpperCase());
						$("#colorShow_"+_tem).css("background-color",_color);
						_currColor = _color;
						_currColor2 = _tmeColorStr;
						$(this).css("background-color","#FFFFFF");
						});
					$("#colorShowTable_"+_tem+" td").mouseout(function(){$(this).css("background-color",_currColor);});
					$("#colorShowTable_"+_tem+" td").click(function(){$(_obj).val(_currColor2.toUpperCase());$(_obj).css("color",_currColor2);$(_obj).css("font-weight","bold");return dd();});
					$("#colorShowDiv_"+_tem).mouseout(function(){t=setTimeout(dd,50)});
					$("#colorShowDiv_"+_tem).mouseover(function(){clearTimeout(t)});
					var dd = function(){$("#colorShowDiv_"+_tem).remove()};
				}
				$(this).click(function(){
					showColor(this);
				});
				var _sobj = this;
				$(document).click(function(e){
					e = e ? e : window.event;
					var tag = e.srcElement || e.target;
					if(_sobj.id==tag.id)return;
					var _temObj = tag;
					while(_temObj)
					{
						if(_temObj.id=="colorShowDiv_"+_tem)return;
						_temObj = _temObj.parentNode;
					}
					$("#colorShowDiv_"+_tem).remove();	
				});
			});
	  	}
	  });
})(jQuery);