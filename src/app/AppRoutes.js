import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';
import Insertion_cards from './insertion-cards/Insertion_cards';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Reports = lazy(() => import('./reports/reports'));
const Insertion_Form = lazy(() => import('./Insertion-Form/Order_Forms'));
const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));


const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));



const Mdi = lazy(() => import('./icons/Mdi'));


const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));
const Lockscreen = lazy(() => import('./user-pages/Lockscreen'));

const BlankPage = lazy(() => import('./general-pages/BlankPage'));




class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path={"/"} component={Dashboard} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/insertion-form" component={Insertion_Form} />


          <Route exact path="/basic-ui/buttons" component={Buttons} />
          <Route exact path="/basic-ui/dropdowns" component={Dropdowns} />
          <Route exact path="/basic-ui/typography" component={Typography} />


          <Route exact path="/form-Elements/basic-elements" component={BasicElements} />

          <Route exact path="/tables/basic-table" component={BasicTable} />


          <Route exact path="/icons/mdi" component={Mdi} />


          <Route exact path="/charts/chart-js" component={ChartJs} />

          <Route exact path="/reports" component={Reports} />
          <Route exact path="/cards" component={Insertion_cards} />


          <Route exact path="/user-pages/login-1" component={Login} />
          <Route exact path="/user-pages/register-1" component={Register1} />
          <Route exact path="/user-pages/lockscreen" component={Lockscreen} />

          {/* <Route exact path="/error-pages/error-404" component={Error404} /> */}
          {/* <Route path="*" component={Error404} /> */}
          <Route exact path="/error-pages/error-500" component={Error500} />

          <Route exact path="/general-pages/blank-page" component={BlankPage} />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;