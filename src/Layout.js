import React, { Component } from 'react';
import { CssBaseline, withStyles, Drawer, List, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames';
import AppHeader from './components/AppHeader';
import {navigation} from './components/Navigation';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
});

class Layout extends Component {

    constructor(){
        super();
        this.state  = {
            open: true
        }
        this.logout = this.logout.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    }

    logout = () => {
        console.log('logout');
        sessionStorage.removeItem('token');
        window.location = '/login';
    }


    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <CssBaseline />
            <AppHeader logout={ this.logout } open={this.state.open} handleDrawerOpen={this.handleDrawerOpen} />
            <Drawer
             variant="permanent"
             classes={{
               paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
             }}
             open={this.state.open}>
             <div className={classes.toolbarIcon}>
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
              <List>
              {navigation}
              </List>
            </Drawer>
            <main className={classes.content}>
            <div className={classes.appBarSpacer} />
              {this.props.children}
            </main>
            </div>
        );
    }
}
export default withStyles(styles)(Layout);