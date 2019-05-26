import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
});

const AppHeader = ({ classes, logout, open, handleDrawerOpen }) => (
    <AppBar      position="absolute"
    className={classNames(classes.appBar, open && classes.appBarShift)}>
        <Toolbar>
        <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
                HOW TO PLAN
            </Typography>
            { sessionStorage.getItem('token') !== "" && sessionStorage.getItem('token') !== null ? 
            <Button color="inherit" onClick={logout}>Logout</Button>
            : null 
            }
            
            { sessionStorage.getItem('token') === "" || sessionStorage.getItem('token') === null ? 
            <Button color="inherit" href="/login">Login</Button>
            : null
            }
        </Toolbar>

    </AppBar>
);

AppHeader.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(AppHeader);
