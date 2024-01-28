import React, { FC } from 'react';
import {
  makeStyles, Box, Button
} from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ZoomInIcon, ZoomOutIcon, EditIcon } from '../UI/Icons';
import { RoutePath } from '../../enums/Routes';

const useStyles = makeStyles({
  controlButtons: {
    position: 'fixed',
    top: '50%',
    transform: 'translate(-10px, -50%)',
    width: '40px',
    right: '0px',
    '&>button': {
      minWidth: '40px',
      width: '40px',
      height: '40px',
      padding: '0px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#F6F6F6',
      marginBottom: '20px',
      '&:hover': {
        background: '#F6F6F6'
      },
      '&:last-child': {
        marginBottom: '0px'
      }
    }
  }
});

const TextPageControls: FC = () => {
  const classes = useStyles();
  const textEditorCard = document.getElementById('textEditorCard');
  const history = useHistory();
  const textEditorRouteMatch = useRouteMatch(RoutePath.TextEditor);

  const editMessage = () => {
    history.push(`${textEditorRouteMatch!.url}/mobile`);
  };

  const zoomIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (textEditorCard) {
      textEditorCard.style.transform = 'scale(1.2)';
    }
  };

  const zoomOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (textEditorCard) {
      textEditorCard.style.transform = 'scale(0.8)';
    }
  };

  return (
    <Box className={classes.controlButtons}>
      <Button color="primary" onClick={editMessage}><EditIcon /></Button>
      <Button color="primary" onClick={zoomIn}><ZoomInIcon /></Button>
      <Button color="primary" onClick={zoomOut}><ZoomOutIcon /></Button>
    </Box>
  );
};

export default TextPageControls;
