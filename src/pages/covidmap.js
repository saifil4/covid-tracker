import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import Circle from '../components/circles';
import Loading from '../components/loading';

const CovidMap = () => {
    const [mapData, setMapData] = useState();

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/countries')
            .then(res => res.json())
            .then(result => {
                setMapData(result);
            })
    }, []);

   

    return (
        <>
            <div className="covid-map">
                {
                    mapData
                        ?
                        <MapContainer center={[51.505, -0.09]} zoom={3} >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Circle mapData={mapData} />
                        </MapContainer>
                        :
                        <Loading />
                }
            </div>

        </>
    )

}

export default CovidMap;