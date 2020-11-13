import React from 'react'
import classes from './WelcomeScreen.module.css'
import virus from '../../assets/coronavirus.svg'
import { NavLink } from 'react-router-dom'
import search from '../../assets/searchLocations.svg'
import qrcodescan from '../../assets/qrcodescan.svg'
const WelcomeScreen = (props) => {
    return (
        <div className={classes.Container}>
            <img src={virus} alt="virus" className={classes.virusImage} />
            <div className={classes.Content}>
                <h1>Welcome</h1>
                <div className={classes.Buttons}>
                    {/* <h5 className={classes.subtext}>In-Store:</h5> */}
                    <NavLink to="/qrcodescanner">
                        <button><img src={qrcodescan} alt="qrscan" />Scan QR Code</button>
                    </NavLink>
                    {/* <h5 className={classes.subtext}>Out-Store:</h5> */}
                    <NavLink to="/searchlocations">
                        <button><img src={search} alt="search" />Search Locations</button>
                    </NavLink>
                </div>


            </div>
            <div>

            </div>
        </div>
    )
}

export default WelcomeScreen