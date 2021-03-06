import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    location_info: {},
    location_id: null,
    search_locations: [],
    loading: false,
    error: null,
    redirect: false,
    showRateFeedback: false,
    showReportFeedback: false,
    showErrorModal: false,
};

const wipeState = (state, action) => {
    return updateObject(state, {
        location_info: {},
        location_id: null,
        search_locations: [],
        loading: false,
        error: null,
        redirect: false,
        showRateFeedback: false,
        showReportFeedback: false,
        showErrorModal: false
    });
}

const setRateFeedbackModalState = (state, action) => {
    return updateObject(state, { showRateFeedback: action.val });
};

const setReportFeedbackModalState = (state, action) => {
    return updateObject(state, { showReportFeedback: action.val });
};

const searchLocationsByIdStart = (state, action) => {
    return updateObject(state, {
        error: null
    });
};

const searchLocationsByIdSuccess = (state, action) => {
    return updateObject(state, {
        error: action.error,
        location_info: action.location_info,
        redirect: action.error === null,
        showErrorModal: action.error !== null,
        location_id: action.location_id,
        // loading: false
    });
};

const searchLocationsByIdFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        // loading: false,
        redirect: false,
        showErrorModal: true
    });
}

const searchLocationsByTermStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const searchLocationsByTermSuccess = (state, action) => {
    let result = []
    if (action.locations instanceof Array) {
        result = action.locations
    }
    else {
        if (action.locations instanceof Array) {
            result = action.locations
        }
        else {
            // result = Object.keys(action.locations)
            for (var i in Object.keys(action.locations)) {
                result.push(action.locations[Object.keys(action.locations)[i]])
            }
        }
    };
    return updateObject(state, {
        search_locations: result,
        loading: false
    });
}

const searchLocationsByTermFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        redirect: false,
        showErrorModal: true
    });
}

const reportIncidentStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const reportIncidentSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        showReportFeedback: true,
        error: null,
    });
};

const reportIncidentFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        showReportFeedback: false,
    });
};

const rateLocationStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const rateLocationSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        showRateFeedback: true,
        error: null,
    });
};

const rateLocationFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        showRateFeedback: false,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.WIPE_STATE: return wipeState(state, action);

        case actionTypes.SET_RATE_FEEDBACK_MODAL_STATE: return setRateFeedbackModalState(state, action);
        case actionTypes.SET_REPORT_FEEDBACK_MODAL_STATE: return setReportFeedbackModalState(state, action);

        case actionTypes.SEARCH_LOCATIONS_BY_ID_START: return searchLocationsByIdStart(state, action);
        case actionTypes.SEARCH_LOCATIONS_BY_ID_SUCCESS: return searchLocationsByIdSuccess(state, action);
        case actionTypes.SEARCH_LOCATIONS_BY_ID_FAIL: return searchLocationsByIdFail(state, action);

        case actionTypes.SEARCH_LOCATIONS_BY_TERM_START: return searchLocationsByTermStart(state, action);
        case actionTypes.SEARCH_LOCATIONS_BY_TERM_SUCCESS: return searchLocationsByTermSuccess(state, action);
        case actionTypes.SEARCH_LOCATIONS_BY_TERM_FAIL: return searchLocationsByTermFail(state, action);

        case actionTypes.REPORT_INCIDENT_START: return reportIncidentStart(state, action);
        case actionTypes.REPORT_INCIDENT_SUCCESS: return reportIncidentSuccess(state, action);
        case actionTypes.REPORT_INCIDENT_FAIL: return reportIncidentFail(state, action);

        case actionTypes.RATE_LOCATION_START: return rateLocationStart(state, action);
        case actionTypes.RATE_LOCATION_SUCCESS: return rateLocationSuccess(state, action);
        case actionTypes.RATE_LOCATION_FAIL: return rateLocationFail(state, action);

        default:
            return state;
    }
};
export default reducer;