import React, { useState, useRef, useCallback, useEffect } from 'react'
import classes from './SearchLocations.module.css'
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/locations'
import LocationItem from './LocationItem/LocationItem'
import { Redirect } from 'react-router-dom'

import Spinner from '../../Components/Spinner/Spinner'
import navigation from '../../assets/navigation.png'

const SearchLocations = (props) => {

    const [search, _setSearch] = useState("")

    const searchRef = useRef(search);

    const setSearch = val => {
        searchRef.current = val;
        _setSearch(val);
    }

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

    let result = null;

    if (props.locations === undefined || props.locations === null || props.locations.length === 0 || !(props.locations instanceof Array)) {
        result = null
    } else {
        result = props.locations.map(location =>
            (<LocationItem
                key={location.id}
                rating={location.avg_rating}
                name={location.name}
                location={location.location}
                image={location.image}
                location_id={location.id}
                OnSearchLocationsById={props.OnSearchLocationsById}
            />
            )
        )
    }

    return (
        <div className={classes.Container}>
            {props.redirect ? <Redirect to={`/location`} /> : null}

            <input type="text" placeholder="Search Locations" onChange={inputChangeHandler} />
            <div className={classes.Navigation} >
                <img src={navigation} alt="navigation image" />
            </div>
            {/* <div>

            </div> */}
            <div className={classes.Results}>
                <h2>Select a Location</h2>
                <div className={classes.ScrollContainer}>
                    {props.loading ? <Spinner /> : result}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        error: state.locations.error,
        redirect: state.locations.redirect,
        locations: state.locations.search_locations,
        loading: state.locations.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        OnSearchLocations: (term) => dispatch(actions.searchLocationsByTerm(term)),
        OnSearchLocationsById: (location_id) => dispatch(actions.searchLocationsById(location_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLocations)