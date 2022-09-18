using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Configuration;

namespace GK_Brief_Angular_Customers_Cepal.Models
{
    public partial class Customer
    {
        public int id { get; set; }

        [Required(ErrorMessage ="Υποχρεωτικό πεδίο")]
        public string name { get; set; }
        
        [Required(ErrorMessage = "Υποχρεωτικό πεδίο")]
        public string surname { get; set; }
        
        [Required(ErrorMessage = "Υποχρεωτικό πεδίο")] 
        [StringLength(10)]
        public string phonenum { get; set; }

        [Required(ErrorMessage = "Υποχρεωτικό πεδίο")] 
        public string address { get; set; }
        
        [Required(ErrorMessage = "Υποχρεωτικό πεδίο")]
        [EmailAddress]
        public string email { get; set; }
    }
}
