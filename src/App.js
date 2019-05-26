import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Trips from './pages/Trips';
import Visas from './pages/Visas';
import TripDetail from './pages/TripDetail';

class App extends React.Component {

  render(){
    return (
        <Router>
          <div>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/trips" component={Trips} />
            <PrivateRoute path="/trip/:id?" component={TripDetail} />
            <Route path="/visas" component={Visas} />
            <Route path="/login" component={Login} />
          </div>
        </Router>
    );
  }    
}
export default App;