import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./css/AuctionList.css";

const AuctionList = () => {
    const { categoryName } = useParams();
    const [auctionItems, setAuctionItems] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:18006/api/Item/category/${categoryName}`)
            .then((response) => response.json())
            .then((data) => {
                setAuctionItems(data);

                // Fetch auctions based on item IDs
                const itemIds = data.map((item) => item.itemId);
                fetchAuctionsByItemIds(itemIds);
            })
            .catch((error) => console.log(error));
    }, [categoryName]);

    const fetchAuctionsByItemIds = (itemIds) => {
        fetch(`/api/auctions`)
            .then((response) => response.json())
            .then((data) => {
                // Filter auctions by item ID
                const filteredAuctions = data.filter((auction) => itemIds.includes(auction.itemId));

                // Update the auction items with the fetched auctions
                const updatedAuctionItems = auctionItems.map((item) => {
                    const auction = filteredAuctions.find((auction) => auction.itemId === item.itemId);
                    return {
                        ...item,
                        auctionId: auction ? auction.id : null,
                    };
                });
                setAuctionItems(updatedAuctionItems);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="auction-list-container">
            <h2>Auctions for {categoryName}</h2>
            <div className="auction-items-container">
                {auctionItems.map((item) => (
                    <Link key={item.itemId} to={`/auction/${item.auctionId}`} className="auction-item-card">
                        <div className="item-image">
                            <img src={item.image} alt="Item" />
                        </div>
                        <div className="item-details">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AuctionList;
