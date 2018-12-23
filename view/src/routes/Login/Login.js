import React, { Component } from 'react';
import { Button, FormControl, Input,InputLabel, Paper  } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import './login.css';

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
});

class Login extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={
      username:'',
      password:'',
    };
    this.login = this.login.bind(this);
    //this.handleChange = this.handleChange.bind(this);
  }
  login()
  {
    const options={
      method:'POST',
      body:JSON.stringify({'username':this.state.username,'password':this.state.password}),
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      }
    };

    fetch('/login', options)
    .then(res=>res.json())//preProcess?
    .then(data => 
      {
          //this.setState({todos:data.data});
          console.log(data);
      })
      .catch(err => console.log('Error found:',err));
  }

  handleChange(elem,value)
  {
    switch(elem)
    {
      case "username":
        this.setState({username:value})
        break;
      case "password":
        this.setState({password:value})
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div id={'body'} className={classes.main}>
        <Paper className={classes.paper}>
          <h5 id={'smDesc'}>
            Enter to find, discover and compare your favorite stocks!
          </h5>
          <form>
            <FormControl>
              <InputLabel htmlFor='user'>Username
              </InputLabel>
              <Input name='user' onChange={(e)=>this.handleChange("username",e.target.value)} autoFocus/>
            </FormControl>
            <br/>
            <FormControl>
              <InputLabel htmlFor='pass'>Password
              </InputLabel>
              <Input name='pass'onChange={(e)=>this.handleChange("password",e.target.value)} />
            </FormControl>
          </form>
          <br/>
          <div id={'buttons'}>
            <Button id={'bLeft'} color='secondary' variant='contained'>Sign Up
            </Button>
            <Button id={'bRight'} color='primary' variant='contained' onClick={this.login} >Login
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(Login);