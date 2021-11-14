using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Bookings
{
    public class Details
    {
        public class Query : IRequest<Result<Booking>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Booking>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Booking>> Handle(Query request, CancellationToken cancellationToken)
            {
                var booking = await _context.Bookings
                                        .Include(x => x.Location)
                                        .FirstOrDefaultAsync(p => p.Id == request.Id);

                return Result<Booking>.Success(booking);
            }
        }
    }
}