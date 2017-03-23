/**
 * Created by Administrator on 2017/3/13.
 */
// 点击按钮切换table
$("div#tabbar-div p span").click(function(){
    // 获取点击的是第几个按钮
    var i = $(this).index();
    //alert(i);
    // 显示第i个table
    $(".table_content").eq(i).show();
    // 隐藏其他的table
    $(".table_content").eq(i).siblings(".table_content").hide();
    // 把原来选中的取消选中状态
    $(".tab-front").removeClass("tab-front").addClass("tab-back");
    // 切换点击的按钮的样式为选中状态
    $(this).removeClass("tab-back").addClass("tab-front");
});



// 当选择类型时执行AJAX取出类型的属性
$("select[name=type_id]").change(function(){
    // 获取选中的类型的id
    var type_id = $(this).val();
    if(type_id != "")
    {
        $.ajax({
            type : "GET",
            // 大U生成的地址默认带后缀，如：/index.php/Admin/Goods/ajaxGetAttr.html/type_id/+type_id
            // 第三个参数就是去掉.html后缀否则TP会报错
            url : "<?php echo U('ajaxGetAttr', '', FALSE); ?>/type_id/"+type_id,
            dataType : "json",
            success : function(data)
            {
                var html = "";
                // 循环服务器返回的属性的JSON数据
                $(data).each(function(k,v){
                    html += "<p>";
                    html += v.attr_name + " : ";
                    // 根据属性的类型生成不同的表单元素：
                    // 1. 如果属性是可选的那么就有一个+号
                    // 2. 如果属性有可选值就是一个下拉框
                    // 3. 如果属性是唯一的就生成一个文本框
                    if(v.attr_type == 1)
                        html += " <a onclick='addnew(this);' href='javascript:void(0);'>[+]</a> ";
                    // 判断是否有可选值
                    if(v.attr_option_values == "")
                        html += "<input type='text' name='ga["+v.id+"][]' />";
                    else
                    {
                        // 先把可选值转化成数组
                        var _attr = v.attr_option_values.split(",");
                        html += "<select name='ga["+v.id+"][]'>";
                        html += "<option value=''>请选择</option>";
                        // 循环每个可选值构造option
                        for(var i=0; i<_attr.length; i++)
                        {
                            html += "<option value='"+_attr[i]+"'>"+_attr[i]+"</option>";
                        }
                        html += "</select>";
                    }
                    if(v.attr_type == 1)
                        html += " 属性价格：￥ <input size='8' name='attr_price["+v.id+"][]' type='text' /> 元";
                    html += "</p>";
                });
                $("#attr_container").html(html);
            }
        });
    }
    else
        $("#attr_container").html("");
});

// 点击+号
function addnew(a)
{
    // 选中a标签所在的p标签
    var p = $(a).parent();
    // 先获取A标签中的内容
    if($(a).html() == "[+]")
    {
        // 把p克隆一份
        var newP = p.clone();
        // 把克隆出来的P里面的a标签变成-号
        newP.find("a").html("[-]");
        // 放在后面
        p.after(newP);
    }
    else
        p.remove();
}
//实例化编辑器
//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
UE.getEditor('editor');


function isFocus(e){
    alert(UE.getEditor('editor').isFocus());
    UE.dom.domUtils.preventDefault(e)
}
function setblur(e){
    UE.getEditor('editor').blur();
    UE.dom.domUtils.preventDefault(e)
}
function insertHtml() {
    var value = prompt('插入html代码', '');
    UE.getEditor('editor').execCommand('insertHtml', value)
}
function createEditor() {
    enableBtn();
    UE.getEditor('editor');
}
function getAllHtml() {
    alert(UE.getEditor('editor').getAllHtml())
}
function getContent() {
    var arr = [];
    arr.push("使用editor.getContent()方法可以获得编辑器的内容");
    arr.push("内容为：");
    arr.push(UE.getEditor('editor').getContent());
    alert(arr.join("\n"));
}
function getPlainTxt() {
    var arr = [];
    arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
    arr.push("内容为：");
    arr.push(UE.getEditor('editor').getPlainTxt());
    alert(arr.join('\n'))
}
function setContent(isAppendTo) {
    var arr = [];
    arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
    UE.getEditor('editor').setContent('欢迎使用ueditor', isAppendTo);
    alert(arr.join("\n"));
}
function setDisabled() {
    UE.getEditor('editor').setDisabled('fullscreen');
    disableBtn("enable");
}

function setEnabled() {
    UE.getEditor('editor').setEnabled();
    enableBtn();
}

function getText() {
    //当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    var txt = UE.getEditor('editor').selection.getText();
    alert(txt)
}

function getContentTxt() {
    var arr = [];
    arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
    arr.push("编辑器的纯文本内容为：");
    arr.push(UE.getEditor('editor').getContentTxt());
    alert(arr.join("\n"));
}
function hasContent() {
    var arr = [];
    arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
    arr.push("判断结果为：");
    arr.push(UE.getEditor('editor').hasContents());
    alert(arr.join("\n"));
}
function setFocus() {
    UE.getEditor('editor').focus();
}
function deleteEditor() {
    disableBtn();
    UE.getEditor('editor').destroy();
}
function disableBtn(str) {
    var div = document.getElementById('btns');
    var btns = domUtils.getElementsByTagName(div, "button");
    for (var i = 0, btn; btn = btns[i++];) {
        if (btn.id == str) {
            domUtils.removeAttributes(btn, ["disabled"]);
        } else {
            btn.setAttribute("disabled", "true");
        }
    }
}
function enableBtn() {
    var div = document.getElementById('btns');
    var btns = domUtils.getElementsByTagName(div, "button");
    for (var i = 0, btn; btn = btns[i++];) {
        domUtils.removeAttributes(btn, ["disabled"]);
    }
}

function getLocalData () {
    alert(UE.getEditor('editor').execCommand( "getlocaldata" ));
}

function clearLocalData () {
    UE.getEditor('editor').execCommand( "clearlocaldata" );
    alert("已清空草稿箱")
}

