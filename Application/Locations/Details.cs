using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Locations
{
    public class Details
    {
        public class Query : IRequest<Result<Location>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Location>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Location>> Handle(Query request, CancellationToken cancellationToken)
            {
                var location = await _context.Locations.FindAsync(request.Id);

                return Result<Location>.Success(location);
            }
        }
        
    }
}