import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Nav, Form, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { SelectedCountryContext } from '../store/SelectedCountryContext';

const Header = () => {
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
            <Navbar bg="light" expand="lg">
                <Navbar.Brand className="mr-5"><i class="fas fa-virus mr-2"></i><b>Covid Tracker</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className={LinkClass("/")} to="/">
                            Statistics
                        </Link>
                        <Link className={LinkClass("/covidmap")} to="/covidmap">
                            Map
                        </Link>
                    </Nav>
                    <Form inline>
                        <Dropdown onSelect={(e) => handleChange(e)}>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                {selectedCountry}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu" align="right">
                                <Dropdown.Item value="Worldwide" href="#/action-1">Worldwide</Dropdown.Item>
                                <Dropdown.Divider />
                                {
                                    countries.map(country => (
                                        <Dropdown.Item eventKey={country.name}>{country.name}</Dropdown.Item>
                                    ))
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>

    )
}

export default Header;
