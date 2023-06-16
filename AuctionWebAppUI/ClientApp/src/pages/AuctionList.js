import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./css/AuctionList.css";

const AuctionList = () => {
    const { categoryName } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`http://localhost:3000/category/${categoryName}`);
                console.log(categoryName);
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [categoryName]);

    return (
        <div>
            <h2>Items for Category {categoryName}</h2>
            <div className="card-list">
                {items.map((item) => (
                    <div key={item.itemId} className="card">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        {/* Render other item details */}
                        <Link to={`/auction/${item.itemId}`}>Place a Bid</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuctionList;