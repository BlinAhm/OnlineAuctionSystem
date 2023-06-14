using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ItemService.Models
{
    [Serializable, BsonIgnoreExtraElements]
    public class Category
    {
        [BsonId , BsonElement("category_id"), BsonRepresentation(BsonType.ObjectId)]
        public int CategoryId { get; set; }

        [BsonElement("category_name"), BsonRepresentation(BsonType.String)]
        public string CategoryName { get; set; }

    }
}
