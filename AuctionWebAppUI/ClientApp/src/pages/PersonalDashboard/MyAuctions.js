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
            <div className="tab_header">My Auctions</div>
            <table>
                <thead>
                    <tr>
                        <th className="td_title">Title</th>
                        <th className="td_name">Name</th>
                        <th className="td_description">Description</th>
                        <th className="td_dates">Start date:<br />End date:</th>
                        <th className="td_current_bid">Current bid:</th>
                        <th className="td_edit"></th>
                        <th className="td_delete"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Test</td>
                        <td>Item</td>
                        <td style={{ textAlign: "justify", fontSize:"15px" }}>Test item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item description</td>
                        <td>2023-02-02 12:00:00<br />2023-02-02 12:00:00</td>
                        <td>1000</td>
                        <td><i className="bi bi-pencil"></i></td>
                        <td><i className="bi bi-trash"></i></td>
                    </tr>
                    <tr>
                        <td>Test</td>
                        <td>Item</td>
                        <td style={{ textAlign: "justify", fontSize: "15px" }}>Test item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item description</td>
                        <td>2023-02-02 12:00:00<br />2023-02-02 12:00:00</td>
                        <td>1000</td>
                        <td><i className="bi bi-pencil"></i></td>
                        <td><i className="bi bi-trash"></i></td>
                    </tr>
                    <tr>
                        <td>Test</td>
                        <td>Item</td>
                        <td style={{ textAlign: "justify", fontSize: "15px" }}>Test item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item description</td>
                        <td>2023-02-02 12:00:00<br />2023-02-02 12:00:00</td>
                        <td>1000</td>
                        <td><i className="bi bi-pencil"></i></td>
                        <td><i className="bi bi-trash"></i></td>
                    </tr>
                    <tr>
                        <td>Test</td>
                        <td>Item</td>
                        <td style={{ textAlign: "justify", fontSize: "15px" }}>Test item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item description</td>
                        <td>2023-02-02 12:00:00<br />2023-02-02 12:00:00</td>
                        <td>1000</td>
                        <td><i className="bi bi-pencil"></i></td>
                        <td><i className="bi bi-trash"></i></td>
                    </tr>
                    <tr>
                        <td>Test</td>
                        <td>Item</td>
                        <td style={{ textAlign: "justify", fontSize: "15px" }}>Test item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item description</td>
                        <td>2023-02-02 12:00:00<br />2023-02-02 12:00:00</td>
                        <td>1000</td>
                        <td><i className="bi bi-pencil"></i></td>
                        <td><i className="bi bi-trash"></i></td>
                    </tr>
                    <tr>
                        <td>Test</td>
                        <td>Item</td>
                        <td style={{ textAlign: "justify", fontSize: "15px" }}>Test item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item description</td>
                        <td>2023-02-02 12:00:00<br />2023-02-02 12:00:00</td>
                        <td>1000</td>
                        <td><i className="bi bi-pencil"></i></td>
                        <td><i className="bi bi-trash"></i></td>
                    </tr>
                </tbody>
            </table>
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