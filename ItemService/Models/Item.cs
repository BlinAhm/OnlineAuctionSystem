using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ItemService.Models
{
    [Serializable, BsonIgnoreExtraElements]
    public class Item
    {
        [BsonId , BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string ItemId { get; set; }

        [BsonElement("_name"), BsonRepresentation(BsonType.String)]
        public string Name { get; set; }

        [BsonElement("_description"), BsonRepresentation(BsonType.String)]
        public string Description { get; set; }

        [BsonElement("_condition"), BsonRepresentation(BsonType.String)]
        public string Condition { get; set; }

        [BsonElement("_baseprice"), BsonRepresentation(BsonType.Int64)]
        public int Price { get; set; }

        [BsonElement("_category")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string CategoryId { get; set; } // Foreign key referencing Category


    }
}   
