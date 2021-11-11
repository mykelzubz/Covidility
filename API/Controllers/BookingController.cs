using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Bookings;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IMediator _mediator;
        public BookingController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Booking>>> GetBookings()
        {
            return HandleResult(await _mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooking(Guid id)
        {
            return HandleResult(await _mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking(Booking booking)
        {
            return HandleResult(await _mediator.Send(new Create.Command { Booking = booking }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBooking(Guid id, Booking booking)
        {
            booking.Id = id;

            return HandleResult(await _mediator.Send(new Edit.Command { Booking = booking }));
        }

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();

            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);

        }
    }
}