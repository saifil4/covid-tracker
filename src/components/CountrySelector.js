import React from 'react';
import styled from 'styled-components';
import SimpleBar from 'simplebar-react';

const CountrySelector = ({ countryOptions }) => {

  return (
    <>
      <SearchContainer>
        <SearchInput type="text" placeholder='Find Country' />
      </SearchContainer>
      <SimpleBar style={{ height: '400px' }}>
        <CountryList>
          {
            countryOptions.map(country => (
              <CountryItem>{country.name}</CountryItem>
            ))
          }
        </CountryList>
      </SimpleBar>
    </>
  )
}

export default CountrySelector;


const SearchContainer = styled.div`
  width: 100%;
  padding: 5px 20px;
`;


const SearchInput = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 5px;
  padding: 0 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;
  box-shadow: 0px 0px 10px 0px #dddddd;
`;

const CountryList = styled.ul`
  overflow: auto;
  list-decoration:none;
  padding: 5px 20px;
`;

const CountryItem = styled.li`
  padding: 0 20px;
  height: 35px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 3px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  color: rgba(0,0,0,0.8);
  font-size: 14px;
  display: flex;
  align-items: center;
`;


