import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, useMap, GeoJSON } from 'react-leaflet';
import styled from 'styled-components';
import Circle from '../components/circles';
import Navbar from '../components/navbar/Navbar';

const CovidMap = () => {
    const [data, setData] = useState();
    const [zoomLevel, setZoomLevel] = useState(3);

    useEffect(() => {
        console.log(zoomLevel);
        if (zoomLevel < 4) {
            fetch('https://disease.sh/v3/covid-19/countries')
                .then(res => res.json())
                .then(result => {
                    const mappeddata = getMappedDataForCountries(result);
                    setData(getMappedDataForCountries(result));
                })
        } else {
            fetch('https://disease.sh/v3/covid-19/jhucsse')
                .then(res => res.json())
                .then(result => {
                    const mappeddata = getMappedDataForProvinces(result);
                    setData(getMappedDataForProvinces(result));
                })
        }
    }, [zoomLevel])

    const getMappedDataForProvinces = (result) => {
        return result.map((m) => {
            return {
                country: m.country,
                province: m.province,
                confirmed: m.stats.confirmed,
                deaths: m.stats.deaths,
                recovered: m.stats.recovered,
                lat: m.coordinates.latitude,
                long: m.coordinates.longitude
            }
        })
    }

    const getMappedDataForCountries = (result) => {
        return result.map((m) => {
            return {
                country: m.country,
                province: null,
                confirmed: m.cases,
                deaths: m.deaths,
                recovered: m.recovered,
                lat: m.countryInfo.lat,
                long: m.countryInfo.long
            }
        });
    }

    return (
        <>
            <Navbar />
            <CovidMapContainer className="covid-map">
                {
                    data
                        ?
                        <MapContainer center={[51.505, -0.09]} zoom={zoomLevel} minZoom={3} >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
                            />
                            <Circle zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} mapData={data} />
                            <div className='info-panel'>

                            </div>
                        </MapContainer>
                        :
                        <div className="loading-container">
                            <i style={{ fontSize: "30px" }} className="fas fa-circle-notch"></i>
                        </div>
                }
            </CovidMapContainer>

        </>
    )

}

export default CovidMap;


const CovidMapContainer = styled.div`
    height: calc(100vh - 56px);
`