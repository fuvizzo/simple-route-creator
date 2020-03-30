import styled from 'styled-components';
import { Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const PointList = styled(Container)`
   {
    padding: 0;
    min-width: 220px;
  }
`;

const Point = styled(Container)`
   {
    display: flex;
    align-items: center;
    font-size: 0.8em;
    border-bottom: 0.5px dashed grey;
    padding: 5px 0;
  }
`;

const DragHandler = styled(MenuIcon)`
  :hover {
    cursor: row-resize;
  }
`;

export { PointList, Point, DragHandler };
