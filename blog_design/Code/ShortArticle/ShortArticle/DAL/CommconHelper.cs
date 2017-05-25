using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Data;
using System.Data.SqlClient;

namespace ShortArticle.DAL
{
    public static class CommconHelper
    {

        /// <summary>
        /// 写入空值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="q"></param>
        public static void SetNull<T>(T q) where T : class
        {
            //foreach (PropertyInfo item in q.GetType().GetProperties())
            //{
            //    var itemValue = item.GetValue(q, null);
            //    if (null == itemValue)
            //    {
            //        switch (itemValue.GetType().Name)
            //        {
            //            case  "string":
            //                break;

            //        }
            //        item.SetValue(q,(object)DBNull.Value ,null);
            //    }
            //}
        }

        public static void SetNullList(List<Object> list)
        {

        }


        //public static IList<T> FillList<T>(IDataReader reader)
        //{
        //    IList<T> lst = new List<T>();
        //    while (reader.Read())
        //    {
        //        T RowInstance = Activator.CreateInstance<T>();
        //        foreach (PropertyInfo Property in typeof(T).GetProperties())
        //        {
        //            foreach (BindingFieldAttribute FieldAttr in Property.GetCustomAttributes(typeof(BindingFieldAttribute), true))
        //            {
        //                try
        //                {
        //                    int Ordinal = reader.GetOrdinal(FieldAttr.FieldName);
        //                    if (reader.GetValue(Ordinal) != DBNull.Value)
        //                    {
        //                        Property.SetValue(RowInstance, Convert.ChangeType(reader.GetValue(Ordinal), Property.PropertyType), null);
        //                    }
        //                }
        //                catch
        //                {
        //                    break;
        //                }
        //            }
        //        }
        //        lst.Add(RowInstance);
        //    }
        //    return lst;
        //}



