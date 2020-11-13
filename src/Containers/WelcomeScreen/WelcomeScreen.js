import React from 'react'
import classes from './WelcomeScreen.module.css'
import virus from '../../assets/coronavirus.svg'
import { NavLink } from 'react-router-dom'
const WelcomeScreen = (props) => {
    return (
        <div className={classes.Container}>
            <img src={virus} />
            <div className={classes.Content}>
                <h1>Welcome</h1>
                <h5 className={classes.subtext}>In-Store:</h5>
                <NavLink to="/qrcodescanner">
                    <button>Scan QR Code</button>
                </NavLink>
                <h5 className={classes.subtext}>Out-Store:</h5>
                <NavLink to="/searchlocations">
                    <button>Search Locations</button>
                </NavLink>

            </div>
            <div>

            </div>
        </div>
    )
}

export default WelcomeScreen