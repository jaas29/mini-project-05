import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { logIn, googleSignIn, changePassword } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [changeMsg, setChangeMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await logIn(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError("Incorrect email or password. Please try again.");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            navigate("/dashboard");
        } catch (err) {
            setError("Google sign-in failed. Please try again.");
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const form = e.target.closest("form");
        const email = form.email.value;
        const password = form.password.value;

        if (!email || !password) {
            setChangeMsg("Enter your current email and password above first.");
            return;
        }
        if (newPassword.length < 6) {
            setChangeMsg("New password must be at least 6 characters.");
            return;
        }
        try {
            await logIn(email, password);
            await changePassword(newPassword);
            setChangeMsg("Password changed successfully!");
            setNewPassword("");
            setShowChangePassword(false);
        } catch (err) {
            setChangeMsg("Current email or password is incorrect.");
        }
    };

    return (
        <>
        <StyledWrapper>
            <div className="background">
            <Navbar />
            <div className='div flex mt-40 justify-center mb-20'>
            <form className="form flex justify-center w-90" onSubmit={handleLogin}>
                <div className="title">Welcome,<br /><span>Login to continue</span></div>
                {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
                <input className="input" name="email" placeholder="Email" type="email" />
                <div className="password-wrapper">
                    <input
                        className="input"
                        name="password"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                    />
                    <button
                        type="button"
                        className="eye-btn"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                <button
                    type="button"
                    className="change-password-link"
                    onClick={() => setShowChangePassword(!showChangePassword)}
                >
                    Change Password
                </button>
                {showChangePassword && (
                    <div className="change-password-section">
                        <div className="password-wrapper">
                            <input
                                className="input"
                                placeholder="New Password"
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className="button-confirm"
                            style={{ margin: "10px 0", width: "100%" }}
                            onClick={handleChangePassword}
                        >
                            Update
                        </button>
                        {changeMsg && <p style={{ color: changeMsg.includes("success") ? "green" : "red", fontSize: "12px" }}>{changeMsg}</p>}
                    </div>
                )}
                <div className="login-with">
                    <div className="button-log" onClick={handleGoogleSignIn}>
                        <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="56.6934px" viewBox="0 0 56.6934 56.6934" version="1.1" style={{enableBackground: 'new 0 0 56.6934 56.6934'}} id="Layer_1" height="56.6934px" className="icon"><path d="M51.981,24.4812c-7.7173-0.0038-15.4346-0.0019-23.1518-0.001c0.001,3.2009-0.0038,6.4018,0.0019,9.6017  c4.4693-0.001,8.9386-0.0019,13.407,0c-0.5179,3.0673-2.3408,5.8723-4.9258,7.5991c-1.625,1.0926-3.492,1.8018-5.4168,2.139  c-1.9372,0.3306-3.9389,0.3729-5.8713-0.0183c-1.9651-0.3921-3.8409-1.2108-5.4773-2.3649  c-2.6166-1.8383-4.6135-4.5279-5.6388-7.5549c-1.0484-3.0788-1.0561-6.5046,0.0048-9.5805  c0.7361-2.1679,1.9613-4.1705,3.5708-5.8002c1.9853-2.0324,4.5664-3.4853,7.3473-4.0811c2.3812-0.5083,4.8921-0.4113,7.2234,0.294  c1.9815,0.6016,3.8082,1.6874,5.3044,3.1163c1.5125-1.5039,3.0173-3.0164,4.527-4.5231c0.7918-0.811,1.624-1.5865,2.3908-2.4196  c-2.2928-2.1218-4.9805-3.8274-7.9172-4.9056C32.0723,4.0363,26.1097,3.995,20.7871,5.8372  C14.7889,7.8907,9.6815,12.3763,6.8497,18.0459c-0.9859,1.9536-1.7057,4.0388-2.1381,6.1836  C3.6238,29.5732,4.382,35.2707,6.8468,40.1378c1.6019,3.1768,3.8985,6.001,6.6843,8.215c2.6282,2.0958,5.6916,3.6439,8.9396,4.5078  c4.0984,1.0993,8.461,1.0743,12.5864,0.1355c3.7284-0.8581,7.256-2.6397,10.0725-5.24c2.977-2.7358,5.1006-6.3403,6.2249-10.2138  C52.5807,33.3171,52.7498,28.8064,51.981,24.4812z" /></svg>
                    </div>
                </div>
                <button className="button-confirm">Let`s go →</button>
            </form>
            </div>
                <Footer />
            </div>
        </StyledWrapper>
        </>
    );
}

const StyledWrapper = styled.div`
    .form {
        --input-focus: #2d8cf0;
        --font-color: #323232;
        --font-color-sub: #666;
        --bg-color: beige;
        --main-color: black;
        --darkblue:#0B2533;
        --deepnavy:#031926;
        --mediumteal:#468189;
        --softteal:#77ACA2;
        --mutedaqua:#9DBEBB;
        --warmsand:#F4E9CD;
        padding: 20px;
        background: var(---softteal);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 20px;
        border-radius: 5px;
        border: 2px solid var(---warmsand);
        box-shadow: 4px 4px var(---warmsand);
    }
    .background{
        background: var(---deepnavy) ;
    }

    .title {
        color: var(---deepnavy);
        font-weight: 900;
        font-size: 20px;
        margin-bottom: 25px;
    }

    .title span {
        color: var(---deepnavy);
        font-weight: 600;
        font-size: 17px;
    }

    .input {
        width: 250px;
        height: 40px;
        border-radius: 5px;
        border: 2px solid var(---deepnavy);
        background-color: var(---softteal);
        box-shadow: 4px 4px var(---deepnavy);
        font-size: 15px;
        font-weight: 600;
        color: var(---warmsand);
        padding: 5px 10px;
        outline: none;
    }

    .input::placeholder {
        color: var(---deepnavy);
        opacity: 0.8;
    }

    .input:focus {
        border: 2px solid var(---mutedaqua);
    }

    .password-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .eye-btn {
        position: absolute;
        right: 10px;
        background: none;
        border: none;
        color: var(---deepnavy);
        cursor: pointer;
        font-size: 18px;
        padding: 0;
        display: flex;
        align-items: center;
    }

    .change-password-link {
        background: none;
        border: none;
        color: var(---deepnavy);
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        text-decoration: underline;
        padding: 0;
    }

    .change-password-section {
        width: 250px;
    }

    .login-with {
        display: flex;
        gap: 20px;
    }

    .button-log {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        border: 2px solid var(---deepnavy);
        background-color: var(---softteal);
        box-shadow: 4px 4px var(---deepnavy);
        color: var(---warmsand);
        font-size: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon {
        width: 24px;
        height: 24px;
        fill: var(---warmsand);
    }

    .button-log:active, .button-confirm:active {
        box-shadow: 0px 0px var(---warmsand);
        transform: translate(3px, 3px);
    }

    .button-confirm {
        margin: 50px auto 0 auto;
        width: 120px;
        height: 40px;
        border-radius: 5px;
        border: 2px solid var(---deepnavy);
        background-color: var(---softteal);
        box-shadow: 4px 4px var(---deepnavy);
        font-size: 17px;
        font-weight: 600;
        color: var(---deepnavy);
        cursor: pointer;
    }`;
export default Login;
