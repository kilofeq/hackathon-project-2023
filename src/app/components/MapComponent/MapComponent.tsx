'use client'

import GoogleMapReact from 'google-map-react';

export const MapComponent = () => {
  const AnyReactComponent = ({text}: {lat:number, lng: number, text: string}) => <div>{text}</div>;

  return (
    <>
      <GoogleMapReact>
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </>
  )
}
