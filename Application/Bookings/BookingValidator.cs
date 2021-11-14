using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Bookings
{
    public class BookingValidator : AbstractValidator<Booking>
    {
            public BookingValidator()
            {
                RuleFor(x => x.FirstName).NotEmpty();
                RuleFor(x => x.LastName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.TestType).NotEmpty();
                RuleFor(x => x.LocationId).NotEmpty();
                RuleFor(x => x.TestDate).NotEmpty();
                RuleFor(x => x.BookingStatus).NotEmpty();
                RuleFor(x => x.BookingDate).NotEmpty();
            }
        
    }
}