import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    location_info: {},
    location_id: null,
    search_locations: [],
    loading: false,
    error: null,
    redirect: false,
    showFeedbackModal: false,
    showErrorModal: false
};
const searchLocationsByIdStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const searchLocationsByIdSuccess = (state, action) => {
    return updateObject(state, {
        error: action.error,
        location_info: action.location_info,
        redirect: action.error === null,
        showErrorModal: action.error !== null,
        location_id: action.location_id
    });
};

const searchLocationsByIdFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        redirect: false,
        showErrorModal: true
    });
}

const searchLocationsByTermStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const searchLocationsByTermSuccess = (state, action) => {
    let result = []
    if(action.locations instanceof Array)
    {
        console.log("check")
        result = action.locations

    }
    else{
        console.log("test")
        // result = Object.keys(action.locations)
        for(var i in Object.keys(action.locations)) {
            result.push(action.locations[Object.keys(action.locations)[i]])
        }
    }
    console.log(result)
    return updateObject(state, {
        search_locations: result,
    });
};

const searchLocationsByTermFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        redirect: false,
        showErrorModal: true
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_LOCATIONS_BY_ID_START: return searchLocationsByIdStart(state, action);
        case actionTypes.SEARCH_LOCATIONS_BY_ID_SUCCESS: return searchLocationsByIdSuccess(state, action);
        case actionTypes.SEARCH_LOCATIONS_BY_ID_FAIL: return searchLocationsByIdFail(state, action);

        case actionTypes.SEARCH_LOCATIONS_BY_TERM_START: return searchLocationsByTermStart(state, action);
        case actionTypes.SEARCH_LOCATIONS_BY_TERM_SUCCESS: return searchLocationsByTermSuccess(state, action);
        case actionTypes.SEARCH_LOCATIONS_BY_TERM_FAIL: return searchLocationsByTermFail(state, action);
        

        default:
            return state;
    }
};
export default reducer;