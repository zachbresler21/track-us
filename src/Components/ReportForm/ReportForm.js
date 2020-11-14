import React, { useState, useRef } from 'react'
import classes from './ReportIncident.module.css'
import FeedbackModal from '../../Modal/FeedbackModal/FeedbackModal'
import { useHistory } from 'react-router-dom'
import OutsideAlerter from '../../OutsideAlerter/OutsideAlerter'

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
        location: {
            elementType: 'input',
            name: 'Location of Incident',
            value: '',
            validation: {
            },
            valid: true,
            touched: false
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
        if (inputIdentifier !== "location") {
            const updatedFormElement = updateObject(reportInfo[inputIdentifier], {
                value: event.target.value,
                touched: true
            });
            updatedReportInfo = updateObject(reportInfo, {
                [inputIdentifier]: updatedFormElement
            });
        }else{setShowResult(false)
            setSearch(event.target.textContent)
            const updatedFormElement = updateObject(reportInfo[inputIdentifier], {
                value: event.target.textContent,
                touched: true
            });
            updatedReportInfo = updateObject(reportInfo, {
                [inputIdentifier]: updatedFormElement
            });
        }


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
        props.OnReportIncident(formData, props.taxi_numberplate)
        setTimeout(() => {
            props.OnSetFeedbackModal(false)
        }, 3500)
    };

    let incidents = ["Accident", "Unroadworthy", "Overcrowding", "Reckless Driving", "Speeding", "Other"].map(incident =>
        <div key = {incident} className={selectedTags.includes(incident) ? classes.IncidentType : classes.SelectedIncidentType} onClick={() => selectTagHandler(incident)}>
            {incident}
        </div>)
    const [showResult, setShowResult] = useState(false)
    const [search, _setSearch] = useState("");

    const searchRef = useRef(search);

    const setSearch = val => {
        searchRef.current = val;
        _setSearch(val);
    }
    const locations = ["Milnerton", "Rondebosch", "Claremont", "Town", "Plattekloof", "Plumstead", "Sandton", "Hilbrow"]
    const searchLocations = (term) => {
        let lowercase = term.toLowerCase()
        return locations.filter(location => location.toLowerCase().indexOf(lowercase) >= 0)
    }
    const [result, setResult] = useState(["Milnerton", "Rondebosch", "Claremont", "Town", "Plattekloof", "Plumstead", "Sandton", "Hilbrow"]);
    const handleChange = (e) => {
        setShowResult(true)
        let search = searchRef.current;
        search = e.target.value;
        setSearch(search);
        setResult(searchLocations(searchRef.current))
    }

    let viewResults = result.map(location => (<li className={classes.ListResult} key = {location} onClick={(event) => inputChangedHandler(event, "location")}>{location}</li>))

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


                    <OutsideAlerter removeResults={setShowResult} showResult={showResult}>
                        <div className={classes.SegmentedComponent}>
                            <label > Location:  </label>
                            <input
                                type="input"
                                value={searchRef.current}
                                name={reportInfo.name}
                                className={classes.Input}
                                onChange={handleChange}
                                // value={searchRef.current}
                            />
                        </div>
                        {showResult && viewResults.length > 0 ? <div className={classes.SuggestedLocation_container}>
                            {viewResults}
                        </div> : null}
                    </OutsideAlerter>
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
                <h1> TAXI: {props.taxi_numberplate} </h1>
                <div>
                    {form}
                </div>
            </div>
        </>
    )
}

export default ReportIncidentForm;
