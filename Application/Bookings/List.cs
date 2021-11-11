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
    public class List
    {
        public class Query : IRequest<Result<List<Booking>>>{}

        public class Handler : IRequestHandler<Query, Result<List<Booking>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Booking>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Booking>>.Success( await _context.Bookings.ToListAsync());
            }
        }
    }
}