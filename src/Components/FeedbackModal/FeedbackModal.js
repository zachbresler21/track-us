import React from 'react';
import classes from './FeedbackModal.module.css';
// import Logo from '../../../Logo/Logo';
import tick from '../../assets/tick.png'
const FeedbackModal = props => {
    return (
        // <Overlay show={props.show} close={props.close}>
            <div className={props.show ? classes.ModalVisible : classes.ModalHidden}>
                <div className = {classes.InnerModalContainer}>
                    {props.children}
                    <div><img src={tick} alt="Close Modal" className={classes.CloseCross} onClick={props.close} /></div>
                </div>
            </div>
        // {/* </Overlay> */}
    )
};

export default FeedbackModal;
