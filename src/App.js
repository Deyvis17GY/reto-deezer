import './styles/style.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home'
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home}/>
      </Switch>
    </Router>
  );
}

export default App;
