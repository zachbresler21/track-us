import React from 'react'
import ReportForm from '../../Components/Forms/ReportForm/ReportForm'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/locations'

const Report = (props) => {
    return (
        <ReportForm
        />
    )
}

const mapStateToProps = state => {
    return {

    };
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
