import { Link } from 'react-router-dom';
import '../css/AuctionCreate.css';
import '../css/MyBids.css';

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
        <div className="my_bids_right">
            <div className="tab_header">My Bids</div>
            <table>
                <thead>
                    <tr>
                        <th className="td_title">Title</th>
                        <th className="td_name">Name</th>
                        <th className="td_date">Date:</th>
                        <th className="td_amount">Bid amount:</th>
                        <th className="td_edit"></th>
                        <th className="td_delete"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Test</td>
                        <td>Item</td>
                        <td>2023-02-02 12:00:00</td>
                        <td>1000</td>
                        <td><i className="bi bi-pencil"></i></td>
                        <td><i className="bi bi-trash"></i></td>
                    </tr>
                    <tr>
                        <td>Test</td>
                        <td>Item</td>
                        <td>2023-02-02 12:00:00</td>
                        <td>1000</td>
                        <td><i className="bi bi-pencil"></i></td>
                        <td><i className="bi bi-trash"></i></td>
                    </tr>
                    <tr>
                        <td>Test</td>
                        <td>Item</td>
                        <td>2023-02-02 12:00:00</td>
                        <td>1000</td>
                        <td><i className="bi bi-pencil"></i></td>
                        <td><i className="bi bi-trash"></i></td>
                    </tr>
                    <tr>
                        <td>Test</td>
                        <td>Item</td>
                        <td>2023-02-02 12:00:00</td>
                        <td>1000</td>
                        <td><i className="bi bi-pencil"></i></td>
                        <td><i className="bi bi-trash"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const MyBids = () => {
    return (
        <div className="ac_container">
            <TabLeft />
            <TabRight />
        </div>
    );
};

export default MyBids;