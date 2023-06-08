using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ItemService.Models
{
    [Serializable, BsonIgnoreExtraElements]
    public class Item
    {
        [BsonId , BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string ItemId { get; set; }

        [BsonElement("_title"), BsonRepresentation(BsonType.String)]
        public string Title { get; set; }

        [BsonElement("_description"), BsonRepresentation(BsonType.String)]
        public string Description { get; set; }

        [BsonElement("_startingprice"), BsonRepresentation(BsonType.Int64)]
        public int Price { get; set; }

        [BsonElement("_category"), BsonRepresentation(BsonType.String)]
        public string Category { get; set; }

        [BsonElement("_starttime"), BsonRepresentation(BsonType.DateTime)]
        public DateTime StartTime { get; set; }

        [BsonElement("_endtime"), BsonRepresentation(BsonType.DateTime)]

        public DateTime EndTime { get; set; }



    }
}
