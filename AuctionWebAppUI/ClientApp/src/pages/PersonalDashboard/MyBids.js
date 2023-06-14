import { useEffect, useState } from 'react';
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

var withdrawId;

const TabRight = () => {
    const [bids, setBids] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        getBids();
        getItems();
    }, []);

    async function getBids() {
        await fetch("http://localhost:8040/api/Bid/user/"+localStorage.getItem("userId"), {
            method: "GET",
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            setBids(data);
        });
    }
    async function getItems() {
        await fetch("http://localhost:18006/api/Item/", {
            method: "GET",
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

    function withdrawBid(title, bidId) {
        withdrawId = bidId;
        document.getElementById("bid_title").innerHTML = title;
        document.getElementsByClassName("my_bids_withdraw_form")[0].style.display = "block";
    }

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
                <tbody>{bids?.map((key) => (
                    <tr key={key.id}>
                        <td>{key.auction.title}</td>
                        <td>{getItemName(key.auction.itemId)}</td>
                        <td>{key.bidDate.split("T")[0] + " " + key.bidDate.split("T")[1]}</td>
                        <td>{key.bidAmount}</td>

                        <td>{key.isWithdrawn ? "Withdrawn" : <div className="withdraw_bid" onClick={() => { withdrawBid(key.auction.title, key.id) }}>Withdraw bid</div>}</td>
                    </tr>
                )) ?? ""}
                </tbody>
            </table>
        </div >
    );
};

const WithdrawForm = () => {
    return (
        <div style={{ display: "none" }} className="my_bids_withdraw_form">
            <div className="withdraw_content">
                <p>Are you sure you want to withdraw your bid on:</p>
                <p id="bid_title" style={{ fontWeight: "bold", marginTop: "10px" }}>Title</p>
                <div>
                    <div onClick={
                        () => {
                            document.getElementsByClassName("my_bids_withdraw_form")[0].style.display = "none";
                        }
                    }>No</div>
                    <div onClick={
                        () => {
                            withdrawConfirm();
                        }
                    }>Yes</div>
                </div>
            </div>
        </div>
    );
};

async function withdrawConfirm() {
    await fetch("http://localhost:8040/api/Bid/" + withdrawId + "/withdraw", {
        method: "PUT",
    }).then(function (response) {
        return response.json();
    }).then(function () {
        window.location.href = "http://localhost:3000/my-bids";
    });
}

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