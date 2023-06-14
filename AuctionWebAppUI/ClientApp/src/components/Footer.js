import React from 'react';

const Footer = () => {
    return (
        <footer className="footer" style={{
            marginInline: "auto", paddingTop: "3%", maxWidth: "2320px", paddingInline: "1%", border: "solid #0751e9 3px" }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <h4>Thank you for choosing us</h4>
                        <p>We are a company dedicated to providing users with high-quality products and services.</p>
                    </div>
                    <div className="col-md-4">
                        <h4>Contact Us</h4>
                        <p>Prishtine , 12344</p>
                        <p>Phone: 555-555-5555</p>
                        <p>Email: eBidinfo@company.com</p>
                    </div>
                    <div className="col-md-3">
                        <h4>Follow Us</h4>
                        <ul className="list-unstyled">
                            <li><a href="#" style={{ textDecoration: "none"}}>Facebook</a></li>
                            <li><a href="#" style={{ textDecoration: "none"}}>Twitter</a></li>
                            <li><a href="#" style={{ textDecoration: "none"}}>Instagram</a></li>
                            <li><a href="#" style={{ textDecoration: "none"}}>LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row" style={{ maxWidth: "1320px", paddingInline: "0%" }}>
                    <div className="col-md-12">
                        <hr />
                        <p className="text-center">&copy; 2023 Company. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;