using GK_Brief_Angular_Customers_Cepal.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace GK_Brief_Angular_Customers_Cepal.Controllers
{
    [ApiController]
    //[Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        CustomerDAL objcustomer = new CustomerDAL();

        public CustomerController()
        {

        }
        
        [HttpGet]
        [Route("api/customer/Index")]
        public IEnumerable<Customer> Index()
        {
            return objcustomer.GetAllCustomers();
        }

        [HttpPost]
        [Route("api/customer/Create")]
        public int Create([FromBody] Customer customer)
        {
            try
            {
                ValidateCustomer(customer);
                return objcustomer.AddCustomer(customer);
            }
            catch
            { throw; }
        }

        [HttpGet]
        [Route("api/customer/Details/{id}")]
        public Customer Details(int id)
        {
            return objcustomer.GetCustomerByID(id);
        }

        [HttpPut]
        [Route("api/customer/Edit")]
        public int Edit([FromBody] Customer customer)
        {
            try
            {
                ValidateCustomer(customer);
                return objcustomer.UpdateCustomer(customer);
            }
            catch
            { throw; }
        }

        [HttpGet]
        [Route("api/customer/Delete/{id}")]
        public int Delete(int id)
        {
            return objcustomer.DeleteCustomer(id);
        }

        private void ValidateCustomer(Customer customer)
        {
            if (!ValidNames(customer.name))
                throw (new Exception("Όνομα - Επιτρεπτοί χαρακτήρες : Μόνο γράμματα"));

            if (!ValidNames(customer.surname))
                throw (new Exception("Επώνυμο - Επιτρεπτοί χαρακτήρες : Μόνο γράμματα"));

            if (!Int64.TryParse("6944305050", out Int64 a) || customer.phonenum.Length != 10)
                throw (new Exception("Τηλέφωνο - Επιτρέπονται μόνο 10 ψηφία"));

            //W3C email validation
            if (!Regex.IsMatch(customer.email, "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"))
                throw (new Exception("Email - Δώσατε λάθος email"));
        }

        private Boolean ValidNames(string str)
        {
            Boolean ret = true;

            if (str == null || str == "")
                ret = false;
            else
            {
                for (byte i = 0; i < 10; i++)
                {
                    if (ret)
                    {
                        if (str.Contains(i.ToString()))
                            ret = false;
                    }
                    else break;
                }

                if (ret)
                {
                    string[] pat = { "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+", "[",
                    "{", "]", "}", ";", ":", "" + (char)34, "\\", "|", ",", "<", ">", "/", "?"};

                    for (byte i = 0; i < pat.Length; i++)
                    {
                        if (ret)
                        {
                            if (str.Contains(pat[i]))
                                ret = false;
                        }
                        else break;
                    }
                }
            }

            return ret;
        }
    }
}