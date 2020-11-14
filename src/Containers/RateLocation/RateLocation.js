import React, { useEffect } from 'react'
import classes from './RateLocation.module.css'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/locations'
import RateForm from '../../Components/RateForm/RateForm'

const RateTaxi = (props) => {

    return (
        <div className={classes.Container}>
            <h5>
                Rate the {props.location_info.name} from 1 to 5<br />
                1 = Unsatisfactory<br />
                5 = Excellent
            </h5>
            <RateForm
                OnRateLocation={props.OnRateLocation}
                location_id={props.location_ic}
                OnSetFeedbackModal={props.OnSetFeedbackModal}
                showFeedbackModal={props.showFeedbackModal}
                avg_rating={props.location_info.avg_rating}
            />
        </div>
    )
}
const mapStateToProps = state => {
    return {
        location_info: state.locations.location_info,
        showFeedbackModal: state.locations.showFeedbackModal,
        location_id: props.location.location_id
    };
}

const mapDispatchToProps = dispatch => {
    return {
        OnRateLocation: (rating, location_id, avg_rating, capacity) => dispatch(actions.rateTaxi(rating, location_id, avg_rating, capacity)),
        OnSetFeedbackModal: (val) => dispatch(actions.setFeedbackModalState(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RateTaxi)