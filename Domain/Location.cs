using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Location
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string LocationName { get; set; }
        
        [Required]
        public DateTime CreationDate { get; set; } = DateTime.Now;
        
    }
}