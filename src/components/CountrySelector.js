import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';

const CountrySelector = ({ countryOptions }) => {

  const [countryValue, setCountryValue] = useState('');

  const [filteredCountryOptions, setFilteredCountryOptions] = useState([]);

  const debouncedSave = useCallback(
    debounce(nextValue => setFilteredCountryOptions(countryOptions.filter(country => country.name.includes(nextValue))), 1000),
    []);


  const handleChange = event => {
    const { value: nextValue } = event.target;
    setCountryValue(nextValue);
    debouncedSave(nextValue);
  };

  return (
    <AutoSuggestContainer>
      <input type="text" onChange={handleChange} />
      <AutoSuggestOptions>
        {
          filteredCountryOptions.map(country => (
            <div>{country.name}</div>
          ))
        }
      </AutoSuggestOptions>
    </AutoSuggestContainer>
  )
}

export default CountrySelector;


const AutoSuggestContainer = styled.div`
  position:relative;
`

const AutoSuggestOptions = styled.div`
  position:absoulte;
  width: 200px;
`

