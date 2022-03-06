import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <Nav>
            <Link to="/" >Statistics</Link>
            <Link to="/covidmap">Map</Link>
        </Nav>
    )
}

export default Navbar;


const Nav = styled.div`
width: 100%;
height: 56px;
background: white;
display: flex;
align-items: center;
  @media (max-width: 576px) {
    display:none;
  }  
`