import React, { useState, createContext, useContext } from 'react';

export const SelectedCountryContext = createContext();

export const useCountry = () => {
    return useContext(SelectedCountryContext);
}

export const SelectedCountryProvider = ({children}) => {
    const [selectedCountry, setSelectedCountry] = useState("Worldwide");
    const [isVisible, setIsVisible] = useState(false);
    
    const value = {
        selectedCountry, setSelectedCountry, isVisible, setIsVisible
    }

    return (
        <SelectedCountryContext.Provider value={value}>
            {children}
        </SelectedCountryContext.Provider>
    )

}