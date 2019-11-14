import React from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import UpdateTest from './components/UpdateTest';

function App() {
  return (
    <Router>
      <Route path={'/'} exact component={Home} />
      <Route path={'/:id'} exact component={UpdateTest} />
    </Router>    
  );
}

export default App;
