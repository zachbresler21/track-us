import React, { useState, useRef } from 'react'
import classes from './ReportForm.module.css'
import FeedbackModal from '../../Components/FeedbackModal/FeedbackModal'

import { useHistory } from 'react-router-dom'

const ReportIncidentForm = props => {
    const clone = require('rfdc')()
    let history = useHistory()
    const [reportInfo, setReportInfo] = useState({
        date: {
            elementType: 'input',
            name: 'Date of Incident',
            value: '',
            validation: {
                maxDate: new Date().toLocaleString(),
                compulsory: true
            },
            valid: true,
            errorMessage: ""
        },
        time: {
            elementType: 'input',
            name: 'Time of Incident',
            value: '',
            validation: {

            },
            valid: true
        },
        add_info: {
            elementType: 'textarea',
            name: 'Additional Information of Incident',
            value: '',
            validation: {

            },
            valid: true,
            touched: false
        },

    });

    const [selectedTags, setSelectedTags] = useState([]);

    const updateObject = (oldObject, updatedProperties) => {
        return {
            ...oldObject,
            ...updatedProperties
        };
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        let updatedReportInfo = clone(reportInfo)
        const updatedFormElement = updateObject(reportInfo[inputIdentifier], {
            value: event.target.value,
            touched: true
        });
        updatedReportInfo = updateObject(reportInfo, {
            [inputIdentifier]: updatedFormElement
        });

        setReportInfo(updatedReportInfo);
    }

    const selectTagHandler = (incident) => {
        let copyTags = clone(selectedTags)
        if (copyTags.includes(incident)) {
            copyTags = copyTags.filter(copyIncident => copyIncident !== incident)
        }
        else if (copyTags !== undefined && copyTags !== null) {
            copyTags.push(incident)
        } else if (copyTags === null || copyTags === undefined) {
            copyTags = []
            copyTags.push(incident)
        }
        setSelectedTags(copyTags)
    }

    const formHandler = event => {
        event.preventDefault()
        const formData = {}
        for (let formElementIdentifier in reportInfo) {
            formData[formElementIdentifier] = reportInfo[formElementIdentifier].value
        }
        formData["tags"] = selectedTags
        props.OnReportIncident(formData, props.location_id)
        setTimeout(() => {
            props.OnSetFeedbackModal(false)
        }, 3500)
    };

    let incidents = ["Unsafe", "Inefficient", "Unhelpful Staff", "Reckless Staff", "Not Enforcing Rules", "Over Capacity", "No Sanisiter","Other"].map(incident =>
        <div key={incident} className={selectedTags.includes(incident) ? classes.SelectedIncidentType : classes.IncidentType} onClick={() => selectTagHandler(incident)}>
            {incident}
        </div>)

    let form = (
        <form className={classes.formIncident}>
            <div className={classes.InputContainer}>
                <div className={classes.TopSection}>
                    <div className={classes.DateTime}>
                        <div className={classes.SegmentedComponentT}>
                            <label > Date:  </label>
                            <input
                                type="date"
                                value={reportInfo.date.value}
                                name={reportInfo.name}
                                className={classes.InputT}
                                onChange={event => inputChangedHandler(event, "date")}
                            />
                        </div>
                        <div className={classes.SegmentedComponentT}>
                            <label > Time:  </label>
                            <input
                                type="time"
                                value={reportInfo.time.value}
                                name={reportInfo.name}
                                className={classes.InputT}
                                onChange={event => inputChangedHandler(event, "time")}
                            />
                        </div>
                    </div>

                </div>

                <div className={classes.IncidentTypeList}>
                    {incidents}
                </div>

                <div className={classes.Additional}>
                    <textarea
                        type="input"
                        value={reportInfo.add_info.value}
                        placeholder={"Any Additional Information"}
                        className={classes.TextAreaInput}
                        onChange={event => inputChangedHandler(event, "add_info")}
                    />
                </div>

                <div className={classes.ButtonGroup}>
                    <button className={classes.CancelButton} onClick={() => history.push("/home")}> Cancel</button>
                    <button className={classes.SaveButton} onClick={(event) => formHandler(event)}> Save</button>
                </div>
            </div>
        </form>
    )

    return (
        <>
            <FeedbackModal
                close={() => props.OnSetFeedbackModal(false)}
                show={props.showFeedbackModal} >
            </FeedbackModal>
            <div className={classes.Container}>
                <h1> Location: {props.location_name} </h1>
                <div>
                    {form}
                </div>
            </div>
        </>
    )
}

export default ReportIncidentForm;
