import { Link } from 'react-router-dom';
import '../css/AuctionCreate.css';

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
        <div className="ac_right">
            <div>
                <p>Name:</p>
                <input className="ac_inputs" type="text" />
                <p>Description:</p>
                <textarea className="ac_inputs_textarea"></textarea>
                <p>Base price:</p>
                <input className="ac_inputs" type="number" min="1" />
                <p>Category:</p>
                <select className="ac_inputs">
                    <option>Test</option>
                    <option>Test2</option>
                </select>
            </div>
            <div>
                <p>Title:</p>
                <input className="ac_inputs" type="text" />
                <p>Condition:</p>
                <input className="ac_inputs" type="text" />
                <p>Duration (hours):</p>
                <input className="ac_inputs" type="number" min="1" max="168" step="1" defaultValue="1" />

                <input type="submit" className="ac_submitBtn" value="Create auction" />
            </div>
        </div>
    );
};

const AuctionCreate = () => {
    return (
        <div className="ac_container">
            <TabLeft />
            <TabRight />
        </div>
    );
};

export default AuctionCreate;