
import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import './css/CategoryPage.css'; 


const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        {
            id: 1,
            title: "Clothes, Shoes",
            image: "https://thumbs.dreamstime.com/b/lululemon-hong-kong-china-january-clothes-display-store-new-town-plaza-shopping-mall-centre-sha-tin-174392453.jpg",
        },
        {
            id: 2,
            title: "Movies&DVD",
            image: "https://media.karousell.com/media/photos/products/2023/4/23/46_dvd_movies_for_sale_as_one__1682217662_aa0f9579_progressive.jpg",
        },
        {
            id: 3,
            title: "Toys&Hobbies",
            image: "https://resalvaged.com/wp-content/uploads/2021/01/hummel-figurines.jpeg",
        }
    ];

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleCategoryMouseLeave = () => {
        setSelectedCategory(null);
    };

    return (
        <div className="categories">
            <h2>Categories</h2>
            <p>Choose an item category to bid!</p>
            <div className="categories-container">
                {categories.slice(0, 3).map((category) => (
                    <div
                        key={category.id}
                        className="category"
                        onMouseEnter={() => handleCategoryClick(category.id)}
                        onMouseLeave={handleCategoryMouseLeave}
                    >
                        <div className="category-image">
                            <img src={category.image} alt={category.title} />
                        </div>
                        <div className={`category-overlay ${selectedCategory === category.id ? 'active' : ''}`}>
                            <h3>{category.title}</h3>
                            <button>View More</button>
                        </div>
                    </div>
                ))}
                </div>
            <div className="categories-container">
                {categories.slice(3, 5).map((category) => (
                    <div
                        key={category.id}
                        className="category"
                        onMouseEnter={() => handleCategoryClick(category.id)}
                        onMouseLeave={handleCategoryMouseLeave}
                    >
                        <div className="category-image">
                            <img src={category.image} alt={category.title} />
                        </div>
                        <div className={`category-overlay ${selectedCategory === category.id ? 'active' : ''}`}>
                            <h3>{category.title}</h3>
                            <Link to={`/category/${category.title}`}>
                                View More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            </div>
    );
};

export default Category;

