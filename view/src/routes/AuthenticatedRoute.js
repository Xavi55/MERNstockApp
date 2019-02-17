import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, isAuth, session, props: cProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      isAuth
        ? <C {...session} {...props} {...cProps} />
        : <Redirect
            to={`/?redirect=${props.location.pathname}${props.location
              .search}/${isAuth}`}
          />
        }
  />;