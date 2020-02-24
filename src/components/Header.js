import React, { useContext } from 'react'
import { FaFacebookF } from "react-icons/fa"

import firebaseContext from './../firebase/context';

const Header = () => {
    const { user, firebase } = useContext(firebaseContext)

    return(
        <div className="header">
            <h1 className="header-title">TwitCoders</h1>
            {
                user ?
                <button type="button" className="login-btn" onClick={() => firebase.logout()}>
                    <FaFacebookF/>
                    Logout
                </button>
                :
                <button type="button" className="login-btn" onClick={() => firebase.login('facebook')}>
                    <FaFacebookF/>
                    Login
                </button>
            }
        </div>
    )
}

export default Header