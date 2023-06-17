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
var deleteIdItem;
var auction;
var itemPrice;
var itemCategory;
var token = localStorage.getItem("token");

const TabRight = () => {
    const [auctions, setAuctions] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        getAuctions();
        getItems();
    }, []);

    async function getAuctions() {

        await fetch("http://localhost:8001/api/Auction/user/" + localStorage.getItem("userId"), {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setAuctions(data);
        });
    }

    async function getItems() {
        await fetch("http://localhost:8001/api/Item", {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setItems(data);
        });
    }

    function getItemName(id) {
        var name;

        items?.forEach((key) => {
            if (key.itemId === id) {
                name = key.name;
            }
        });
        return name;
    }
    function getItemCategory(id) {
        var category;

        items?.forEach((key) => {
            if (key.itemId === id) {
                category = key.categoryName;
            }
        });
        console.log(category);
        return category;
    }
    function getItemDescription(id) {
        var description;

        items?.forEach((key) => {
            if (key.itemId === id) {
                description = key.description;
            }
        });
        return description;
    }
    function getItemCondition(id) {
        var condition;

        items?.forEach((key) => {
            if (key.itemId === id) {
                condition = key.condition;
            }
        });
        return condition;
    }
    function getItemPrice(id) {
        var price;

        items?.forEach((key) => {
            if (key.itemId === id) {
                price = key.price;
            }
        });
        return price;
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
                            <td>{getItemName(key.itemId)}</td>
                            <td style={{ textAlign: "justify", fontSize: "15px" }}>{getItemDescription(key.itemId)}</td>
                            <td>{key.startTime.split('T')[0] + " " + key.startTime.split('T')[1]}<br />{key.endTime.split('T')[0] + " " + key.endTime.split('T')[1]}</td>
                            <td>{key.currentBid?.bidAmount == null ? "No bids" : key.currentBid?.bidAmount}</td>
                            <td><i onClick={() => {
                                fillEdit(key.title, getItemDescription(key.itemId), getItemName(key.itemId), getItemCondition(key.itemId));
                                auction = key;
                                itemPrice = getItemPrice(key.itemId);
                                itemCategory = getItemCategory(key.itemId);
                            }} className="bi bi-pencil"></i></td>
                            <td><i onClick={() => {
                                document.getElementsByClassName("my_auctions_delete_form")[0].style.display = "block";
                                document.getElementById("auction_title").innerHTML = key.title;
                                deleteId = key.id;
                                deleteIdItem = key.itemId;
                            }} className="bi bi-trash"></i></td>
                        </tr>
                    )) ?? ""}
                </tbody>
            </table>
        </div>
    );
};

const EditForm = () => {
    useEffect(() => {
        getCategories();
    }, []);

    const [categories, setCategories] = useState([]);
    async function getCategories() {
        await fetch("http://localhost:8001/api/Category", {
            method: "GET"
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setCategories(data);
        })
    }

    async function updateAuction() {
        var titlenew = document.getElementById("title_edit").value;

        await fetch("http://localhost:8001/api/Auction", {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: auction.id,
                title: titlenew,
                itemId: auction.itemId,
                userId: auction.userId,
                startTime: auction.startTime,
                endTime: auction.endTime,
                currentBid: auction.currentBid
            })
        }).then(function (response) {
            return response.json();
        }).then(function () {
        });

        var itemId = auction.itemId;
        var name = document.getElementById("name_edit").value;
        var description = document.getElementById("description_edit").value;
        var condition = document.getElementById("condition_edit").value;
        var category = document.getElementById("category_edit").value;

        await fetch("http://localhost:8001/api/Item", {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemId: itemId,
                name: name,
                description: description,
                condition: condition,
                categoryName: category,
                price: itemPrice
            })
        }).then(function () {
        }).then(function () {
            document.location.href = "http://localhost:3000/my-auctions";
        });
    }

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
                        <select id="category_edit" defaultValue="Test">
                            {categories?.map((category) => (
                                <option key={category?.categoryId} value={category?.categoryName}>{category?.categoryName}</option>
                            )) ?? ""}
                        </select>

                        <input onClick={() => {
                            updateAuction();
                        }}
                            type="submit" className="edit_submitBtn" value="Save" />
                    </div>

                </div>
            </div>
        </div>
    );
};

const DeleteForm = () => {

    async function deleteAuction() {
        await fetch("http://localhost:8001/api/Auction/" + deleteId, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(function (response) {
            return response.json();
        }).then();

        await fetch("http://localhost:8001/api/Item/" + deleteIdItem, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then().then(function () {
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
    if (localStorage.getItem("user") === null) {
        document.location.href = "http://localhost:3000/home";
    }

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