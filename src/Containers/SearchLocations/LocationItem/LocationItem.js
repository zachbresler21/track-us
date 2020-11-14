import React from 'react'
import classes from './LocationItem.module.css'

const LocationItem = (props) => {
    return (
        <div className={classes.Container}>
            <div className={classes.Image}>
                <img src={props.image}/>
            </div>
            <div className={classes.LocationInfo}>
                {/* <span>3.5</span>
                <span>Makro </span>
                <span>Montague Gardens</span> */}
                <span>{props.rating}</span>
                <span>{props.name} </span>
                <span>{props.location}</span>
            </div>
        </div>
    )
}

export default LocationItem