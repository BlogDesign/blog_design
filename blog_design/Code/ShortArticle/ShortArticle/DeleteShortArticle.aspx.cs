using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ShortArticle.DAL;

namespace ShortArticle
{
    public partial class DeleteShortArticle : System.Web.UI.Page
    {
        private readonly ShortArticleService service = new ShortArticleService();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string articleID = Request.QueryString["ArticleID"];
                if (string.IsNullOrWhiteSpace(articleID))
                {
                    Response.Write("参数错误");
                }
                else 
                {
                    bool bl = service.DeleteShortArticle(Guid.Parse(articleID));
                    if (bl)
                    {
                        Response.Redirect("Index.aspx");
                    }
                    else {
                        Response.Write("DataAccess Error");
                    }
                }
            }
        }
    }
}