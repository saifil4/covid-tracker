import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { SelectedCountryContext } from '../store/SelectedCountryContext';


const Navbar = () => {
    const [selectedCountry] = useContext(SelectedCountryContext);
    return (
        <Navigation>
            <CountryName>{selectedCountry}</CountryName>
            <Link to="/" >Statistics</Link>
            <Link to="/covidmap">Map</Link>
        </Navigation>
    )
}

export default Navbar;


const Navigation = styled(Nav)`
    height: 56px;
    display: flex;
    background: white;
    align-items: center;
    a {
        text-decoration: none;
        padding: 0 10px;
    }
    a.selected {
        border-bottom: 3px solid red;
    }
    @media (max-width: 576px) {
      display:none;
    }  
`

const CountryName = styled.p`
    padding:0 20px;
    margin:0;
    font-weight: bold;
    color: black;
    font-size: 18px;
    margin-right: 10px;
    border-right: 1px solid #00000020;
`