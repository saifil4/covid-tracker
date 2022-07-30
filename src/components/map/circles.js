import React, { useEffect, useContext } from 'react';
import { Circle, Tooltip, useMap, useMapEvent } from 'react-leaflet';
import styled from 'styled-components';
import { useCountry } from '../../store/SelectedCountryContext';

const Circles = ({ zoomLevel, setZoomLevel, mapData }) => {
    const map = useMap();
    const {selectedCountry, setSelectedCountry} = useCountry();

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
        return parseInt(400 / zoomLevel);
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
                    <CaseTooltip>
                        <Country>
                            {country.province === null? country.country:country.province }
                        </Country>
                        <CaseItem>
                            <Label><Legend color="#f4c363"></Legend>Confirmed</Label>
                            <Count>{country.confirmed}</Count>
                        </CaseItem>
                        <CaseItem>
                            <Label><Legend color="#00AA00"></Legend>Recovered</Label>
                            <Count>{country.recovered}</Count>
                        </CaseItem>
                        <CaseItem>
                            <Label><Legend color="#DE3700"></Legend>Deaths</Label>
                            <Count>{country.deaths}</Count>
                        </CaseItem>
                    </CaseTooltip>
                </Circle>
            ))}
        </>
    )
}

export default Circles;


const CaseTooltip = styled(Tooltip)`
    background: white;
`

const Country = styled.p`
    color: black;
    width: 100%;
    text-align:center;
    font-weight: bold;
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #00000020
`

const CaseItem = styled.div`
    margin-bottom: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Legend = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 100%;
    margin-right: 5px;
    background: ${props => props.color}90;
    border:none;
`;

const Label = styled.label`
  font-size: 12px;
  padding-right: 10px;
  margin: 0;
  display:flex;
  align-items:center;
`

const Count = styled.p`
    margin: 0;
    font-size: 12px;
    float: right;
`