import React, { useState, createContext } from 'react';

export const MapZoomLevelContext = createContext();

export const SelectedCountryProvider = (props) => {
    const [zoomLevel, setZoomLevel] = useState(4);
    return (
        <MapZoomLevelContext.Provider value={[zoomLevel, setZoomLevel]}>
            {props.children}
        </MapZoomLevelContext.Provider>
    )
}