import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import NavBar from './components/Navigation/NavBar'
import Index from './components/Navigation/Index'
import Lyrics from './components/Songs/Lyrics'

import {Provider} from './Context'


function App() {
  return (
    <Provider>
    <Router>
      <div >
      <div >
        <React.Fragment>
            <NavBar/>
            <div className="container">
            <Switch>
              <Route exact path="/" component={Index}/>
              <Route exact path="/lyrics/track/:id" component={Lyrics}/>
            </Switch>
            </div>
        </React.Fragment>
        </div>
        </div>
    </Router>
    </Provider>
  );
}

export default App;
