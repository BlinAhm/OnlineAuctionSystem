import { useEffect, useState } from 'react';
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

var deleteId;

const TabRight = () => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        getAuctions();
    }, []);

    async function getAuctions() {
        await fetch("http://localhost:8040/api/Auction/user/" + localStorage.getItem("userId"), {
            method: "GET",
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setAuctions(data);
        });
    }

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
                    {auctions?.map((key) => (
                        <tr key={key.id}>
                            <td>{key.title}</td>
                            <td>Item</td>
                            <td style={{ textAlign: "justify", fontSize: "15px" }}>{key.description}</td>
                            <td>{key.startTime.split('T')[0] + " " + key.startTime.split('T')[1]}<br />{key.endTime.split('T')[0] + " " + key.endTime.split('T')[1]}</td>
                            <td>{key.currentBid?.bidAmount == null ? "No bids" : key.currentBid?.bidAmount}</td>
                            <td><i onClick={() => {
                                fillEdit(key.title, key.description, "name", "condition");
                            }} className="bi bi-pencil"></i></td>
                            <td><i onClick={() => {
                                document.getElementsByClassName("my_auctions_delete_form")[0].style.display = "block";
                                document.getElementById("auction_title").innerHTML = key.title;
                                deleteId = key.id;
                            }} className="bi bi-trash"></i></td>
                        </tr>
                    )) ?? ""}
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
                        <input id="title_edit" type="text" />
                        <p>Description</p>
                        <textarea id="description_edit"></textarea>
                        <p>Name</p>
                        <input id="name_edit" type="text" />
                        <p>Condition</p>
                        <input id="condition_edit" type="text" />
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

    async function deleteAuction() {
        await fetch("http://localhost:8040/api/Auction/" + deleteId, {
            method: "DELETE",
        }).then(function (response) {
            return response.json();
        }).then(function () {
            document.location.href = "http://localhost:3000/my-auctions";
        });
    }

    return (
        <div style={{ display: "none" }} className="my_auctions_delete_form">
            <div className="delete_content">

                <p>Are you sure you want to delete this auction:</p>
                <p id="auction_title" style={{ fontWeight: "bold", marginTop: "10px" }}>Title</p>

                <div>
                    <div onClick={
                        () => {
                            document.getElementsByClassName("my_auctions_delete_form")[0].style.display = "none";
                        }
                    }>No</div>
                    <div onClick={
                        () => {
                            deleteAuction();
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

function fillEdit(title, description, name, condition) {
    document.getElementById("title_edit").value = title;
    document.getElementById("description_edit").value = description;
    document.getElementById("name_edit").value = name;
    document.getElementById("condition_edit").value = condition;

    document.getElementsByClassName("my_auctions_edit_form")[0].style.display = "block";
}

window.onclick = function (event) {
    if (event.target === document.getElementsByClassName("my_auctions_edit_form")[0]) {
        document.getElementsByClassName("my_auctions_edit_form")[0].style.display = "none";
    }
    if (event.target === document.getElementsByClassName("my_auctions_delete_form")[0]) {
        document.getElementsByClassName("my_auctions_delete_form")[0].style.display = "none";
    }
} 