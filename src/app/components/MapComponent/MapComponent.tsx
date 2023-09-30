'use client'

import GoogleMapReact from 'google-map-react';
import {useEffect, useState} from "react";

export const MapComponent = () => {

  const [userLocalization, setUserLocalization] = useState({lat: 0, lng: 0})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setUserLocalization({lat: loc.coords.latitude ,lng: loc.coords.longitude})
    })
  },[])

  const AnyReactComponent = ({text}: {lat:number, lng: number, text: string}) => <div>{text}</div>;
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  console.log("dupa", userLocalization)

  return (
    <div className='w-screen h-screen'>
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: "AIzaSyBwgfFNNWpM4EfH_hA-Lfge3ltdyGteeQ4" }}
        defaultCenter={userLocalization}
        center={{lat: userLocalization.lat, lng: userLocalization.lng}}
        defaultZoom={11}
        options={{fullscreenControl: false, zoomControl: false, mapTypeId: 'hybrid'}}
      >
        <AnyReactComponent
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  )
}
