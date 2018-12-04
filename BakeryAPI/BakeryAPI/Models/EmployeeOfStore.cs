using System;
using System.Collections.Generic;

namespace BakeryAPI.Models
{
    public partial class EmployeeOfStore
    {
        public Guid StoreId { get; set; }
        public Guid EmployeeId { get; set; }
    }
}
