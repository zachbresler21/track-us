import React from 'react'
import classes from './LocationProfile.module.css'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/locations'
import location from '../../assets/location.svg'
import star from '../../assets/star.svg';
import reports from '../../assets/reports.svg';
import { NavLink } from 'react-router-dom'
const LocationProfile = (props) => {

    let completed = Math.floor((props.location_info.num_people / props.location_info.capacity) * 100)
    const containerStyles = {
        height: 24,
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: "0 20px",
        display: "flex",
        alignItems: 'center'
    }

    const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: '#6986B9',
        borderRadius: 'inherit',
        transition: 'width 1s ease-in-out',
        fontSize: 13,
        display: "flex",
        alignItems: 'center',
        textAlign: 'right',
        justifyContent: 'flex-end'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }
    return (
        <div className={classes.Container}>
            <div className={classes.BusinessInfo}>
                <div className={classes.TopSection}>
                    <div className={classes.Rating}>
                        <span>{props.location_info.avg_rating}</span>
                        <img src={star} alt="star" />
                    </div>
                    <div className={classes.imageContainer}>
                        <div style={{ backgroundImage: `url(${props.location_info.image})` }}></div>
                    </div>
                    <div className={classes.Rating}>
                        <span>{props.location_info.total_reports}</span>
                        <img src={reports} alt="reports" className={classes.ReportImage} />
                    </div>
                </div>

                <div className={classes.Title}>
                    <h1>{props.location_info.name}</h1>
                    <div className={classes.Location}>
                        <img src={location} alt="location icon" />
                        <h5>{props.location_info.location}</h5>
                    </div>

                </div>
                <div>
                    <div style={containerStyles}>
                        <div style={fillerStyles}>
                            <span style={labelStyles}>{`${props.location_info.num_people + " / " + props.location_info.capacity}`}</span>
                        </div>
                    </div>
                    {/* <span>{props.location_info.num_people+" / "+props.location_info.capacity}</span> */}
                </div>

            </div>
            <div className={classes.ButtonsGroup}>
                <div className={classes.LeftContainer}>
                    <button className={classes.RateButton}>Rate</button>
                    <button className={classes.ReportButton}>Report</button>
                    <button className={classes.ViewButton}>View</button>
                </div>
                <div className={classes.RightContainer}>
                    <div className={classes.TotalBlock}>
                        <span className={classes.ValueTot}>239</span>
                        <span className={classes.TextTot}>Total number of people per day</span>
                    </div>
                    <NavLink to ="/qrcodescanner">
                        <button className={classes.ScanQR}>Scan QR Code</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        location_info: state.locations.location_info
    };
}

const mapDispatchToProps = dispatch => {
    return {
        OnSearchLocations: (location_id) => dispatch(actions.searchLocationsById(location_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationProfile)