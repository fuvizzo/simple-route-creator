import styled from 'styled-components';
import { Container } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
const MapContainer = styled(Container)`
   {
    height: 100vh;
  }
`;

const PinMarker = styled(RoomIcon)`
   {
    font-size: 3rem;
    color: grey;
    transform: translate(-50%, -90%);
  }
`;

const PinMarkerCounter = styled('div')`
   {
    background-color: red;
    border-radius: 10px;
    width: 20px;
    height: 20px;
    font-weight: bold;
    font-size: 0.8em;
    line-height: 1.25rem;
    text-align: center;
    transform: translate(-50%, -430%);
  }
`;

export { PinMarker, PinMarkerCounter };
export default MapContainer;
