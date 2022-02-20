import React, { useEffect, useContext } from 'react';
import { Circle, Tooltip, useMap, useMapEvent } from 'react-leaflet';

import { SelectedCountryContext } from '../store/SelectedCountryContext';
const Circles = ({ zoomLevel, setZoomLevel, mapData }) => {
    const map = useMap();
    const [selectedCountry, setSelectedCountry] = useContext(SelectedCountryContext);

    useMapEvent(('zoom'), () => {
        console.log(map.getZoom());
        setZoomLevel(map.getZoom())
    })

    useEffect(() => {
        if (selectedCountry !== "Worldwide") {
            console.log(selectedCountry);
            const regiondata = mapData.find(md => md.country === selectedCountry);
            const latlong = [regiondata.lat, regiondata.long];
            map.panTo(latlong);
        }
    }, [selectedCountry])

    const Multiplier = () => {
        return parseInt(600 / zoomLevel);
    }

    return (
        <>
            {mapData.map(country => (
                <Circle
                    center={[country.lat, country.long]}
                    fillOpacity={0.6}
                    color="#e74c3c"
                    fillColor="#e74c3c"
                    stroke="1px"
                    radius={Math.sqrt(country.confirmed) * Multiplier()}>
                    <Tooltip className="case-tooltip">
                        {
                            country.province === null
                                ?
                                <h5>{country.country}</h5>
                                :
                                <h5>{country.province}</h5>
                        }
                        <div className="case-item">
                            <div className="legend amber"></div>
                            <label>Confirmed</label>
                            <p>{country.confirmed}</p>
                        </div>
                        <div className="case-item">
                        <div className="legend green"></div>
                            <label>Recovered</label><p>{country.recovered}</p>
                        </div>
                        <div className="case-item">
                        <div className="legend red"></div>
                            <label>Deaths</label><p>{country.deaths}</p>
                        </div>


                    </Tooltip>
                </Circle>
            ))}
        </>
    )
}

export default Circles;