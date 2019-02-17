import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
//import AuthenticatedRoute from './AuthenticatedRoute'; //didn't need it
class Routes extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state=
    {
    }
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
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home}/>
      <Route component={()=>{return(<h1 style={{textAlign:'center'}}><br/><br/>404</h1>)}}/>
    </Switch>
    )
  }
}
export default Routes;
//<AuthenticatedRoute isAuth={this.state.isAuth} session={this.state.session} path="/home" component={Home}/>

/* export default () =>
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/home" exact component={Home} />
  </Switch>;
 */
  //This file ultimately acts a a controller for all my routes.