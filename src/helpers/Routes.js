import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Home from '../views/Home';
import BoardForm from '../views/BoardForm';
import Boards from '../views/Boards';
import PinDetails from '../views/PinDetails';
import PinForm from '../views/PinForm';
import Pins from '../views/Pins';
import SingleBoard from '../views/SingleBoard';
import NotFound from '../views/NotFound';

export default function Routes({ authed }) {
  return (
        <Switch>
          <Route exact path='/' component={() => <Home authed={authed}/>} />

          <Route exact path='/board-form' component={() => <BoardForm authed={authed}/>} />

          <Route exact path='/boards' component={() => <Boards authed={authed}/>} />

          <Route exact path='/pin-details' component={() => <PinDetails authed={authed}/>} />

          <Route exact path='/pin-form' component={() => <PinForm authed={authed}/>} />

          <Route exact path='/pins' component={() => <Pins authed={authed}/>} />

          <Route exact path='/boards/:id' component={() => <SingleBoard authed={authed}/>} />

          <Route component={NotFound}/>
       </Switch>
  );
}
