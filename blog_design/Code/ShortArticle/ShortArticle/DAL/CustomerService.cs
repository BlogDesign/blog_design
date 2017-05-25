using Greentown.Health.DataAccess;
using ShortArticle.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;

namespace ShortArticle.DAL
{
    /// <summary>
    /// 用户操作类
    /// </summary>
    public class CustomerService
    {
        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="loginName">用户名</param>
        /// <param name="loginPassword">密码</param>
        /// <returns>返回一个用户实体</returns>
        public CustomerModel CustomerLogin(string loginName,string loginPassword)
        {
            string strSql = string.Format("SELECT * FROM dbo.Customer WHERE LoginName='{0}' and LoginPassword='{1}' and DataState=0",loginName,loginPassword);
            SqlDataReader sqlDataReader = DBHelper.GetDataReader(strSql.ToString());
            CustomerModel model = sqlDataReader.ReaderToModel<CustomerModel>();
            sqlDataReader.Close();
            return model;
        }

        /// <summary>
        /// 用户注册
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        public bool CreateCustomer(CustomerModel model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Customer(");
            strSql.Append("CustomerID,CustomerName,LoginName,LoginPassword,Sex,Birthday,PhotoUrl,DataState,CreateDate)");
            strSql.Append(" values (");
            strSql.Append("@CustomerID,@CustomerName,@LoginName,@LoginPassword,@Sex,@Birthday,@PhotoUrl,@DataState,@CreateDate)");
            SqlParameter[] parameters = {
					new SqlParameter("@CustomerID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@CustomerName", SqlDbType.VarChar,50),
					new SqlParameter("@LoginName", SqlDbType.VarChar,50),
					new SqlParameter("@LoginPassword", SqlDbType.VarChar,50),
					new SqlParameter("@Sex", SqlDbType.Int,4),
					new SqlParameter("@Birthday", SqlDbType.DateTime),
					new SqlParameter("@PhotoUrl", SqlDbType.VarChar,50),
					new SqlParameter("@DataState", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime)};
            parameters[0].Value = Guid.NewGuid();
            parameters[1].Value = model.CustomerName;
            parameters[2].Value = model.LoginName;
            parameters[3].Value = model.LoginPassword;
            parameters[4].Value = model.Sex;
            parameters[5].Value = model.Birthday;
            parameters[6].Value = model.PhotoUrl;
            parameters[7].Value = 0;  //默认为0
            parameters[8].Value = DateTime.Now; //默认为系统当前时间

            int rows = DBHelper.ExecuteCommand(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 用户修改密码
        /// </summary>
        /// <param name="password">新密码</param>
        /// <param name="customerID">客户ID</param>
        /// <returns></returns>
        public bool ChangePassword(string password,Guid customerID)
        {
            string strSql = string.Format("UPDATE Customer SET LoginPassword='{0}' WHERE CustomerID='{1}'", password, customerID);
            int i = DBHelper.ExecuteCommand(strSql);
            if (i > 0)
            {
                return true;
            }
            else {
                return false;
            }
        }
    }
}