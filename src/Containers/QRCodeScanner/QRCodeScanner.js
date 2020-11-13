import classes from './QRCodeScanner.module.css'
import React, { useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'
// import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

const QRCodeScanner = (props) => {
    const [state, setState] = useState({
        result: []
    })

    const handleScan = data => {
        if (data) {
            const dataArr = data.split('/')
            // props.OnSearchTaxis(dataArr[1])
            setState({
                result: dataArr
            })
        }
    }
    const handleError = err => {
        console.error(err)
    }
    useEffect(() => {
        localStorage.clear()
    }, [])
    return (
        <div className={classes.Container}>
            <h4>Scan the QR in/outside the taxi</h4>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
            <h4>Align QR Code to scan</h4>
            <p>{state.result[1]}</p>
            {/* <button>Rate</button> */}
            {/* {props.redirect ? <Redirect to={"/home"} /> : null} */}
        </div>
    )
}

export default QRCodeScanner