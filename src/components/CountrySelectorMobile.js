import React from 'react';
import styled from 'styled-components';
import { useCountry } from '../store/SelectedCountryContext';
import { FaTimesCircle } from 'react-icons/fa';

const CountrySelectorMobile = () => {
    const { setIsVisible } = useCountry();

    const handleClick = () => {
        setIsVisible(false);
    }
    return (
        <SelectorContainer>
            <FaTimesCircle onClick={handleClick} />
        </SelectorContainer>
    )
}

export default CountrySelectorMobile;


const SelectorContainer = styled.div`
    position: absolute;
    width: 100%;
    background: white;
    height: 70%;
    z-index: 1;
`

