using System;
using System.Collections.Generic;

namespace BakeryAPI.Models
{
    public partial class EmployeeWorkingFor
    {
        public Guid StoreId { get; set; }
        public List<Guid> EmployeeIds { get; set; }
    }
}
