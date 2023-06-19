import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Modal from 'react-modal';
import './css/cart.css';



const PaymentModal = ({ isOpen, onRequestClose }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Payment Successful"
            className="payment-modal"
            overlayClassName="payment-modal-overlay"
        >
            <h2 className="payment-modal-title">Payment Successful!</h2>
            <p className="payment-modal-message">Thank you for your purchase.</p>
            <button className="payment-modal-close-button" onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

const Cart = () => {
    const [cartItems] = useState([
        {
            auctionTitle: 'Test',
            bidAmount: 1000,
        },
        {
            auctionTitle: 'Test2',
            bidAmount: 600,
        },
    ]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showPayPalButton, setShowPayPalButton] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems]);

    const calculateTotalPrice = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.bidAmount;
        });
        setTotalPrice(total);
    };

    const handleCheckout = () => {
        // Trigger PayPal payment flow
        setShowPayPalButton(true);
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalPrice.toFixed(2),
                        currency_code: 'USD',
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            console.log(details); 
            setIsPaymentModalOpen(true);
        });
    };

    const closeModal = () => {
        setIsPaymentModalOpen(false);
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Cart</h2>
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Auction Title</th>
                        <th>Current Bid Price</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.auctionTitle}</td>
                            <td>{item.bidAmount}</td>
                            <td>{item.bidAmount}</td>
                        </tr>
                    ))}
                    <tr className="cart-total-row">
                        <td></td>
                        <td></td>
                        <td>{totalPrice}</td>
                    </tr>
                </tbody>
            </table>
            <div className="checkout-container">
                <div className="total-price">
                    <span>Total:</span>
                    <span>{totalPrice}</span>
                </div>
                {!showPayPalButton && (
                    <button className="checkout-button" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                )}
            </div>
            {showPayPalButton && (
                <PayPalScriptProvider options={{ 'client-id': 'AcKRtgL4i68EZ2ZYuYUx3ilihAg2YhL5dtF_m19A8MjBWVOn6ewNS4M_uV8gA3xi98zTcUq38gUHbVFx' }}>
                    <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
                </PayPalScriptProvider>
            )}
            <PaymentModal
                isOpen={isPaymentModalOpen}
                onRequestClose={closeModal}
            />
        </div>
    );
};

export default Cart;
