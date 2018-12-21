using System;
using System.Collections.Generic;

namespace BakeryAPI.Models
{
    public partial class WorkingDay
    {
        public Guid Id { get; set; }
        public Guid? EmployeeId { get; set; }
        public Guid? StoreId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string Note { get; set; }
    }
}