        public static T ReaderToModel<T>(this IDataReader dr)
        {
            //  try
            //  {
            using (dr)
            {
                T model = Activator.CreateInstance<T>();
                if (dr.Read())
                {
                    Type modelType = typeof(T);
                    int count = dr.FieldCount;
                    for (int i = 0; i < count; i++)
                    {
                        //   string n = dr.GetName(i);
                        if (!IsNullOrDBNull(dr[i]))
                        {
                            PropertyInfo pi = modelType.GetProperty(dr.GetName(i), BindingFlags.GetProperty | BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
                            if (pi != null)
                            {
                                pi.SetValue(model, HackType(dr[i], pi.PropertyType), null);
                                // pi.SetValue(model, Convert.ChangeType(dr[i], pi.PropertyType), null);
                                //  pi.SetValue(model,HackType<pi.PropertyType)(dr[i], pi.PropertyType), null);
                            }
                        }
                    }
                    return model;
                }
            }
            return default(T);
            //   }
            //  catch (Exception ex)
            //  {
            //      return default(T);
            //   }
        }

        public static IList<T> ReaderToList<T>(this IDataReader dr)
        {
            using (dr)
            {
                List<T> list = new List<T>();
                Type modelType = typeof(T);
                int count = dr.FieldCount;
                while (dr.Read())
                {
                    T model = Activator.CreateInstance<T>();

                    for (int i = 0; i < count; i++)
                    {
                        if (!IsNullOrDBNull(dr[i]))
                        {//GetPropertyName
                            PropertyInfo pi = modelType.GetProperty(dr.GetName(i), BindingFlags.GetProperty | BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
                            if (pi != null)
                            {
                                pi.SetValue(model, HackType(dr[i], pi.PropertyType), null);
                                // pi.SetValue(model, Convert.ChangeType(dr[i], pi.PropertyType), null);
                            }
                        }
                    }
                    list.Add(model);
                }
                return list;
            }
        }

        /// <summary>
        /// 把dataTable 转成 Model
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static T ToModel<T>(this DataTable dt)
        {
            T model = Activator.CreateInstance<T>();
            Type modelType = typeof(T);
            int count = dt.Columns.Count;
            for (int i = 0; i < count; i++)
            {
                if (!IsNullOrDBNull(dt.Rows[0][i]))
                {
                    PropertyInfo pi = modelType.GetProperty(dt.Columns[i].ColumnName, BindingFlags.GetProperty | BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
                    if (null != pi)
                    {
                        pi.SetValue(model, HackType(dt.Rows[0][i], pi.PropertyType), null);
                    }
                }
            }
            return model;
        }

        /// <summary>
        /// 设置允许为null
        /// </summary>
        /// <param name="sqlParameters"></param>
        public static SqlParameter[] SetNullable(this SqlParameter[] sqlParameters)
        {
            foreach (SqlParameter item in sqlParameters)
            {
                if (null == item.Value)
                    item.Value = DBNull.Value; item.IsNullable = true;
            }
            return sqlParameters;
        }

        /// <summary>
        /// 把dataTable 转成 ModelList
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="dt"></param>
        /// <returns></returns>
        public static List<T> ToModelList<T>(this DataTable dt)
        {
            List<T> list = new List<T>();
            Type modelType = typeof(T);
            int count = dt.Columns.Count;
            for (int row = 0; row < dt.Rows.Count; row++)
            {
                T model = Activator.CreateInstance<T>();
                for (int column = 0; column < dt.Columns.Count; column++)
                {
                    PropertyInfo pi = modelType.GetProperty(dt.Columns[column].ColumnName, BindingFlags.GetProperty | BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
                    if (null != pi)
                    {
                        pi.SetValue(model, HackType(dt.Rows[row][column], pi.PropertyType), null);
                    }
                }
                list.Add(model);
            }
            return list;
        }



        private static object HackType<T>(object value, T conversionType) where T : Type
        {
            //  return value == null ? new T() : (T)value;

            value = IsNullOrDBNull(value) ? default(T) : (T)value;

            if (conversionType.IsGenericType && conversionType.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
            {
                if (value == null)
                    return null;
                System.ComponentModel.NullableConverter nullableConverter = new System.ComponentModel.NullableConverter(conversionType);
                conversionType = (nullableConverter.UnderlyingType as T);
            }
            return Convert.ChangeType(value, conversionType);
        }

        //这个类对可空类型进行判断转换，要不然会报错   
        private static object HackType(object value, Type conversionType)
        {
            if (conversionType.IsGenericType && conversionType.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
            {
                if (value == null)
                    return null;

                System.ComponentModel.NullableConverter nullableConverter = new System.ComponentModel.NullableConverter(conversionType);
                conversionType = nullableConverter.UnderlyingType;
            }
            return Convert.ChangeType(value, conversionType);
        }


        private static bool IsNullOrDBNull(object obj)
        {
            return (obj == null || (obj is DBNull)) ? true : false;
        }



        //取得DB的列对应bean的属性名   

        private static string GetPropertyName(string column)
        {

            column = column.ToLower();

            string[] narr = column.Split('_');

            column = "";

            for (int i = 0; i < narr.Length; i++)
            {

                if (narr[i].Length > 1)
                {

                    column += narr[i].Substring(0, 1).ToUpper() + narr[i].Substring(1);

                }

                else
                {

                    column += narr[i].Substring(0, 1).ToUpper();

                }

            }

            return column;

        }

        /// <summary>
        /// 写入方向
        /// <para>周榆淇 2012-6-28</para>
        /// </summary>
        /// <param name="sqlParameter"></param>
        /// <param name="parName">参数名</param>
        /// <param name="direction">方向</param>
        public static void SetDirection(this SqlParameter[] sqlParameters, string parName, ParameterDirection direction)
        {
            sqlParameters.Where(d => d.ParameterName == parName).ToArray()[0].Direction = direction;
        }


        /// <summary>
        /// 获取值
        /// </summary>
        /// <param name="sqlParameters"></param>
        /// <param name="parName">参数名</param>
        /// <returns>value值</returns>
        public static Object GetValue(this SqlParameter[] sqlParameters, string parName)
        {
            return sqlParameters.Where(d => d.ParameterName == parName).ToArray()[0].Value;
        }

    }
}
