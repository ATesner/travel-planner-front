import React, { Component } from 'react';
import Layout from '../Layout';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import MediaCard from '../components/MediaCard';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MultipleSelect from '../components/MultipleSelect';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom';
import { HttpHelper } from '../http/Helper';

const styles = theme => ({
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
      },
      menu: {
        width: 500,
      },
})

class Trips extends Component {

    constructor(){
        super();

        this.state = {
            dateDebut: '2017-05-24',
            dateFin: '2017-05-24',
            paysSelected: null,
            countries: [],
            paysEscale: [],
            escale: "non",
            trips: [],
            card: {
                nom : "", visa: ""
            }
        }
    }

    componentWillMount() {
        
        HttpHelper.get('/countries').then(res => {
            console.log('GET PAYS RESULT', res)
            this.setState({ countries: res.countries })
        })

        this.getTrips()
    }

    handleChange = name => event => {
        console.log('target', event.target.value, this.state.paysEscale)

        if(name === 'paysSelected'){
            this.getVisa(event.target.value);
        }else{
            this.setState({
              [name]: event.target.value,
            });
        }
      };

    getVisa = (pays) => {
        // console.log('getVisa', pays)
        // HttpHelper.get('/visa?name=' + pays).then(res => {
        //     console.log('GET VISA RESULT', res)
        //     this.setState({ card: res.visa[0], paysSelected: pays }, () => {
        //         // console.log('card after', this.state.card)
        //     })
        // });
        fetch('http://localhost:3008/api/visa?name=' + pays, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': sessionStorage.getItem('token')
            }
        }).then( res => {
            return res.json()
        }).then(data =>{
            console.log('Visa found', data, this.state.card)
            this.setState({ card: data.visa[0], paysSelected: pays }, () => {
                console.log('card after', this.state.card)
            })
        });
    }   

    addTrip = () => {

        if(this.state.paysSelected != null){
            let newtrip = {
                pays: this.state.paysSelected,
                dateDebut: this.state.dateDebut,
                dateFin: this.state.dateFin,
                layovers: this.state.paysEscale
            }
            console.log('paysSelected', this.state.paysSelected)

            HttpHelper.post('/trip', newtrip).then(res => {
                console.log('ADD TRIP RESULT', res)
                if(res.success){
                    this.getTrips();
                }
            });
        }
    }

    getTrips = () => {

        HttpHelper.get('/trips').then(res =>  {
            console.log('GET TRIP RESULT', res)
            this.setState({ trips: res.trips })
        });
    }

    deleteTrip = (id) => {
        // console.log('TRIP ID', id);
        HttpHelper.delete('/trip', id).then(res => {
            console.log('DELETE TRIP RESULT', res)
            if(res.success) {
                this.getTrips();
            }
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Layout>
                 <Grid container spacing={24}>
                 <Grid item xs={6}>
                    <Grid item xs={12}>                
                        <TextField select
                            value={this.state.paysSelected}
                            onChange={this.handleChange('paysSelected')}
                            className={classes.TextField}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Où allez vous ?"
                            margin="normal"
                            variant="outlined"
                        >
                            {this.state.countries.map(country => (
                                <MenuItem key={country.id} value={country.id}>
                                {country.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            onChange={this.handleChange('dateDebut')}
                            label="Date début"
                            type="date"
                            defaultValue={this.state.dateDebut}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            onChange={this.handleChange('dateFin')}
                            label="Date fin"
                            type="date"
                            defaultValue={this.state.dateFin}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <button onClick={this.addTrip}>Ajouter</button>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Faites vous au moins une escale ?</InputLabel>
                        <RadioGroup aria-label="position" name="position" value={this.state.escale} onChange={this.handleChange('escale')} row>
                            <FormControlLabel
                            value="oui"
                            control={<Radio color="primary" />}
                            label="Oui"
                            labelPlacement="start"
                            />
                            <FormControlLabel
                            value="non"
                            control={<Radio color="primary" />}
                            label="Non"
                            labelPlacement="start"
                            />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                        { this.state.escale === 'oui' ?
                            <MultipleSelect 
                                array={this.state.countries} 
                                selectedArray={this.state.paysEscale} 
                                handleSelect={this.handleChange('paysEscale')} />
                            : null
                        }
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    { this.state.paysSelected != null && this.state.card ?
                    <MediaCard
                    imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl5QByfuirFxTZKDPBC4_p4PhbXzltOYI6iBweazeoZ4JdvXoW"
                    imageTitle="Alt text"
                    card={this.state.card}
                    />
                    : null }
                </Grid>
                <Grid item xs={12}>
                <List className={classes.root}>
                { this.state.trips.map(trip =>(
                    <ListItem key={trip.id}>
                        <ListItemText primary={trip.name} secondary={ trip.start_date + " au " + trip.end_date } />
                        <Link to={"/trip/"+trip.id} style={{ textDecoration: 'none' }} >
                        Voir
                        </Link>
                        <button onClick={this.deleteTrip.bind(this, trip.id)}>
                            <DeleteForeverTwoToneIcon />
                        </button>
                    </ListItem>
                ))}
                </List>
                </Grid>
            </Grid>
            </Layout>
        );
    }
}
export default withStyles(styles)(Trips);