import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Nav, Form, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { SelectedCountryContext } from '../store/SelectedCountryContext';
import styled from 'styled-components';

const NavBarMobile = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useContext(SelectedCountryContext);

    // const [selectedCountry, setSelectedCountry] = useState('Worldwide');
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/countries')
            .then((res) => res.json())
            .then((data) => {
                const countries = data.map((country) => ({
                    name: country.country,
                    value: country.countryInfo.iso2
                }))
                setCountries(countries);
            });
    }, [])

    const handleChange = (event) => {
        console.log(event)
        setSelectedCountry(event);
    }

    const LinkClass = (path) => {
        const loc = useLocation();
        return 'navigation-link' + (loc.pathname === path ? ' selected' : '');
    }

    return (
        <>
            <Navigation>
                <Logo>
                    <i className="fas fa-virus mr-2"></i><b>Covid Tracker</b>
                </Logo>
                <SearchContiner>
                    <SearchInput type="text" placeholder='Search' />
                </SearchContiner>
                <CustomNav className="mr-auto">
                    <Link className={LinkClass("/")} to="/">
                        Statistics
                    </Link>
                    <Link className={LinkClass("/covidmap")} to="/covidmap">
                        Map
                    </Link>
                </CustomNav>
            </Navigation>
        </>

    )
}

export default NavBarMobile;

const Navigation = styled.div`
    padding: 0 15px;
    box-shadow: 0px 3px 5px rgb(0 0 0 / 5%);
    background: linear-gradient(0deg, rgba(255,255,255,0.5) 10%, rgba(231,76,60,1) 100%);
    height: auto;
    position:relative;
    z-index: 1;
    @media (min-width: 577px) {
        display:none;
    } 
`

const Logo = styled.div`
    display: flex;
    height: 60px;
    align-items: center;
    color: white;
    font-size: 18px;
    b{
        padding-left: 5px;
    }
`

const SearchContiner = styled.div`
    
`

const SearchInput = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 20px;
    padding: 0 15px;
    border: 1px solid #00000030;
    outline: none;
    box-shadow: 0px 3px 5px rgb(0 0 0 / 5%);
`

const CustomNav = styled(Nav)`
    height: 40px;
    display: flex;
    align-items: flex-end;
    a {
        text-decoration: none;
        padding: 0 10px;
    }
    a.selected {
        border-bottom: 3px solid red;
    }
`

