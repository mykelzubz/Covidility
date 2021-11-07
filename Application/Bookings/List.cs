using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Bookings
{
    public class List
    {
        public class Query : IRequest<List<Booking>>{}

        public class Handler : IRequestHandler<Query, List<Booking>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Booking>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Bookings.ToListAsync();
            }
        }
    }
}