import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AuctionList = () => {
    const { categoryId } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`/api/item/category/${categoryId}`);
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [categoryId]);

    return (
        <div>
            <h2>Items for Category {categoryId}</h2>
            {items.map((item) => (
                <div key={item.ItemId}>
                    <h3>{item.Name}</h3>
                    <p>{item.Description}</p>
                    {/* Render other item details */}
                </div>
            ))}
        </div>
    );
};

export default AuctionList;
