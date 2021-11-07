using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Booking
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string TestType { get; set; }
        public string Location { get; set; }
        public DateTime TestDate { get; set; }
        public string Result { get; set; }
        public string BookingStatus { get; set; }
        public DateTime BookingDate { get; set; }
    }
}