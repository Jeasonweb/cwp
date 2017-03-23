//==========================================
//文 件 名：Js/function.asp
//文件用途：系统JS函数
//版权所有：方卡在线
//==========================================
var formTemp="";
var ajaxProcess="0";
var outdo="0";
var voteId="0";
var Ext1="";
var Ext2="";
var Ext3="";
var Ext4="";
var iPic=0;
var cPic=0;


//==========================================
//用途：按ESC关闭弹出窗口
//参数：
//==========================================
$(document).keydown(function(event){ 
	if(event.keyCode == 27){ 
		CloseBox();
	} 
}); 

//==========================================
//函数名：PageReSize
//用途：页面初始化
//参数：
//==========================================
function PageReSize(){
	var LeftWidth=189;
	var RightWidth=$("#Bodys").width()-189;
	var WindowsHeight=$(document).height()-90;
	var LeftHeight=$("#MainLeft").height();
	var RightHeight=$("#MainRight").height();
	if(RightWidth>812){
		$("#MainRight").width(RightWidth);
		$("#AllBox").width($("#Bodys").width());
	}else{
		$("#AllBox").width(1001);
	}
	if(LeftHeight<WindowsHeight||LeftHeight<RightHeight){
		if(RightHeight>WindowsHeight){
			$("#MainLeft").height(RightHeight);
		}else{
			$("#MainLeft").height(WindowsHeight);
		}
	}
}

//==========================================
//函数名：SetExt
//用途：设置允许后缀
//参数：
//==========================================
function SetExt(ex1,ex2,ex3,ex4){
	Ext1=ex1;
	Ext2=ex2;
	Ext3=ex3;
	Ext4=ex4;
}

//==========================================
//函数名：ShowBox
//用途：操作框弹出
//参数：
//==========================================
function ShowBox(DoUrl){
	$('#BoxContent').html("<div id='LoadBox'><a href='javascript:void(0);' title='点此关闭' onclick='CloseBox();'><img src='Images/Loading2.gif' /></a></div>");
	$("#Boxs").show();
	$.get(DoUrl,
		function(data){
			$('#BoxContent').html(data);
			$('.qbox').simpletooltip();
			//$('.qbox').hide();
			$('ul.triState','').tristate({
					heading: 'span.title'
			});
			if($(".Editer").length>0){
				$('.Editer').xheditor({html5Upload:false,upLinkUrl:"Upload.asp?immediate=1",upLinkExt:Ext1,upImgUrl:"Upload.asp?immediate=1",upImgExt:Ext2,upFlashUrl:"Upload.asp?immediate=1",upFlashExt:Ext3,upMediaUrl:"Upload.asp?immediate=1",upMediaExt:Ext4});
			}
			if($(".KinEditer").length>0){
				$(".KinEditer").each(function(){
					KE.init({
							id : this.id,
							imageUploadJson : '../../../../Upload.asp?immediate=1'
					});
					KE.create(this.id);
				});
			}
			if($(".eWebEditor_Free").length>0){
				$(".eWebEditor_Free").each(function(){
					$(this).hide();
					$(this).before('<IFRAME ID="'+this.id+'s" SRC="Editor/eWebEditor_Free/ewebeditor.asp?id='+this.id+'&style=s_coolblue" FRAMEBORDER="0" SCROLLING="no" WIDTH="550" HEIGHT="350"></IFRAME>');
				});
			}
			if($("#DelWord").length>0){
				$('#DelWord').text(unescape($('#DelWord').val()));
			}
			if($("#KeyWord").length>0){
				$('#KeyWord').text(unescape($('#KeyWord').val()));
			}
			iPic=0;
			cPic=0;
			PageReSize();
			$("#AlphaBox").height($(document).height());
			return true;
		}
	);
	$('select').hide();
}

//==========================================
//函数名：CloseBox
//用途：关闭操作框
//参数：
//==========================================
function CloseBox(){
	$('#Boxs').hide();
	$('select').show();
	$('html,body').animate({scrollTop: 0},100);
}

//==========================================
//函数名：ClickNav
//用途：主菜单项切换
//参数：
//==========================================
function ClickNav(leftUrl,RightUrl,navId){
	if(leftUrl!="")
		SetRContent('MainLeft',leftUrl);
	if(RightUrl!="")
		SetRContent('MainRight',RightUrl);
	$('#TopNav li').removeClass('NavNow');
	$('#TopNav li').addClass('NavOther');
	$(navId).removeClass('NavOther');
	$(navId).addClass('NavNow');
}

