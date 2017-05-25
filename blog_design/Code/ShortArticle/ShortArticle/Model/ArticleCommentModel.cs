using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShortArticle.Model
{
    /// <summary>
    /// ArticleComment:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class ArticleCommentModel
    {
        public ArticleCommentModel()
        { }
        #region Model
        private Guid _commentid;
        private Guid _articleid;
        private Guid _customerid;
        private string _contentdesc;
        private int? _datastate;
        private DateTime? _createdate;
        /// <summary>
        /// 评论ID
        /// </summary>
        public Guid CommentID
        {
            set { _commentid = value; }
            get { return _commentid; }
        }
        /// <summary>
        /// 文字ID（外键）
        /// </summary>
        public Guid ArticleID
        {
            set { _articleid = value; }
            get { return _articleid; }
        }
        /// <summary>
        /// 用户（外键）
        /// </summary>
        public Guid CustomerID
        {
            set { _customerid = value; }
            get { return _customerid; }
        }
        /// <summary>
        /// 评论内容
        /// </summary>
        public string ContentDesc
        {
            set { _contentdesc = value; }
            get { return _contentdesc; }
        }
        /// <summary>
        /// 数据状态 0默认 1删除
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

        public string CustomerName { get; set; }

        /// <summary>
        /// 客户性别
        /// </summary>
        public int CustomerSex { get; set; }

        #endregion Model

    }
}