
$(document).ready(function () {
    // 主导航==========================================================================================================================
    // $(".c-mainNav_child").hide();
    $(".c-mainNav>li>a").live('click', function () {
        var $li = $(this).closest("li"),
            $i_caret = $li.find(".js-mainNav-i-caret");
        if ($i_caret.hasClass('fa-chevron-down')) {
            $li.find('.c-mainNav_child').removeClass('open');
            $i_caret.removeClass("fa-chevron-down").addClass("fa-chevron-right");
            return true;
        }
        $i_caret.removeClass("fa-chevron-right").addClass("fa-chevron-down");
        $li.find('.c-mainNav_child').addClass('open').end()
			.closest('li').siblings().find(".js-mainNav-i-caret").removeClass("fa-chevron-down").addClass("fa-chevron-right").end()
            .children('.c-mainNav_child').removeClass('open');
    });
    $(".js-sede-nav-back").live('click', function () {
        $(this).closest(".c-mainNav_child").removeClass('open');
    });
    // 页面匹配，子菜单选项高亮
    var pageId = '.'+$(".l-content").attr('data-pageid');
    // alert(pageId);
	$(pageId).addClass('active')
	.closest(".c-mainNav_child").addClass('open')
	.closest("li").addClass('active')
    .find(".js-mainNav-i-caret").removeClass("fa-chevron-right").addClass("fa-chevron-down");
    // 切换显示主导航==========================================================================================================================
    $(".js-btn-nav-toggle").toggle(
    
	  function () {
	      $(".js-side").hide();
          
	      $(".js-content").addClass('l_hidden').removeClass('l_show');
	      $(".js-footer").addClass('l_hidden').removeClass('l_show');
          l_change();
	  },
	  function () {
        var js_sideWidth = $(".js-side").width();
	      $(".js-side").show();
          // $(".js-aside").css("left", "250px");
	      $(".js-content").addClass('l_show').removeClass('l_hidden');
	      $(".js-footer").addClass('l_show').removeClass('l_hidden');
          l_change();
	  }
	).mouseover(function () {
        l_change();
    });

    function l_change () {
        if ($(".js-side").is(":hidden"))  {
            $(".js-btn-nav-toggle").tooltip('show');
        };
        if ($(".js-side").is(":visible")) {
            $(".js-btn-nav-toggle").tooltip('destroy');
        };
    }
    
    // 切换显示input-group==========================================================================================================================
    $(".js-registerLoginRadio").click(function () {
        if ($(this).attr("value") == "no" && ($(this).attr("checked") == true || $(this).attr("checked") == "checked")) {
            // alert("no");
            group_detach = $(".js-registerLoginInput-group").detach();
        } else {
            // alert("yes");
            $(".js-modal-body").prepend(group_detach);
        }
    });
    // 返回上一页==========================================================================================================================
    function goBack() {
        history.go(-1);
    }
    $(".js-btn-back").live('click', function () {
        goBack();
    });

    // 切换class==========================================================================================================================
    function i_toggleClass(classBefore, classAfter) {
        var $icon = $this.children("i");
        // alert($icon.html());
        if ($icon.hasClass(classBefore)) {
            $icon.removeClass(classBefore).addClass(classAfter);
            return true;
        }
        if ($icon.hasClass(classAfter)) {
            $icon.removeClass(classAfter).addClass(classBefore);
        }
    }

    // c-box收缩==========================================================================================================================
    $(".js-btn-toggle").click(function () {
        $this = $(this);
        $this.closest(".c-box").children('.c-box_content').slideToggle();
        i_toggleClass('fa-chevron-up', 'fa-chevron-down');
    });

    // c-box全屏==========================================================================================================================
    $(".js-btn-fullscreen").click(function () {
        $this = $(this);
        $(this).closest(".c-box").toggleClass('u-fullscreen');
        i_toggleClass('glyphicon-resize-full', 'glyphicon-resize-small');
    });
    // 单选切换内容==========================================================================================================================
    function radioToggle(btn_yes, btn_no, radioToggle_box) {
        $(radioToggle_box).hide();
        if ($(btn_yes).hasClass('active')) {
            $(radioToggle_box).show();
        }
        $(btn_yes).live('click', function () {
            $(radioToggle_box).fadeIn("fast");
        });
        $(btn_no).live('click', function () {
            $(radioToggle_box).fadeOut("fast").find(".btn").removeClass("active");
        });
    }
    radioToggle(".js-radioToggle--yes", ".js-radioToggle--no", ".js-radioToggle-box");
    radioToggle(".js-surgery--yes", ".js-surgery--no", ".js-surgery-box");
    radioToggle(".js-complaints--yes", ".js-complaints--no", ".js-complaints-box");
    radioToggle(".js-complaintsTrue--yes", ".js-complaintsTrue--no", ".js-complaintsTrue-box");


    // 预约列表==========================================================================================================================
	$('.js-tooltip').tooltip('hide');

	//表格table的tr点击选中效果--只能选中一个==========================================================================================================================
	$(".js-table_trcheck>tbody>tr").css("cursor","pointer");
    $(".js-table_trcheck").find(".c-box").closest("tr").hide().css("cursor","auto");
	$(".js-table_trcheck>tbody>tr").live('click',function () {
        var cBox_size = $(this).find(".c-box").size();
		// var trBox_siblings = $(this).find(".c-box").size();
		if (cBox_size==0 && $(this).hasClass("c-success")) {
			$(this).removeClass("c-success");
            $(this).closest(".js-table_trcheck").find(".c-box").closest("tr").fadeOut("fast");
            return true;
		}
        if (cBox_size==0 && !$(this).hasClass("c-success")) {
            $(this).addClass("c-success").siblings("tr").removeClass("c-success");
            $(this).closest(".js-table_trcheck").find(".c-box").closest("tr").fadeOut("fast");
            $(this).next("tr").fadeIn();
        }
	});
    // 表格table点击tr高亮
    $(".js-table_trHighlight>tbody>tr").css("cursor","pointer");
    $(".js-table_trHighlight>tbody>tr").live('click',function(){
        $(this).addClass("c-success").siblings("tr").removeClass("c-success");
    });

    // 呼叫接入js-collapse-group
    $(".js-collapse-group .c-collapse_link").live('click',function(){
        var parentId = $(this).attr('data-parent');
        var collapseId = $(this).attr('href');
        var $link_collapse = "[href="+collapseId+"]";
        var link_num = $(parentId).find('.c-collapse_link').not($link_collapse).each(function(){
            var siblingsID = $(this).attr('href')+".in";
            $(siblingsID).collapse('hide');
        });
    });

    //复选框事件
    //全选、取消全选的事件
    function checkedAll(checkboxMain,checkboxs){
        if ($(checkboxMain).attr("checked")) {
            $(checkboxs).prop("checked", true);
        } else {
            $(checkboxs).prop("checked", false);
        }
    }
    //子复选框的事件
    function setcheckedAll(checkboxMain,checkboxSub){
        //当没有选中某个子复选框时，SelectAll取消选中
        if (!$(checkboxSub).checked) {
            $(checkboxMain).prop("checked", false);
        }
        var chsub = $(checkboxSub).length; //获取subcheck的个数
        var checkedsub = $(checkboxSub).parent().find(":checked").length; //获取选中的subcheck的个数
        alert(checkedsub);
        if (checkedsub == chsub) {
            $(checkboxMain).prop("checked", true);
        }
    }
    $(".js-table-checkbox thead>tr>th:first>:checkbox").click(function(){
        checkedAll(".js-table-checkbox thead>tr>th:first>:checkbox",".js-table-checkbox :checkbox");
    });
    $(".js-table-checkbox tbody>tr>td>:checkbox").click(function(){
        setcheckedAll(".js-table-checkbox thead>tr>th:first>:checkbox",".js-table-checkbox tbody>tr>td>:checkbox");
    });


    // 健康管理师时间选择
    
    $(".js-timeChecked>tbody td").each(function(){
        var tooltipText= $(this).text();
        var $Atooltip = $('<a href="#"></a>').attr({ "data-toggle": "tooltip", title: tooltipText }).text(tooltipText);
        $(this).text("").append($Atooltip);
    });
    $(".js-timeChecked>tbody td").find("a").tooltip('hide').end()
    .live('click',function(){
        if ($(this).hasClass('c-success')) {
            $(this).removeClass('c-success');
            return true;
        };
        $(this).addClass('c-success');
    });

    // 模拟下拉框===========================================================================


var lenOption = $("select.js-simulate-box--checkbox").find("option").size();
var arrOption_text = [];
for (var i = 0; i < lenOption; i++) {
    arrOption_text[i] = $("select.js-simulate-box--checkbox").find("option").eq(i).text();
};
var arrOption_val = [];
for (var i = 0; i < lenOption; i++) {
    arrOption_val[i] = $("select.js-simulate-box--checkbox").find("option").eq(i).attr("value");
};
var arrOption_id = [];
for (var i = 0; i < lenOption; i++) {
    arrOption_id[i] = "Option"+$("select.js-simulate-box--checkbox").find("option").eq(i).attr("value");
};
var arrOption_checked = [];
for (var i = 0; i < lenOption; i++) {
    arrOption_checked[i] = $("select.js-simulate-box--checkbox").find("option").eq(i).attr("data-checked");
};
// alert(arrOption_checked[1]);

var $simulatBox_checkbox = '<input type="text" class="form-control js-simulate-box_btn" readonly="">'
                                +'<div class="c-simulate-box js-simulate-box">'
                                +'<div class="arrow"></div>'
                                +'<div class="c-simulate-box_content">'
                                    +'<div class="c-simulate-box_content_item">'
                                    +'</div>'
                                +'</div>'
                                +'<div class="c-simulate-box_footer">'
                                    +'<button type="button" class="btn btn-xs btn-primary u-mr--5"><i class="glyphicon glyphicon-ok"></i></button>'
                                    +'<button type="button" class="btn btn-xs btn-default"><i class="glyphicon glyphicon-remove"></i></button>'
                                +'</div>'
                            +'</div>';
$("select.js-simulate-box--checkbox").after($simulatBox_checkbox);
// $("select.js-simulate-box--checkbox").find(".c-simulate-box_content_item").append("<p>测试</p>");
for(var i = 0; i < lenOption; i++){
    var $item_inner = '<div class="checkbox">'
                        +'<label for="'+arrOption_id[i]+'">'
                        +'<input type="checkbox" value="'+arrOption_val[i]+'" id="'+arrOption_id[i]+'"'+arrOption_checked[i]+'>'
                        +arrOption_text[i]
                      +'</label>'
                    +'</div>';
    var $htmlAppend = $("select.js-simulate-box--checkbox").parent().find(".c-simulate-box_content_item").append($item_inner);
};

// var checkedText = $(".js-simulate-box").find(":checked").parent().text();
$("select.js-simulate-box--checkbox").nextAll(".js-simulate-box").each(function(){
    // var sizeChecked = $(this).find(":checked").size();
    // function getTextByJquery() {
        var checkedText = "";
        //遍历name为txt的所有input元素
        $(this).find(":checked").parent().each(function () {
            checkedText += $(this).text() + ",";
        });
        //去掉最后一个逗号(如果不需要去掉，就不用写)
        if (checkedText.length > 0) {
            checkedText = checkedText.substr(0,checkedText.length - 1);
        }
        // return checkedText;
    // }
    // alert(checkedText);
    var $inputText = $(this).prev(":text.js-simulate-box_btn");
    $($inputText).val(checkedText);
});
$(".checkbox :checkbox").click(function(){
    // alert("click");
    var checkedText = "";
    //遍历name为txt的所有input元素
    $(this).closest(".c-simulate-box_content_item").find(":checked").parent().each(function () {
        checkedText += $(this).text() + ",";
    });
    //去掉最后一个逗号(如果不需要去掉，就不用写)
    if (checkedText.length > 0) {
        checkedText = checkedText.substr(0,checkedText.length - 1);
    }
    var $inputText = $(this).closest(".js-simulate-box").prev(":text.js-simulate-box_btn");
    $($inputText).val(checkedText);
});
// 删掉模拟下拉框的select原型
$("select.js-simulate-box--checkbox").hide();
// 模拟下拉框默认隐藏
$('.js-simulate-box').hide();

$('.js-simulate-box_btn').click(function(){
    var Wh_input = $(this).outerWidth();
    console.log(Wh_input);
    if ($(this).is(":text")) {
        $(this).next(".js-simulate-box").outerWidth(Wh_input);
    };
    var $JsSelectBox = $(this).next('.js-simulate-box');
    if ($JsSelectBox.is(':hidden')) {
            $('.js-simulate-box:visible').hide();
           $JsSelectBox.fadeIn();
           return;
    };
    $JsSelectBox.hide();
});

$(document).on("mousedown",function(e){
     if ($(e.target).closest("a.js-simulate-box_btn").length > 0) {
         return;
     }
    var target = $(e.target).closest(".js-simulate-box");
    if(target.length == 0){
    //说明点击的是下拉框以外，
     $('.js-simulate-box').fadeOut();
    }
});


// 按钮控制元素显示隐藏
$(".js-wrap-toggle").hide();
function wrap_toggle(){
    $(".js-wrap-toggle[data-toggle='search']").show();
    $(".js-btn--toggle[data-toggle='search']").text("隐藏更多搜索项");
}
// 调用wrap_toggle()显示.js-wrap-toggle
wrap_toggle();
$(".js-btn--toggle").click(function(){
    var html_toggle = ".js-wrap-toggle[data-toggle='"+$(this).attr("data-toggle")+"']";
    if ($(html_toggle).is(":hidden")) {
        $(this).text("隐藏更多搜索项");
        $(html_toggle).slideDown("fast");
        return;
    }
    if ($(html_toggle).is(":visible")) {
        $(this).text("显示更多搜索项");
        $(html_toggle).slideUp("fast");
    }

});

// 保存健康管理师意见
$(".js-wrap-comments").hide();
$(".js-save-comments").live('click',function(){
    var text_comments = $('.js-textarea-comments').val();
    if (text_comments.length==0) {
        alert("请填写你的意见。");
        return;
    };
    var save_message = confirm("要提交该信息吗？");
    if (save_message) {
        $('.js-textarea-comments').val("");
        $(".js-text-comments").text(text_comments);
        $(".js-wrap-comments").show();
    };
    
    
});
// iCheck插件绑定
// $('input').iCheck({
//     checkboxClass: 'icheckbox_square-blue',
//     radioClass: 'iradio_square-blue',
//     increaseArea: '20%' // optional
// });
// // iCheck插件的全选反选
// $(".js-checkAll").on('ifClicked',function(){
//     if($(this).parent().hasClass("checked")){
//       $(".tab-pane.active .js-checkGJ").iCheck('uncheck');
//       return; 
//     }
//     $(".tab-pane.active .js-checkGJ").iCheck('check');
// });
// $(".tab-pane .js-checkGJ").on('ifChanged',function(){
//     var checkGJ_length = $(".tab-pane.active .js-checkGJ").size();
//     var checkedGJ_length = $(".tab-pane.active .js-checkGJ:checked").size();
//     // console.log("checkGJ_length:"+checkGJ_length+"checkedGJ_length:"+checkedGJ_length);
//     if(checkGJ_length==checkedGJ_length){
//         $(this).closest(".tab-pane").find(".js-checkAll").iCheck('check');
//         return;
//     }
//     $(this).closest(".tab-pane").find(".js-checkAll").iCheck('uncheck');
    
// });



// 中医体质评估问卷，每个问题选中第一个答案
$(".p-radio-group").each(function () {
    // console.log("1");
    var $iRadio_first = $(this).find(".c-radio--icheck:first");
    
    $iRadio_first.find(":radio").prop("checked",true).parent("[class^='iradio']").addClass("checked");
});

// 设置进度
$(".js-progress-new--text").change(function(){
    var text_num = $(this).val();
    var text_per = text_num+"%";
    
    $(".js-progress-new--loading .progress-bar").css("width",text_per)
    .find("span").text(text_per);
    if(text_num==100){
        $(".js-progress-new--loading .progress-bar").removeClass("progress-bar-danger").addClass("progress-bar-success");
    }else{
        $(".js-progress-new--loading .progress-bar").removeClass("progress-bar-success").addClass("progress-bar-danger");
    }
});
var $p2 = $(".js-progress-p2").closest("[class^=col]");
var $p3 = $(".js-progress-p3").parents(".form-group").closest("[class^=col]");
$($p2).hide();
$($p3).hide();
$(".js-progress-p1").change(function(){
    var $p1 = $(this);
    if ($($p1).attr("checked")) {
        $($p2).show();
    } else {
        $($p2).hide().find(".js-progress-p2").prop("checked", false);
        $($p3).hide().find(".js-progress-p3").val("");
    }
});
$(".js-progress-p2").change(function(){
    if ($(this).attr("checked")) {
        $($p3).show();
    } else {
        $($p3).hide().find(".js-progress-p3").val("");
    }
});
// // tab页ajax加载
// var loadimg='<img src="../img/laoding1.gif" alt="加载中">'; // 加载时的loading图片

// function showPage(tabId, url){
//     var pageName = $('.js-tabs--ajax a[href="'+tabId+'"]').text();
//     $('.js-tabs--ajax a[href="'+tabId+'"]').tab('show'); // 显示点击的tab页面
//     if($(tabId).html().length<20){ // 当tab页面内容小于20个字节时ajax加载新页面
//       $(tabId).html(loadimg+'&nbsp;'+pageName+'页面加载中，请稍后...'); // 设置页面加载时的loading图片
//       $(tabId).load(url); // ajax加载页面
//     }
// }

// var activeId = "#"+$(".tab-content .tab-pane.active").attr("id");
// // console.log(activeId);
// showPage(activeId,"demo_test.txt");
// $(".js-tabs--ajax a[data-toggle='tab']").click(function(event) {
//     var tabId = $(this).attr('href');
//     console.log(tabId);
//     showPage(tabId,"demo_test.txt");
// });

});




























