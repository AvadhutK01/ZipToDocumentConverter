import React from 'react'
import Navbar from '../components/HomeComponents/navbar'
import Footer from '../components/HomeComponents/footer'

const Beforeloginlayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default Beforeloginlayout