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
    public partial class ChangePassword : System.Web.UI.Page
    {
        private readonly CustomerService customerService = new CustomerService();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["UserInfo"] == null)
                {
                    Response.Redirect("Login.aspx");
                }
            }
        }
        protected void btnsubmit_Click(object sender, EventArgs e)
        {
            if(txtold.Text.Trim()=="")
            {
                Response.Write("<Script language=javascript>alert('旧密码不得为空！');</script>");
                return;
            }
            else if (txtnew2.Text == "" || txtnew1.Text == "")
            {
                Response.Write("<Script language=javascript>alert('新密码不得为空！');</script>");
                return;
            }
            else if (txtnew2.Text != txtnew1.Text)
            {
                Response.Write("<script language=javascript>alert('两次输入的密码不同，请重新输入！');</script>");
                return;
            }
            else
            {
                CustomerModel customer = Session["UserInfo"] as CustomerModel;
                if (customer.LoginPassword.Trim() != txtold.Text.Trim())
                {
                    Response.Write("<script language=javascript>alert('旧密码不正确，请重新输入！');</script>");
                    return;
                }
                else {
                    bool bl = customerService.ChangePassword(txtnew1.Text.Trim(), customer.CustomerID);
                    if (bl)
                    {
                        Response.Write("<script language=javascript>alert('修改成功！');window.location='Index.aspx';</script>");
                        return;
                    }
                    else {
                        Response.Write("<script language=javascript>alert('修改失败，请重试！');</script>");
                        return;
                    }
                }
            }
            
        } 
    }
}