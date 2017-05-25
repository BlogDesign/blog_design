using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShortArticle.Model
{
    /// <summary>
    /// Favorite:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class FavoriteModel
    {
        public FavoriteModel()
        { }
        #region Model
        private Guid _favoriteid;
        private Guid _articleid;
        private Guid _customerid;
        private int? _datastate;
        private DateTime? _createdate;
        /// <summary>
        /// 收藏ID
        /// </summary>
        public Guid FavoriteID
        {
            set { _favoriteid = value; }
            get { return _favoriteid; }
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
        #endregion Model

    }
}