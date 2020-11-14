import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    location_info: {},
    location_id: null,
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_LOCATIONS_BY_ID_START: return searchLocationsByIdStart(state, action);
        case actionTypes.SEARCH_LOCATIONS_BY_ID_SUCCESS: return searchLocationsByIdSuccess(state, action);
        case actionTypes.SEARCH_LOCATIONS_BY_ID_FAIL: return searchLocationsByIdFail(state, action);


        default:
            return state;
    }
};
export default reducer;