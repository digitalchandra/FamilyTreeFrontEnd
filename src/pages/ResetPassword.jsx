import React, { useState } from "react";
import AuthService from "../services/AuthService";

function ResetPassword() {

    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await AuthService.resetPassword({
                token,
                password
            });

            alert("Password reset successful");

        } catch (error) {

            alert("Reset failed");

        }
    };

    return (

        <div>

            <h2>Reset Password</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Reset Token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Reset Password
                </button>

            </form>

        </div>

    );
}

export default ResetPassword;