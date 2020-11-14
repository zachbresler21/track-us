import React from 'react'
import Layout from './Containers/Layout/Layout'
import QRCodeScanner from './Containers/QRCodeScanner/QRCodeScanner'
import PersonalInfoForm from './Containers/PersonalInfoForm/PersonalInfoForm'
import ScreeningForm from './Containers/ScreeningForm/ScreeningForm'
import { Switch, Route } from 'react-router-dom'
import WelcomeScreen from './Containers/WelcomeScreen/WelcomeScreen'
import LocationProfile from './Containers/LocationProfile/LocationProfile'
import SearchLocations from './Containers/SearchLocations/SearchLocations'

import RateLocation from './Containers/RateLocation/RateLocation'
import ReportLocation from './Containers/Report/Report';

import { connect } from 'react-redux';
import * as actions from './store/actions/locations'
import * as infoactions from './store/actions/information'


const App = (props) => {
  return (
    <Layout OnWipeState={props.OnWipeState} OnWipeInfoState={props.OnWipeInfoState}>
      <Switch>
        <Route path="/" exact component={WelcomeScreen} />
        <Route path="/qrcodescanner" exact component={QRCodeScanner} />
        <Route path="/personalinfo" exact component={PersonalInfoForm} />
        <Route path="/screeninginfo" exact component={ScreeningForm} />
        <Route path="/searchlocations" exact component={SearchLocations} />
        <Route path="/ratelocation" exact component={RateLocation} />
        <Route path="/reportlocation" exact component={ReportLocation} />
        <Route path="/location" exact component={LocationProfile} />

      </Switch>
    </Layout>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    OnWipeState: () => dispatch(actions.wipeState()),
    OnWipeInfoState: () => dispatch(infoactions.wipeState())
  }
}

export default connect(null, mapDispatchToProps)(App);
