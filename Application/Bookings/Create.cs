using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Bookings
{
    public class Create
    {
        public class Command : IRequest
        {
            public Booking Booking { get; set; }
        }

        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Bookings.Add(request.Booking);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}