import React from 'react';
import Home from '../components/HomeComponents/Home';
import LoginPage from '../components/HomeComponents/LoginPage';
import Register from '../components/HomeComponents/Register';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MainHome from '../components/MainComponents/MainHome';
import Beforeloginlayout from '../LayoutDefinations/Beforeloginlayout';
import AfterloginLayout from '../LayoutDefinations/AfterloginLayout';
const RouteDefinations = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Beforeloginlayout><Home /></Beforeloginlayout>} />
                <Route path="/login" element={<Beforeloginlayout><LoginPage /></Beforeloginlayout>} />
                <Route path="/register" element={<Beforeloginlayout><Register /></Beforeloginlayout>} />
                <Route path="/mainhome" element={<AfterloginLayout><MainHome /></AfterloginLayout>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteDefinations;