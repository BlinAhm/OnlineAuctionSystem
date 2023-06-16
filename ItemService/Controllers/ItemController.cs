using ItemService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace ItemService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IMongoCollection<Item> _itemCollection;
        public ItemController()
        {
            var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
            var dbName = Environment.GetEnvironmentVariable("DB_NAME");
            var connectionString = $"mongodb://{dbHost}:27017/{dbName}";

            var mongoUrl = MongoUrl.Create(connectionString);
            var mongoClient = new MongoClient(mongoUrl);
            var database = mongoClient.GetDatabase(mongoUrl.DatabaseName);
            _itemCollection = database.GetCollection<Item>("item");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            return await _itemCollection.Find(Builders<Item>.Filter.Empty).ToListAsync();
        }

        [HttpGet("{itemId}")]
        public async Task<ActionResult<Item>> GetById(string itemId)
        {
            var filterDefinition = Builders<Item>.Filter.Eq(x => x.ItemId, itemId);
            return await _itemCollection.Find(filterDefinition).SingleOrDefaultAsync();
        }

        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItemsByCategory(string categoryName)
        {
            var filterDefinition = Builders<Item>.Filter.Eq(x => x.CategoryName, categoryName);
            return await _itemCollection.Find(filterDefinition).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<string>> Create(Item item)
        {
            await _itemCollection.InsertOneAsync(item);
            return Ok(item.ItemId);

        }

        [HttpPut]

        public async Task<ActionResult> Update(Item item)
        {
            var filterDefinition = Builders<Item>.Filter.Eq(x => x.ItemId, item.ItemId);
            await _itemCollection.ReplaceOneAsync(filterDefinition, item);
            return Ok();
        }

        [HttpDelete("{itemId}")]
        public async Task<ActionResult> Delete(string itemId)
        {
            var filter = Builders<Item>.Filter.Eq(x => x.ItemId, itemId);
            var result = await _itemCollection.DeleteOneAsync(filter);
            return Ok();
        }
    }
}