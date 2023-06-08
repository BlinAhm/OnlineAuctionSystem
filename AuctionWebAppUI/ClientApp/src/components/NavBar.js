import React from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';

const Navbar = () => {
    return (
        <>
            <nav className="navbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="navbar-left" style={{ display: "flex", alignItems: "center" }}>
                    <Link to="/" className="navbar-logo" style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
                        eBid
                    </Link>
                    <div className="navbar-search" style={{ marginLeft: "20px" }}>
                        <input type="text" placeholder="Search" style={{ padding: "6px", border: "1px solid #ccc" }} />
                        <button type="submit" style={{ padding: "6px 12px", backgroundColor: "#007bff", color: "#fff", border: "none", marginLeft: "10px", cursor: "pointer" }}>Search</button>
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
                <div className="navbar-right" style={{ display: "flex", alignItems: "center" }}>
                    <Link to="/home" className="n_links">Home</Link>
                    <Link to="/browse" className="n_links">Browse</Link>
                    <Link to="/sell" className="n_links">Sell</Link>
                    <Link to="/sign-in" className="n_links login">Sign In</Link>
                    <Link to="/register" className="n_links login">Register</Link>
                </div>
            </nav>
            <hr></hr>
        </>
    );
};

export default Navbar;
