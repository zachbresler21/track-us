import React, { useState, useRef } from 'react'
import { connect } from 'react-redux';
import classes from './ScreeningForm.module.css'
import { updateObject } from '../../shared/utility';
import blankcheck from '../../assets/blank-check-box.svg'
import checkbox from '../../assets/check-box.svg'


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

    const onChangeHandler = (e) => {
        const value = e.target.value
        let updatedData = formData
        updatedData = updateObject({
            ...formData,
            [e.target.name]: value
        })
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
        <div key = {symptom} className={classes.SymptomContainer} onClick={() => selectSymptomHandler(symptom)}>
            <div className={selectedSymptoms.includes(symptom) ? classes.SelectedSymptom : classes.Symptom}>
                <div className={classes.ImageContainer}>
                    {selectedSymptoms.includes(symptom) ? <img src = {checkbox}/> : <img src = {blankcheck}/>}
                </div>
                {symptom}
            </div>
        </div>)

    return (
        <div className={classes.Container}>
            <div className={classes.SectionTitle}>
                <h2> Step 2</h2>
                <p> Please complete the following screening questions</p>
            </div>
            <form className={classes.FormContainer}>

            <div className={classes.InputItem}>
                    <label>Temperature</label>
                    <input type ="number" name="temperature" onChange={(e) => onChangeHandler(e)} />
                </div>

                <div className={classes.SelectItem}>
                    <label>Have you travelled in the past 14 days?</label>
                    <div className={classes.OptionsContainer}>
                        <div className={classes.OptionItem}>
                            <input type="radio" name="travelled"  onChange={(e) => onChangeHandler(e)} />
                            <p> Yes </p>
                        </div>
                        <div className={classes.OptionItem}>
                            <input type="radio" name="travelled"  onChange={(e) => onChangeHandler(e)} />
                            <p> No </p>
                        </div>
                    </div>
                </div>

                <div className={classes.SelectItem}>
                    <label>Have you been in contact with someone who has tested positive for COVID in the past 14 days?</label>
                    <div className={classes.OptionsContainer}>
                        <div className={classes.OptionItem}>
                            <input type="radio" name="contact"  onChange={(e) => onChangeHandler(e)} />
                            <p> Yes </p>
                        </div>
                        <div className={classes.OptionItem}>
                            <input type="radio" name="contact"  onChange={(e) => onChangeHandler(e)} />
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

            <div className ={classes.ButtonContainer}>
                <button> Submit </button>
            </div>
        </div>

    )
}

export default ScreeningForm
