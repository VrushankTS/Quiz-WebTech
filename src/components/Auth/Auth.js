import React, { useState } from "react";
import "../Auth/Auth.css";
import Signup from "./Signup";
import Login from "./Login";
import axios from "axios";
import store from "../../store/index";
import Toast from "../Toast/Toast";
import { useNavigate } from 'react-router-dom';

function Auth() {
    const [tab, setTab] = useState('login');
    const [showToast, setShowToast] = useState(false); // Add state to control toast visibility
    const navigate = useNavigate();

    const logIn = (email, password) => {
        axios.post('/api/users/login', { email, password }).then(res => {
            if (res.data.success) {
                store.dispatch({
                    type: 'login',
                    _id: res.data.user._id,
                    user: res.data.user,
                    token: res.data.token
                });
                // Use navigate to navigate to dashboard
                navigate('/dashboard');
            } else {
                // Show toast message for incorrect login
                setShowToast(true);
            }
        }).catch(er => {
            console.log(er);
        });
    }

    const signUp = (email, password, firstName, lastName) => {
        axios.post('/api/users/register', { email, password, firstName, lastName }).then(res => {
            if (res.data.success) {
                setTab('login');
            }
            console.log(res.data);
        }).catch(er => {
            console.log(er);
        });
    }

    const changeTab = () => {
        setTab(prevTab => prevTab === 'signup' ? 'login' : 'signup');
    }

    let page = tab === 'login' ? <Login logIn={logIn} /> : <Signup signUp={signUp} />;
    let buttonText = tab === 'login' ? 'New to Triviaplaza? Sign Up here' : 'Already have an account with us? Sign In';

    return (
        <div className="auth-wrapper">
            <div className="left"></div>
            <div className="right">
                <div className="header">Triviaplaza</div>
                <div className="sub-header">Welcome to Triviaplaza</div>
                {page}
                <div className="new" onClick={changeTab}>{buttonText}</div>
            </div>
            {/* Render the Toast component conditionally */}
            <Toast message="Incorrect Login" model={showToast} backgroundColor='#FF4539' />
        </div>
    );
}
export default Auth;
