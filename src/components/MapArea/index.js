import React, { useEffect, useState } from 'react';
import MapContainer from './styles';
import scriptLoader from 'react-async-script-loader';
import constants from '../../constants';
import { mapInit, markerSetterInit } from './googleMaps';

const MapArea = props => {
  console.count('MapArea');
  const { mapData, setRoute, isScriptLoaded, isScriptLoadSucceed } = props;
  //const [map, setMap] = useState();

  useEffect(() => {
    if (mapData.points.size > 1) {
      markerSetterInit(mapData, {
        onDrawCompleted: _ => {
          console.log('Redraw completed after resort');
        },
      });
    }
  }, [mapData.points]);

  useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed) {
      console.log('script loaded');
      mapData.map = mapInit();

      markerSetterInit(mapData, {
        onDrawCompleted: _ => {
          setRoute(mapData.points);
        },
      });
    } else {
      console.log('script not loaded yet');
    }
  }, [isScriptLoaded, isScriptLoadSucceed]);

  return (
    <MapContainer maxWidth={1} id="map" disableGutters={true}></MapContainer>
  );
};

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key= ${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
])(MapArea);
