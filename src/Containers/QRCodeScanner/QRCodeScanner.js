import classes from './QRCodeScanner.module.css'
import React, { useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/locations'

const QRCodeScanner = (props) => {
    const [state, setState] = useState({
        result: ""
    })

    const handleScan = data => {
        if (data) {
            props.OnSearchLocations(data)
            setState({
                result: data
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
            <h1>Scan to displayed QR Code</h1>
            <h4>Scan the QR Code to select your current location.</h4>
            <div className={classes.codeContainer}>
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%' }}
                />
            </div>
            <h4>Align QR Code to scan</h4>
            <p>{state.result}</p>
            {/* <button>Rate</button> */}
            {props.redirect ? <Redirect to={`/location/${state.result}`} /> : null}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        error: state.locations.error,
        redirect: state.locations.redirect
    };
}

const mapDispatchToProps = dispatch => {
    return {
        OnSearchLocations: (location_id) => dispatch(actions.searchLocationsById(location_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRCodeScanner)