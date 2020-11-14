import React, { useEffect } from 'react'
import classes from './RateLocation.module.css'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/locations'
import RateForm from '../../Components/RateForm/RateForm'

const RateLocation = (props) => {

    return (
        <div className={classes.Container}>
            <h5>
                Rate {props.location_info.name} from 1 to 5<br />
                1 = Unsatisfactory<br />
                5 = Excellent
            </h5>
            <RateForm
                OnRateLocation={props.OnRateLocation}
                location_id={props.location_id}
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
        location_id: state.locations.location_id
    };
}

const mapDispatchToProps = dispatch => {
    return {
        OnRateLocation: (rating, location_id, avg_rating) => dispatch(actions.rateLocation(rating, location_id, avg_rating)),
        // OnSetFeedbackModal: (val) => dispatch(actions.setFeedbackModalState(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RateLocation)