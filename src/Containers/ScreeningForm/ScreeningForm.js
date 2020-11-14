import React, { useState, useRef } from 'react'
import { connect } from 'react-redux';
import classes from './ScreeningForm.module.css'
import { updateObject } from '../../shared/utility';
import blankcheck from '../../assets/blank-check-box.svg'
import checkbox from '../../assets/check-box.svg'
import * as actions from '../../store/actions/information'
import { NavLink, Redirect } from 'react-router-dom';


const ScreeningForm = (props) => {
    const clone = require('rfdc')()

    const [formData, _setFormData] = useState(
        {
            temperature: 0,
            travelled: false,
            contact: false,
        }
    )

    const formRef = useRef(formData);

    const setFormData = val => {
        formRef.current = val;
        _setFormData(val);
    }

    const onChangeHandler = (e, answer) => {
        const value = e.target.value
        let updatedData = formData
        if (e.target.name === "travelled") {
            updatedData = updateObject({
                ...formData,
                [e.target.name]: answer
            })
        }
        else if (e.target.name === "contact") {
            updatedData = updateObject({
                ...formData,
                [e.target.name]: answer
            })
        }
        else {
            updatedData = updateObject({
                ...formData,
                [e.target.name]: value
            })
        }

        setFormData(updatedData)
    }

    const [selectedSymptoms, setselectedSymptoms] = useState([]);

    const selectSymptomHandler = (symptom) => {
        let copySymptoms = clone(selectedSymptoms)
        if (copySymptoms.includes(symptom)) {
            copySymptoms = copySymptoms.filter(copySymptom => copySymptom !== symptom)
        }
        else if (copySymptoms !== undefined && copySymptoms !== null) {
            copySymptoms.push(symptom)
        } else if (copySymptoms === null || copySymptoms === undefined) {
            copySymptoms = []
            copySymptoms.push(symptom)
        }
        setselectedSymptoms(copySymptoms)
    }


    let symptoms = ["Sore throat", "Cough", "Sweating", "Difficulty breathing", "Loss of senses", "Chills"].map(symptom =>
        <div key={symptom} className={classes.SymptomContainer} onClick={() => selectSymptomHandler(symptom)}>
            <div className={selectedSymptoms.includes(symptom) ? classes.SelectedSymptom : classes.Symptom}>
                <div className={classes.ImageContainer}>
                    {selectedSymptoms.includes(symptom) ? <img src={checkbox} /> : <img src={blankcheck} />}
                </div>
                {symptom}
            </div>
        </div>)


    const onSubmitHanlder = () => {
        props.OnSubmitInformation(props.personalInfo, { ...formData, selectedSymptoms }, props.locationId)
    }

    return (
        <div className={classes.Container}>
            <div className={classes.SectionTitle}>
                <h2> Step 2</h2>
                <p> Please complete the following screening questions</p>
            </div>
            <form className={classes.FormContainer}>

                <div className={classes.InputItem}>
                    <label>Temperature C&#176;</label>
                    <input type="number" name="temperature" onChange={(e) => onChangeHandler(e)} />
                </div>

                <div className={classes.SelectItem}>
                    <label>Have you travelled in the past 14 days?</label>
                    <div className={classes.OptionsContainer}>
                        <div className={classes.OptionItem}>
                            <input type="radio" name="travelled" onChange={(e) => onChangeHandler(e, true)} />
                            <p> Yes </p>
                        </div>
                        <div className={classes.OptionItem}>
                            <input type="radio" name="travelled" onChange={(e) => onChangeHandler(e, false)} />
                            <p> No </p>
                        </div>
                    </div>
                </div>

                <div className={classes.SelectItem}>
                    <label>Have you been in contact with someone who has tested positive for COVID in the past 14 days?</label>
                    <div className={classes.OptionsContainer}>
                        <div className={classes.OptionItem}>
                            <input type="radio" name="contact" onChange={(e) => onChangeHandler(e, true)} />
                            <p> Yes </p>
                        </div>
                        <div className={classes.OptionItem}>
                            <input type="radio" name="contact" onChange={(e) => onChangeHandler(e, false)} />
                            <p> No </p>
                        </div>
                    </div>
                </div>

                <div className={classes.SymptomSection}>
                    <label>Select any symptoms you are experiencing</label>
                    <div className={classes.SymptomsList}>
                        {symptoms}
                    </div>
                </div>
            </form>

            <div className={classes.ButtonContainer}>
                <button onClick={onSubmitHanlder}> Submit </button>
            </div>

            {props.redirect ? <Redirect to={`/location`} /> : null}

        </div>
    )
}


const mapStateToProps = state => {
    return {
        locationId: state.locations.location_id,
        personalInfo: state.information.personal_info,
        redirect: state.information.redirect
    };
}

const mapDispatchToProps = dispatch => {
    return {
        OnSubmitInformation: (personalInfo, screeningInfo, locationId) => dispatch(actions.submitInformation(personalInfo, screeningInfo, locationId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreeningForm)

