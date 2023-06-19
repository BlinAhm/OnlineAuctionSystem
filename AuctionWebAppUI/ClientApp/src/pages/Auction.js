import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./css/Auction.css";

const AuctionDetails = (prop) => {
    useEffect(() => {
        slider();
    });

    function changePicture(image) {
        document.getElementById("main_img").src = image;
    }

    const images = [
        "https://c0.wallpaperflare.com/preview/354/969/251/jewelry-flatlay-watch-makeup.jpg",
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pYyUyMGRldmljZXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        "https://images.summitmedia-digital.com/esquiremagph/images/2021/03/03/cul-de-sac-the-podium.jpg"
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
            <p>Published: {prop.auction?.startTime?.split("T")[0]}</p>

            <div className="img_slider">
                <img id="main_img" src="https://c0.wallpaperflare.com/preview/354/969/251/jewelry-flatlay-watch-makeup.jpg"></img>
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
                        <img onClick={() => { changePicture(key) }} id="duplicate" src={key} ></img>
                    ))}
                </div>

                <div className="arrowRight"><i className="bi bi-caret-right-fill"></i></div>
            </div>

            <h5><span className="a_category">Category: {prop.item?.categoryName}</span><span className="a_condition">Condition: {prop.item?.condition}</span></h5>

            <h2>{prop.auction?.title}</h2>
            <p className="description">{prop.item?.description}</p>

        </div>
    );
};

const AuctionBidding = (prop) => {

    async function placeBid(auctionId) {
        if (validateBid(prop.item?.price, prop.auction?.currentBid?.bidAmount)) {
            var token = localStorage.getItem("token");
            var userId = localStorage.getItem("userId");
            var amount = document.getElementById("bid_number").value;

            await fetch("http://localhost:8001/api/Bid", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    bidAmount: amount,
                    AuctionId: auctionId
                })
            }).then(function (response) {
                if (response.ok) {
                    document.getElementById("bid_label").innerHTML = "";
                    document.getElementById("bid_label").style.display = "none";
                    document.location.href = "http://localhost:3000/auction/" + auctionId;
                }
                else {
                    return response.json();
                }
            }).then(function (data) {
                document.getElementById("bid_label").innerHTML = data.message;
                document.getElementById("bid_label").style.display = "block";
            })
        }
    }

    return (
        <div className="a_bidding">
            <h3>Offers:</h3>

            <h5>Current bid: {prop.auction?.currentBid === null ? "No bids" : prop.auction.currentBid?.bidAmount} $</h5>
            <h5 className="base_price">Base price: {prop.item?.price} $</h5>

            <p>Enter bid:</p>
            <input id="bid_number" type="number" />
            <label id="bid_label"></label>
            <input onClick={() => { placeBid(prop.auction?.id) }} id="submitBtn" value="Place Bid" type="submit" />

            <p className="time_label">Start Time: <span className="time">{prop.auction?.startTime?.split("T")[0] + " " + prop.auction?.startTime?.split("T")[1]}</span> </p>
            <p className="time_label">End Time: <span className="time">{prop.auction?.endTime?.split("T")[0] + " " + prop.auction?.endTime?.split("T")[1]}</span> </p>
            <p className="timeLeft">Time left: {prop.time}</p>

            <p className="label_latest_bids">Latest Bids</p>
            <div id="latest_bids">
                {prop.latestBids?.map((key) => (
                    <span>{key.bidAmount} $</span>
                )) ?? ""}
            </div>
        </div>
    );
};

const Auction = () => {
    const [auction, setAuction] = useState([]);
    const [item, setItem] = useState([]);
    const [latestBids, setLatestBids] = useState([]);
    const [remainingTime, setRemainingTime] = useState([]);
    const { auctionId } = useParams();

    useEffect(() => {
        getAuction();
        getLatestBids();
        getRemainingTime();
    }, []);

    async function getLatestBids() {
        await fetch("http://localhost:8001/api/Bid/" + auctionId + "/latest", {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setLatestBids(data);
        });
    }

    async function getRemainingTime() {
        await fetch("http://localhost:8001/api/Auction/" + auctionId + "/time", {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            var time = data.split(".");
            if (data.includes("-"))
                setRemainingTime("Auction has ended.");
            else if (time.length > 2)
                setRemainingTime(time[0] + "d " + time[1]);
            else
                setRemainingTime(time[0]);
        });
    }

    async function getAuction() {
        var itemId;
        await fetch("http://localhost:8001/api/Auction/" + auctionId, {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data?.hasEnded === true) {
                document.getElementById("bid_number").disabled = true;
                document.getElementById("bid_number").style.background = "white";
                document.getElementById("bid_number").style.border = "white 2px solid";
                document.getElementById("bid_number").style.color = "gray";

                document.getElementById("submitBtn").disabled = true;
                document.getElementById("submitBtn").style.background = "darkgray";
                document.getElementById("submitBtn").style.border = "gray 2px solid";
                document.getElementById("submitBtn").style.borderRadius = "4px";
                document.getElementById("submitBtn").style.color = "gray";
            }
            setAuction(data);
            itemId = data.itemId;
        });

        await fetch("http://localhost:8001/api/Item/" + itemId, {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setItem(data);
        });
    }

    return (
        <div className="a_main">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
            <AuctionDetails auction={auction} item={item} />
            <AuctionBidding time={remainingTime} auction={auction} item={item} latestBids={latestBids} />
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

function validateBid(basePrice, currentBid) {
    const isAlpha = new RegExp(/^[a-zA-Z\s]+$/);
    var inputBid = document.getElementById("bid_number").value;
    var label = document.getElementById("bid_label");

    if (isAlpha.test(inputBid) || inputBid < basePrice || inputBid <= currentBid || inputBid.trim() === "") {
        label.innerHTML = "Bid invalid.";
        label.style.display = "block";
    } else if (localStorage.getItem("token") === null) {
        label.innerHTML = "You need to be logged in to place bids.";
        label.style.display = "block";
    } else {
        label.innerHTML = "";
        label.style.display = "none";
    }

    if (label.innerHTML.trim() === "") {
        return true;
    }
    return false;
}