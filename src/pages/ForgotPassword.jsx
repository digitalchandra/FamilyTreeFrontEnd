import React, { useState } from "react";
import AuthService from "../services/AuthService";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await AuthService.forgotPassword(email);

            alert("Reset link sent to your email");

        } catch (error) {

            alert("Error sending reset link");

        }
    };

    return (

        <div>

            <h2>Forgot Password</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit">
                    Send Reset Link
                </button>

            </form>

        </div>

    );
}

export default ForgotPassword;