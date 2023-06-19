import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./css/AuctionList.css";

const AuctionList = () => {
    const { categoryName } = useParams();
    const [auctions, setAuctions] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItems();
    }, []);

    function getDescription(id) {
        var description;

        items?.forEach((key) => {
            if (key.itemId === id) {
                description = key.description;
            }
        });
        return description;
    }

    async function getItems() {
        await fetch("http://localhost:8001/api/Item/category/" + categoryName, {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setItems(data);

            var itemIds;
            function getItemIds() {
                var arr = [];
                var i = 0;
                data.forEach((element) => {
                    arr[i++] = element.itemId;
                });

                itemIds = arr;
            };
            getItemIds();
            getAuctions(itemIds);
        });
    }

    async function getAuctions(arr) {
        var joinedArr = arr.join(",");
        await fetch("http://localhost:8001/api/Auction/item", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                joinedArr
            )
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setAuctions(data);
        });
    }

    return (
        <>
            <h2 className="auction_list_title">Auctions for {categoryName}</h2>
            <div className="auction_container">
                {auctions?.map((key) => (
                    <Link key={key.id} to={"/auction/" + key.id} className="auction_card">
                        <div className="auction_image">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" alt="Item" />
                        </div>
                        <div className="auction_details">
                            <div className="texts">
                                <h3>{key.title}</h3>
                                <p>{getDescription(key.itemId)}</p>
                            </div>
                            <div className="bid">
                                <h4>Current bid:</h4>
                                <p>{key.currentBid === null ? "No bids" : key.currentBid?.bidAmount + " $"}</p>
                                {key.hasEnded ? (<p style={{ color: "red" }}>Auction has ended.</p>) : ""}
                            </div>
                        </div>
                    </Link>
                )) ?? ""}

            </div>
        </>
    );
};

export default AuctionList;
