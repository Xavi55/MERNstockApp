import React from 'react';
import { Button, FormControl, Input,InputLabel, Paper,  Snackbar  } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const styles = theme => ({
  });

  class Home extends React.Component
  {
      constructor(props)
      {
          super(props);
          this.state={

          };
          //this.funct
      }

      //functions
      render()
      {
          const { classes } = this.props;
          return(
              <div>

                  HOME PAGE<br/>
                  WELCOME {this.props.location.state.state.name}!
                  <Button
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
                    >Sign out</Button>
              </div>
          )
      }
  }
export default withStyles(styles)(Home);
 