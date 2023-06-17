import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./css/CategoryPage.css";
const CategoryCard = (props) => {

    return (
        <Link key={props.category?.id} to={":"+props.category?.categoryName} className="category-card">
            <div className="category-image">
                <img src={props.category?.imageLink} alt="img" />
            </div>
            <div className="category-details">
                <h2>{props.category?.categoryName}</h2>
            </div>
        </Link>
    );

}
const Category = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    async function getCategories() {
        await fetch("http://localhost:8001/api/Category", {
            method: "GET",
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setCategories(data);
        });
    }

    return (
        <div className="category-container">
            <h2>Categories</h2>
            <p>Choose an item category to bid!</p>
            <div className="category_holder">
                {categories?.map((category) => (
                    <CategoryCard category={category} />
                )) ?? ""}
            </div>
        </div>
    );

}

export default Category;
