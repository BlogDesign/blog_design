using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShortArticle.Model
{
    /// <summary>
    /// ArticleLike:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class ArticleLikeModel
    {
        public ArticleLikeModel()
        { }
        #region Model
        private Guid _likeid;
        private Guid _articleid;
        private Guid _customerid;
        private DateTime? _createdate;
        /// <summary>
        /// 赞ID
        /// </summary>
        public Guid LikeID
        {
            set { _likeid = value; }
            get { return _likeid; }
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
        /// 用户ID（外键）
        /// </summary>
        public Guid CustomerID
        {
            set { _customerid = value; }
            get { return _customerid; }
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