import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavLinks = () => {
  const loc = useLocation();

  const LinkClass = (path) => {
    const loc = useLocation();
    return "navigation-link" + (loc.pathname === path ? " selected" : "");
  };

  return (
    <>
      <CustomLink
        selected={"/" === loc.pathname}
        to="/"
      >
        Statistics
      </CustomLink>
      <CustomLink
        selected={"/covidmap" === loc.pathname}
        to="/covidmap"
      >
        Map
      </CustomLink>
    </>
  );
};

export default NavLinks;

const CustomLink = styled(Link)`
  margin-right: 30px;
  color: #333333;
  transition: 0.1s all;
  ${(props)=> props.selected && `
        color: #DE3700;
        font-weight: bold;
        padding-bottom: 5px;
    `
  }
`;
