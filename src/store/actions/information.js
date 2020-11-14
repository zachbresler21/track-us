import * as actionTypes from './actionTypes';
import axios from 'axios';
import firebase from '../../firebase/index'
import 'firebase/database'
import 'firebase/auth'

export const wipeState = () => {
    return {
        type: actionTypes.WIPE_INFORMATION_STATE
    };
};

export const savePersonalInfoSuccess = (personalInfo) => {
    return {
        type: actionTypes.SAVE_PERSONAL_INFO_SUCCESS,
        personalInfo: personalInfo
    };
};

export const savePersonalInfo = (personalInfo) => {
    return dispatch => {
        dispatch(savePersonalInfoSuccess(personalInfo));
    };
};

export const submitInformationStart = () => {
    return {
        type: actionTypes.SUBMIT_INFORMATION_START
    };
};

export const submitInformationSuccess = (screeningInfo) => {
    return {
        type: actionTypes.SUBMIT_INFORMATION_SUCCESS,
        screeningInfo: screeningInfo
    };
};

export const submitInformationFail = () => {
    return {
        type: actionTypes.SUBMIT_INFORMATION_FAIL
    };
};

export const submitInformation = (personalInfo, screeningInfo, locationId) => {
    // const personalInfoRef = firebase.database().ref('/locations/' + locationId + '/information/personal_info')
    const newInfoKey = firebase.database().ref().child('/locations/' + locationId + 'information').push().key;
    let updates = {};
    updates['/locations/' + locationId + '/information/' + newInfoKey + '/personal_info'] = personalInfo;
    updates['/locations/' + locationId + '/information/' + newInfoKey + '/screening_info'] = screeningInfo;

    return dispatch => {
        dispatch(submitInformationStart())
        firebase.database().ref().update(updates).then(() => {
            //Successful update
            dispatch(submitInformationSuccess(screeningInfo));
        }).catch(error => {
            //Error with update
            dispatch(submitInformationFail(error));
        });
    };
};