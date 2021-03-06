import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import Circle from '../components/circles';
import Loading from '../components/Loading';

const CovidMap = () => {
    const [data, setData] = useState();
    const [zoomLevel, setZoomLevel] = useState(2);

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
            <div className="covid-map">
                {
                    data
                        ?
                        <MapContainer center={[51.505, -0.09]} zoom={zoomLevel} >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Circle zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} mapData={data} />
                        </MapContainer>
                        :
                        <Loading />
                }
            </div>

        </>
    )

}

export default CovidMap;