using ItemService.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ItemService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMongoCollection<Category> _categoryCollection;

        public CategoryController(IMongoDatabase database)
        {
            _categoryCollection = database.GetCollection<Category>("categories");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllCategories()
        {
            var categories = await _categoryCollection.Find(_ => true).ToListAsync();
            return Ok(categories);
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory(Category category)
        {
            await _categoryCollection.InsertOneAsync(category);
            return Ok();
        }

        [HttpDelete("{categoryId}")]
        public async Task<IActionResult> DeleteCategory(string categoryId)
        {
            var filter = Builders<Category>.Filter.Eq("_id", categoryId);
            var result = await _categoryCollection.DeleteOneAsync(filter);

            if (result.DeletedCount == 0)
                return NotFound();

            return Ok();
        }
    }
}
