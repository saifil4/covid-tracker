import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CountrySelector from './CountrySelector';

const LeftNavigation = () => {
  const [countryOptions, setCountryOptions] = useState([]);
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/countries')
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2
        }))
        setCountryOptions(countries);
      });
  }, [])
  return (
    <LeftNav>
      <NavHeader><i class="fas fa-virus mr-2"></i><b>Covid Tracker</b></NavHeader>
      {countryOptions && <CountrySelector countryOptions={countryOptions} />}
    </LeftNav>
  )
}

export default LeftNavigation;

const LeftNav = styled.div`
  width: 100%;
`

const NavHeader = styled.h4`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`