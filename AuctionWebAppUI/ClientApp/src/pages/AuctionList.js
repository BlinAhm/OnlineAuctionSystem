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

    async function getItems() {
        await fetch("http://localhost:8001/api/Item/category/" + categoryName, {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
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

        await fetch("http://localhost:8001/api/Auction/item", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemIds: arr
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data);
            setAuctions(data);
        });
    }

    return (
        <>
            <h2 className="auction_list_title">Auctions for {categoryName}</h2>
            <div className="auction_container">
                <Link to="#" className="auction_card">
                    <div className="auction_image">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" alt="Item" />
                    </div>
                    <div className="auction_details">
                        <div className="texts">
                            <h3>Title</h3>
                            <p>Description</p>
                        </div>
                        <div className="bid">
                            <h4>Current bid:</h4>
                            <p>45 $</p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default AuctionList;
