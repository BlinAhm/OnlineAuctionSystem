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
                        <td style={{ textAlign: "justify", fontSize: "15px" }}>Test item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item descriptionTest item description</td>
                        <td>2023-02-02 12:00:00<br />2023-02-02 12:00:00</td>
                        <td>1000</td>
                        <td><i onClick={() => {
                            document.getElementsByClassName("my_auctions_edit_form")[0].style.display = "block";
                        }} className="bi bi-pencil"></i></td>
                        <td><i onClick={() => {
                            document.getElementsByClassName("my_auctions_delete_form")[0].style.display = "block"; 
                        }} className="bi bi-trash"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const EditForm = () => {
    return (
        <div style={{ display: "none" }} className="my_auctions_edit_form">
            <div className="edit_content">

                <i onClick={() => {
                    document.getElementsByClassName("my_auctions_edit_form")[0].style.display = "none"; 
                }} className="bi bi-x"></i>

                <p className="edit_title">Edit auction:</p>

                <div className="edit_inputs">
                    <div className="inputs_left">
                        <p>Title</p>
                        <input type="text" />
                        <p>Description</p>
                        <textarea></textarea>
                        <p>Name</p>
                        <input type="text" />
                        <p>Condition</p>
                        <input type="text" />
                    </div>

                    <div className="inputs_right">
                        <p>Category</p>
                        <select>
                            <option>Test1</option>
                            <option>Test2</option>
                        </select>

                        <input type="submit" className="edit_submitBtn" value="Save" />
                    </div>

                </div>
            </div>
        </div>
    );
};

const DeleteForm = () => {
    return (
        <div style={{ display: "none" }} className="my_auctions_delete_form">
            <div className="delete_content">

                <p>Are you sure you want to delete this auction:</p>
                <p id="bid_title" style={{ fontWeight: "bold", marginTop: "10px" }}>Title</p>

                <div>
                    <div onClick={
                        () => {
                            document.getElementsByClassName("my_auctions_delete_form")[0].style.display = "none";
                        }
                    }>No</div>
                    <div onClick={
                        () => {
                            
                        }
                    }>Yes</div>
                </div>
            </div>
        </div>
    );
};

const MyAuctions = () => {
    return (
        <div className="ac_container">
            <TabLeft />
            <TabRight />
            <EditForm />
            <DeleteForm />
        </div>
    );
};

export default MyAuctions;

window.onclick = function (event) {
    var modalEdit = document.getElementsByClassName("my_auctions_edit_form")[0];
    var modalDelete = document.getElementsByClassName("my_auctions_delete_form")[0];
    if (event.target === modalEdit) {
        modalEdit.style.display = "none";
    }
    if (event.target === modalDelete) {
        modalDelete.style.display = "none";
    }
} 