//==========================================
//函数名：ClickBoxNav
//用途：内容窗体菜单切换
//参数：
//==========================================
function ClickBoxNav(navId){
	$('.bnr').removeClass('check');
	$('#s'+navId).addClass('check');
	$('.tnr').hide();
	$('#t'+navId).show();
	$('.qbox').simpletooltip();
	//$('.qbox').hide();
	PageReSize();
	$("#AlphaBox").height($(document).height());
}

//==========================================
//函数名：GetCheckbox
//用途：获取选中的checkbox
//参数：
//==========================================
function GetCheckbox(){
	var text="";   
	$("input[class=Checks]").each(function() {   
		if ($(this).attr("checked")) {
			if(text==''){
				text = $(this).val();   
			}else{
				text += ","+$(this).val();   
			}
		}   
	}); 
	return text;
}

//==========================================
//函数名：SetRContent
//用途：替换DIV内容
//参数：DivId：要替换的DIV
//     Urls：获取内容的链接
//==========================================
function SetRContent(DivId,Urls){
	$('#'+DivId).html("<a href='javascript:void(0);' title='点此关闭' onclick='CloseBox();'><img src='Images/Loading.gif' /></a>");
	$.get(Urls,
		function(data){
			$('#'+DivId).html(data);
			$('#ListContent tr').mouseover(function(){
				$(this).css("background","#F7F7F7");
			});
			$('#ListContent tr').mouseout(function(){
				$(this).css("background","none");
			});
			$('.qbox').simpletooltip();
			//$('.qbox').hide();
			PageReSize();
			$("#AlphaBox").height($(document).height());
			return true;
		}
	);
	PageReSize();
}

//==========================================
//函数名：GetPinyin
//用途：获取拼音
//参数：InPutId：放置的Input
//     Urls：获取内容的链接
//==========================================
function GetPinyin(InPutId,Urls){
	$.get(Urls,
		function(data){
			$('#'+InPutId).val(data);
			return true;
		}
	);
}

//==========================================
//函数名：OpenMenu
//用途：菜单开关
//参数：MenuId：菜单ID
//==========================================
function OpenMenu(MenuId){
	if($("#"+MenuId).css("display")=="block"){
		$("#"+MenuId).css("display","none");
	}else{
		$("#"+MenuId).css("display","block");
	}
}

//==========================================
//函数名：ChangeField
//用途：自定义字段用途
//参数：ModelId：类型ID
//==========================================
function ChangeField(ModelId){
	if(ModelId=="0"){
		$('#FieldUser').show();
	}else{
		$('#FieldUser').hide();
	}
}

//==========================================
//函数名：ChangeFieldType
//用途：自定义字段类型
//参数：TypeId：类型ID
//==========================================
function ChangeFieldType(TypeId){
	if(TypeId=="3"){
		$('#Fk_Field_Options').show();
	}else{
		$('#Fk_Field_Options').hide();
	}
}

//==========================================
//函数名：DelIt
//用途：通用删除
//参数：Cstr：提示语句
//     Urls：执行URL
//     F5Url：刷新URL
//     F5Div：刷新DIV
//==========================================
function DelIt(Cstr,Urls,F5Div,F5Url){
	if(confirm(Cstr)){
		$.get(Urls,
			function(data){
				if(data.search("成功")>0){
					$('#MsgContent').html(data);
					$("#MsgBox").show();
					setTimeout('hiddenMsg()',4000);
					var Arrstr1 = new Array();
					var Arrstr2 = new Array();
					Arrstr1 = F5Div.split("|");
					Arrstr2 = F5Url.split("|");
					for(var i=0;i<Arrstr1.length;i++){
						SetRContent(Arrstr1[i],Arrstr2[i]);
					}
				}else{
					alert(data);
				}
				return true;
			}
		);
	}
	return;
}

//==========================================
//函数名：AjaxSet
//用途：Ajax设置
//参数：Urls：执行URL
//==========================================
function AjaxSet(Urls){
	$.get(Urls,
		function(data){
			if(data.search("成功")>0){
				$('#MsgContent').html(data);
				$("#MsgBox").show();
				setTimeout('hiddenMsg()',4000);
			}else{
				alert(data);
			}
			return true;
		}
	);
	return;
}

