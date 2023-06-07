
import React, { useState, useEffect } from 'react';
/*import Navbar from '../components/NavBar';
import Footer from '../components/Footer';*/

import './css/Home.css';


const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [{ imageUrl: " https://images.pexels.com/photos/3720778/pexels-photo-3720778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "An empire of collections", subtitle: "The force is strong with these unique items.", },
        { imageUrl: "https://s1.eestatic.com/2019/05/16/cultura/jeff_koons-arte-escultura_398971078_122970134_1706x960.jpg", title: "An empire of collections", subtitle: "The force is strong with these unique items.", },
        { imageUrl: "https://images.pexels.com/photos/5442454/pexels-photo-5442454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "An empire of collections", subtitle: "The force is strong with these unique items.", },];
   
    const [intervalId, setIntervalId] = useState(null); // add this

    useEffect(() => {
        const id = setInterval(() => {
            setCurrentSlide((currentSlide) =>
                currentSlide === slides.length - 1 ? 0 : currentSlide + 1
            );
        }, 4000);
        setIntervalId(id); // add this
        return () => clearInterval(id);
    }, [slides.length]);

    const handleSlideHover = () => {
        clearInterval(intervalId);
    };

    const handleSlideLeave = () => {
        const id = setInterval(() => {
            setCurrentSlide((currentSlide) =>
                currentSlide === slides.length - 1 ? 0 : currentSlide + 1
            );
        }, 3000);
        setIntervalId(id);
    };

    return (
        <div
            className="slider"
            style={{
                backgroundImage: `url(${slides[currentSlide].imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "500px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
            }}
            onMouseEnter={handleSlideHover}
            onMouseLeave={handleSlideLeave}
        >
            <h2
                style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#fff",
                }}
            >
                {slides[currentSlide].title}
            </h2>
            <p
                style={{
                    fontSize: "20px",
                    fontWeight: "normal",
                    color: "#fff",
                }}
            >
                {slides[currentSlide].subtitle}
            </p>
        </div>
    );
}; const AboutUs = () => {
    return (
        <div className="about-us">
            <h2>About Us</h2>
            <div className="photos-container">
                <div className="photo">
                    <img src="https://www.insidenetwork.com/wp-content/uploads/2020/11/how-to-win-online-auctions-scaled.jpg" alt="person1" />
                </div>
                <div className="photo">
                    <img src="https://www.mashvisor.com/blog/wp-content/uploads/2019/06/Online-Real-Estate-Auctions-768x512.jpg" alt="person2" />
                </div>
                <div className="photo">
                    <img src="https://internationalauctionllc.com/wp-content/uploads/2020/07/couple-1024x683.jpeg" alt="person3" />
                </div>
                <div className="photo">
                    <img src="https://gazette-eu-west2.azureedge.net/media/48486/how-bid-live-01.jpg?width=696&mode=max&bgcolor=fff&updated=05%2F16%2F2022+13%3A18%3A36" alt="person4" />
                </div>
            </div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac quam
                quis libero hendrerit varius quis non urna. In vestibulum elit et elit
                auctor, eget congue sapien lobortis. Donec eget massa est. Nam non
                risus et ante placerat euismod vel vel nisi. Donec consectetur ac nunc
                quis faucibus. Suspendisse potenti. Etiam dapibus ex sed enim laoreet,
                ac luctus nibh dapibus. Donec vitae risus sed libero posuere
                ullamcorper. Fusce pellentesque nulla eget massa facilisis, ac dapibus
                arcu suscipit. Morbi quis velit vitae metus aliquam egestas sed vel
                velit. In hac habitasse platea dictumst. Fusce venenatis velit eu
                neque tincidunt facilisis. Aliquam venenatis, sapien a semper viverra,
                est orci ornare ipsum, sit amet tincidunt justo eros at lorem.
            </p>
        </div>
    );
};

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        {
            id: 1,
            title: "Autographed Items",
            image: "https://images.squarespace-cdn.com/content/v1/5361973ee4b0482b3e2dd960/1600357918740-G0DTVRA0YK0MOUE7IDDZ/IMG_8432b.jpg?format=1000w/300x200",
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
                            <button>View More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const Home = () => {
    return (
        <>
            <Slider />
            <AboutUs />
            <Categories />
        </>
    );
};

export default Home;


