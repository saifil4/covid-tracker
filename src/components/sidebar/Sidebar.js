import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CountrySelector from "../country-selector/CountrySelector";
import SimpleBar from "simplebar-react";
import millify from "millify";

const Sidebar = () => {
  const [countryOptions, setCountryOptions] = useState([]);

  const [wordWideCases, setWorldWideCases] = useState();

  const [vaccinationCount, setVaccinationCount] = useState();

  useEffect(() => {
    try {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((dataItem) => ({
            name: dataItem.country,
            value: dataItem.countryInfo.iso2,
            cases: dataItem.cases,
          }));
          setCountryOptions(countries);
        });

      fetch("https://disease.sh/v3/covid-19/all")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.cases);
          setWorldWideCases({
            total: data.cases,
            today: data.todayCases,
            active: data.active,
            deaths: data.deaths,
          });
        });

      fetch(
        "https://corona.lmao.ninja/v3/covid-19/vaccine/coverage?lastdays=1&fullData=false"
      )
        .then((res) => res.json())
        .then((data) => {
          setVaccinationCount(Object.values(data)[0]);
        });
    } catch (err) {}
  }, []);

  return (
    <LeftNav>
      <NavHeader>
        <b>Covid-19 Tracker</b>
      </NavHeader>
      {wordWideCases && (
        <OverviewContainer>
          <CaseLabel>Vaccination doses Wordwide</CaseLabel>
          <VaccinationCount>{vaccinationCount}</VaccinationCount>
          <Separator />
          <CaseLabel>Wordwide cases</CaseLabel>
          <TotalCases>{millify(wordWideCases.total)}</TotalCases>
          <OtherCases>
            <b>Active Cases</b>
            {millify(wordWideCases.active)}
          </OtherCases>
          <OtherCases>
            <b>Fatal Cases</b>
            {millify(wordWideCases.deaths)}
          </OtherCases>
          <Separator />
        </OverviewContainer>
      )}

      <SimpleBar style={{ height: "400px" }}>
        {countryOptions && (
          <CountrySelector
            countryOptions={countryOptions}
            wordWideCases={wordWideCases}
          />
        )}
      </SimpleBar>
    </LeftNav>
  );
};

export default Sidebar;

const LeftNav = styled.div`
  width: 100%;
`;

const NavHeader = styled.h4`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverviewContainer = styled.div`
  padding: 0 25px;
`;

const Separator = styled.hr`
  opacity: 0.15;
`;

const CaseLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #505f79;
`;
const TotalCases = styled.div`
  font-size: 24px;
  color: #de3700;
  font-weight: bold;
  margin-bottom: 5px;
`;

const VaccinationCount = styled.div`
  color: #00aa00;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const OtherCases = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
  & > b {
    font-size: 13px;
    width: 100px;
    display: inline-block;
    color: #505f79;
  }
`;
