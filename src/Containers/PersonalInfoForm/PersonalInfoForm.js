import React, { useState, useRef } from 'react'
import { connect } from 'react-redux';
import classes from './PersonalInfoForm.module.css'
import { updateObject } from '../../shared/utility';
import * as actions from '../../store/actions/information'
import { useHistory } from 'react-router-dom';

const PersonalInfoForm = (props) => {

    const [formData, _setFormData] = useState({
        firstname: "",
        lastname: "",
        idnum: "",
        email: "",
        contact: "",
    })

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

    // let redirect = null
    let history = useHistory()
    const onNextHandler = () => {
        props.OnSaveData(formData)
        history.push("/screeninginfo")
    }

    return (
        <div className={classes.Container}>
            <div className={classes.SectionTitle}>
                <h2> Step 1</h2>
                <p> Please fill in your personal information</p>
            </div>
            <form className={classes.FormContainer}>
                <div className={classes.InputItem}>
                    <label>First Name</label>
                    <input type="text" name="firstname" placeholder="Your First Name" onChange={(e) => onChangeHandler(e)} />
                </div>

                <div className={classes.InputItem}>
                    <label>Last Name</label>
                    <input type="text" name="lastname" placeholder="Your Last Name" onChange={(e) => onChangeHandler(e)} />
                </div>

                <div className={classes.InputItem}>
                    <label>ID Number</label>
                    <input type="text" name="idnum" placeholder="Your ID Number" onChange={(e) => onChangeHandler(e)} />
                </div>

                <div className={classes.InputItem}>
                    <label>Email Address</label>
                    <input type="text" name="email" placeholder="Your Email Address" onChange={(e) => onChangeHandler(e)} />
                </div>

                <div className={classes.InputItem}>
                    <label>Contact Number</label>
                    <input type="text" name="contact" placeholder="Your Contact Number" onChange={(e) => onChangeHandler(e)} />
                </div>
            </form>

            <div className={classes.ButtonContainer}>
                <button onClick={() => { onNextHandler() }}> Next </button>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        OnSaveData: (personalInfo) => dispatch(actions.savePersonalInfo(personalInfo)),
    }
}

export default connect(null, mapDispatchToProps)(PersonalInfoForm)