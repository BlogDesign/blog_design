using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShortArticle.Model
{
    /// <summary>
    /// Customer:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class CustomerModel
    {
        public CustomerModel()
        { }
        #region Model
        private Guid _customerid;
        private string _customername;
        private string _loginname;
        private string _loginpassword;
        private int? _sex;
        private DateTime? _birthday;
        private string _photourl;
        private int? _datastate;
        private DateTime? _createdate;
        /// <summary>
        /// 客户ID
        /// </summary>
        public Guid CustomerID
        {
            set { _customerid = value; }
            get { return _customerid; }
        }
        /// <summary>
        /// 用户姓名
        /// </summary>
        public string CustomerName
        {
            set { _customername = value; }
            get { return _customername; }
        }
        /// <summary>
        /// 登录名
        /// </summary>
        public string LoginName
        {
            set { _loginname = value; }
            get { return _loginname; }
        }
        /// <summary>
        /// 登录密码
        /// </summary>
        public string LoginPassword
        {
            set { _loginpassword = value; }
            get { return _loginpassword; }
        }
        /// <summary>
        /// 性别
        /// </summary>
        public int? Sex
        {
            set { _sex = value; }
            get { return _sex; }
        }
        /// <summary>
        /// 出生日期
        /// </summary>
        public DateTime? Birthday
        {
            set { _birthday = value; }
            get { return _birthday; }
        }
        /// <summary>
        /// 用户头像
        /// </summary>
        public string PhotoUrl
        {
            set { _photourl = value; }
            get { return _photourl; }
        }
        /// <summary>
        /// 数据状态
        /// </summary>
        public int? DataState
        {
            set { _datastate = value; }
            get { return _datastate; }
        }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreateDate
        {
            set { _createdate = value; }
            get { return _createdate; }
        }
        #endregion Model

    }
}