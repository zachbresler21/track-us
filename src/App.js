import React from 'react'
import Layout from './Containers/Layout/Layout'
import QRCodeScanner from './Containers/QRCodeScanner/QRCodeScanner'
import PersonalInfoForm from './Containers/PersonalInfoForm/PersonalInfoForm'
import ScreeningForm from './Containers/ScreeningForm/ScreeningForm'
import { Switch, Route } from 'react-router-dom'
import WelcomeScreen from './Containers/WelcomeScreen/WelcomeScreen'
import LocationProfile from './Containers/LocationProfile/LocationProfile'
import SearchLocations from './Containers/SearchLocations/SearchLocations'

const App = (props) => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={WelcomeScreen} />
        <Route path="/qrcodescanner" exact component={QRCodeScanner} />
        <Route path="/location/:id" exact component={LocationProfile} />
        <Route path="/searchlocations" exact component={SearchLocations} />
      </Switch>
    </Layout>
  );
}

export default App;
