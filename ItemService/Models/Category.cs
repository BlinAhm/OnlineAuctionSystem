using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ItemService.Models
{
    [Serializable, BsonIgnoreExtraElements]
    public class Category
    {
        [BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string CategoryId { get; set; }

        [BsonElement("category_name"), BsonRepresentation(BsonType.String)]
        public string CategoryName { get; set; }

        [BsonElement("image_link"), BsonRepresentation(BsonType.String)]
        public string ImageLink { get; set; }
    }
}
