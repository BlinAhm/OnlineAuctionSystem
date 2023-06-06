import React from 'react';
import "./Auction.css";

const AuctionDetails = () => {
    return (
        <div className="a_details">
            <p>Published:</p>
            <div className="img_slider">Image</div>
            <div className="img_selection">Images</div>
            <h5>Category:</h5>
            <h2>Title</h2>
            <p className="description">good</p>
        </div>
    );
};

const AuctionBidding = () => {
    return (
        <div className="a_bidding">
            <h3>Offers:</h3>
            <h5>Current bid: 54 $</h5>

            <p>Enter bid:</p>
            <input type="number" />
            <input id="submitBtn" value="Place Bid" type="submit" />

            <p className="time_label">Start Time: <span className="time">2023-02-02 00:00:00</span> </p>
            <p className="time_label">End Time: <span className="time">2023-02-02 00:00:00</span> </p>
            <p className="timeLeft">Time left: 00:00:00</p>
        </div>
    );
};

const Auction = () => {
    return (
        <div className="a_main">
            <AuctionDetails />
            <AuctionBidding />
        </div>
    );
};

export default Auction;