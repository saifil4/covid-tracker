import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaPlusCircle } from 'react-icons/fa';

const CountrySelector = ({ countryOptions }) => {

  const [filteredCountries, setFilterCountries] = useState([]);

  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    if (searchValue) {
      setFilterCountries(countryOptions.filter(country => country.name.toLowerCase().includes(searchValue.toLowerCase())));
    } else {
      setFilterCountries(countryOptions);
    }
  }, [searchValue, countryOptions])

  return (
    <>
      <SearchContainer>
        <SearchInput type="text" placeholder='Find Country' onChange={(e)=>setSearchValue(e.target.value)} />
        <Separator />
      </SearchContainer>
      <CountryList>
        {
          filteredCountries.map(country => (
            <CountryItem>
              <FaPlusCircle />
              <CountryName>{country.name}</CountryName>
              <CountryCases>{country.cases}</CountryCases>
            </CountryItem>
          ))
        }
      </CountryList>
    </>
  )
}

export default CountrySelector;


const SearchContainer = styled.div`
  width: 100%;
  padding: 5px 25px;
`;


const SearchInput = styled.input`
  width: 100%;
  border-radius: 5px;
  padding: 10px 10px;
  border: 1px solid #ddd;
  font-size: 14px;
  outline: none;
  box-shadow: 0px 0px 10px 0px #dddddd;
`;

const CountryList = styled.ul`
  overflow: auto;
  list-decoration:none;
  padding: 5px 25px;
`;

const CountryItem = styled.li`
  padding: 10px 0 10px 15px;
  border-radius: 3px;
  box-shadow: 0 0 7px 0 #e7e7e7;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #5E6C84;
  cursor: pointer;
  border: 1px solid white;
  &: hover {
    color: #2684FF;
    border: 1px solid #2684FF;
    background: rgba(38,132,255,0.02);
  
`;


const CountryName = styled.div`
  display:inline-block;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 5px;
  width: 65%;
`;



const CountryCases = styled.div`
  display:inline-block;
  align-self:right;
`;


const Separator = styled.hr`
 opacity:0.15;
`;

