import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    personal_info: {},
    screening_info: {},
    loading: false,
    error: null,
    redirect: false,
    showFeedbackModal: false,
    showErrorModal: false
};

const savePersonalInfoSuccess = (state, action) => {
    return updateObject(state, {
        personal_info: action.personalInfo
    });
};

const submitInformationStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const submitInformationSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        showFeedbackModal: true,
        error: null,
        screening_info: action.screningInfo
    });
};

const submitInformationFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error,
        showFeedbackModal: false,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_PERSONAL_INFO_SUCCESS: return savePersonalInfoSuccess(state, action);

        case actionTypes.SUBMIT_INFORMATION_START: return submitInformationStart(state,action);
        case actionTypes.SUBMIT_INFORMATION_SUCCESS: return submitInformationSuccess(state,action);
        case actionTypes.SUBMIT_INFORMATION_FAIL: return submitInformationFail(state,action);

        default:
            return state;
    }
};
export default reducer;