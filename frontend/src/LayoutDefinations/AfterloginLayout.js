import React from 'react'
import AfterLoginNavbar from '../components/MainComponents/AfterLoginNavbar'

const AfterloginLayout = ({ children }) => {
    return (
        <div>
            <AfterLoginNavbar />
            {children}
        </div>
    )
}

export default AfterloginLayout