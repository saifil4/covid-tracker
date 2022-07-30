import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../components/navbar/Navbar";
import Map from "../components/map/Map";

const CovidMap = () => {

  return (
    <>
      <Navbar />
      <Map />
    </>
  );
};

export default CovidMap;
