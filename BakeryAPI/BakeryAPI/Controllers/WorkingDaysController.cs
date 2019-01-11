using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BakeryAPI.Models;
using Microsoft.AspNetCore.Authorization;


namespace BakeryAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkingDaysController : ControllerBase
    {
        private readonly BakeryDbContext _context;

        public WorkingDaysController(BakeryDbContext context)
        {
            _context = context;
        }

        // GET: api/WorkingDays
        [HttpGet]
        public IEnumerable<Object> GetWorkingDay()
        {
            var res = (from working in _context.WorkingDay
                       join stores in _context.Stores on working.StoreId equals stores.Id
                       join employees in _context.Employees on working.EmployeeId equals employees.Id
                       select new
                       {
                           working.Id,
                           employee = employees.FullName,
                           store = stores.Name,
                           workingDay = working.StartTime,
                           working.StartTime,
                           working.EndTime,
                           working.Note,
                           working.EmployeeId,
                           working.StoreId,
                       })
                       .OrderBy(x => x.StartTime);
            return res;
        }

        // GET: api/WorkingDays/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkingDay([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var workingDay = await _context.WorkingDay.FindAsync(id);

            if (workingDay == null)
            {
                return NotFound();
            }

            return Ok(workingDay);
        }

        // PUT: api/WorkingDays/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkingDay([FromRoute] Guid id, [FromBody] WorkingDay workingDay)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != workingDay.Id)
            {
                return BadRequest();
            }

            _context.Entry(workingDay).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkingDayExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/WorkingDays
        [HttpPost]
        public async Task<IActionResult> PostWorkingDay([FromBody] WorkingDay workingDay)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Guid id = Guid.NewGuid();
            workingDay.Id = id;
            _context.WorkingDay.Add(workingDay);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (WorkingDayExists(workingDay.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetWorkingDay", new { id = workingDay.Id }, workingDay);
        }

        // DELETE: api/WorkingDays/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkingDay([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var workingDay = await _context.WorkingDay.FindAsync(id);
            if (workingDay == null)
            {
                return NotFound();
            }

            _context.WorkingDay.Remove(workingDay);
            await _context.SaveChangesAsync();

            return Ok(workingDay);
        }

        private bool WorkingDayExists(Guid id)
        {
            return _context.WorkingDay.Any(e => e.Id == id);
        }
    }
}