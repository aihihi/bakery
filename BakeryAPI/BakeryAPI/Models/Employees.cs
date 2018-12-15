using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace BakeryAPI.Models
{
    public partial class Employees
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string MobilePhone { get; set; }
        public string Address { get; set; }
        public DateTime? JoinedDate { get; set; }
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        public DateTime? Birthday { get; set; }
        public string Note { get; set; }
    }
}
