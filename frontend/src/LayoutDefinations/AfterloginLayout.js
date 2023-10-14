import React from 'react'
import AfterLoginNavbar from '../components/MainComponents/AfterLoginNavbar'
import AfterLoginFooter from '../components/MainComponents/AfterLoginFooter'

const AfterloginLayout = ({ children }) => {
    return (
        <div>
            <AfterLoginNavbar />
            {children}
            <AfterLoginFooter />
        </div>
    )
}

export default AfterloginLayout