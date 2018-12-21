using System;
using System.Collections.Generic;

namespace BakeryAPI.Models
{
    public partial class PaymentRole
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal? Payment { get; set; }
    }
}
