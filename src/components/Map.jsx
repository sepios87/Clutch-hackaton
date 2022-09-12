import React, {useEffect, useState} from 'react';
import './Map.scss';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import L from 'leaflet';
import PropTypes from "prop-types";

export const Map = ({ isGeoloc, minMap }) => {
    const coord = [46.1667, -1.15]
    const [coords, setCoords] = useState([]);
    const [focusCoords, setFocusCoords] = useState(coord);
    const [places, setPlaces] = useState([]);

    // Retrieve markers
    const getData = () => {
        fetch('/api/places')
            .then(res => res.json())
            .then(res => setPlaces(res))
    }

    // Send datas after page initialization
    useEffect(()=> {
        return getData();
    },[])

    // Button "Localisez-moi"
    function clickButton() {
        function success(pos) {
            setCoords([...coords,{longitude:pos.coords.longitude,latitude:pos.coords.latitude}])
            setFocusCoords([pos.coords.latitude,pos.coords.longitude]);
        }
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function error(err) {
            console.warn(`ERREUR (${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options)
    }

    const icon = new L.Icon({
        iconUrl: require('../assets/icons/car-marker.png'), // Mettre l'icon de la tuture
        iconSize:     [40, 40], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76]
    });

    // Redirection setView after geoLocalisation
    const MinimapController = ({currentFocus}) => {
        const minimap = useMap()
        minimap.setView(currentFocus)
        return null;
    }

    return <>
        {
            isGeoloc ?
                <button onClick={clickButton}>Localisez-moi</button>
                : <></>
        }
        <MapContainer center={coord} zoom={13} className={`${!isGeoloc && "map map-student"} ${minMap && "minmap"}`}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        />
        <MinimapController currentFocus={focusCoords}/>
        {places.map(place => {
            return  <Marker position={[place.position[0],place.position[1]]} key={place.id} icon={icon}>
                <Popup>
                    { place.name}
                </Popup>
            </Marker>
        })}
    </MapContainer></>
}

Map.propTypes = {
    isGeoloc: PropTypes.bool
}
