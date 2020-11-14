import React from 'react'
import classes from './LocationProfile.module.css'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/locations'
import location from '../../assets/location.svg'

const LocationProfile = (props) => {

    // const { bgcolor, completed } = props;

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
        backgroundColor: '#3f79fb',
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
                {/* <canvas id="myChart" width="400" height="400"></canvas> */}
                <div className={classes.TopSection}>
                    <div className={classes.Rating}>
                        <span>3.5</span>
                        <img src="" alt="star" />
                    </div>
                    <div className={classes.imageContainer}>
                        {/* <img src="" alt="company image" /> */}
                        <div style={{ backgroundImage: `url(${props.location_info.image})` }}></div>
                    </div>
                </div>

                <div className={classes.Title}>
                    <h1>Makro</h1>
                    <div className={classes.Location}>
                        <img src={location} alt="location icon" />
                        <h5>Montague Gardens</h5>
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
                        <span className={classes.TextTot}>Total num people per day</span>
                    </div>
                    <button className={classes.ScanQR}>Scan QR Code</button>
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