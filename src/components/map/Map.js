import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import styled from "styled-components";
import Circle from './circles';

const Map = () => {
  const [data, setData] = useState();
  const [zoomLevel, setZoomLevel] = useState(3);

  useEffect(() => {
    if (zoomLevel < 4) {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((result) => {
          setData(getMappedDataForCountries(result));
        });
    } else {
      fetch("https://disease.sh/v3/covid-19/jhucsse")
        .then((res) => res.json())
        .then((result) => {
          setData(getMappedDataForProvinces(result));
        });
    }
  }, [zoomLevel]);

  const getMappedDataForProvinces = (result) => {
    return result.map((m) => {
      return {
        country: m.country,
        province: m.province,
        confirmed: m.stats.confirmed,
        deaths: m.stats.deaths,
        recovered: m.stats.recovered,
        lat: m.coordinates.latitude,
        long: m.coordinates.longitude,
      };
    });
  };

  const getMappedDataForCountries = (result) => {
    return result.map((m) => {
      return {
        country: m.country,
        province: null,
        confirmed: m.cases,
        deaths: m.deaths,
        recovered: m.recovered,
        lat: m.countryInfo.lat,
        long: m.countryInfo.long,
      };
    });
  };

  return (
    <CovidMapContainer className="covid-map">
      {data ? (
        <MapContainer center={[51.505, -0.09]} zoom={zoomLevel} minZoom={3}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
          />
          <Circle
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
            mapData={data}
          />
        </MapContainer>
      ) : (
        <div className="loading-container">
          <i style={{ fontSize: "30px" }} className="fas fa-circle-notch"></i>
        </div>
      )}
    </CovidMapContainer>
  );
};

export default Map;


const CovidMapContainer = styled.div`
  height: calc(100vh - 56px);
`;

