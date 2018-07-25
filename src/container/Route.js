import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithSubRoutes = (route) => {
  return (
      <Route path={route.path} render={props =>{
        return(
          <route.component {...props} {...route}/>
        )
      } }/>
  )
}

export default RouteWithSubRoutes;
