import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    location_info: {},
    location_id: {},
    loading: false,
    error: null,
    redirect: false,
    showFeedbackModal: false,
    showErrorModal: false
};
const searchLocationsStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const searchLocationsSuccess = (state, action) => {
    return updateObject(state, {
        error: action.error,
        location_info: action.location_info,
        redirect: action.error === null,
        showErrorModal: action.error !== null
    });
};

const searchLocationsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        redirect: false,
        showErrorModal: true
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_LOCATIONS_START: return searchLocationsStart(state, action);
        case actionTypes.SEARCH_LOCATIONS_SUCCESS: return searchLocationsSuccess(state, action);
        case actionTypes.SEARCH_LOCATIONS_FAIL: return searchLocationsFail(state, action);


        default:
            return state;
    }
};
export default reducer;