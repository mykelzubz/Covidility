using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Booking
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string FirstName { get; set; }
        
        [Required]
        public string LastName { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string TestType { get; set; }
        
        public Location Location { get; set; }

        [Required]
        public Guid LocationId { get; set; }
        
        [Required]        
        [Column(TypeName = "date")]
        public DateTime TestDate { get; set; }
        public string Result { get; set; }
        
        [Required]
        public string BookingStatus { get; set; } = "PENDING";
        
        [Required]
        public DateTime BookingDate { get; set; } = DateTime.Now;
    }
}