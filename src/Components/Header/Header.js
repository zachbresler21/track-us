import React from 'react'
import classes from './Header.module.css'
import backarrow from '../../assets/back.svg'
import { useHistory, useLocation } from 'react-router-dom'
// import { connect } from 'react-redux';

const Header = (props) => {
    let history = useHistory()
    let pathname = useLocation().pathname
    const onClickHandler = () => {
        if (pathname === "/qrcodescanner" || pathname === "/location" || pathname === "/personalinfo" || pathname === "/searchlocations") {
            props.OnWipeState()
            history.push('/')
        }
        else if (pathname === "/ratelocation" || pathname === "/reportlocation") {
            history.push('/location')
        }
        else if(pathname === "/screeninginfo"){
            history.push('/personalinfo')
        }
    }
    return (
        <header className={classes.Header}>
            {pathname !== "/" && <img src={backarrow} alt="back arrow" onClick={onClickHandler} />}
        </header>
    )
}
export default Header