//==========================================
//函数名：SendGet
//用途：表单提交获取信息
//参数：FormName：提交的FORM
//     ToUrl：提交向的链接
//     F5Div：刷新DIV
//==========================================
function SendGet(FormName,ToUrl,F5Div){
	var options = { 
		url:  ToUrl,
		beforeSubmit:function(formData, jqForm, options){
			return true; 
		},
		success:function(responseText, statusText){
			if(statusText=="success"){
				$('#'+F5Div).val(responseText);
				$('.qbox').simpletooltip();
				//$('.qbox').hide();
				PageReSize();
				$("#AlphaBox").height($(document).height());
			}
			else{
				alert(statusText);
			}
		}
	}; 
	$('#'+FormName+'').ajaxForm(options); 
}

//==========================================
//函数名：Sends
//用途：表单提交
//参数：FormName：提交的FORM
//     ToUrl：提交向的链接
//     SuGo：成功后是否转向链接，1转向，0不转向
//     GoUrl：转向链接
//     SuAlert：成功后是否弹出框提示，1弹出，0不弹出
//     SuF5：成功后是否刷新DIV，1刷新，0不刷新
//     F5Url：刷新URL
//     F5Div：刷新DIV
//==========================================
function Sends(FormName,ToUrl,SuGo,GoUrl,SuAlert,SuF5,F5Div,F5Url){
	if(ajaxProcess=="0"){
		if($("#Enter").length>0){
			formTemp=$('#Enter').val();
			$('#Enter').val("正在提交");
			ajaxProcess="1";
			outdo="1";
			setTimeout("formTimeout()",30000);
		}
		if($(".eWebEditor_Free").length>0){
			$(".eWebEditor_Free").each(function(){
				$(this).val(window.frames[''+this.id+'s'].frames['eWebEditor'].document.body.innerHTML);
			});
		}
		var options = { 
			url:  ToUrl,
			beforeSubmit:function(formData, jqForm, options){
			return true; 
			},
			success:function(responseText, statusText){
				if(statusText=="success"){
					ajaxProcess="0";
					outdo="0";
					if(responseText.search("成功")>0){
						iPic=0;
						cPic=0;
						if(SuAlert==1){
							var st=responseText.replace(/\|\|\|\|\|/gi,"\n");
							alert(st);
						}else{
							CloseBox();
							$('#MsgContent').html(responseText);
							$("#MsgBox").show();
							setTimeout('hiddenMsg()',4000);
						}
						if(SuGo==1){
							location.href=GoUrl;
						}
						if(SuF5==1){
							var Arrstr1 = new Array();
							var Arrstr2 = new Array();
							Arrstr1 = F5Div.split("|");
							Arrstr2 = F5Url.split("|");
							for(var i=0;i<Arrstr1.length;i++){
								SetRContent(Arrstr1[i],Arrstr2[i]);
							}
						}
					}else{
						var st=responseText.replace(/\|\|\|\|\|/gi,"\n");
						$('#Enter').val(formTemp);
						alert(st);
					}
				}else{
					alert(statusText);
				}
			}
		}; 
		$('#'+FormName+'').ajaxForm(options); 
	}else{
		alert("请勿重复提交！");
	}
}

//==========================================
//函数名：hiddenMsg
//用途：关闭提示窗口
//==========================================
function hiddenMsg(){
	$("#MsgBox").hide();
}

//==========================================
//函数名：formTimeout
//用途：提交超时提示
//==========================================
function formTimeout(){
	if(outdo=="1"){
		outdo="0";
		$('#Enter').val(formTemp);
		ajaxProcess="0";
		alert("提交未获取正常返回，可能原因如下：\n\n1.由于网速过慢或者处理内容过多，仍然在处理中或者已经超时\n\n2.程序出错，或者服务器异常\n\n请尝试重新提交，或者稍候再试！\n\n如还有问题，请联系管理员！");
	}
}

//==========================================
//函数名：Sends_Div
//用途：表单提交更新DIV
//参数：FormName：提交的FORM
//     ToUrl：提交向的链接
//     F5Div：刷新DIV
//==========================================
function Sends_Div(FormName,ToUrl,F5Div){
	$('#'+F5Div).html("<a href='javascript:void(0);' title='点此关闭' onclick='CloseBox();'><img src='Images/Loading.gif' /></a>");
	var options = { 
		url:  ToUrl,
		beforeSubmit:function(formData, jqForm, options){
		return true; 
		},
		success:function(responseText, statusText){
			if(statusText=="success"){
				$('#'+F5Div).html(responseText);
				$('.qbox').simpletooltip();
				//$('.qbox').hide();
				PageReSize();
				$("#AlphaBox").height($(document).height());
			}
			else{
				alert(statusText);
			}
		}
	}; 
	$('#'+FormName+'').ajaxForm(options); 
}

