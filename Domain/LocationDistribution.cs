using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class LocationDistribution
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid LocationId { get; set; }

        [Required]
        public Location Location { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime TestDate { get; set; }

        [Required]
        public int AvailableSlots { get; set; }

        [Required]
        public DateTime CreationDate { get; set; } = DateTime.Now;

    }
}