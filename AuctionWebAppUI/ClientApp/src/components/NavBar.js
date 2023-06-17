import React from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';
const NavBarLinks = () => {
    if (localStorage.getItem("user") !== null) {
        if (localStorage.getItem("roles").split(",").includes("Admin")) {
            var user = localStorage.getItem("user").split(",")[0];

            return (
                <div className="navbar-right" style={{ display: "flex", alignItems: "center" }}>
                    <Link to="/home" className="n_links">Home</Link>
                    <Link to="/category" className="n_links">Browse</Link>
                    <Link to="/my-bids" className="n_links">My Dashboard</Link>
                    <Link to="/admin" className="n_links">Admin</Link>
                    <div className="n_user">Welcome: {user}</div>
                    <Link to="/log-out" className="logout">Log out</Link>
                    <Link to="" className="icon">
                        <img src="https://cdn.onlinewebfonts.com/svg/img_60925.png" alt=""></img></Link>
                    <Link to="" className="icon">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZZRR6HDWQarJDG-LLeOLWtaaJZi49lVwAnPAGvCYiYLBSXyaSg6Lr6qraSm3eXXgmrMQ&usqp=CAU" alt=""></img></Link>
                </div>
            );
        } else if (localStorage.getItem("roles").split(",").includes("User")) {
            var user = localStorage.getItem("user").split(",")[0];

            return (
                <div className="navbar-right" style={{ display: "flex", alignItems: "center" }}>
                    <Link to="/home" className="n_links">Home</Link>
                    <Link to="/category" className="n_links">Browse</Link>
                    <Link to="/my-bids" className="n_links">My Dashboard</Link>
                    <div className="n_user">Welcome: {user}</div>
                    <Link to="/log-out" className="logout">Log out</Link>
                    <Link to="" className="icon">
                        <img src="https://cdn.onlinewebfonts.com/svg/img_60925.png" alt=""></img></Link>
                    <Link to="" className="icon">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZZRR6HDWQarJDG-LLeOLWtaaJZi49lVwAnPAGvCYiYLBSXyaSg6Lr6qraSm3eXXgmrMQ&usqp=CAU" alt=""></img></Link>
                </div>
            );
        }
    }
    return (
        <div className="navbar-right" style={{ display: "flex", alignItems: "center" }}>
            <Link to="/home" className="n_links">Home</Link>
            <Link to="/category" className="n_links">Browse</Link>
            <Link to="/sign-in" className="n_links">Sell</Link>
            <Link to="/sign-in" className="n_links login">Sign In</Link>
            <Link to="/register" className="n_links login">Register</Link>
        </div>

    );
};

const Navbar = () => {
    return (
        <>
            <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1320px" }}>
                <div className="navbar-left" style={{ display: "flex", alignItems: "center" }}>
                    <Link to="/" className="navbar-logo" style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
                        eBid
                    </Link>
                    <div className="navbar-search" style={{ marginLeft: "20px" }}>
                        <input type="text" placeholder="Search" style={{ padding: "6px", border: "1px solid #ccc" }} />
                        <button type="submit" className="search-submitBtn">Search</button>
                    </div>
                    <div className="navbar-currency" style={{ marginLeft: "20px", display: "flex", alignItems: "center" }}>
                        <span style={{ fontSize: "14px", fontWeight: "bold", marginRight: "5px" }}>Currency:</span>
                        <select style={{ padding: "6px", border: "1px solid #ccc" }}>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>
                </div>

                <NavBarLinks />
            </nav>
            <hr></hr>
        </>
    );
};

export default Navbar;
