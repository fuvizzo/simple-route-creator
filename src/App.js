import React, { useState } from 'react';
import MapArea from './components/MapArea';
import RouteList from '../src/components/RouteList';
import { Drawer, IconButton, Snackbar } from '@material-ui/core';
import constants from './constants';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/styles';
import MuiAlert from '@material-ui/lab/Alert';

const MenuButton = styled(IconButton)`
  && {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 1;
    opacity: 0.5;
    background-color: #000;
    color: #fff;
  }
`;

const HintsUl = styled('ul')`
  padding: 0;
`;

function App() {
  console.count('App');
  const [uiState, setUIState] = useState({
    drawer: {
      open: false,
    },
    snackbar: {
      open: true,
    },
  });

  const [mapState, setMapState] = useState({
    mapData: { map: null, points: new Map(), path: null },
  });

  const handleSetRoute = route => {
    setMapState({
      ...mapState,
      ...{
        mapData: { ...mapState.mapData, ...{ points: route } },
      },
    });
  };

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setUIState({
      ...uiState,
      ...{
        drawer: {
          open,
        },
      },
    });
  };

  const closeSnackBar = _ => {
    setUIState({
      ...uiState,
      ...{
        snackbar: {
          open: false,
        },
      },
    });
  };

  return (
    <StylesProvider injectFirst>
      <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
        <MenuIcon fontSize="large" />
      </MenuButton>
      <Drawer
        anchor={constants.RouteList.DRAWER_ANCHOR}
        open={uiState.drawer.open}
        onClose={toggleDrawer(false)}
      >
        <RouteList route={mapState.mapData.points} setRoute={handleSetRoute} />
      </Drawer>
      <MapArea mapData={mapState.mapData} setRoute={handleSetRoute} />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={closeSnackBar}
        open={uiState.snackbar.open}
        autoHideDuration={10000}
      >
        <MuiAlert severity="info" elevation={6} variant="filled">
          Hints:
          <HintsUl>
            <li>double-click to place a marker</li>
            <li>click&drag to move it</li>
            <li>single click to remove it</li>
          </HintsUl>
        </MuiAlert>
      </Snackbar>
    </StylesProvider>
  );
}

export default App;
