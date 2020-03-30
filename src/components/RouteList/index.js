import React, { useEffect, useState } from 'react';
import { PointList, Point, DragHandler } from '../RouteList/styles';
import { Container } from '@material-ui/core';
import { createMarkerIcon } from './../MapArea/markerIcon';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const RouteList = props => {
  const { route, setRoute } = props;
  const [routePoints, setRoutePoints] = useState(route);

  const DragHandleElement = SortableHandle(() => <DragHandler />);

  const SortableItem = SortableElement(({ data }) => (
    <Point>
      <DragHandleElement />
      <img
        src={setMarkerIcon(data.index + 1, { size: '35' })}
        alt="markerIcon"
      />
      <Container disableGutters={true}>
        <div>lat: {data.item.position.lat()} </div>
        <div>lng: {data.item.position.lat()} </div>
      </Container>
    </Point>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <PointList>
        {items.map((item, index) => (
          <SortableItem
            key={`item-${item}`}
            index={index}
            data={{ item, index }}
          />
        ))}
      </PointList>
    );
  });
  const onSortEndHandler = ({ oldIndex, newIndex }) => {
    const newRoutePoints = arrayMove(
      [...routePoints.values()],
      oldIndex,
      newIndex
    );
    const newRoute = new Map();
    newRoutePoints.forEach((item, index) => {
      newRoute.set(index, item);
    });

    setRoutePoints(newRoutePoints);
    setRoute(newRoute);
  };
  function setMarkerIcon(index, iconProps) {
    return `data:image/svg+xml,${createMarkerIcon(index, iconProps)}`;
  }
  return (
    <Container maxWidth="lg">
      <SortableList
        helperClass="sortableHelper"
        useDragHandle
        hideSortableGhost={false}
        items={[...routePoints.values()]}
        onSortEnd={onSortEndHandler}
      />
    </Container>
  );
};

export default RouteList;
