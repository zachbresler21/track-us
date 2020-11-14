import React from 'react'
import ReportForm from '../../Components/ReportForm/ReportForm'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/locations'

const Report = (props) => {
    return (
        <ReportForm
            location_name={props.location_name}
            location_id={props.location_id}
            OnReportIncident={props.OnReportIncident}
        />
    )
}

const mapStateToProps = state => {
    return {
        location_id: state.locations.location_id,
        location_name: state.locations.location_info.name
    };
}

const mapDispatchToProps = dispatch => {
    return {
        OnReportIncident: (report, location_id) => dispatch(actions.reportIncident(report, location_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
