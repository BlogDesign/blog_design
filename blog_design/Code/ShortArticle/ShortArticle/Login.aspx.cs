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
    public partial class Login : System.Web.UI.Page
    {
        /// <summary>
        /// 用户操作
        /// </summary>
        private readonly CustomerService customerService = new CustomerService();

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            string loginName=txtLoginName.Text.Trim(); //获取登录名
            string loginPassword=txtLoginPassword.Text.Trim(); //获取用户输入的密码
            if (loginName == "")
            {
                Response.Write("<script>alert('请输入用户名')</script>"); //检测用户输入
            }
            else if (loginPassword == "")
            {
                Response.Write("<script>alert('请输入密码')</script>"); //检测用户输入
            }
            else
            {
                //传入用户名和密码参数 如果登录成功会返回客户详细信息 如果登录失败 则返回NULL
                CustomerModel model = customerService.CustomerLogin(loginName, loginPassword); 
                if (model == null)
                {
                    Response.Write("<script>alert('用户名或密码不正确')</script>");
                }
                else
                {
                    Session["UserInfo"] = model; //将用户详细信息放入会话
                    Response.Redirect("Index.aspx"); //跳转页面至首页
                }
            }
        }
    }
}