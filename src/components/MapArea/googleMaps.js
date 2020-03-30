import constants from '../../constants';
import { createMarkerIcon } from './markerIcon';
import MapStyles from '../../config/MapStyles';

export const mapInit = () => {
  const map = new window.google.maps.Map(document.getElementById('map'), {
    zoom: constants.Map.DEFAULT_ZOOM,
    center: constants.Map.CENTER,
    styles: MapStyles,
    fullscreenControl: false,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
  });

  return map;
};

export const markerSetterInit = (mapData, options) => {
  const { map, points: markers } = mapData;

  const { onDrawCompleted } = options;
  if (markers.size > 1) {
    for (let key of mapData.points.keys()) {
      const marker = mapData.points.get(key);
      window.google.maps.event.clearInstanceListeners(marker);
      markerDraggerInit(marker);
      markerRemoverInit(marker, key);
    }
    drawPolyline();
  }
  window.google.maps.event.clearInstanceListeners(map);
  map.addListener('dblclick', e => {
    let markerIndex =
      markers.size === 0
        ? 0
        : [...markers.keys()].reduce((a, b) => Math.max(a, b)) + 1;
    const marker = new window.google.maps.Marker({
      position: e.latLng,
      draggable: true,
      icon: setMarkerIcon(1),
      map,
    });

    markers.set(markerIndex, marker);

    markerDraggerInit(marker, markerIndex);
    markerRemoverInit(marker, markerIndex);
    if (markers.size > 1) {
      drawPolyline();
    }
  });

  function markerDraggerInit(marker) {
    window.google.maps.event.addListener(marker, 'drag', () => {
      drawPolyline(false);
    });
    window.google.maps.event.addListener(marker, 'dragend', () => {
      drawPolyline();
    });
  }

  function markerRemoverInit(marker, index) {
    window.google.maps.event.addListener(marker, 'click', () => {
      marker.setMap(null);
      markers.delete(index);
      drawPolyline();
    });
  }

  function drawPolyline(markerDragIsOver = true) {
    const markerList = [...markers.values()];
    if (mapData.path) mapData.path.setMap(null);
    const latLngs = markerList.map((marker, index) => {
      const icon = setMarkerIcon(index + 1);
      marker.setIcon(icon);
      return marker.position;
    });

    mapData.path = new window.google.maps.Polyline({
      path: latLngs,
      geodesic: true,
      strokeColor: constants.Theme.Color.PRIMARY,
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    mapData.path.setMap(map);
    if (markerDragIsOver) onDrawCompleted();
  }

  function setMarkerIcon(count) {
    return `data:image/svg+xml,${createMarkerIcon(count)}`;
  }
};
