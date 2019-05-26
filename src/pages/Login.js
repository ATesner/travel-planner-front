import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);        
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = event.target;
        let obj = JSON.stringify({
            email: data.email.value,
            password: data.password.value
        })
        console.log('obj', obj)
        fetch('http://localhost:3008/api/signin', {
            method: 'POST',
            body: obj,
            headers:{
                'Content-Type': 'application/json'
            }
          }).then( res => {
              return res.json()
          }).then(data =>{
              console.log('User found', data)
              if(data.accesstoken && data.accesstoken !== ''){
                  sessionStorage.setItem('token', data.accesstoken);
                  this.props.history.push('/')
              }
          });
    }

    render() {

        if(sessionStorage.getItem('token')){
            this.props.history.push('/');
        }        
        const { classes } = this.props;
        return (
            <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <a href="/">Retour</a>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Se connecter
                </Typography>
                <form className={classes.form} onSubmit={this.handleSubmit} >
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Addresse Email</InputLabel>
                    <Input id="email" name="email" autoComplete="email" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Mot de passe</InputLabel>
                    <Input name="password" type="password" id="password" autoComplete="current-password" />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Garder la connexion"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Se connecter
                </Button>
                </form>
            </Paper>
            </main>
        );
    }
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);