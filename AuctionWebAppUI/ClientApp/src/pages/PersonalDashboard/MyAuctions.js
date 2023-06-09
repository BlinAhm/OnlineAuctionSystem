import { Link } from 'react-router-dom';
import '../css/AuctionCreate.css';
import '../css/MyAuctions.css';

const TabLeft = () => {
    return (
        <div className="at_left">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
            <Link to="/my-bids" className="at_left_tab"><span className="icon"><i className="bi bi-tag-fill"></i></span>My Bids</Link>
            <Link to="/my-auctions" className="at_left_tab"><span className="icon"><i className="bi bi-currency-dollar"></i></span>My Auctions</Link>
            <Link to="/create-auction" className="at_left_tab"><span className="icon"><i className="bi bi-plus-square"></i></span>Create Auction</Link>
        </div>
    );
};

const TabRight = () => {
    return (
        <div className="my_auction_right">
            <div className="auction_card">
                <span>Title</span>
                <span>Description</span>
                <div>
                    <span>Start time</span>
                    <span>End time</span>
                </div>
                <span>Current bid</span>
            </div>
        </div>
    );
};

const MyAuctions = () => {
    return (
        <div className="ac_container">
            <TabLeft />
            <TabRight />
        </div>
    );
};

export default MyAuctions;