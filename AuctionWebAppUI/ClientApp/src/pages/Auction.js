import React from 'react';
import "./css/Auction.css";

const AuctionDetails = () => {
    return (
        <div className="a_details">
            <p>Published: 2023-02-02</p>

            <div className="img_slider">Image</div>
            <div className="img_selection">Images</div>

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
            <AuctionDetails />
            <AuctionBidding />
        </div>
    );
};

export default Auction;