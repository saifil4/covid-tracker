import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCountry } from '../../store/SelectedCountryContext';
import { FaTimesCircle } from 'react-icons/fa';
import CountrySelector from './CountrySelector';

const CountrySelectorMobile = () => {
    const { setIsVisible } = useCountry();

    const handleClick = () => {
        setIsVisible(false);
    }

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
            <FaTimesCircle onClick={handleClick} />
            <CountrySelector countryOptions={countryOptions} />
            <CloseButton>Close</CloseButton>
        </SelectorContainer>
    )
}

export default CountrySelectorMobile;


const SelectorContainer = styled.div`
    position: absolute;
    width: 100%;
    background: white;
    height: calc(100% - 140px);
    z-index: 1;
    bottom: 0;
    overflow: auto;
`

const CloseButton = styled.button`
   position: absolute;
   bottom: 5px;
`

