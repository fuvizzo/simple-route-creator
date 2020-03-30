/* import React, { useEffect, useState, useCallback } from 'react';

import GoogleMapReact from 'google-map-react';

import MapContainer, { PinMarker, PinMarkerCounter } from '../Map/styles';
import MapStyles from '../../config/MapStyles';
import constants from '../../constants';

const Marker = ({ count }) => {
  return (
    <div>
      <PinMarker />
      <PinMarkerCounter>{count}</PinMarkerCounter>
    </div>
  );
};

const Map = () => {
  console.count('MapArea');
  const [markerCoordinates, setMarkerCoordinates] = useState([]);
  const [map, setMap] = useState();
  const [polyline, setPolyline] = useState();

  const onClick = e => {
    setMarkerCoordinates([...markerCoordinates, { lat: e.lat, lng: e.lng }]);
    // const marker = Marker(e.lat, e.lng, markers.length + 1);
    //setMarkers([...markers, marker]);
  };

  const onChildMove = (childKey, childProps, mouse) => {
    polyline.setMap(null);
    if (childProps.draggable) {
      map.draggable = false;
      const coordinates = Object.assign([], markerCoordinates);
      coordinates.splice(parseInt(childKey), 1, {
        lat: mouse.lat,
        lng: mouse.lng,
      });

      setMarkerCoordinates(coordinates);
      drawPolyline();
    }
  };

  const onChildMouseUp = () => {
    map.draggable = true;
  };

  const drawPolyline = useCallback(() => {
    const newPolyline = new window.google.maps.Polyline({
      path: markerCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    newPolyline.setMap(map);
    setPolyline(newPolyline);
  }, [markerCoordinates]);

  useEffect(() => {
    if (markerCoordinates.length > 1 && map.draggable) {
      drawPolyline();
    }
  }, [markerCoordinates.length]);

  return (
    <MapContainer disableGutters={true}>
      <GoogleMapReact
        draggable={true}
        bootstrapURLKeys={{ key: constants.Map.API_KEY }}
        yesIWantToUseGoogleMapApiInternals
        defaultZoom={constants.Map.DEFAULT_ZOOM}
        onGoogleApiLoaded={({ map }) => setMap(map)}
        onChildMouseMove={onChildMove}
        onChildMouseUp={onChildMouseUp}
        center={constants.Map.CENTER}
        onClick={onClick}
        options={{
          styles: MapStyles,
          fullscreenControl: false,
        }}
      >
        {markerCoordinates.map((coordinates, count) => {
          return (
            <Marker
              key={count}
              draggable
              lat={coordinates.lat}
              lng={coordinates.lng}
              count={count + 1}
            />
          );
        })}
      </GoogleMapReact>
    </MapContainer>
  );
};

export default Map;
 */
