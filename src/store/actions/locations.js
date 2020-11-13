import * as actionTypes from './actionTypes';
import axios from 'axios';

export const searchLocationsStart = () => {
    return {
        type: actionTypes.SEARCH_LOCATIONS_START
    };
};

export const searchLocationsSuccess = (location_info, error) => {
    return {
        type: actionTypes.SEARCH_LOCATIONS_SUCCESS,
        location_info: location_info,
        error: error
    };
};

export const searchLocationsFail = () => {
    return {
        type: actionTypes.SEARCH_LOCATIONS_FAIL
    };
};

export const searchLocations = (location_id) => {
    return dispatch => {
        dispatch(searchLocationsStart());
        axios.get(`https://track-us-2a92c.firebaseio.com/locations/${location_id}.json`)
            .then(response => {
                dispatch(searchLocationsSuccess(response.data, response.data === null || response.data === undefined ? "Location does not exist" : null));
            })
            .catch(error => {
                dispatch(searchLocationsFail(error));
            });
    };
};