//==========================================
//函数名：ChangeSelect
//用途：修改Select内容
//参数：Urls：执行URL
//     SId：操作的Select
//==========================================
function ChangeSelect(Urls,SId){
	$.get(Urls,
		function(data){
			if(data!=""){
				BuildSel(data,document.getElementById(SId));
			}
			return true;
		}
	);
}

//==========================================
//函数名：BuildSel
//用途：执行修改Select内容
//参数：Urls：执行URL
//     SId：操作的Select
//==========================================
function BuildSel(Str,Sel){
	var Arrstr = new Array();
	Arrstr = Str.split(",,,,,");
	if(Str!=""){
		Sel.options.length=0;
		var arrst;
		for(var i=0;i<Arrstr.length;i++){
			if(Arrstr[i]!=""){
				Arrst=Arrstr[i].split("|||||");
				Sel.options[Sel.options.length]=new Option(Arrst[1],Arrst[0]);
			}
		}
	}
}

//==========================================
//函数名：ModuleTypeChange
//用途：模块类型选择内容变换
//参数：ModuleTypeId：模板类型
//==========================================
function ModuleTypeChange(ModuleTypeId){
	$('.moduleList').hide();
	$('.module'+ModuleTypeId).show();
}

//==========================================
//函数名：ColorPicker
//用途：颜色选择
//参数：ColorInput：要颜色的Input
//==========================================
function ColorPicker(ColorInput) { 
	var sColor=dlgHelper.ChooseColorDlg();
	if(sColor.toString(16)==0){
		ColorInput.value=""; 
	}else{
		ColorInput.value="#"+sColor.toString(16); 
	}
} 

//==========================================
//函数名：CheckAll
//用途：全选
//参数：form：表单
//==========================================
function CheckAll(form) {
	for (var i = 0; i < form.elements.length; i++) {
		var e = form.elements[i];
		if (e.name != 'chkall') 
			e.checked = form.chkall.checked;
	}
}

//==========================================
//函数名：copyToClipboard
//用途：复制
//参数：txt：复制文字
//==========================================
function copyToClipboard(txt) {    
     if(window.clipboardData) {    
             window.clipboardData.clearData();    
             window.clipboardData.setData("Text", txt);    
     } else if(navigator.userAgent.indexOf("Opera") != -1) {    
          window.location = txt;    
     } else if (window.netscape) {    
          try {    
               netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");    
          } catch (e) {    
               alert("被浏览器拒绝！\n请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");    
          }    
          var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);    
          if (!clip)    
               return;    
          var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);    
          if (!trans)    
               return;    
          trans.addDataFlavor('text/unicode');    
          var str = new Object();    
          var len = new Object();    
          var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);    
          var copytext = txt;    
          str.data = copytext;    
          trans.setTransferData("text/unicode",str,copytext.length*2);    
          var clipid = Components.interfaces.nsIClipboard;    
          if (!clip)    
               return false;    
          clip.setData(trans,null,clipid.kGlobalClipboard);    
          alert("复制成功！")    
     }    
}  

//==========================================
//函数名：VoteAdd
//用途：添加投票
//参数：
//==========================================
function VoteAdds(vTitle,vTicket){
	var code;
	if(vTitle==""||vTicket==""){
		alert("投票条目和票数不能为空！");
	}else{
		if(isNaN(vTicket)){
			alert('票数必须是整数！');
		}else{
			code='<div id="t'+voteId+'">&nbsp;&nbsp;选项：<input name="Fk_Vote_Content" type="text" class="Input" value="'+vTitle+'" id="Fk_Vote_Content" />&nbsp;票数<input name="Fk_Vote_Ticket" type="text" class="Input" value="'+vTicket+'" id="Fk_Vote_Ticket" />&nbsp;<a href="javascript:void(0);" onclick="$(\'#t'+voteId+'\').remove();" title="删除">删除</a></div>';
			++voteId;
			$("#t").before(code);
			$('#Fk_Vote_Contents').val('');
			PageReSize();
			$("#AlphaBox").height($(document).height());
		}
	}
}

