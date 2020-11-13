import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    taxi_info: {},
    taxi_numberplate: {},
    loading: false,
    error: null,
    redirect: false,
    showFeedbackModal: false,
    showErrorModal: false
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.SET_FEEDBACK_MODAL_STATE: return setFeedbackModalState(state, action);


        default:
            return state;
    }
};
export default reducer;