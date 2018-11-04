using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Agenda.Models
{
    public class EmpleadoDB
    {

        //declarar la cadena de conection
        string cs = ConfigurationManager.ConnectionStrings["pruebaEntities"].ConnectionString;

        //Return list of all Employees  
        public List<Empleados> ListAll()
        {
            List<Empleados> lst = new List<Empleados>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("SelectEmployee", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                try
                {
                    while (rdr.Read())
                    {
                        lst.Add(new Empleados
                        {
                            EmployeeId = Convert.ToInt32(rdr["EmployeeID"]),
                            Name = rdr["Name"].ToString(),
                            Salary = Convert.ToInt32(rdr["Salary"]),
                            Office = rdr["Office"].ToString(),
                            Position = rdr["Position"].ToString(),
                        });
                    }
                }
                catch (Exception ex) {

                }
              
                return lst;
            }
        }

        //Method for Adding an Employee  
        public int Add(Empleados emp)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateEmployee", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", emp.EmployeeId);
                com.Parameters.AddWithValue("@Name", emp.Name);
                com.Parameters.AddWithValue("@Position", emp.Position);
                com.Parameters.AddWithValue("@Office", emp.Office);
                com.Parameters.AddWithValue("@Salary", Convert.ToInt32(emp.Salary));
                com.Parameters.AddWithValue("@Action", "Insert");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Method for Updating Employee record  
        public int Update(Empleados emp)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdateEmployee", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", emp.EmployeeId);
                com.Parameters.AddWithValue("@Name", emp.Name);
                com.Parameters.AddWithValue("@Position", emp.Position);
                com.Parameters.AddWithValue("@Office", emp.Office);
                com.Parameters.AddWithValue("@Salary", Convert.ToInt32(emp.Salary));
                com.Parameters.AddWithValue("@Action", "Update");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Method for Deleting an Employee  
        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeleteEmployee", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}