//==========================================
//函数名：GModelAdds
//用途：添加留言条目
//参数：
//==========================================
function GModelAdds(gTtile,gMin,gMax,gForm,gShow){
	var code;
	if(gTtile==""||gMin==""||gMax==""||gForm==""){
		alert("每个项目都不能为空！");
	}else{
		if(isNaN(gMin)||isNaN(gMax)){
			alert('最大最小字数都必须是数字·！');
		}else{
			code='<div id="t'+voteId+'" class="gModel">&nbsp;&nbsp;名称：<input name="Fk_GModel_Content" type="text" class="Input" id="Fk_GModel_Content" value="'+gTtile+'" /><br />&nbsp;&nbsp;最小字符数：<input name="Fk_GModel_Content" type="text" class="Input" size="5" id="Fk_GModel_Content" value="'+gMin+'" />&nbsp;最大字符数：<input name="Fk_GModel_Content" type="text" class="Input" size="5" id="Fk_GModel_Content" value="'+gMax+'" /><br />&nbsp;&nbsp;表单标识：<input name="Fk_GModel_Content" type="text" class="Input" id="Fk_GModel_Content" value="'+gForm+'" />&nbsp;<input type="checkbox" name="Fk_GModel_Content" class="Input" value="Show" id="Fk_GModel_Content"';
			if(gShow=="Show"){
				code=code+' checked="checked"';
			}
			code=code+' />后台列表显示<input type="hidden" name="Fk_GModel_Content" id="Fk_GModel_Content" value="|-_-|Fangka|-_-|" />&nbsp;<a href="javascript:void(0);" onclick="$(\'#t'+voteId+'\').remove();" title="删除">删除</a></div>';
			++voteId;
			$("#t").before(code);
			$('#model1').val('');
			$('#model4').val('GBook_');
			PageReSize();
			$("#AlphaBox").height($(document).height());
		}
	}
}

//==========================================
//函数名：PicAdd
//用途：上传题图
//参数：
//==========================================
function PicAdd(pUrl,pInput){
	var code;
	var tempArr=pUrl.split("||");
	var tempArr2=pInput.split("-");
	if(tempArr[0]==""||tempArr[1==""]){
		alert("未获取到图片地址！");
	}else{
		code='<div id="p'+iPic+'" class="picList'
		if(iPic==0&&$(".picCheck").length==0){
			code=code+' picCheck';
			$('#Fk_Pic').val(tempArr[0]);
			$('#Fk_PicBig').val(tempArr[1]);
		}
		code=code+'"><img src="'+tempArr[0]+'" width="60" height="60" class="qbox qbox2" title="<img src='+tempArr[0]+' width=190 height=180 />" onclick="clickPic('+iPic+',\''+tempArr2[0]+'\',\''+tempArr2[1]+'\')" /><br /><input name="Fk_PicList" type="hidden" class="Input" id="Fk_PicList'+iPic+'a" value="'+tempArr[0]+'" /><input name="Fk_PicList" type="hidden" class="Input" id="Fk_PicList'+iPic+'b" value="'+tempArr[1]+'" /><input name="Fk_PicList" type="text" class="Input" id="Fk_PicList'+iPic+'t" value="" style="width:60px;" /><input name="Fk_PicList" value="|-_-|" type="hidden" class="Input" id="Fk_PicList" /><br /><a href="javascript:void(0);" onclick="unPic('+iPic+')" title="删除">删除</a></div>';
		++iPic;
		$("#st").before(code);
		$('.qbox').simpletooltip();
		//$('.qbox').hide();
		PageReSize();
		$("#AlphaBox").height($(document).height());
	}
	return false;
}

//==========================================
//函数名：clickPic
//用途：选择封面题图
//参数：
//==========================================
function clickPic(pId,inputPic,inputPicBig){
	if(pId!=cPic){
		$('.picList').removeClass('picCheck');
		$('#p'+pId).addClass('picCheck');
		$('#Fk_Pic').val($('#Fk_PicList'+pId+"a").val());
		$('#Fk_PicBig').val($('#Fk_PicList'+pId+"b").val());
		cPic=pId;
	}
	return false;
}

//==========================================
//函数名：unPic
//用途：删除题图
//参数：
//==========================================
function unPic(pId){
	if(pId==cPic&&iPic>0){
		alert('封面题图被删除，请重新上传文件或者点击其他图片设置封面题图！');
	}
	$('#p'+pId).remove();
	$('#Fk_Pic').val('');
	$('#Fk_PicBig').val('');
	return false;
}



