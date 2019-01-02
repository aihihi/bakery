using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using BakeryAPI.Models;
using System.Globalization;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;


namespace BakeryAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly BakeryDbContext _context;

        public EmployeesController(BakeryDbContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public IEnumerable<Employees> GetEmployees()
        {
            return _context.Employees;
        }

        // GET: api/Employees/5
        [HttpGet("perStore/{id}")]
        public async Task<IActionResult> PerStore([FromRoute] Guid id)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            var employees =  await _context.Employees.Where(emp => emp.WorkingForStore == id).ToListAsync();
            //var employees = await _context.Employees.FindAsync(id);

            if (employees == null)
            {
                return NotFound();
            }

            return Ok(employees);
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployees([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employees = await _context.Employees.FindAsync(id);

            if (employees == null)
            {
                return NotFound();
            }

            return Ok(employees);
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployees([FromRoute] Guid id, [FromBody] Employees employees)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employees.Id)
            {
                return BadRequest();
            }

            _context.Entry(employees).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(employees);


            //return NoContent();
        }

        // POST: api/Employees
        [HttpPost]
        public async Task<IActionResult> PostEmployees([FromBody] Employees employees)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Guid id = Guid.NewGuid();
            employees.Id = id;
            _context.Employees.Add(employees);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EmployeesExists(employees.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEmployees", new { id = employees.Id }, employees);
        }

        // POST: api/Employees
        [HttpPost("multipleUpdateWorkingFor")]
        //public async Task<IActionResult> multipleUpdateWorkingFor([FromBody] List<Guid> employeeIds)
        //public async Task<IActionResult> multipleUpdateWorkingFor(Guid storeId, List<Guid> employeeIds)
        public async Task<IActionResult> multipleUpdateWorkingFor(EmployeeWorkingFor info)
        {

            var storeId = info.StoreId;
            var employeeIds = info.EmployeeIds;
            foreach(var eId in employeeIds)
            {
                var employee = _context.Employees.Where(emp => emp.Id == eId).FirstOrDefault();
                if (employee != null)
                {
                    employee.WorkingForStore = storeId;
                    _context.Employees.Update(employee);
                    _context.SaveChanges();
                }
            }
            return Ok();
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployees([FromRoute] Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employees = await _context.Employees.FindAsync(id);
            if (employees == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employees);
            await _context.SaveChangesAsync();

            return Ok(employees);
        }

        private bool EmployeesExists(Guid id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}