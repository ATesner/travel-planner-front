import React, { Component } from 'react';
import Layout from '../Layout';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
      },
})

class TripDetail extends Component {

    render() {
        const { classes } = this.props;

        return (
            <Layout>
                <Paper className={ classes.paper } elevation={1}>
                    <Typography variant="h5" component="h3">
                    Visas
                    </Typography>
                    <Typography component="p">
                        <ul>
                            <li>
                                Aucun visa requis pour moins de 90 jours
                            </li>
                            <li>
                                Pour séjour prolongé : ...
                            </li>
                            <li>
                                ...
                            </li>
                        </ul>
                    </Typography>
                </Paper>
                <br/>
                <Paper className={ classes.paper } elevation={1}>
                    <Typography variant="h5" component="h3">
                    Vaccin
                    </Typography>
                    <Typography component="p">
                        <ul>
                            <li>
                                DTP
                            </li>
                            <li>
                                Encéphalite japonaise : zone rurale
                            </li>
                            <li>
                                ...
                            </li>
                        </ul>
                    </Typography>
                </Paper>
                <br/>
                <Grid container spacing={24}>
                <Grid item xs={6}>
                <Paper className={ classes.paper } elevation={1}>
                    <Typography variant="h5" component="h3">
                    Prise electrique
                    </Typography>
                    <Typography component="p">
                        <ul>
                            <li>
                                Image, schéma
                            </li>
                            <li>
                                Type EU, Chine...
                            </li>
                            <li>
                                ...
                            </li>
                        </ul>
                    </Typography>
                </Paper>
                </Grid>
                <Grid item xs={6}>
                <Paper className={ classes.paper } elevation={1}>
                    <Typography variant="h5" component="h3">
                    Devises
                    </Typography>
                    <Typography component="p">
                        Convertisseur
                    </Typography>
                </Paper>
                </Grid>
                <Grid item xs={6}>
                <Paper className={ classes.paper } elevation={1}>
                    <Typography variant="h5" component="h3">
                    Langues parlées
                    </Typography>
                    <Typography component="p">
                        Anglais
                    </Typography>
                </Paper>
                </Grid>
                <Grid item xs={6}>
                <Paper className={ classes.paper } elevation={1}>
                    <Typography variant="h5" component="h3">
                    ...
                    </Typography>
                    <Typography component="p">
                        ...
                    </Typography>
                </Paper>
                </Grid>
                </Grid>
                <br/>
            </Layout>
        )
    }
}

export default withStyles(styles)(TripDetail);