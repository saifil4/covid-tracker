import React, { useEffect, useContext } from 'react';
import Numeral from 'numeral';
import { Circle, Tooltip, useMap } from 'react-leaflet';

import { SelectedCountryContext } from '../store/SelectedCountryContext';
const Circles = ({ mapData }) => {
    const map = useMap();
    const zoom = map.getZoom();

    const [selectedCountry, setSelectedCountry] = useContext(SelectedCountryContext);
    useEffect(() => {
        if (selectedCountry !== "Worldwide") {
            console.log(selectedCountry);
            const regiondata = mapData.find(md => md.country === selectedCountry);
            const latlong = [regiondata.countryInfo.lat, regiondata.countryInfo.long];
            map.panTo(latlong);
            // map.getBoundsZoom(la)
        }
    }, [selectedCountry])

    return (
        <>
            {mapData.map(country => (
                <Circle
                    center={[country.countryInfo.lat, country.countryInfo.long]}
                    fillOpacity={0.4}
                    color="#cc1034"
                    fillColor="#cc1034"
                    radius={Math.sqrt(country.cases) * 300}>
                    <Tooltip>
                        <h3>Popup is up</h3>
                    </Tooltip>
                </Circle>
            ))}
        </>
    )
}

export default Circles;