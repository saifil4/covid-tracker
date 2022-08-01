import "./App.css";
import React from "react";
import Statistics from "./pages/statistics";
import CovidMap from "./pages/covidmap";
import NavBarMobile from "./components/navbar/NavBarMobile";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import CountrySelectorMobile from "./components/country-selector/CountrySelectorMobile";
import { useCountry } from "./store/SelectedCountryContext";

function AppRoutes() {
  const { isVisible, setIsVisible } = useCountry();

  console.log(isVisible);
  const handleScroll = (e) => {
    console.log(e);
  };

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Router>
        <NavBarMobile />
        {isVisible && <CountrySelectorMobile />}
        <AppContainer onScroll={handleScroll}>
          <Route path="/" exact component={Statistics} />
          <Route path="/covidmap" component={CovidMap} />
          {isVisible && <CloseButton onClick={handleClick}>Close</CloseButton>}
        </AppContainer>
      </Router>
    </>
  );
}

export default AppRoutes;

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
  background: #f9f9f9;
  height: calc(100vh - 140px);
  @media (min-width: 577px) {
    height: 100%;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  width: 150px;
  padding: 5px 15px;
  border: none;
  border-radius: 5px;
  background: #de3700;
  color: white;
  box-shadow: 0px 3px 5px rgb(0 0 0 / 5%);
`;
