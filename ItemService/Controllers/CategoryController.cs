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

        public CategoryController()
        {
            var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
            var dbName = Environment.GetEnvironmentVariable("DB_NAME");
            var connectionString = $"mongodb://{dbHost}:27017/{dbName}";

            var mongoUrl = MongoUrl.Create(connectionString);
            var mongoClient = new MongoClient(mongoUrl);
            var database = mongoClient.GetDatabase(mongoUrl.DatabaseName);
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

        [HttpPost("insert-default")]
        public async Task<IActionResult> AddDefaultCategories()
        {
            var categoriesGet = await _categoryCollection.Find(_ => true).ToListAsync();
            if (categoriesGet.Count < 1)
            {
                List<Category> categories = new List<Category>
                {
                    new Category() { CategoryId = "", CategoryName = "Accessories", ImageLink = "https://c0.wallpaperflare.com/preview/354/969/251/jewelry-flatlay-watch-makeup.jpg" },
                    new Category() { CategoryId = "", CategoryName = "Electronics", ImageLink = "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pYyUyMGRldmljZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80" },
                    new Category() { CategoryId = "", CategoryName = "Sports", ImageLink = "https://media.istockphoto.com/id/1188462138/photo/variety-of-sport-accessories-on-wooden-surface.webp?b=1&s=170667a&w=0&k=20&c=72yFnF5oYVdDL7x1E3_uSm2sIcv8JDY4bb_qBKuZkIo=" },
                    new Category() { CategoryId = "", CategoryName = "Hobbies", ImageLink = "https://e1.pxfuel.com/desktop-wallpaper/643/957/desktop-wallpaper-rocketfin-hobbies-on-model-cars.jpg" },
                    new Category() { CategoryId = "", CategoryName = "Auto", ImageLink = "https://wallpaperaccess.com/full/8600972.jpg" },
                    new Category() { CategoryId = "", CategoryName = "Home & Household", ImageLink = "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvbWUlMjBkZWNvcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" },
                    new Category() { CategoryId = "", CategoryName = "Art", ImageLink = "https://m.media-amazon.com/images/I/51aFqHPRikL._AC_SY1000_.jpg" },
                    new Category() { CategoryId = "", CategoryName = "Fashion", ImageLink = "https://images.summitmedia-digital.com/esquiremagph/images/2021/03/03/cul-de-sac-the-podium.jpg" }
                };
                foreach (Category category in categories)
                {
                    await _categoryCollection.InsertOneAsync(category);
                }
            }

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
