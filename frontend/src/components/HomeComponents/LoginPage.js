import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthProviders/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const { login } = useAuth();
    const [uname, setUname] = useState('');
    const [pass, setPass] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = {
            username: uname,
            password: pass,
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_HOST_NAME}/user/Login`, loginData);

            if (response.data.message === "success") {
                login(uname);
                localStorage.setItem('Z2Dtoken', response.data.token);
                window.location.href = '/mainHome';
            }
        } catch (error) {
            console.log(error);
            if (error.response.data) {
                if (error.response.data === 'loginfailed') {
                    toast.warning("Invalid Credentials")
                }
            }
            else {
                toast.error("Failed to log in! Please try again later.");
            }
        }
    };


    return (
        <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-md-9 col-lg-6 col-xl-6 my-lg-5 py-lg-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1 my-lg-5 py-lg-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="userid" style={{ marginLeft: '0px' }}>User Name:</label>
                        <input type="text" id="userid" onChange={(e) => { setUname(e.target.value) }} className="form-control form-control-lg" placeholder="Enter a valid user name" />
                        <div className="form-notch"><div className="form-notch-leading" style={{ width: '9px' }}></div><div className="form-notch-middle" style={{ width: '88.8px' }}></div><div className="form-notch-trailing"></div></div>
                    </div>
                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="password" style={{ marginLeft: '0px' }}>Password</label>
                        <input type="password" id="password" onChange={(e) => { setPass(e.target.value) }} className="form-control form-control-lg" placeholder="Enter password" />
                        <div className="form-notch"><div className="form-notch-leading" style={{ width: '9px' }}></div><div className="form-notch-middle" style={{ width: '64px' }}></div><div className="form-notch-trailing"></div></div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <Link to={'/passwordreset'} className="text-body">Forgot password?</Link>
                    </div>

                    <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register" className="link-danger">Register</Link></p>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default LoginPage;
