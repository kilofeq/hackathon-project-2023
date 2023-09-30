"use client";

import GoogleMap from 'google-maps-react-markers'
import {useEffect, useState} from "react";
import {InfoMarker} from "@/assets/infoMarker";


export const MapComponent = () => {

  const [userLocalization, setUserLocalization] = useState({lat: 0, lng: 0})
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setUserLocalization({lat: loc.coords.latitude ,lng: loc.coords.longitude})
    })
  },[])

  if (userLocalization.lat !== 0 || userLocalization.lng !== 0) {
    return (
    <div className='w-screen h-screen'>
      <GoogleMap
        apiKey = "AIzaSyBwgfFNNWpM4EfH_hA-Lfge3ltdyGteeQ4"
        defaultCenter={{lat: userLocalization.lat, lng: userLocalization.lng}}
        defaultZoom={17}
        options={{fullscreenControl: false ,
          rotateControl: false,
          panControl: false,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          clickableIcons: false
      }}
      >
         {/*@ts-ignore*/}
        <div lat={userLocalization.lat} lng={userLocalization.lng} className='-translate-y-1/2'>
          <InfoMarker/>
        </div>
      </GoogleMap>
    </div>
  )
}
}
