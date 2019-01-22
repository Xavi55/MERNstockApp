import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
class Routes extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state=
    {
      isAuth:0,
      session:{}
    }
    this.loginCheck = this.loginCheck.bind(this);
  }

  loginCheck()
  {
    if(this.state.isAuth)
    {
      return(
        <div>
          <Route path="/home" exact component={Home}/>
          <Redirect to={{pathname:'/home', state:this.state.session}}/>
        </div>
      )
    }
  }

  componentDidMount()
  {
    fetch('/isSecure')
    .then(res => res.json())
    .then(res=>
    {
      if(res.logged)
      {
        this.setState({isAuth:1,session:res.session});
        console.log(res.session);
      }
    });
  }
  render()
  {
    return(
    <Switch>
      {/* 
        this.state.isAuth ?
        <Route path="/home" exact component={Home}/>
        //<Redirect to='/home' session={this.state.session}/>
          //<Redirect to='/home'/>
        :
        null
       */}
       {
         //this.loginCheck()
       }
      <Route path="/" exact component={Login} />
      {<Route path="/home" exact component={Home} />
      }
    </Switch>
    )
  }
}
export default Routes;

/* export default () =>
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/home" exact component={Home} />
  </Switch>;
 */
  //This file ultimately acts a a controller for all my routes.