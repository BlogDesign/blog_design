﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MyShortArticle.aspx.cs" Inherits="ShortArticle.MyShortArticle" %>
<%
    ShortArticle.DAL.ShortArticleService service = new ShortArticle.DAL.ShortArticleService();
    List<ShortArticle.Model.ShortArticleModel> list = new List<ShortArticle.Model.ShortArticleModel>();
    ShortArticle.Model.CustomerModel customer=new ShortArticle.Model.CustomerModel();
    string typeName = string.Empty;
    if(Session["UserInfo"]==null)
    {
        Response.Redirect("Login.aspx");
    }
    else
    {
        customer=Session["UserInfo"] as ShortArticle.Model.CustomerModel;
        string operType = Request.QueryString["OperType"];
        if (operType == "My")
        {
            typeName = "我发布的";
            list = service.GetShortArticleByMy(customer.CustomerID);
        }
        else if (operType == "Like")
        {
            typeName = "我赞过的";
            list = service.GetShortArticleByLike(customer.CustomerID);
        }
        else if (operType == "Comment")
        {
            typeName = "我评论过的";
            list = service.GetShortArticleByComment(customer.CustomerID);
        }
        else if (operType == "Favorite")
        {
            typeName = "我收藏过的";
            list = service.GetShortArticleByFavorite(customer.CustomerID);
        }
    }

    %>
<!DOCTYPE html>
<!-- 声明文档结构类型 -->
<html lang="zh-cn">
<!-- 文档头部区域 -->
<head>
	<!-- 文档的头部区域中元数据区的字符集定义，这里是UTF-8，表示国际通用的字符集编码 -->
	<meta charset="UTF-8">
	<!-- 文档的头部区域的标题。这里要注意，这个tittle的内容对于SEO来说极其重要 -->
	<title>精品文字-收藏夹</title>
	<!-- 文档头部区域的兼容性写法 -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1 ">
	<!-- 文档头部区域元数据区关于网站的关键字 -->
	<meta name="keywords" content="关键词1,关键词2,关键词3,关键词4">
	<!-- 文档头部区域元数据区关于文档描述的定义 -->
	<meta name="description" content="页面内容描述">
	<!-- 文档头部区域元数据区关于开发人员姓名的定义 -->
	<meta name="author" content="开发人员">
	<!-- 文档头部区域元数据区关于版权的定义 -->
	<meta name="copyright" content="版权拥有者">
	<!-- 文档头部区域的兼容性写法 -->
	<link rel="shortcut icon" href="../img/logo-lvcheng.ico">
	<!-- 文档头部区域的apple设备的图标的引用 -->
	<link rel="apple-touch-icon" href="custom_icon.png">
	<!-- 文档头部区域对于不同接口设备的特殊声明。宽=设备宽，用户不能自行缩放 -->
	<meta name="viewport" content="width=device-width,user-scalable=no">
	<!-- 文档头部区域的样式文件引用 -->
	<!-- Bootstrap基础框架 -->
	<link rel="stylesheet" href="../Content/developer/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="../Content/developer/font-awesome-4.2.0/css/font-awesome.min.css">

    <link href="../Content/css/l.css" rel="stylesheet">
    <link href="../Content/css/c.css" rel="stylesheet">
    <link href="../Content/css/u.css" rel="stylesheet">

    <style>
.p-banner--weibo{
	width:100%;
	height:100px;
	background-color: #dddddd;
}
.p-user--dropdown{
padding:4px !important;
}
.p-banner--weibo img{
	width:100%;
	height:100%;
}
body{
	background-color: #EDEDED;
}
.l-footer{
	background-color: #F8F8F8;
}
    </style>

    <script src="Content/developer/js/jquery-1.8.3.min.js"></script>
    <script src="Content/developer/bootstrap/js/bootstrap.min.js"></script>
    <script src="Content/layer-v1.9.3/layer/layer.js"></script>

    <script type="text/javascript">
        function DeleteArticle(articleID) {
            if (confirm("确定要删除吗？")) {
                window.location = "DeleteShortArticle.aspx?ArticleID=" + articleID;
            }
        }

        function Exit() {
            if (confirm("确定要退出吗？")) {
                window.location = "Exit.aspx";
            }
        }

        function Like(articleID, customerID, likeCount) {
            if (customerID == "00000000-0000-0000-0000-000000000000") {
                layer.msg('登录后才能点赞哦~');
            }
            else {
                $.ajax({
                    type: 'get',
                    url: 'AjaxLike.ashx', //请求的地址
                    data: { articleID: articleID, customerID: customerID },  //要传的参数
                    dataType: "text",
                    success: function (returnJson) {  //msg的返回结果
                        if (returnJson == "True") {
                            $("#spLike" + articleID).text("(" + (likeCount + 1) + ")"); //更新点赞次数
                            layer.msg('赞 +1');

                        }
                        else {
                            layer.msg('不能重复点赞哦~');
                        }
                    }
                });
            }
        }

        function Favorite(articleID, customerID) {

            if (customerID == "00000000-0000-0000-0000-000000000000") {
                layer.msg('登录后才能收藏哦~');
            }
            else {
                $.ajax({
                    type: 'get',
                    url: 'AjaxFavorite.ashx', //请求的地址
                    data: { articleID: articleID, customerID: customerID },  //要传的参数
                    dataType: "text",
                    success: function (returnJson) {  //msg的返回结果
                        if (returnJson == "True") {
                            layer.msg('该条精品文字已放入收藏夹 (*^__^*) ');
                        }
                        else {
                            layer.msg('您已经收藏过了哦 不能重复收藏~');
                        }
                    }
                });
            }
        }

    </script>

