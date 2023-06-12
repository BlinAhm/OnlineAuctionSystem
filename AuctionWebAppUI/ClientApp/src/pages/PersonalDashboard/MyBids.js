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
                        <th className="td_withdraw"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Test</td>
                        <td>Item</td>
                        <td>2023-02-02 12:00:00</td>
                        <td>1000</td>
                        <td><div className="withdraw_bid" onClick={
                            () => {
                                document.getElementsByClassName("my_bids_withdraw_form")[0].style.display = "block";
                            }
                        }>Withdraw bid</div></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const WithdrawForm = () => {
    return (
        <div style={{ display: "none" }} className="my_bids_withdraw_form">
            <div className="withdraw_content">
                <p>Are you sure you want to withdraw your bid on:</p>
                <p style={{ fontWeight: "bold", marginTop: "10px" }}>Title</p>
                <div>
                    <div onClick={
                        () => {
                            document.getElementsByClassName("my_bids_withdraw_form")[0].style.display = "none";
                        }
                    }>No</div>
                    <div>Yes</div>
                </div>
            </div>
        </div>
    );
};

const EditForm = () => {
    return (
        <div className="my_bids_edit_form">
            <div className="edit_content">
                <i className="bi bi-x"></i>
                <div className="edit_inputs">
                    <input type="number" />
                </div>
            </div>
        </div>
    );
};

const MyBids = () => {
    return (
        <div className="ac_container">
            <TabLeft />
            <TabRight />
            <WithdrawForm />
        </div>
    );
};

export default MyBids;

window.onclick = function (event) {
    var modal = document.getElementsByClassName("my_bids_withdraw_form")[0];
    if (event.target === modal) {
        modal.style.display = "none";
    }
} 