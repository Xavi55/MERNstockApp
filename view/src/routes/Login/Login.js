import React from 'react';
import { Button, FormControl, Input,InputLabel, Paper,  Snackbar  } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';
//import PropTypes from 'prop-types';

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
  }
});

class Login extends React.Component {

  constructor(props)
  {
    super(props);
    this.state={
      username:'',
      password:'',
      empty:false,
      okay:false,
      fail:false
    };
    this.login = this.login.bind(this);
    //this.isEmpty = this.isEmpty.bind(this);
    //this.handleChange = this.handleChange.bind(this);
  }

  isEmpty()
  {
    if(this.state.username.length===0 && this.state.password.length===0)
      return true;
  }

  login()
  {
    if(this.isEmpty())
    {
      this.setState({empty:true});
    }
    else
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
        switch(data.pass)
        {
          case 0:
            this.setState({fail:true});
            break
          case 1:
            this.setState({okay:true});
            console.log(data);
            setTimeout(()=>
            {
              this.props.history.push('/home'/*,{state:data.session}*/); //send to home page
            },2500);
          break;
            case 2:
            console.log(data);
            break;
          default:
          console.log("default");
        }
      })
      .catch(err => console.log('Error found:',err)); 
     }
    this.setState({username:"",password:""});
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
        break;
    }
  }

  componentWillMount()//login check
  {
    fetch('isSecure')
    .then(res=>res.json())
    .then(res=>{
      if(res.logged)
      {
        this.props.history.push('/home');
      }
    })
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
              <Input name='user' onChange={(e)=>this.handleChange("username",e.target.value)} value={this.state.username} autoFocus/>
            </FormControl>
            <br/>
            <FormControl>
              <InputLabel htmlFor='pass'>Password
              </InputLabel>
              <Input name='pass'onChange={(e)=>this.handleChange("password",e.target.value)} value={this.state.password} />
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
        <Snackbar
          anchorOrigin={{vertical:'bottom',horizontal:'left'}}
          open={this.state.okay}
          autoHideDuration={3000}
          onClose={()=>this.setState({okay:false})}
          message={'Log in Success!'}
        >
        </Snackbar>
        <Snackbar
          anchorOrigin={{vertical:'bottom',horizontal:'left'}}
          open={this.state.empty}
          autoHideDuration={3000}
          onClose={()=>this.setState({empty:false})}
          message={'All information is required!'}
        >
        </Snackbar>
        <Snackbar
          anchorOrigin={{vertical:'bottom',horizontal:'left'}}
          open={this.state.fail}
          autoHideDuration={3000}
          onClose={()=>this.setState({fail:false})}
          message={'Wrong login info!'}
        >
        </Snackbar>
           
      </div>
    );
  }
}
export default withStyles(styles)(Login);