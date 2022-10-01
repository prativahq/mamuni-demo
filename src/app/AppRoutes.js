import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';
import Insertion_cards from './insertion-cards/Insertion_cards';
import { auth, db, storage } from './firebase';
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react';
import { collection, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect } from 'react';
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
const Register = lazy(() => import('./user-pages/Register'));
const Lockscreen = lazy(() => import('./user-pages/Lockscreen'));

const BlankPage = lazy(() => import('./general-pages/BlankPage'));




const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/charts/chart-js" component={ChartJs} />
        <Route path="/insertion-form" component={Insertion_Form} />
        <Route path="/reports" component={Reports} />
        <Route path="/cards" component={Insertion_cards} />
        <Route path="/register" component={Register} />
      </Switch>
    </Suspense>
  );
}

export default AppRoutes;