import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import MainApp from './MainApp';
import HomePage from './HomePage';
import DetailsPage from './DetailsPage';
import Dasboadrd from './Dashboard';
import RouteWithSubRoutes from './Route';

const routes = [
  {
    component: MainApp,
    routes: [
      {
        exact:true,
        path:'/',
        component: HomePage
      },     
      {
        exact:true,
        path:'/products/:id/:slug',
        component: DetailsPage
      },
      {
        exact:true,
        path:'/admin/add-product',
        component: Dasboadrd
      },
    ]
  }
];

const AppRoute = () => (
	<Router>
		<div>
			{routes.map((route, i) => (
		 		<RouteWithSubRoutes key={i} {...route} text="Daniel Agus" />
			))}
		</div>
	</Router>
);

export default AppRoute;