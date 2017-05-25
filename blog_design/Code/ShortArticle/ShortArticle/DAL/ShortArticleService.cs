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
    /// 精品文字操作类
    /// </summary>
    public class ShortArticleService
    {

        #region 精品文字
        /// <summary>
        /// 发布精品文字
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool CreateShortArticle(ShortArticleModel model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into ShortArticle(");
            strSql.Append("ArticleID,ArticleContent,CustomerID,ArticleType,GetCount,DataState,CreateDate)");
            strSql.Append(" values (");
            strSql.Append("@ArticleID,@ArticleContent,@CustomerID,@ArticleType,@GetCount,@DataState,@CreateDate)");
            SqlParameter[] parameters = {
					new SqlParameter("@ArticleID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@ArticleContent", SqlDbType.VarChar,-1),
					new SqlParameter("@CustomerID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@ArticleType", SqlDbType.Int,4),
					new SqlParameter("@GetCount", SqlDbType.Int,4),
					new SqlParameter("@DataState", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime)};
            parameters[0].Value = Guid.NewGuid();
            parameters[1].Value = model.ArticleContent;
            parameters[2].Value = model.CustomerID;
            parameters[3].Value = 0; //文字类型默认0
            parameters[4].Value = 0; //初始浏览次数0
            parameters[5].Value = 0; //默认状态0
            parameters[6].Value = DateTime.Now;

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
        /// 获取最新发布精品文字
        /// </summary>
        /// <param name="top">显示数量</param>
        /// <returns></returns>
        public List<ShortArticleModel> GetShortArticle(int top)
        {
            string strSql = string.Format("SELECT TOP {0} *,(SELECT CustomerName FROM dbo.Customer c WHERE c.CustomerID=a.CustomerID) as CustomerName,(SELECT count(1) FROM [ArticleLike] l WHERE l.ArticleID=a.ArticleID) as LikeCount,(SELECT count(1) FROM [ArticleComment] c WHERE c.ArticleID=a.ArticleID) as CommentCount, (SELECT Sex FROM dbo.Customer c WHERE c.CustomerID=a.CustomerID) as CustomerSex FROM dbo.ShortArticle a ORDER BY CreateDate DESC", top);
            List<ShortArticleModel> list = new List<ShortArticleModel>();
            using (SqlDataReader reader = DBHelper.GetDataReader(strSql.ToString()))
            {
                list = CommconHelper.ReaderToList<ShortArticleModel>(reader).ToList();
                reader.Close();
            }
            return list;
        }

        /// <summary>
        /// 获取用户自己发布的精品文字
        /// </summary>
        /// <param name="customerID"></param>
        /// <returns></returns>
        public List<ShortArticleModel> GetShortArticleByMy(Guid customerID)
        {
            string strSql = string.Format("SELECT *,(SELECT CustomerName FROM dbo.Customer c WHERE c.CustomerID=a.CustomerID) as CustomerName,(SELECT count(1) FROM [ArticleLike] l WHERE l.ArticleID=a.ArticleID) as LikeCount,(SELECT count(1) FROM [ArticleComment] c WHERE c.ArticleID=a.ArticleID) as CommentCount, (SELECT Sex FROM dbo.Customer c WHERE c.CustomerID=a.CustomerID) as CustomerSex FROM dbo.ShortArticle a WHERE a.CustomerID ='{0}' ORDER BY CreateDate DESC", customerID);
            List<ShortArticleModel> list = new List<ShortArticleModel>();
            using (SqlDataReader reader = DBHelper.GetDataReader(strSql.ToString()))
            {
                list = CommconHelper.ReaderToList<ShortArticleModel>(reader).ToList();
                reader.Close();
            }
            return list;
        }

        /// <summary>
        /// 获取用户收藏的精品文字
        /// </summary>
        /// <param name="customerID"></param>
        /// <returns></returns>
        public List<ShortArticleModel> GetShortArticleByFavorite(Guid customerID)
        {
            string strSql = string.Format("SELECT *,(SELECT CustomerName FROM dbo.Customer c WHERE c.CustomerID=a.CustomerID) as CustomerName,(SELECT count(1) FROM [ArticleLike] l WHERE l.ArticleID=a.ArticleID) as LikeCount,(SELECT count(1) FROM [ArticleComment] c WHERE c.ArticleID=a.ArticleID) as CommentCount, (SELECT Sex FROM dbo.Customer c WHERE c.CustomerID=a.CustomerID) as CustomerSex FROM dbo.ShortArticle a WHERE a.ArticleID in (SELECT ArticleID FROM dbo.Favorite WHERE CustomerID='{0}') ORDER BY CreateDate DESC", customerID);
            List<ShortArticleModel> list = new List<ShortArticleModel>();
            using (SqlDataReader reader = DBHelper.GetDataReader(strSql.ToString()))
            {
                list = CommconHelper.ReaderToList<ShortArticleModel>(reader).ToList();
                reader.Close();
            }
            return list;
        }


        /// <summary>
        /// 获取用户赞过的精品文字
        /// </summary>
        /// <param name="customerID"></param>
        /// <returns></returns>
        public List<ShortArticleModel> GetShortArticleByLike(Guid customerID)
        {
            string strSql = string.Format("SELECT *,(SELECT CustomerName FROM dbo.Customer c WHERE c.CustomerID=a.CustomerID) as CustomerName,(SELECT count(1) FROM [ArticleLike] l WHERE l.ArticleID=a.ArticleID) as LikeCount,(SELECT count(1) FROM [ArticleComment] c WHERE c.ArticleID=a.ArticleID) as CommentCount, (SELECT Sex FROM dbo.Customer c WHERE c.CustomerID=a.CustomerID) as CustomerSex FROM dbo.ShortArticle a WHERE a.ArticleID in (SELECT ArticleID FROM dbo.ArticleLike WHERE CustomerID='{0}') ORDER BY CreateDate DESC", customerID);
            List<ShortArticleModel> list = new List<ShortArticleModel>();
            using (SqlDataReader reader = DBHelper.GetDataReader(strSql.ToString()))
            {
                list = CommconHelper.ReaderToList<ShortArticleModel>(reader).ToList();
                reader.Close();
            }
            return list;
        }

        /// <summary>
        /// 获取用户评论过的精品文字
        /// </summary>
        /// <param name="customerID"></param>
        /// <returns></returns>
        public List<ShortArticleModel> GetShortArticleByComment(Guid customerID)
        {
            string strSql = string.Format("SELECT *,(SELECT CustomerName FROM dbo.Customer c WHERE c.CustomerID=a.CustomerID) as CustomerName,(SELECT count(1) FROM [ArticleLike] l WHERE l.ArticleID=a.ArticleID) as LikeCount,(SELECT count(1) FROM [ArticleComment] c WHERE c.ArticleID=a.ArticleID) as CommentCount, (SELECT Sex FROM dbo.Customer c WHERE c.CustomerID=a.CustomerID) as CustomerSex FROM dbo.ShortArticle a WHERE a.ArticleID in (SELECT ArticleID FROM dbo.ArticleComment WHERE CustomerID='{0}') ORDER BY CreateDate DESC", customerID);
            List<ShortArticleModel> list = new List<ShortArticleModel>();
            using (SqlDataReader reader = DBHelper.GetDataReader(strSql.ToString()))
            {
                list = CommconHelper.ReaderToList<ShortArticleModel>(reader).ToList();
                reader.Close();
            }
            return list;
        }




        

        /// <summary>
        /// 获取精品文字详情
        /// </summary>
        /// <param name="articleID"></param>
        /// <returns></returns>
        public ShortArticleModel GetShortArticleDetail(Guid articleID)
        {
            string strSql = string.Format("SELECT *,(SELECT CustomerName FROM dbo.Customer c WHERE c.CustomerID=a.CustomerID) as CustomerName,(SELECT count(1) FROM [ArticleLike] l WHERE l.ArticleID=a.ArticleID) as LikeCount,(SELECT count(1) FROM [ArticleComment] c WHERE c.ArticleID=a.ArticleID) as CommentCount, (SELECT Sex FROM dbo.Customer c WHERE c.CustomerID=a.CustomerID) as CustomerSex FROM dbo.ShortArticle a where a.ArticleID='{0}' ORDER BY CreateDate DESC",articleID);
            SqlDataReader sqlDataReader = DBHelper.GetDataReader(strSql.ToString());
            ShortArticleModel model = sqlDataReader.ReaderToModel<ShortArticleModel>();
            sqlDataReader.Close();
            return model;
        }

        /// <summary>
        /// 获取某个用户所有发布的精品文字
        /// </summary>
        /// <param name="customerID"></param>
        /// <returns></returns>
        public List<ShortArticleModel> GetShortArticleByCustomerID(Guid customerID)
        {
            string strSql = string.Format("SELECT * FROM dbo.ShortArticle WHERE CustomerID='{0}' ORDER BY CreateDate DESC",customerID);
            List<ShortArticleModel> list = new List<ShortArticleModel>();
            using (SqlDataReader reader = DBHelper.GetDataReader(strSql.ToString()))
            {
                list = CommconHelper.ReaderToList<ShortArticleModel>(reader).ToList();
                reader.Close();
            }
            return list;
        }

        /// <summary>
        /// 根据文字ID删除文字
        /// </summary>
        /// <param name="articleID"></param>
        /// <returns></returns>
        public bool DeleteShortArticle(Guid articleID)
        {
            string strSql = string.Format("DELETE FROM ShortArticle where ArticleID='{0}'", articleID);
            int rows = DBHelper.ExecuteCommand(strSql);
            if (rows > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        #endregion

        #region 评论

        /// <summary>
        /// 获取精品文字评论
        /// </summary>
        /// <param name="articleID"></param>
        /// <returns></returns>
        public List<ArticleCommentModel> GetArticleCommentList(Guid articleID)
        {
            string strSql = string.Format("SELECT *,(SELECT CustomerName FROM dbo.Customer c WHERE c.CustomerID=a.CustomerID) as CustomerName,(SELECT Sex FROM dbo.Customer c WHERE c.CustomerID=a.CustomerID) as CustomerSex FROM dbo.ArticleComment a WHERE a.ArticleID='{0}' ORDER BY CreateDate DESC", articleID);
            List<ArticleCommentModel> list = new List<ArticleCommentModel>();
            using (SqlDataReader reader = DBHelper.GetDataReader(strSql.ToString()))
            {
                list = CommconHelper.ReaderToList<ArticleCommentModel>(reader).ToList();
                reader.Close();
            }
            return list;
        }

        /// <summary>
        /// 创建评论
        /// </summary>
        public bool CreateArticleComment(ArticleCommentModel model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into ArticleComment(");
            strSql.Append("CommentID,ArticleID,CustomerID,ContentDesc,DataState,CreateDate)");
            strSql.Append(" values (");
            strSql.Append("@CommentID,@ArticleID,@CustomerID,@ContentDesc,@DataState,@CreateDate)");
            SqlParameter[] parameters = {
					new SqlParameter("@CommentID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@ArticleID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@CustomerID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@ContentDesc", SqlDbType.VarChar,-1),
					new SqlParameter("@DataState", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime)};
            parameters[0].Value = Guid.NewGuid();
            parameters[1].Value = model.ArticleID;
            parameters[2].Value = model.CustomerID;
            parameters[3].Value = model.ContentDesc;
            parameters[4].Value = 0;
            parameters[5].Value = DateTime.Now;

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

        #endregion

        #region 点赞

        /// <summary>
        /// 新增点赞
        /// </summary>
        public bool CreateArticleLike(ArticleLikeModel model)
        {
            //判断重复点赞
            if (DBHelper.GetScaler("SELECT COUNT(1) FROM dbo.ArticleLike WHERE ArticleID='" + model.ArticleID + "' AND CustomerID='" + model.CustomerID + "'") > 0)
            {
                return false;
            }
            else
            {
                StringBuilder strSql = new StringBuilder();
                strSql.Append("insert into ArticleLike(");
                strSql.Append("LikeID,ArticleID,CustomerID,CreateDate)");
                strSql.Append(" values (");
                strSql.Append("@LikeID,@ArticleID,@CustomerID,@CreateDate)");
                SqlParameter[] parameters = {
					new SqlParameter("@LikeID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@ArticleID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@CustomerID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@CreateDate", SqlDbType.DateTime)};
                parameters[0].Value = Guid.NewGuid();
                parameters[1].Value = model.ArticleID;
                parameters[2].Value = model.CustomerID;
                parameters[3].Value = DateTime.Now;

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
        }

        #endregion

        #region 收藏
        /// <summary>
        /// 新增收藏
        /// </summary>
        public bool CreateFavorite(FavoriteModel model)
        {
            //判断重复收藏
            if (DBHelper.GetScaler("SELECT COUNT(1) FROM dbo.Favorite WHERE ArticleID='" + model.ArticleID + "' AND CustomerID='" + model.CustomerID + "'") > 0)
            {
                return false;
            }
            else
            {
                StringBuilder strSql = new StringBuilder();
                strSql.Append("insert into Favorite(");
                strSql.Append("FavoriteID,ArticleID,CustomerID,DataState,CreateDate)");
                strSql.Append(" values (");
                strSql.Append("@FavoriteID,@ArticleID,@CustomerID,@DataState,@CreateDate)");
                SqlParameter[] parameters = {
					new SqlParameter("@FavoriteID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@ArticleID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@CustomerID", SqlDbType.UniqueIdentifier,16),
					new SqlParameter("@DataState", SqlDbType.Int,4),
					new SqlParameter("@CreateDate", SqlDbType.DateTime)};
                parameters[0].Value = Guid.NewGuid();
                parameters[1].Value = model.ArticleID;
                parameters[2].Value = model.CustomerID;
                parameters[3].Value = 0;
                parameters[4].Value = DateTime.Now;

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
        }
        #endregion

    }
}