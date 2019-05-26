import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { userConnected } from '../utils/utils';

export const navigation = (
  <div>
    <Link to="/" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    { userConnected() ?
    <Link to="/trips" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="My Trips" />
      </ListItem>
    </Link> : null 
    }
    <Link to="/visas" style={{ textDecoration: 'none' }}>
      <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Visas" />
      </ListItem>
    </Link>
  </div>
);