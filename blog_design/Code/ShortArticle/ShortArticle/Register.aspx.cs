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
    public partial class Register : System.Web.UI.Page
    {
        /// <summary>
        /// 用户操作
        /// </summary>
        private readonly CustomerService customerService = new CustomerService();

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnReg_Click(object sender, EventArgs e)
        {
            string customerName = txtCustomerName.Text.Trim(); //获取姓名
            string sex = ddSex.SelectedItem.Value; //获取性别
            string loginName = txtLoginName.Text.Trim(); //获取登录名
            string pwd1 = txtLoginPassword1.Text.Trim(); //获取密码
            string pwd2 = txtLoginPassword2.Text.Trim(); //获取重复密码
            if (customerName == "")
            {
                Response.Write("<script>alert('请输入姓名')</script>"); //检测用户输入
            }
            else if (sex == "")
            {
                Response.Write("<script>alert('请选择性别')</script>"); //检测用户输入
            }
            else if (loginName == "")
            {
                Response.Write("<script>alert('请输入登录名')</script>"); //检测用户输入
            }
            else if (pwd1 == "")
            {
                Response.Write("<script>alert('请输入密码')</script>"); //检测用户输入
            }
            else if (pwd2 == "")
            {
                Response.Write("<script>alert('请再次输入密码')</script>"); //检测用户输入
            }
            else if (pwd1 != pwd2)
            {
                Response.Write("<script>alert('两次密码不一致')</script>"); //判断两次密码是否一致
            }
            else
            {
                CustomerModel customer = new CustomerModel(); //创建用户对象
                customer.Birthday = DateTime.Now; //设置生日 设置为空 此功能暂不开发
                customer.CustomerName = customerName; //设置姓名
                customer.LoginName = loginName; //设置登录名
                customer.LoginPassword = pwd1; //设置密码
                customer.Sex = Convert.ToInt32(sex); //设置性别
                customer.PhotoUrl = ""; //用户头像 设置为空 此功能暂不开发
                bool bl = customerService.CreateCustomer(customer); //将用户信息 插入至数据库
                if (bl)
                {
                    Response.Write("<script>alert('注册成功');window.location='Login.aspx'</script>"); //注册成功 跳转至登录页面
                }
                else
                {
                    Response.Write("<script>alert('注册失败 请重试')</script>"); //注册失败
                }

            }
        }
    }
}