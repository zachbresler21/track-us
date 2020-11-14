import React, { useState, useRef } from 'react'
import classes from './RateForm.module.css'
import StarRating from 'react-svg-star-rating';
import { updateObject } from '../../../shared/utility';
import FeedbackModal from '../../Modal/FeedbackModal/FeedbackModal'
import { useHistory } from 'react-router-dom'
const RateForm = (props) => {
    let history = useHistory()

    const [rating, _setRating] = useState({
        value: 1,
        add_info: ""
    })

    const ratingRef = useRef(rating)
    const setRating = (val) => {
        ratingRef.current = val
        _setRating(val)
    }

    const inputHandler = (event) => {
        const value = event.target.value
        const updatedRating = updateObject(rating, {
            add_info: value
        })
        setRating(updatedRating)
    }
    const ratingHandler = (value) => {
        const updatedRating = updateObject(rating, {
            value: value
        })
        setRating(updatedRating)
    }

    const onClickHandler = (event) => {
        event.preventDefault()

    }
    return (
        <>
            <FeedbackModal
                close={() => props.OnSetFeedbackModal(false)}
                show={props.showFeedbackModal} >
            </FeedbackModal>
            <div className={classes.Container}>
                <StarRating
                    handleOnClick={ratingHandler}
                    initialRating={1}
                    size={50}
                    innerRadius={18}
                    isReadOnly={false}
                    isHalfRating={true}
                />
                <form className={classes.Form}>
                    <label>Additional Information</label>
                    <textarea onChange={inputHandler} placeholder={"Add any additional information about this rating"} />
                    <div className={classes.ButtonGroup}>
                        <button className={classes.SecondaryButton} onClick={() => history.push("/home")}>Cancel</button>
                        <button onClick={onClickHandler} className={classes.PrimaryButton}>Rate</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RateForm