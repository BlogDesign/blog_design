using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Xml;
using System.Reflection;
using System.IO;
using System.Threading;

namespace Greentown.Health.DataAccess
{
    public static class DBHelper
    {

        public static Dictionary<Thread, SqlConnection> _cache = new Dictionary<Thread, SqlConnection>();
        public static string connectionString = @"server= .;database=lr;uid = sa; pwd = 123456";

        public static SqlConnection getConnection()
        {
            SqlConnection connection = null;

            _cache.TryGetValue(Thread.CurrentThread, out connection);

            if (connection == null)
            {
                connection = new SqlConnection(connectionString);//建立数据库连接
                _cache.Add(Thread.CurrentThread, connection);
                return connection;
            }
            else if (connection.State == System.Data.ConnectionState.Closed)
            {
                return connection;
            }
            else if (connection.State == System.Data.ConnectionState.Broken)
            {
                connection.Close();
                return connection;
            }

            System.Diagnostics.Trace.WriteLine(_cache.Count);

            expungeStaleEntry();

            //说明连接存在而且是open的
            return connection;
        }

        private static void expungeStaleEntry()
        {
            List<Thread> deadKeys = new List<Thread>();

            foreach (KeyValuePair<Thread, SqlConnection> kvp in _cache)
                if (kvp.Key.IsAlive == false)
                    deadKeys.Add(kvp.Key);

            foreach (Thread key in deadKeys)
                _cache.Remove(key);
        }

        public static void closeConnection(SqlConnection connection)
        {
            if (null != connection)
                connection.Close();
        }

        public static bool isConnectionOpen(SqlConnection connection)
        {
            if (connection.State == System.Data.ConnectionState.Open)
                return true;
            else
                return false;
        }


        /// <summary>
        /// 利用sql语句查询数据集
        /// </summary>
        /// <returns></returns>
        public static DataTable GetDataTable(string sql)
        {
            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            da.Fill(ds, "table");

            if (lastState == false)
                conn.Close();
            return ds.Tables["table"];
        }

        public static DataTable GetDataSet(string sql)
        {
            SqlConnection conn = getConnection();
            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            da.Fill(ds, "table");
            conn.Close();
            return ds.Tables["table"];
        }

        /// <summary>
        /// 获取dataSet 适合多条sql语句
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static DataSet GetDateTables(string sql)
        {
            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            da.Fill(ds, "table");

            if (lastState == false)
                conn.Close();
            return ds;
        }

        /// <summary>
        /// 利用sql语句和参数查询数据集
        /// </summary>
        /// <returns></returns>
        public static DataTable GetDataTable(string sql, params SqlParameter[] values)
        {
            foreach (SqlParameter p in values)
            {
                if (p.Value == null)
                {
                    p.Value = DBNull.Value;
                }
            }

            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            da.SelectCommand.Parameters.AddRange(values);
            da.Fill(ds);

            if (lastState == false)
                conn.Close();
            return ds.Tables[0];
        }
        /// <summary>
        /// 利用sql语句执行增、删、改操作
        /// </summary>
        public static int ExecuteCommand(string sql)
        {
            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            SqlCommand cmd = new SqlCommand(sql, conn);
            int num = (int)cmd.ExecuteNonQuery();

            if (lastState == false)
                conn.Close();
            return num;
        }

        /// <summary>
        /// 利用sql语句执行增、删、改操作
        /// </summary>
        public static int saveReturnWithPK(string sql)
        {
            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            //sql += " ; select @@identity";
            sql += " ; select SCOPE_IDENTITY()";
            SqlCommand cmd = new SqlCommand(sql, conn);
            int num = Convert.ToInt32(cmd.ExecuteScalar());


            if (lastState == false)
                conn.Close();
            return num;
        }

        /// <summary>
        /// 利用sql语句获取主键ID,不加SCOPE_IDENTITY
        /// </summary>
        public static int saveReturnWithPK_NoAppending(string sql)
        {
            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            SqlCommand cmd = new SqlCommand(sql, conn);
            int num = Convert.ToInt32(cmd.ExecuteScalar());

            if (lastState == false)
                conn.Close();
            return num;
        }
        /// <summary>
        /// 执行带参数的增、删、改操作
        /// </summary>
        public static int ExecuteCommand(string sql, params SqlParameter[] values)
        {
           
            SqlConnection conn = getConnection();
             foreach (SqlParameter p in values)
             {
                 if (p.Value == null)
                 {
                     p.Value = DBNull.Value;
                 }
             }
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddRange(values);
            int num = (int)cmd.ExecuteNonQuery();

            if (lastState == false)
                conn.Close();
            return num;
        }
        /// <summary>
        /// 利用存储过程执行增、删、改操作
        /// </summary>
        public static int ExecuteCommand(params SqlParameter[] values)
        {
           
            SqlConnection conn = getConnection();
            foreach (SqlParameter p in values)
            {
                if (p.Value == null)
                {
                    p.Value = DBNull.Value;
                }
            }
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            SqlCommand cmd = new SqlCommand();
            cmd.Connection = conn;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "";//存储过程的名字
            cmd.Parameters.AddRange(values);
            int num = (int)cmd.ExecuteNonQuery();

            if (lastState == false)
                conn.Close();
            return num;
        }

