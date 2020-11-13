import React from 'react'
import classes from './LocationProfile.module.css'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/locations'

const LocationProfile = (props) => {
    console.log(props.location_info)
    return (
        <div className={classes.Container}>
            
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