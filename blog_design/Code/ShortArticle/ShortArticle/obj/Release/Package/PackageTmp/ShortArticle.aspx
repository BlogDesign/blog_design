<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ShortArticle.aspx.cs" Inherits="ShortArticle.ShortArticle" %>
<%
    ShortArticle.DAL.ShortArticleService service = new ShortArticle.DAL.ShortArticleService();
    Guid articleID=Guid.Empty;
    if(Request.QueryString["ArticleID"]!=null)
    {
        articleID=Guid.Parse(Request.QueryString["ArticleID"]);
    }
    ShortArticle.Model.ShortArticleModel article = service.GetShortArticleDetail(articleID);
    List<ShortArticle.Model.ArticleCommentModel> articleCommentList = service.GetArticleCommentList(articleID);
    ShortArticle.Model.CustomerModel customer=new ShortArticle.Model.CustomerModel();
    if(Session["UserInfo"]!=null)
    {
        customer=Session["UserInfo"] as ShortArticle.Model.CustomerModel;
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
	<title>精品文字-详情</title>
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
    <link href="Content/developer/bootstrap/css/bootstrap.min-3.35.css" rel="stylesheet" />
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
                                <li><a href="Index.aspx">文字广场</a></li>
                                <li role="separator" class="divider"></li>
                                <li class="dropdown-header u-fs--16 u-fw--b">与我相关</li>
                                <li><a href="MyShortArticle.aspx?OperType=My">我发布的</a></li>
                                <li><a href="MyShortArticle.aspx?OperType=Like">我赞过的</a></li>
                                <li><a href="MyShortArticle.aspx?OperType=Comment">我评论过的文字</a></li>
                                <li><a href="MyShortArticle.aspx?OperType=Favorite">我收藏过的文字</a></li>
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
						<!-- <div class="c-box_header">
							<h5 class="u-f--l">当前区域：</h5>
							<h5 class="u-f--r">数据统计时间：</h5>
						</div> -->
						<div class="c-box_content_item">
							<div class="row">
								<div class="col-sm-12">
									<div class="c-box c-box--mini u-mb--0">
										<header class="c-header c-header--avatar">
											
											<h1 class="c-header_title">
												<a href="#">
													<div class="c-avatar u-wh--50">
                                                    <%if (article.CustomerSex == 0)
                                                    {
                                                        Response.Write("<img src='Content/Image/av1.png' />");
                                                    }
                                                    else 
                                                    {
                                                        Response.Write("<img src='Content/Image/av6.png' />");
                                                    } 
                                                    %>

													</div>
													<span><%=article.CustomerName%></span>
												</a>
											</h1>
											<span class="label label-success u-f--r u-mt--15"><%=article.CreateDate%></span>
										</header>
										<div class="c-content u-pb--0">
                                            <p><%=article.ArticleContent%></p>
										</div>
										<div class="c-footer u-ta--r">
											<div class="btn-group">
													<button type="button" class="btn btn-default" onclick="Like('<%=article.ArticleID%>','<%=customer.CustomerID%>',<%=article.LikeCount%>)"><span class="glyphicon glyphicon-thumbs-up u-mr--5"></span>赞<span class=" u-ml--5" id="spLike<%=article.ArticleID%>">(<%=article.LikeCount%>)</span></button>
                                                    <button type="button" class="btn btn-default" onclick="Favorite('<%=article.ArticleID%>','<%=customer.CustomerID%>')"><span class="glyphicon glyphicon glyphicon-star-empty u-mr--5"></span>收藏</button>
												
                                                    <%if (article.CustomerID==customer.CustomerID) 
                                                    {%>
												        <button type="button" class="btn btn-default" onclick="DeleteArticle('<%=article.ArticleID%>')"><span class="glyphicon glyphicon glyphicon-trash u-mr--5"></span>删除</button>
                                                    <% }%>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-12">

									<div class="u-pl--15 u-pr--15">
										<h1 class="u-fs--20">评论列表(<%=articleCommentList.Count%>)</h1>
										<hr class="c-hr">

                                        <%if(articleCommentList.Count==0)
                                          { %>
                                            <div align="center"><h1>还没有人发表评论  来坐第一个沙发</h1></div>
                                        <%} else
                                          {%>


										<ul class="media-list">

                                    <%foreach (var item in articleCommentList)
                                    {
                                    %>
											<li class="media u-bt--d u-pt--10">
												<div class="media-left">
													<a class="c-avatar u-wh--50" href="#">
													<%if (item.CustomerSex == 0)
                                                        {
                                                            Response.Write("<img src='Content/Image/av1.png' />");
                                                        }
                                                        else 
                                                        {
                                                            Response.Write("<img src='Content/Image/av6.png' />");
                                                        } 
                                                        %>
													</a>
												</div>
												<div class="media-body">
													<h1 class="media-heading u-fs--14 u-c--grey"><%=item.CustomerName%></h1>
													<p><%=item.ContentDesc%></p>
													<div class="u-ta--l">
														<span class="u-d--ib u-va--m u-c--grey u-fs--14"><%=item.CreateDate%></span>
													</div>
													
												</div>
											</li>

                                    <%}%>

										</ul>

                                        <%}%>

                                        <form id="frm1" runat="server">

                                        <asp:TextBox ID="txtContent" runat="server" TextMode="MultiLine" class="c-textarea" Height="70px"></asp:TextBox>
										<div class="u-pt--10 u-ta--r">
                                        <%if (Session["UserInfo"] == null)
                                         {
                                              Response.Write("<button class='btn btn-success' type='button' disabled='disabled'>登录后才可以评论哦~</button>");
                                         }
                                         else
                                         {
                                         %>
                                              <asp:Button runat="server" Text="评论" class="btn btn-lg btn-primary" ID="btnPost" OnClick="btnPost_Click"></asp:Button>
                                          <%
                                          }
                                         %>
										</div>

                                        </form>
									</div>
								</div>
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
            	<p class="l-footer_text u-ta--c">© 2015 精品文字分享网站<small> by<strong>李柔</strong></small></p>
            </div>
        </footer>
        <!-- l-body_wrapper_footer 结束 -->
	</div>
	<!-- l-body_wrapper 结束 -->

</body>
</html>