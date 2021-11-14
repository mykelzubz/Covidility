using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Locations
{
    public class LocationValidator : AbstractValidator<Location>
    {
            public LocationValidator()
            {
                RuleFor(x => x.LocationName).NotEmpty();
            }
        
    }
}