import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Home from '../components/HomeComponents/Home';
import LoginPage from '../components/HomeComponents/LoginPage';
import Register from '../components/HomeComponents/Register';
import MainHome from '../components/MainComponents/MainHome';
import Beforeloginlayout from '../LayoutDefinations/Beforeloginlayout';
import AfterloginLayout from '../LayoutDefinations/AfterloginLayout';
import ViewDownloads from '../components/MainComponents/ViewDownloads';
import UploadFiles from '../components/MainComponents/UploadFiles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPasswordReset from '../components/HomeComponents/ForgetPasswordReset';


const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
};
const RouteDefinations = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={isAuthenticated() ? <Navigate to="/mainHome" /> : <Beforeloginlayout><Home /></Beforeloginlayout>}
                />
                <Route
                    path='/passwordreset'
                    element={<Beforeloginlayout><ToastContainer /><ForgetPasswordReset /></Beforeloginlayout>}
                />
                <Route
                    path="/login"
                    element={isAuthenticated() ? <Navigate to="/mainHome" /> : <Beforeloginlayout><ToastContainer /><LoginPage /></Beforeloginlayout>}
                />
                <Route
                    path="/register"
                    element={isAuthenticated() ? <Navigate to="/mainHome" /> : <Beforeloginlayout><ToastContainer /><Register /></Beforeloginlayout>}
                />
                <Route
                    path="/uploadFiles"
                    element={isAuthenticated() ? <AfterloginLayout><ToastContainer /><UploadFiles /></AfterloginLayout> : <Navigate to="/" />}
                />
                <Route
                    path="/viewDownloads"
                    element={isAuthenticated() ? <AfterloginLayout><ToastContainer /><ViewDownloads /></AfterloginLayout> : <Navigate to="/" />}
                />
                <Route
                    path="/mainHome"
                    element={isAuthenticated() ? <AfterloginLayout><MainHome /></AfterloginLayout> : <Navigate to="/" />}
                />

            </Routes>
        </BrowserRouter>
    );
};

export default RouteDefinations;
