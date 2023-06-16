import React, { useEffect } from 'react';
import "./css/Auction.css";

const AuctionDetails = () => {
    useEffect(() => {
        slider();
    });

    function changePicture(image) {
        document.getElementById("main_img").src = image;
    }

    const images = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
        "https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
        "https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
        "https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg"
    ];

    function mapDuplicates() {
        var arr = [];
        let counter = 0;
        for (let i = 1; i <= 5; i++) {
            if ((images.length - 1) < i) {
                i = 0;
            }
            arr[counter++] = images[i];

            if (arr.length === 5)
                return arr;
        }
    }

    return (
        <div className="a_details">
            <p>Published: 2023-02-02</p>

            <div className="img_slider">
                <img id="main_img" src="https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg"></img>
            </div>
            <div className="img_selection">
                <div className="arrowLeft"><i className="bi bi-caret-left-fill"></i></div>

                <div className="img_holder">

                    <img id="lastSlide" onClick={() => { changePicture(images[images.length - 1]) }} src={images[images.length - 1]}></img>
                    {images?.map((key) => (
                        <img onClick={() => { changePicture(key) }} src={key}></img>
                    ))}
                    <img id="firstSlide" onClick={() => { changePicture(images[0]) }} src={images[0]}></img>

                    {mapDuplicates()?.map((key) => (
                        <img onClick={() => { changePicture(key) }} key={key} id="duplicate" src={key} ></img>

                    ))}
                </div>

                <div className="arrowRight"><i className="bi bi-caret-right-fill"></i></div>
            </div>

            <h5><span className="a_category">Category:</span><span className="a_condition">Condition:</span></h5>

            <h2>Title year condition type km</h2>
            <p className="description">Title year condition type kmTitle year condition type kmTitle year condition type kmTitle year condition type kmTitle year condition type kmTitle year condition type km</p>

        </div>
    );
};

const AuctionBidding = () => {
    return (
        <div className="a_bidding">
            <h3>Offers:</h3>

            <h5>Current bid: 54 $</h5>
            <h5 className="base_price">Base price: 45 $</h5>

            <p>Enter bid:</p>
            <input type="number" />
            <input id="submitBtn" value="Place Bid" type="submit" />

            <p className="time_label">Start Time: <span className="time">2023-02-02 00:00:00</span> </p>
            <p className="time_label">End Time: <span className="time">2023-02-02 00:00:00</span> </p>
            <p className="timeLeft">Time left: 00:00:00</p>

            <p className="label_latest_bids">Latest Bids</p>
            <div id="latest_bids">
                <span>64$</span>
                <span>64$</span>
            </div>
        </div>
    );
};

const Auction = () => {
    return (
        <div className="a_main">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
            <AuctionDetails />
            <AuctionBidding />
        </div>
    );
};

export default Auction;

function slider() {
    const slideShow = document.querySelector('.img_holder');
    const slides = document.querySelectorAll('.img_holder img');
    const duplicate = document.querySelectorAll('#duplicate');

    //Buttons
    const prevBtn = document.querySelector('.arrowLeft');
    const nextBtn = document.querySelector('.arrowRight');

    //Counter
    let counter = 1;
    const size = 148;

    slideShow.style.transform = 'translateX(' + (-size * counter) + 'px)';

    //Button Listeners

    nextBtn.addEventListener('click', function nextSlide() {
        const size = 148;
        if (counter >= slides.length - duplicate.length - 1) return;
        slideShow.style.transition = "transform 0.4s ease-in-out";
        counter++;
        slideShow.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    prevBtn.addEventListener('click', function prevSlide() {
        const size = 148;
        if (counter <= 0) return;
        slideShow.style.transition = "transform 0.4s ease-in-out";
        counter--;
        slideShow.style.transform = 'translateX(' + (-size * counter) + 'px)';
    });

    slideShow.addEventListener('transitionend', () => {
        const size = 148;
        if (slides[counter].id === 'lastSlide') {
            slideShow.style.transition = "none";
            counter = slides.length - duplicate.length - 2;
            slideShow.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
        if (slides[counter].id === 'firstSlide') {
            slideShow.style.transition = "none";
            counter = slides.length - duplicate.length - counter;
            slideShow.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
    });
};