        /// <summary>
        /// 利用存储过程执行增、删、改操作
        /// </summary>
        public static int ExecuteProCommand(string proName, SqlParameter[] values)
        {
           
            SqlConnection conn = getConnection();
            foreach (SqlParameter p in values)
            {
                if (p.Value == null)
                {
                    p.Value = DBNull.Value;
                }
            }
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            SqlCommand cmd = new SqlCommand();
            cmd.Connection = conn;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = proName;//存储过程的名字
            cmd.Parameters.AddRange(values);
            int num = (int)cmd.ExecuteNonQuery();

            if (lastState == false)
                conn.Close();
            return num;
        }


        /// <summary>
        /// 查询单个数据（首行首列）
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static object GetObjScaler(string sql)
        {
            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            SqlCommand cmd = new SqlCommand(sql, conn);
            object obj = cmd.ExecuteScalar();

            if (lastState == false)
                conn.Close();
            return obj;
        }

        public static int GetScaler(string sql)
        {
            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            SqlCommand cmd = new SqlCommand(sql, conn);
            int a = Convert.ToInt32(cmd.ExecuteScalar());

            if (lastState == false)
                conn.Close();
            return a;
        }

        public static object GetObjScaler(string sql, params SqlParameter[] values)
        {
            foreach (SqlParameter p in values)
            {
                if (p.Value == null)
                {
                    p.Value = DBNull.Value;
                }
            }

            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddRange(values);
            object obj = cmd.ExecuteScalar();

            if (lastState == false)
                conn.Close();
            return obj;
        }


        /// <summary>
        /// 查询单个数据
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static int GetScaler(string sql, params SqlParameter[] values)
        {
            foreach (SqlParameter p in values)
            {
                if (p.Value == null)
                {
                    p.Value = DBNull.Value;
                }
            }

            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddRange(values);
            int a = Convert.ToInt32(cmd.ExecuteScalar());

            if (lastState == false)
                conn.Close();
            return a;
        }

        /// <summary>
        /// 利用存储过程来查询单个数据
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static int GetScaler(params SqlParameter[] values)
        {
            foreach (SqlParameter p in values)
            {
                if (p.Value == null)
                {
                    p.Value = DBNull.Value;
                }
            }

            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            SqlCommand cmd = new SqlCommand();
            cmd.Connection = conn;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "";//需要调用的存储过程名称
            cmd.Parameters.AddRange(values);
            int a = Convert.ToInt32(cmd.ExecuteScalar());

            if (lastState == false)
                conn.Close();
            return a;
        }

        /// <summary>
        /// 利用sql语句来读取数据（不带参数）
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static SqlDataReader GetDataReader(string sql)
        {
            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            SqlCommand cmd = new SqlCommand(sql, conn);
            SqlDataReader dr = cmd.ExecuteReader();
            return dr;
        }

        /// <summary>
        /// 利用sql语句来读取数据（带参数）
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static SqlDataReader GetDataReader(string sql, params SqlParameter[] values)
        {
            foreach (SqlParameter p in values)
            {
                if (p.Value == null)
                {
                    p.Value = DBNull.Value;
                }
            }

            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.Parameters.AddRange(values);
            SqlDataReader dr = cmd.ExecuteReader();
            return dr;
        }

        /// <summary>
        /// 利用存储过程来读取数据（带参数）
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static SqlDataReader GetDataReader(params SqlParameter[] values)
        {
            foreach (SqlParameter p in values)
            {
                if (p.Value == null)
                {
                    p.Value = DBNull.Value;
                }
            }

            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            SqlCommand cmd = new SqlCommand();
            cmd.Connection = conn;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "";//要调用的存储过程的名字
            cmd.Parameters.AddRange(values);
            SqlDataReader dr = cmd.ExecuteReader();
            return dr;
        }

        /// <summary>
        /// 利用存储过程来读取数据（带参数）
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static SqlDataReader GetDataReader(SqlParameter[] values, string ProName)
        {
            //foreach (SqlParameter p in values)
            //{
            //    if (p.Value == null)
            //    {
            //        p.Value = DBNull.Value;
            //    }
            //}

            SqlConnection conn = getConnection();
            bool lastState = isConnectionOpen(conn);
            if (lastState == false)
                conn.Open();

            SqlCommand cmd = new SqlCommand();

            cmd.Connection = conn;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = ProName;//要调用的存储过程的名字
            cmd.Parameters.AddRange(values);
            SqlDataReader dr = cmd.ExecuteReader();
            return dr;
        }

        /// <summary>
        /// 利用sql语句和参数查询数据集
        /// </summary>
        /// <returns></returns>
        public static DataTable GetDataSet(string sql, params SqlParameter[] values)
        {
            foreach (SqlParameter p in values)
            {
                if (p.Value == null)
                {
                    p.Value = DBNull.Value;
                }
            }

            SqlConnection conn = getConnection();
            foreach (SqlParameter p in values)
            {
                if (p.Value == null)
                {
                    p.Value = DBNull.Value;
                }
            }
            DataSet ds = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter(sql, conn);
            da.SelectCommand.Parameters.AddRange(values);
            da.Fill(ds);
            conn.Close();
            return ds.Tables[0];
        }


        /// <summary>
        /// 执行查询语句，返回DataSet
        /// </summary>
        /// <param name="SQLString">查询语句</param>
        /// <returns>DataSet</returns>
        public static DataSet Query(string SQLString)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                DataSet ds = new DataSet();
                try
                {
                    connection.Open();
                    SqlDataAdapter command = new SqlDataAdapter(SQLString, connection);
                    command.Fill(ds, "ds");
                }
                catch (System.Data.SqlClient.SqlException ex)
                {
                    throw new Exception(ex.Message);
                }
                return ds;
            }
        }


    }
}
