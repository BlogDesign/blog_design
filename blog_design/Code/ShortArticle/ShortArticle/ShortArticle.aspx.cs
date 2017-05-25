using ShortArticle.DAL;
using ShortArticle.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ShortArticle
{
    public partial class ShortArticle : System.Web.UI.Page
    {
        
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnPost_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtContent.Text))
            {
                Response.Write("<Script language=javascript>alert('请输入评论内容！');</script>");
            }
            else
            {
                ShortArticleService articleService = new ShortArticleService();
                CustomerModel customer1 = Session["UserInfo"] as CustomerModel;
                ArticleCommentModel model=new ArticleCommentModel();
                model.ArticleID=Guid.Parse(Request.QueryString["ArticleID"]);
                model.ContentDesc=txtContent.Text.Trim();
                model.CustomerID = customer1.CustomerID;
                articleService.CreateArticleComment(model);
                Response.Redirect("ShortArticle.aspx?ArticleID=" + Request.QueryString["ArticleID"]);
            }
        }
    }
}