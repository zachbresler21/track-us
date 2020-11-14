import React, { useState } from 'react'
import classes from './LocationItem.module.css'
import star from '../../../assets/star.svg'
import location from '../../../assets/location.svg'
const LocationItem = (props) => {
    const [redirect, setRedirect] = useState("")

    const onClickHandler = (id) => {
        // setRedirect(<Redirect to="/location" />)
        props.OnSearchLocationsById(id)
    }
    return (
        <>
            {/* {redirect} */}
            <div className={classes.Container} onClick={() => onClickHandler(props.location_id)}>
                <div className={classes.Image}>
                    <img src={props.image} alt="image business" />
                </div>
                <div className={classes.LocationInfo}>
                    <span className={classes.Star}>{props.rating} <img src={star} alt="star" /></span>
                    <span className={classes.Title}>{props.name} </span>
                    <span className={classes.Location}><img src={location} alt="star" />{props.location}</span>
                </div>
            </div>
        </>
    )
}

export default LocationItem