</head>
<body>
	<!-- l-body_wrapper 开始 -->
	<div class="l-body_wrapper">
		<!-- l-header 开始 -->
		<header class="l-header clearfix" style="height:51px;">
			<nav class="navbar navbar-default navbar-fixed-top">
			  <div class="container">
			    <div class="navbar-header">
			      <a class="navbar-brand" href="Index.aspx" style="padding:2px 0px;">
                      <img src="Content/Image/shortArticle.png" style="height:46px;" />
			      </a>
			    </div>
                  <%if (Session["UserInfo"] == null)
                    {
                  %>
                    <button type="button" class="navbar-right btn btn-default navbar-btn" onclick="window.location='Register.aspx'">注册</button>
                    <button type="button" class="navbar-right btn btn-success navbar-btn u-mr--10" onclick="window.location='Login.aspx'">登录</button>
                  <%}%>
                  <%
                    else
                    {%>
                  		<ul class="nav navbar-nav navbar-right">
					        <li class="dropdown">

                            <a href="#" class="dropdown-toggle p-user--dropdown" data-toggle="dropdown">
							<div class="c-avatar u-wh--40">
                                <%if (customer.Sex == 0)
                                {
                                    Response.Write("<img src='Content/Image/av1.png' />");
                                }
                                else 
                                {
                                    Response.Write("<img src='Content/Image/av6.png' />");
                                } 
                                %>
							</div><%=customer.CustomerName%><span class="caret"></span></a>

						    <ul class="dropdown-menu">
                                <li><a href="Index.aspx">博客首页</a></li>
                                <li role="separator" class="divider"></li>
                                <li class="dropdown-header u-fs--16 u-fw--b">与我相关</li>
                                <li><a href="MyShortArticle.aspx?OperType=My">我发布的</a></li>
                                <li><a href="MyShortArticle.aspx?OperType=Like">我赞过的</a></li>
                                <li><a href="MyShortArticle.aspx?OperType=Comment">我评论过的博文</a></li>
                                <li><a href="MyShortArticle.aspx?OperType=Favorite">我收藏过的博文</a></li>
                                <li role="separator" class="divider"></li>
                                <li class="dropdown-header u-fs--16 u-fw--b">系统</li>
							    <li><a href="ChangePassword.aspx">修改密码</a></li>
                                
							    <li role="separator" class="divider"></li>
							    <li><a href="javascript:Exit()">退出</a></li>
						    </ul>
					        </li>
				        </ul>
                    <%}
                  %>
			  </div>
			</nav>
		</header>
		<!-- l-header 结束 -->
		
		<!-- l-body_wrapper 开始 -->
		<section class="l-body_wrapper_container">
			<div class="container u-mt--20">
				<section class="c-box">
					<div class="c-box_content">
						<div class="p-banner--weibo">
                            &nbsp;<h1 class="u-m--0 u-fs--24 u-mb--15">
                                <%=typeName%>
                            </h1>
                            <div class="row c-row--ib">

                                <%foreach (var item in list)
                                    {
                                 %>
								    <div class="col-lg-12">
                                        <div class="c-box c-box--mini">
                                            <header class="c-header c-header--avatar">
                                            <h1 class="c-header_title">
                                                <a href="#">
                                            <div class="c-avatar u-wh--50">
                                                            <%if (item.CustomerSex == 0)
                                                              {
                                                                  Response.Write("<img src='Content/Image/av1.png' />");
                                                              }
                                                              else 
                                                              {
                                                                  Response.Write("<img src='Content/Image/av6.png' />");
                                                              } 
                                                              %>
													    </div>
                                            <span><%=item.CustomerName %></span></a>
                                            </h1>
                                            <span class="label label-success u-f--r u-mt--15"><%=item.CreateDate %></span>
                                            </header>
                                            <div class="c-content u-pb--0">
                                                <p>
                                                    <%=item.ArticleContent %>
                                                </p>
                                            </div>
                                            <div class="c-footer u-ta--r">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-default" onclick="Like('<%=item.ArticleID%>','<%=customer.CustomerID%>',<%=item.LikeCount%>)">
                                                        <span class="glyphicon glyphicon-thumbs-up u-mr--5"></span>赞<span class=" u-ml--5" id="spLike<%=item.ArticleID%>">(<%=item.LikeCount%>)</span>
                                                    </button>
                                                    <button type="button" class="btn btn-default" onclick="window.location='ShortArticle.aspx?ArticleID=<%=item.ArticleID%>'">
                                                        <span class="glyphicon glyphicon-comment u-mr--5"></span>评论<span class=" u-ml--5">(<%=item.CommentCount%>)</span>
                                                    </button>
                                                    <button type="button" class="btn btn-default" onclick="Favorite('<%=item.ArticleID%>','<%=customer.CustomerID%>')">
                                                        <span class="glyphicon glyphicon glyphicon-star-empty u-mr--5"></span>收藏
                                                    </button>
                                                    <%if (item.CustomerID==customer.CustomerID) 
                                                    {%>
												        <button type="button" class="btn btn-default" onclick="DeleteArticle('<%=item.ArticleID%>')">
                                                            <span class="glyphicon glyphicon glyphicon-trash u-mr--5"></span>删除
                                                    </button>
                                                    <% }%>
											    </div>
                                            </div>
                                        </div>
                                </div>

                                     <%}%>

							</div>
						</div>
					</div>
				</section>
			</div>
		</section>
		<!-- l-body_wrapper 结束 -->
		<!-- l-body_wrapper_footer 开始 -->
		<footer class="l-body_wrapper_footer u-ml--0">
            <div class="l-footer js-footer u-ml--0">
            	<p class="l-footer_text u-ta--c">&nbsp;</p>
            </div>
        </footer>
        <!-- l-body_wrapper_footer 结束 -->
	</div>
	<!-- l-body_wrapper 结束 -->

</body>
</html>