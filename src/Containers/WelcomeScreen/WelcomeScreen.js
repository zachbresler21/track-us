import React, { useEffect } from 'react'
import classes from './WelcomeScreen.module.css'
import virus from '../../assets/coronavirus.svg'
import { NavLink } from 'react-router-dom'
import search from '../../assets/searchLocations.svg'
import qrcodescan from '../../assets/qrcodescan.svg'
import * as actions from '../../store/actions/locations'
import { connect } from 'react-redux'
const WelcomeScreen = (props) => {
    useEffect(() => {
        props.OnWipeState()
    }, [])
    return (
        <div className={classes.Container}>
            <img src={virus} alt="virus" className={classes.virusImage} />
            <div className={classes.Content}>
                <h1>Welcome</h1>
                <p>Please select an option.</p>
                <div className={classes.Buttons}>
                    {/* <h5 className={classes.subtext}>In-Store:</h5> */}
                    <NavLink to="/qrcodescanner" activeClassName={classes.MarginTop}>
                        <button><img src={qrcodescan} alt="qrscan" />Scan QR Code</button>
                    </NavLink>
                    <h2 className={classes.ORH2}><span>or</span></h2>
                    <NavLink to="/searchlocations" activeClassName={classes.MarginTop}>
                        <button><img src={search} alt="search" />Search Locations</button>
                    </NavLink>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        locationId: state.locations.location_id,
        personalInfo: state.information.personal_info
    };
}

const mapDispatchToProps = dispatch => {
    return {
        OnWipeState: () => dispatch(actions.wipeState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)