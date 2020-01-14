import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './components/layouts/Navbar'
import Index from './components/layouts/Index'

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment className="App">
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index}/>
            </Switch>
          </div>
        </Fragment>
      </Router>
    
    );
  }
  
}

export default App;
