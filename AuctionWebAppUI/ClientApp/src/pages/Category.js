import { Link } from 'react-router-dom';
import "./css/CategoryPage.css";
const CategoryCard = (props) => {

    return (
        <Link to="/category/clothes" className="category-card">
            <div className="category-image">
                <img src="https://images.summitmedia-digital.com/esquiremagph/images/2021/03/03/cul-de-sac-the-podium.jpg" alt="img" />
                </div>
            <div className="category-details">
                <h2>Clothes, Shoes</h2>
            </div>
        </Link>
    );

}
const Category = () => {


    return (
        <div className="category-container">
            <h2>Categories</h2>
            <p>Choose an item category to bid!</p>
            <div className="category-holder">
                <CategoryCard />
            </div>
        </div>
    );

}

export default Category;

