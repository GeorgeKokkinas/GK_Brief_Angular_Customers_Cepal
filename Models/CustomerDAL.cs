using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace GK_Brief_Angular_Customers_Cepal.Models
{
    public class CustomerDAL
    {
        Cepal_BriefDBContext db = new Cepal_BriefDBContext();

        public IEnumerable<Customer> GetAllCustomers()
        {
            try
            {
                return db.Customers.ToList();
            }
            catch
            {
                throw;
            }
        }

        public int AddCustomer(Customer customer)
        {
            try
            {
                db.Customers.Add(customer);
                db.SaveChanges();
                return customer.id;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateCustomer(Customer customer)
        {
            try
            {
                db.Entry(customer).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        //Get the details of a particular customer
        public Customer GetCustomerByID(int id)
        {
            try
            {
                Customer customer = db.Customers.Find(id);
                return customer;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteCustomer(int id)
        {
            try
            {
                Customer customer = GetCustomerByID(id);
                db.Customers.Remove(customer);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

    }
}

