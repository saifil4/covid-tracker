import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimesCircle } from 'react-icons/fa';
import CountrySelector from './CountrySelector';

const CountrySelectorMobile = () => {

    const [countryOptions, setCountryOptions] = useState([]);

    useEffect(() => {
        try {
            fetch('https://disease.sh/v3/covid-19/countries')
                .then((res) => res.json())
                .then((data) => {
                    const countries = data.map((dataItem) => ({
                        name: dataItem.country,
                        value: dataItem.countryInfo.iso2,
                        cases: dataItem.cases
                    }))
                    setCountryOptions(countries);
                });

        } catch (err) {

        }

    }, [])

    return (
        <SelectorContainer>
            <CountrySelector countryOptions={countryOptions} />
        </SelectorContainer>
    )
}

export default CountrySelectorMobile;


const SelectorContainer = styled.div`
    position: absolute;
    width: 100%;
    background: white;
    padding: 15px 0;
    height: 100%;
    z-index: 1;
    overflow: auto;
    top: 0;
`

