import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Checkout.css'

export default function Checkout({ setCart }) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState(""); 
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const showError = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage("");
        }, 3000); 
    };

    const handleOrder = (e) => {
        e.preventDefault();

        if (!name || !address) {
            showError("Please fill in all required fields.");
            return;
        }

        if (!paymentMethod) {
            showError("Please select a payment method.");
            return;
        }

        alert("Order placed successfully!");

        // Clear cart
        setCart([]);

        // Redirect to home page
        navigate("/");
    };

    return (
        <div className="container checkoutMargin">
            <h2>Checkout</h2>

            {/* Error Message */}
            {errorMessage && (
                <div className="text-danger mb-3">{errorMessage}</div>
            )}

            <form onSubmit={handleOrder}>
                {/* Name */}
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control w-50"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Address */}
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control w-50"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                {/* Payment Method */}
                <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <div className="mb-2">
                        <button
                            type="button"
                            className={`btn ${paymentMethod === 'cash' ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => setPaymentMethod('cash')}
                        >
                            Cash on Delivery
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            className={`btn ${paymentMethod === 'visa' ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => setPaymentMethod('visa')}
                        >
                            Pay with Visa
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button type="submit" className="confirm show">
                    Confirm Order
                </button>
            </form>
        </div>
    );
}
