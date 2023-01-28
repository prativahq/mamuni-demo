import React, { Component, Suspense, lazy, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import ClientReports from './Client/Clientreports';
import Insertion_cards from './insertion-cards/Insertion_cards';
import Spinner from '../app/shared/Spinner';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const CallLogs = lazy(() => import('./call_logs/CallLogs'));
const DfLogs = lazy(() => import('./dialogflow_logs/DfLogs'));
const Reports = lazy(() => import('./reports/reports'));
const Insertion_Form = lazy(() => import('./Insertion-Form/Order_Forms'));
const ChartJs = lazy(() => import('./InsertionOrder/InsertionOrder'));
const Login = lazy(() => import('./user-pages/Login'));
const Register = lazy(() => import('./user-pages/Register'));

const AppRoutes = () => {
  const [userid, setuserid] = useState(null);
  const [photo, setphoto] = useState(null);
  const [uidd, setuid] = useState(null);
  const [email, setemail] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setuid(uid);
        setphoto(user.photoURL);
        setuserid(user.uid);
        setemail(user.email);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={email === "test@gmail.com" ? Dashboard : ClientReports} />
        <Route path="/charts/chart-js" component={email === "test@gmail.com" ? ChartJs : ClientReports} />
        <Route path="/insertion-form" component={email === "test@gmail.com" ? Insertion_Form : ClientReports} />
        <Route path="/reports" component={email === "test@gmail.com" ? Reports : ClientReports} />
        <Route path="/cards" component={email === "test@gmail.com" ? Insertion_cards : ClientReports} />
        <Route path="/register" component={email === "test@gmail.com" ? Register : ClientReports} />
        <Route path="/client" component={email !== "test@gmail.com" ? ClientReports : Reports} />
        <Route path="/call_logs" component={email === "test@gmail.com" ? CallLogs : ClientReports} />
        <Route path="/df_logs" component={DfLogs} />
      </Switch>
    </Suspense>
  );
}

export default AppRoutes;