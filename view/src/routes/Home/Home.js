import React from 'react';
import { Button, FormControl, Input,InputLabel, 
    Paper,  Snackbar, AppBar, Toolbar, Typography 
} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

const styles = theme => ({
    body:
    {
        margin:'8% auto 0 auto',
        height:'80vh',
        width:'90%'
    },
    bar:
    {
        backgroundColor:'#1318a0'
    }
    ,
    spacing: 
    {
        flexGrow: 1,
    },
  });

  class Home extends React.Component
  {
      constructor(props)
      {
          super(props);
          this.state={
              isAuth:0,
              session:{}

          };
          //this.funct
      }

      //functions
      componentWillMount()//login check
      {
        fetch('/isSecure')
        .then(res=>res.json())
        .then(res=>{
          if(res.logged)
          {
            this.setState({isAuth:1,session:res.session})
          }
          else
          {
            this.props.history.push('/')
          }
        })   
      }
      render()
      {
          const { classes } = this.props;
          return(
            this.state.isAuth
            ?
            <div>
                <AppBar>
                    <Toolbar className={classes.bar}>
                        <Typography variant='h6' color='inherit' className={classes.spacing}>
                            Welcome, {this.state.session.name}!
                        </Typography>
                        <Button
                        color='inherit'
                        onClick={()=>
                        {
                            fetch('/logout')
                            .then(res=>res.json())
                            .then(res=>{
                                if(res.logout)
                                {
                                    this.props.history.push('/');
                                }
                            })  
                        }}
                        >Sign out
                        </Button>
                    </Toolbar>
                </AppBar>
            <Paper className={classes.body}>
                <Typography color='inherit'>
                words
                </Typography>
            </Paper>
            </div>
            :
            null
            //can't use <Redirect/> for some reason?!?!
          )
      }
  }
export default withStyles(styles)(Home);
 