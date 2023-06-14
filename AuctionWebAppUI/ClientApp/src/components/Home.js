import React, { useState, useEffect } from 'react';
/*import Navbar from '../components/NavBar';
import Footer from '../components/Footer';*/

import './css/Home.css';


const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [{ imageUrl: " https://images.pexels.com/photos/3720778/pexels-photo-3720778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "An empire of collections", subtitle: "The force is strong with these unique items.", },
    { imageUrl: "https://s1.eestatic.com/2019/05/16/cultura/jeff_koons-arte-escultura_398971078_122970134_1706x960.jpg", title: "An empire of collections", subtitle: "The force is strong with these unique items.", },
    { imageUrl: "https://images.pexels.com/photos/5442454/pexels-photo-5442454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "An empire of collections", subtitle: "The force is strong with these unique items.", },];

    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        const id = setInterval(() => {
            setCurrentSlide((currentSlide) =>
                currentSlide === slides.length - 1 ? 0 : currentSlide + 1
            );
        }, 4000);
        setIntervalId(id);
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
                At eBid, we are passionate about bringing the excitement and convenience of auctions to the digital realm. Our platform serves as a global marketplace, connecting buyers and sellers from all corners
                of the world. With a commitment to trust, transparency, and an exceptional user experience, we have established ourselves as a reliable and user-friendly destination for online auctions.
                We have designed our platform with user-friendliness in mind. From the moment you visit our website or mobile app, you'll find an intuitive interface that allows for seamless navigation and easy bidding. We believe that participating in auctions should be an enjoyable experience, and we strive to make it accessible to everyone, regardless of their technical expertise.
                Our online auction system offers an extensive range of auctions, catering to diverse interests and passions. Whether you are a collector of fine art, a lover of antiques, or an automotive enthusiast, you'll find auctions that align with your interests. Our platform brings together auction houses, sellers, and buyers, creating a dynamic marketplace that constantly offers new and exciting opportunities.<br></br>
                Ready to explore the world of online auctions? Join us today and experience the thrill of bidding, the joy of winning, and the endless possibilities that await you at eBid.
            </p>
        </div>
    );
};




const FeaturedAuctioneers = () => {
    return (
        <div className="featured-auctioneers-container">
            <div className="featured-auctioneers-wrapper">
                <div className="featured-auctioneers-header">
                    <h2 className="featured-auctioneers-title">Our collaborators</h2>
                </div>
                <section className="auctioneers-carousel" data-testid="carousel">
                    <div className="carousel-container">
                        <div className="carousel-card" style={{ marginRight: '15px', width: 'fit-content' }}>
                            <a className="auctioneer-card" href="/auctioneer/4098/everard-auctions-and-appraisals/?utm_source=LiveAuctioneers&utm_medium=banner&utm_campaign=FA_4098_20230610">
                                <img alt="Everard Auctions & Appraisals" height="104" loading="lazy" src="https://images.liveauctioneers.com/static/mail/images/auctioneers/featured_auctioneers_everard_368x208.jpg?quality=100&width=184" width="184" className="auctioneer-card-image" />
                                <div className="visibility-element"></div>
                            </a>
                        </div>
                        <div className="carousel-card" style={{ marginRight: '15px', width: 'fit-content' }}>
                            <a className="auctioneer-card" href="/auctioneer/4740/mecum-auctions/?utm_source=LiveAuctioneers&utm_medium=banner&utm_campaign=FA_4740_20230610">
                                <img alt="" height="104" loading="lazy" src="https://images.liveauctioneers.com/static/mail/images/auctioneers/featured_auctioneers_mecum_368x208.jpg?quality=100&width=184" width="184" className="auctioneer-card-image" />
                                <div className="visibility-element"></div>
                            </a>
                        </div>
                        <div className="carousel-card" style={{ marginRight: '15px', width: 'fit-content' }}>
                            <a className="auctioneer-card" href="/auctioneer/4740/mecum-auctions/?utm_source=LiveAuctioneers&utm_medium=banner&utm_campaign=FA_4740_20230610">
                                <img alt="" height="104" loading="lazy" src="https://images.liveauctioneers.com/static/mail/images/auctioneers/featured_auctioneers_piasa1_368x208.jpg?quality=100&amp" width="184" className="auctioneer-card-image" />
                                <div className="visibility-element"></div>
                            </a>
                        </div>
                        <div className="carousel-card" style={{ marginRight: '15px', width: 'fit-content' }}>
                            <a className="auctioneer-card" href="/auctioneer/4740/mecum-auctions/?utm_source=LiveAuctioneers&utm_medium=banner&utm_campaign=FA_4740_20230610">
                                <img alt="" height="104" loading="lazy" src="https://images.liveauctioneers.com/static/mail/images/auctioneers/featured_auctioneers_holabird_368x208.jpg?quality=100&amp;width=184" width="184" className="auctioneer-card-image" />
                                <div className="visibility-element"></div>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};









const QualitySection = () => {
    return (
        <div className="quality-section">
            <h2>Quality Approved</h2>
            <div className="quality-image">
                <img src="https://images.pexels.com/photos/8553864/pexels-photo-8553864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Quality Approved" />
                <p>Thank you for trusting us</p>
            </div>
            <p>
                Our collection encapsulates the essence of timeless elegance, seamlessly blending classic aesthetics with contemporary design. Each piece possesses an enduring allure that transcends passing trends,
                ensuring that they will remain cherished heirlooms for generations to come.
                With meticulous attention to detail and a commitment to preserving the integrity of traditional craftsmanship, we have created a collection that stands as a testament to the enduring beauty of human creativity.
            </p>
        </div>
    );
};



const Home = () => {
    return (
        <>
            <Slider />
            <AboutUs />
            < FeaturedAuctioneers />
            < QualitySection />

            {/* <Categories/> */}
        </>
    );
};

export default Home;