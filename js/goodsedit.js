/**
 * Created by Administrator on 2017/3/13.
 */
// 点击按钮切换table
    $("div#tabbar-div p span").click(function(){
        // 获取点击的是第几个按钮
        var i = $(this).index();
        // 显示第i个table
        $(".table_content").eq(i).show();
        // 隐藏其他的table
        $(".table_content").eq(i).siblings(".table_content").hide();
        // 把原来选中的取消选中状态
        $(".tab-front").removeClass("tab-front").addClass("tab-back");
        // 切换点击的按钮的样式为选中状态
        $(this).removeClass("tab-back").addClass("tab-front");
    });

    $("#promote_start_time").datepicker();
    $("#promote_end_time").datepicker();
    UE.getEditor('goods_desc', {
        "initialFrameWidth" : "100%",   // 宽
        "initialFrameHeight" : 400,      // 高
        "maximumWords" : 10000            // 最大可以输入的字符数量
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
            // 先取出名称的字符串
            var oldName = newP.find("select").attr("name");
            // 把名称中的old_去掉
            var newName = oldName.replace("old_", "");
            // 把新的名称设置回去
            newP.find("select").attr("name", newName);
            // 把属性价格的名称也去掉old_
            var oldName = newP.find("input").attr("name");
            var newName = oldName.replace("old_", "");
            newP.find("input").attr("name", newName);
            // 把克隆出来的P里面的a标签变成-号
            newP.find("a").html("[-]");
            // 放在后面
            p.after(newP);
        }
        else
        {
            // 点击了[-]号
            if(confirm("确定要删除吗？"))
            {
                // 先获取这条记录的id
                var gaid = $(a).attr("gaid");
                $.get("<?php echo U('ajaxDelGoodsAttr', '', FALSE); ?>/gaid/"+gaid, function(data){
                    p.remove();
                });
            }
        }
    }
// 删除图片
    $(".delimage").click(function(){
        if(confirm("确定要删除吗？"))
        {
            // 获取图片的ID
            var pic_id = $(this).attr("pic_id");
            // 取出图片所在的LI标签
            var li = $(this).parent();
            $.ajax({
                type : "GET",
                url : "<?php echo U('ajaxDelImage', '', FALSE); ?>/pic_id/"+pic_id,
                success : function(data)
                {
                    // ajax请求成功之后再把图片人页面上删除
                    li.remove();
                }
            });

        }
    });
// 判断如果现在没有属性就直接触发AJAX事件获取属性的数据

