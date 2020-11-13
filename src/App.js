import React from 'react'
import Layout from './Containers/Layout/Layout'
import QRCodeScanner from './Containers/QRCodeScanner/QRCodeScanner'
import PersonalInfoForm from './Containers/PersonalInfoForm/PersonalInfoForm'
import { Switch, Route } from 'react-router-dom'
const App = (props) => {
  return (
    <Layout>
      <Switch>
        {/* <Route path="/" exact component={Auth} />
        <Route path="/entertaxiinfo" exact component={EnterTaxiInfo} />
        <Route path="/entertaxiinfo/qrcodescanner" exact component={QRCodeScanner} />
        <Route path="/entertaxiinfo/webcamcapture" exact component={WebcamCapture} />
        <Route path="/home" exact component={Home} />
        <Route path="/rate" exact component={RateTaxi} />
        <Route path="/report" exact component={ReportIncident} />
        <Route path="/taxiprofile" exact component={TaxiProfile} />
        <Route path="/emergencynumbers" exact component={EmergencyNumbers} /> */}
      </Switch>
    </Layout>
  );
}

export default App;
