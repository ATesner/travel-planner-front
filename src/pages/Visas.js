import React, { Component } from 'react';
import Layout from '../Layout';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { HttpHelper } from '../http/Helper';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    } ,
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})

class Visas extends Component {

    constructor(){
        super();

        this.state = {
            visa: null,
            paysFound: [],
            searchValue: '',
            countriesFiltered: []
        }
        this.onKeyDownSearch = this.onKeyDownSearch.bind(this);
      //  this.paysClicked = this.paysClicked.bind(this);
    }

    componentWillMount() {

        HttpHelper.get('/countries').then(res => {
            console.log('GET COUNTRIES', res);
            this.setState({ paysFound: res.countries })
        })
    }

    onKeyDownSearch(e) {
        console.log('keyDownSearch', this.state.searchValue, this.state.paysFound)
        if(e.key == 'Enter'){

            
        }else if (this.state.searchValue.length > 2){

            let filter = this.state.paysFound.filter(country => {
                return country.search_name.toLowerCase().includes(this.state.searchValue.toLowerCase());
                
            })
            this.setState({ countriesFiltered: filter})
            // HttpHelper.get('/c')
            // fetch('http://localhost:3008/api/pays?name='+this.state.searchValue.toLowerCase(), {
            //     method: 'GET',
            //     headers:{
            //         'Content-Type': 'application/json',
            //         'Authorization': sessionStorage.getItem('token')
            //     },
            //   }).then( res => {
            //       return res.json()
            //   }).then(data =>{
            //       //console.log('Pays found', data)
            //       this.setState({ paysFound: data.pays })
            //   });
        }
    }

    handleChange = (event) => {
        this.setState({
          searchValue: event.target.value,
        });
    };

    paysClicked(country) {
        console.log('paysClicked', country)
        this.setState({ searchValue: country.name });

        HttpHelper.get('/visa?name='+country.id).then(res => {
            console.log('GET PAYS', res)
            this.setState({ visa: res.visa[0], paysFound: [], countriesFiltered: [] })
        })
        // fetch('http://localhost:3008/api/visa?name='+nom, {
        //         method: 'GET',
        //         headers:{
        //             'Content-Type': 'application/json',
        //             'Authorization': sessionStorage.getItem('token')
        //         },
        //       }).then( res => {
        //           return res.json()
        //       }).then(data =>{
        //           console.log('Visa found', data)
        //           this.setState({ visa: data.visa, paysFound: [] })
        //       });
    }

    render() {
        const { classes } = this.props;

        let card;
        
        if(this.state.visa) {
            let currentVisa = this.state.visa;
            console.log('currentVisa', currentVisa)
            card = <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Visa
                    </Typography>
                    <Typography variant="h5" component="h2">
                        { currentVisa.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        { currentVisa.stay }
                    </Typography>
                    <Typography component="p">
                        { currentVisa.condition }
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        }
        return (
            <Layout>
                <TextField
                id="standard-search"
                label="Rechercher un pays"
                type="search"
                className={classes.textField}
                margin="normal"
                onKeyDown={this.onKeyDownSearch}
                value={this.state.searchValue}
                onChange={this.handleChange}
                />
                { this.state.countriesFiltered.length > 0 && this.state.countriesFiltered.map(pays => (
                    <ListItem button key={pays.id} onClick={this.paysClicked.bind(this, pays)} >
                        <ListItemText primary={pays.name}></ListItemText>
                    </ListItem>
                ))
                }
                { card }          
            </Layout>
        );
    }
}
export default withStyles(styles)(Visas);