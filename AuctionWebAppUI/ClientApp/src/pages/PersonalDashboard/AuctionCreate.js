import { useEffect, useState } from 'react';
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

function getToken() {
    var token = localStorage.getItem("token");
    return token;
}

const TabRight = () => {
    var itemId;

    useEffect(() => {
        getCategories();
    }, []);

    async function addAuction() {
        if (validateInputs()) {
            document.getElementById("submit_ac").disabled = true;
            document.getElementById("submit_ac").style.background = "gray";
            document.getElementById("submit_ac").style.borderColor = "lightgray";

            await postItem();
            await postAuction();
        }
    }

    async function postItem() {
        var name = document.getElementById("item_name").value;
        var description = document.getElementById("item_description").value;
        var condition = document.getElementById("item_condition").value;
        var basePrice = document.getElementById("item_price").value;
        var categoryName = document.getElementById("item_category").value;

        await fetch("http://localhost:8001/api/Item", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemId: "",
                name: name,
                description: description,
                condition: condition,
                price: basePrice,
                categoryName: categoryName
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            itemId = data;
        });
    }

    async function postAuction() {
        var title = document.getElementById("auc_title").value;
        var userId = localStorage.getItem("userId");
        var duration = document.getElementById("auc_duration").value;

        await fetch("http://localhost:8001/api/Auction", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                itemId: itemId,
                userId: userId,
                duration: duration
            })
        }).then(function (response) {
            return response.json();
        }).then(function () {
            document.location.href = "http://localhost:3000/my-auctions";
        });
    }

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

    return (
        <div className="ac_right_container">
            <div className="tab_header">Create Auction</div>
            <div className="ac_right">
                <div>
                    <div className="input_holder">
                        <p>Title:</p>
                        <input id="auc_title" className="ac_inputs" type="text" />
                        <label style={{ display: "none" }} id="label_title"></label>
                    </div>
                    <div className="input_holder">
                        <p>Name:</p>
                        <input id="item_name" className="ac_inputs" type="text" />
                        <label style={{ display: "none" }} id="label_name"></label>
                    </div>
                    <div className="input_holder">
                        <p>Description:</p>
                        <textarea id="item_description" className="ac_inputs_textarea"></textarea>
                        <label style={{ display: "none" }} id="label_description"></label>
                    </div>
                    <div className="input_holder">
                        <p>Category:</p>
                        <select id="item_category" className="ac_inputs">
                            {categories?.map((category) => (
                                <option key={category.categoryId}>{category.categoryName}</option>
                            )) ?? ""}
                        </select>
                    </div>
                </div>
                <div>
                    <div className="input_holder">
                        <p>Condition:</p>
                        <input id="item_condition" className="ac_inputs" type="text" />
                        <label style={{ display: "none" }} id="label_condition"></label>
                    </div>
                    <div className="input_holder">
                        <p>Base price:</p>
                        <input id="item_price" className="ac_inputs" type="number" min="1" />
                        <label style={{ display: "none" }} id="label_price"></label>
                    </div>
                    <div className="input_holder">
                        <p>Duration (hours):</p>
                        <input id="auc_duration" className="ac_inputs" type="number" min="1" max="168" step="1" defaultValue="1" />
                        <label style={{ display: "none" }} id="label_duration"></label>
                    </div>
                    <input id="submit_ac" disabled={false} onClick={() => { addAuction() }} type="submit" className="ac_submitBtn" value="Create auction" />
                </div>
            </div>
        </div>

    );
};

const AuctionCreate = () => {
    if (localStorage.getItem("user") === null) {
        document.location.href = "http://localhost:3000/home";
    }

    return (
        <div className="ac_container">
            <TabLeft />
            <TabRight />
        </div>
    );
};

export default AuctionCreate;

function validateInputs() {
    const isAlpha = new RegExp(/^[a-zA-Z\s]+$/);
    const isNumber = new RegExp(/^\d+$/);

    const labelTitle = document.getElementById("label_title");
    const labelName = document.getElementById("label_name");
    const labelDescription = document.getElementById("label_description");
    const labelCondition = document.getElementById("label_condition");
    const labelPrice = document.getElementById("label_price");
    const labelDuration = document.getElementById("label_duration");

    const title = document.getElementById("auc_title").value;
    const duration = document.getElementById("auc_duration").value;
    const name = document.getElementById("item_name").value;
    const description = document.getElementById("item_description").value;
    const condition = document.getElementById("item_condition").value;
    const basePrice = document.getElementById("item_price").value;

    if (title.trim() === "") {
        labelTitle.innerHTML = "Title invalid.";
        labelTitle.style.display = "block";
    } else {
        labelTitle.innerHTML = "";
        labelTitle.style.display = "none";
    }
    if (name.trim() === "") {
        labelName.innerHTML = "Name invalid.";
        labelName.style.display = "block";
    } else {
        labelName.innerHTML = "";
        labelName.style.display = "none";
    }
    if (description.trim() === "") {
        labelDescription.innerHTML = "Description invalid.";
        labelDescription.style.display = "block";
    } else {
        labelDescription.innerHTML = "";
        labelDescription.style.display = "none";
    }
    if (condition.trim() === "" || !(isAlpha.test(condition))) {
        labelCondition.innerHTML = "Condition invalid.";
        labelCondition.style.display = "block";
    } else {
        labelCondition.innerHTML = "";
        labelCondition.style.display = "none";
    }
    if (basePrice.trim() === "" || !(isNumber.test(basePrice)) || basePrice == 0) {
        labelPrice.innerHTML = "Price invalid.";
        labelPrice.style.display = "block";
    } else {
        labelPrice.innerHTML = "";
        labelPrice.style.display = "none";
    }
    if (duration.trim() === "" || !(isNumber.test(duration)) || duration == 0 || duration > 168) {
        labelDuration.innerHTML = "Duration invalid.";
        labelDuration.style.display = "block";
    } else {
        labelDuration.innerHTML = "";
        labelDuration.style.display = "none";
    }

    //Checks if labels are empty (no errors on validation)
    if (labelTitle.innerHTML.trim() === ""
        && labelName.innerHTML.trim() === ""
        && labelDescription.innerHTML.trim() === ""
        && labelCondition.innerHTML.trim() === ""
        && labelPrice.innerHTML.trim() === ""
        && labelDuration.innerHTML.trim() === "") {
        return true;
    } else {
        return false;
    }
}