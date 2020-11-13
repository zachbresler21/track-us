import React, { useState, useRef } from 'react'
import classes from './SearchLocations.module.css'
const SearchLocations = (props) => {



    return (
        <div className={classes.Container}>
            <input type="text" placeholder="Search Locations" />
            <div className={classes.Results}>

            </div>
        </div>
    )
}

export default SearchLocations