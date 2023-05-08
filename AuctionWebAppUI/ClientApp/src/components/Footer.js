import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h3>Thank you for choosing us</h3>
                        <p>We are a company dedicated to providing high-quality products and services.</p>
                    </div>
                    <div className="col-md-4">
                        <h3>Contact Us</h3>
                        <p>Prishtine , 12344</p>
                        <p>Phone: 555-555-5555</p>
                        <p>Email: eBidinfo@company.com</p>
                    </div>
                    <div className="col-md-4">
                        <h3>Follow Us</h3>
                        <ul className="list-unstyled">
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row">
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