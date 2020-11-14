import React from 'react'
import classes from './Layout.module.css'
import Header from '../../Components/Header/Header'
// import { useLocation } from 'react-router-dom'

const Layout = (props) => {
    return (
        <div className={classes.Container}>
            <Header OnWipeState={props.OnWipeState} />
            <main>{props.children}</main>
        </div>
    )
}

export default Layout;