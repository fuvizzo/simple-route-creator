import React, { useState } from 'react';
import MapArea from './components/MapArea';
import RouteList from '../src/components/RouteList';
import { Drawer } from '@material-ui/core';
import constants from './constants';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/styles';

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

function App() {
  console.count('App');
  const [state, setState] = useState({
    drawer: {
      open: false,
    },
    mapData: { map: null, points: new Map(), path: null },
  });

  const handleSetRoute = route => {
    setState({
      ...state,
      ...{
        mapData: { ...state.mapData, ...{ points: route } },
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

    setState({
      ...state,
      ...{
        drawer: {
          open,
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
        open={state.drawer.open}
        onClose={toggleDrawer(false)}
      >
        <RouteList route={state.mapData.points} setRoute={handleSetRoute} />
      </Drawer>
      <MapArea mapData={state.mapData} setRoute={handleSetRoute} />
    </StylesProvider>
  );
}

export default App;
