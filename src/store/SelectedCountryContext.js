import React, { useState, createContext } from 'react';

export const SelectedCountryContext = createContext();

export const SelectedCountryProvider = (props) => {
    const [selectedCountry, setSelectedCountry] = useState("Worldwide");
    return (
        <SelectedCountryContext.Provider value={[selectedCountry, setSelectedCountry]}>
            {props.children}
        </SelectedCountryContext.Provider>
    )

}