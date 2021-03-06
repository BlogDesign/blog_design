﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="ShortArticle.Login" %>
<!DOCTYPE html>
<!-- 声明文档结构类型 -->
<html lang="zh-cn">
<!-- 声明文档文字区域 -->
<head>
<!-- 文档头部区域 -->
	<meta charset="UTF-8">
	<!-- 文档的头部区域中元数据区的字符集定义，这里是UTF-8，表示国际通用的字符集编码 -->
	<title>登录</title>
	<!-- 文档的头部区域的标题。这里要注意，这个tittle的内容对于SEO来说极其重要 -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1 ">
	<!--[if IE 9]>
		<meta name=ie content=9>
	<![endif]-->
	<!--[if IE 8]>
		<meta name=ie content=8>
	<![endif]-->
	<!--[if IE 7]>
		<meta name=ie content=7>
	<![endif]-->
	<!-- 文档头部区域的兼容性写法 -->
	<meta name="keywords" content="关键词1,关键词2,关键词3,关键词4">
	<!-- 文档头部区域元数据区关于网站的关键字 -->
	<meta name="description" content="页面内容描述">
	<!-- 文档头部区域元数据区关于文档描述的定义 -->
	<meta name="author" content="开发人员">
	<!-- 文档头部区域元数据区关于开发人员姓名的定义 -->
	<meta name="copyright" content="版权拥有者">
	<!-- 文档头部区域元数据区关于版权的定义 -->
	<link rel="short icon" href="favicon.ico">
	<!-- 文档头部区域的兼容性写法 -->
	<link rel="apple-touch-icon" href="custom_icon.png">
	<!-- 文档头部区域的apple设备的图标的引用 -->
	<meta name="viewport" content="width=device-width,user-scalable=no">
	<!-- 文档头部区域对于不同接口设备的特殊声明。宽=设备宽，用户不能自行缩放 -->
	<!-- Loading Bootstrap -->
    <link rel="stylesheet" href="../Content/developer/bootstrap/css/bootstrap.min.css">
	<link href="../Content/css/login.css" rel="stylesheet">
	<link href="../Content/developer/icheck/square/color-scheme.css" rel="stylesheet">
	<link href="../Content/developer/icheck/square/blue.css" rel="stylesheet">

    <link href="../Content/css/u.css" rel="stylesheet">
    <link href="../Content/css/c.css" rel="stylesheet">
    <link href="../Content/css/login.css" rel="stylesheet">
</head>
<body>
	<section class="c-screen  c-group-middle" style="background-color:#EDEDED;">
		<div class="p-login-container u-clearfix c-group-middle_content">
			<div class="c-box-login-wrap">
				<div class="p-login-form-links u-bounceInRight">
                    <img src="../Content/Image/shortArticle.png" />
				</div>
				<div class="c-box-login u-bounceInLeft">
					<div class="c-box-login_header">
						<h3>登录</h3>
					</div>
                    <form id="frm1" runat="server">
					<div class="c-box-login_content">
						<div class="c-textbox_wrap">
							<div class="input-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <asp:TextBox ID="txtLoginName" runat="server" class="form-control" placeholder="用户名" ></asp:TextBox>
							</div>
						</div>
						<div class="c-textbox_wrap">
							<div class="input-group">
								<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                <asp:TextBox ID="txtLoginPassword" runat="server" class="form-control" placeholder="密码" TextMode="Password"></asp:TextBox>
							</div>
						</div>
						
						<div class="c-box-login_footer">
                            <a href="Register.aspx">没有帐号？点我注册</a>
							<asp:Button ID="btnLogin" runat="server" Text="登录" class="btn btn-success btn-lg u-f--r" OnClick="btnLogin_Click" />
						</div>
					</div>
                    </form>
				</div>
				
				<div class="p-login-form-links u-bounceInRight">精品文字分享网站 by:李柔 当前时间：<%=DateTime.Now%></div>
			</div>
		</div>
	</section>

	<script type="text/javascript" src="../Content/developer/flatUi/js/jquery-1.8.3.min.js"></script>
	<script type="text/javascript" src="../Content/developer/icheck/icheck.min.js"></script>
<script>
    $(function () {
        $(":input").focus(function () {
            $(this).closest(".c-textbox_wrap").addClass("focused");
        }).blur(function () {
            $(this).closest(".c-textbox_wrap").removeClass("focused");
        });
        $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
        });
    });
</script>
</body>
</html>