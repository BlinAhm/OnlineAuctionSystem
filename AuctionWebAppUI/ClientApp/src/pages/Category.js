
import React, { useState } from 'react';
    //import { Link } from 'react-router-dom';
    import './css/CategoryPage.css'; 


const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        {
            id: 1,
            title: "Autographed Items",
            image: "https://images.pexels.com/photos/257970/pexels-photo-257970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
            id: 2,
            title: "Beauty/Jewelry",
            image: "https://images.pexels.com/photos/1616096/pexels-photo-1616096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/300x200",
        },
        {
            id: 3,
            title: "Fine Art",
            image: "https://images.pexels.com/photos/989917/pexels-photo-989917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/300x200",
        },
        {
            id: 4,
            title: "Antique Timepieces",
            image: "https://images.pexels.com/photos/179911/pexels-photo-179911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/600x500",
        },
        {
            id: 5,
            title: "Rare Coins",
            image: "https://images.pexels.com/photos/325154/pexels-photo-325154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/600x500",
        },
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
            <p>Explore our wide range of opportunities and discover exciting possibilities. Whether you're searching for autographed items, beauty and jewelry, fine art, antique timepieces, or rare coins, we have something special for everyone. Browse through our carefully curated categories and indulge in the thrill of finding unique treasures.</p>
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

