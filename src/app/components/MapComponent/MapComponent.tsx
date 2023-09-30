'use client';

import GoogleMapReact from 'google-map-react';

export function MapComponent() {
  function AnyReactComponent({ text }: {lat:number, lng: number, text: string}) {
    return <div>{text}</div>;
  }

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div className="w-screen h-4/5">
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: 'AIzaSyBwgfFNNWpM4EfH_hA-Lfge3ltdyGteeQ4' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
