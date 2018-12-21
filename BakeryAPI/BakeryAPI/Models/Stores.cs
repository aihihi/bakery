using System;
using System.Collections.Generic;

namespace BakeryAPI.Models
{
    public partial class Stores
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime? FirstOpenedDate { get; set; }
        public string Address { get; set; }
        public Guid? StoreLeader { get; set; }
        public Guid? StoreLeader2 { get; set; }
        public string Note { get; set; }
    }
}
