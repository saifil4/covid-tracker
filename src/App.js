import './App.css';
import React, { useState, useEffect } from 'react';
import Statistics from './pages/statistics';
import CovidMap from './pages/covidmap';
import Vaccine from './pages/vaccine';
import Header from './components/header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SelectedCountryProvider } from "./store/SelectedCountryContext";

function App() {

  return (
    <>

      <Router>
        <SelectedCountryProvider>
          <Header />
          <div className="app_container">
            <Route path='/' exact component={Statistics} />
            <Route path='/covidmap' component={CovidMap} />
            <Route path='/vaccine' component={Vaccine} />
          </div>
        </SelectedCountryProvider>
      </Router>
    </>
  );
}

export default App;
