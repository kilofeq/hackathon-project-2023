'use client';

import GoogleMap from 'google-maps-react-markers';
import { useEffect, useState } from 'react';
import { InfoMarker } from '@/assets/infoMarker';
import axios from "axios"

export const MapComponent = (props: {onMapPinClick: (report: any) => void}) => {

  const [userLocalization, setUserLocalization] = useState({ lat: 0, lng: 0 });
  const [reports, setReports] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((loc) => {
      setUserLocalization({ lat: loc.coords.latitude, lng: loc.coords.longitude });
    });
  }, []);

  useEffect(() => {
    axios.get("/api/fetch-reports").then(r => {
      setReports(r.data)
    })
  }, []);

  if (userLocalization.lat !== 0 || userLocalization.lng !== 0) {
    return (
    <div className='w-screen h-screen'>
      <GoogleMap
        // apiKey = "AIzaSyBwgfFNNWpM4EfH_hA-Lfge3ltdyGteeQ4"
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
        {
          reports?.map(report => {
            // @ts-ignore
            if (report.latitude && report.longtitude) {
              return (
                // @ts-ignore
                <div onClick={() => props.onMapPinClick(report)} key={report._id} lat={report.latitude} lng={report.longtitude} className='-translate-y-full'>
                  <InfoMarker/>
                </div>
              )
            }
          })
        }
      </GoogleMap>
    </div>
  )
}
}
