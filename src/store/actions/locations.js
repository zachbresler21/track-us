import * as actionTypes from './actionTypes';
import axios from 'axios';
import firebase from '../../firebase/index'
import 'firebase/database'
import 'firebase/auth'

export const wipeState = () => {
    return {
        type: actionTypes.WIPE_STATE
    };
};

export const setRateFeedbackModalState = (val) => {
    return {
        type: actionTypes.SET_RATE_FEEDBACK_MODAL_STATE,
        val: val
    };
};


export const setReportFeedbackModalState = (val) => {
    return {
        type: actionTypes.SET_REPORT_FEEDBACK_MODAL_STATE,
        val: val
    };
};


export const searchLocationsByIdStart = () => {
    return {
        type: actionTypes.SEARCH_LOCATIONS_BY_ID_START
    };
};

export const searchLocationsByIdSuccess = (location_info, error, location_id) => {
    return {
        type: actionTypes.SEARCH_LOCATIONS_BY_ID_SUCCESS,
        location_info: location_info,
        error: error,
        location_id: location_id
    };
};

export const searchLocationsByIdFail = () => {
    return {
        type: actionTypes.SEARCH_LOCATIONS_BY_ID_FAIL
    };
};

export const searchLocationsById = (location_id) => {
    return dispatch => {
        dispatch(searchLocationsByIdStart());
        axios.get(`https://track-us-2a92c.firebaseio.com/locations/${location_id}.json`)
            .then(response => {
                dispatch(searchLocationsByIdSuccess(response.data, response.data === null || response.data === undefined ? "Location does not exist" : null, location_id));
            })
            .catch(error => {
                dispatch(searchLocationsByIdFail(error));
            });
    };
};


export const searchLocationsByTermStart = () => {
    return {
        type: actionTypes.SEARCH_LOCATIONS_BY_TERM_START
    };
};

export const searchLocationsByTermSuccess = (locations, num) => {
    return {
        type: actionTypes.SEARCH_LOCATIONS_BY_TERM_SUCCESS,
        locations: locations,
        num: num
    };
};

export const searchLocationsByTermFail = () => {
    return {
        type: actionTypes.SEARCH_LOCATIONS_BY_TERM_FAIL
    };
};

export const searchLocationsByTerm = (term) => {
    term = term.trim()
    let termLowerCase = term.toLowerCase()
    const ref = firebase.database().ref('locations')
    return dispatch => {
        dispatch(searchLocationsByTermStart());
        try {
            // ref.orderByChild("name").equalTo(term).on("child_added", function (snapshot) {
            //     console.log(snapshot.key);
            // });
            ref.orderByChild('name')
             .startAt(term)
             .endAt(term+"\uf8ff")
             .once("value")
             .then(snap => snap.val()).then(locations => {
                console.log(locations)
                ref.once("value").then((snap => {
                    dispatch(searchLocationsByTermSuccess(locations, snap.numChildren()))
                }))
            })

            // ref.startAt(termLowerCase).endAt(termLowerCase + "a").once('value')
            //     .then(snap => snap.val()).then(locations => {
            //         console.log(locations)
            //         ref.once("value").then((snap => {
            //             dispatch(searchLocationsByTermSuccess(locations, snap.numChildren()))
            //         }))
            //     })
            //     .catch(error => {
            //         dispatch(searchLocationsByTermFail(error))
            //     })
        } catch (error) {
            dispatch(searchLocationsByTermFail(error))
        }
    }
};


export const rateLocationStart = () => {
    return {
        type: actionTypes.RATE_LOCATION_START
    };
};

export const rateLocationSuccess = () => {
    return {
        type: actionTypes.RATE_LOCATION_SUCCESS
    };
};

export const rateLocationFail = () => {
    return {
        type: actionTypes.RATE_LOCATION_FAIL
    };
}

export const rateLocation = (rating, location_id, avg_rating) => {
    return dispatch => {
        dispatch(rateLocationStart());
        axios.post(`https://track-us-2a92c.firebaseio.com/locations/${location_id}/ratings.json`, JSON.stringify(rating))
            .then(response => {
                dispatch(rateLocationSuccess(response.data));
                dispatch(updateTotalRatings(location_id, avg_rating, rating.value))
            })
            .catch(error => {
                dispatch(rateLocationFail(error));
            });
    };
};

const updateTotalRatings = (location_id, avg_rating, rating) => {
    return dispatch => {
        axios.get(`https://track-us-2a92c.firebaseio.com/locations/${location_id}/total_ratings.json`)
            .then(response => {
                axios.put(`https://track-us-2a92c.firebaseio.com/locations/${location_id}/total_ratings.json`, response.data + 1)
                    .then(response => {

                    })
                    .catch(error => {
                    });
                axios.put(`https://track-us-2a92c.firebaseio.com/locations/${location_id}/avg_rating.json`, ((avg_rating * response.data + rating) / (response.data + 1)).toFixed(1))
            })
            .catch(error => {
            });
    };
}

export const reportIncidentStart = () => {
    return {
        type: actionTypes.REPORT_INCIDENT_START
    };
};

export const reportIncidentSuccess = (location) => {
    return {
        type: actionTypes.REPORT_INCIDENT_SUCCESS
    };
};

export const reportIncidentFail = () => {
    return {
        type: actionTypes.REPORT_INCIDENT_FAIL
    };
};

export const reportIncident = (reportData, location_id) => {
    return dispatch => {
        dispatch(reportIncidentStart());
        axios.post(`https://track-us-2a92c.firebaseio.com/locations/${location_id}/reports.json`, JSON.stringify(reportData))
            .then(response => {
                dispatch(reportIncidentSuccess(response.data));
                dispatch(updateTotalReports(location_id))
            })
            .catch(error => {
                dispatch(reportIncidentFail(error));
            });
    };
};

const updateTotalReports = (location_id) => {
    return dispatch => {
        axios.get(`https://track-us-2a92c.firebaseio.com/locations/${location_id}/total_reports.json`)
            .then(response => {
                axios.put(`https://track-us-2a92c.firebaseio.com/locations/${location_id}/total_reports.json`, response.data + 1)
                    .then(response => {

                    })
                    .catch(error => {
                    });
            })
            .catch(error => {
            });
    };
}