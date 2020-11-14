import * as actionTypes from './actionTypes';
import axios from 'axios';
import firebase from '../../firebase/index'
import 'firebase/database'
import 'firebase/auth'

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

// export const rateLocation = (location_id) => {
//     return dispath => {
//         dispatch(rateLocationStart())
//         firebase
//             .database()
//             .ref('locations')
//             .orderByChild()
//             .equalTo(location_id)
//             .transaction((location) => {
//                 console.log(location)
//             })
//     }
// }