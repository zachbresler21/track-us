import React, { useState, useRef, useCallback, useEffect } from 'react'
import classes from './SearchLocations.module.css'
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/locations'
import LocationItem from './LocationItem/LocationItem'

const SearchLocations = (props) => {

    const [search, _setSearch] = useState("")

    const searchRef = useRef(search);

    const setSearch = val => {
        searchRef.current = val;
        _setSearch(val);
    }
    //delaying the automatic search by 600ms and determining which seach method to use based on the title passed as props to the table
    const delayedSearch = useCallback(debounce(() => props.OnSearchLocations(searchRef.current), 600), [search])

    const inputChangeHandler = (e) => {
        let search = searchRef.current;
        search = e.target.value;
        setSearch(search);

        props.OnSearchLocations(searchRef.current)
    }

    useEffect(() => {
        delayedSearch();
        return delayedSearch.cancel;
    }, [searchRef.current, delayedSearch]);

    return (
        <div className={classes.Container}>
            <input type="text" placeholder="Search Locations" onChange={inputChangeHandler} />
            <div className={classes.Results}>
                <h2>Select a Location</h2>
                <div className={classes.ScrollContainer}>
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                    <LocationItem />
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        error: state.locations.error,
        redirect: state.locations.redirect
    };
}

const mapDispatchToProps = dispatch => {
    return {
        OnSearchLocations: (term) => dispatch(actions.searchLocationsByTerm(term))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLocations)