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
    public partial class Index : System.Web.UI.Page
    {
        ShortArticleService service = new ShortArticleService();

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnPost_Click(object sender, EventArgs e)
        {
            //从会话里面获取到用户详细信息
            CustomerModel customer = Session["UserInfo"] as CustomerModel;
            ShortArticleModel model = new ShortArticleModel(); //创建文字对象
            model.CustomerID = customer.CustomerID; //文字发布人设置为当前登录用户
            model.ArticleContent = txtContent.Text; //将用户输入文本框的内容赋值给内容字段
            bool bl = service.CreateShortArticle(model); //提交至数据库
            if (bl)
            {
                Response.Write("<script>alert('发布成功');window.location='Index.aspx';</script>");
            }
            else
            {
                Response.Write("<script>alert('发布不成功 请重试');window.location='Index.aspx';</script>");
            }
        }
    }
}