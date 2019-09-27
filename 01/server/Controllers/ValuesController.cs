using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{

  public class PostValueRequest
  {
    public string Value { get; set; }
  }

  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class ValuesController : ControllerBase
  {
    // GET api/values
    [HttpGet]
    public ActionResult<IEnumerable<string>> Get()
    {
      var username = User.Claims.Single(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

      return new string[] { "value1", "value2" };
    }

    // GET api/values/5
    [HttpGet("{id}")]
    public ActionResult<string> Get(int id)
    {
      return "value";
    }

    // POST api/values
    [HttpPost]
    public IActionResult Post(PostValueRequest request)
    {
      System.Threading.Thread.Sleep(2000); // Simulate network latency

      if (request.Value == "foo")
      {
        return Ok();
      }
      else
      {
        return BadRequest();
      } 
    }

    // PUT api/values/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/values/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
