import React from 'react';
import Auth from '../components/Auth';
import Loader from '../components/Loader';
import HomePage from '../components/HomePage';

export default function Home({ user }) {
  const loadComponent = () => {
    let component = '';
    if (user === null) {
      component = <Loader />;
    } else if (user) {
      component = <HomePage />;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return (
    <div>
      <h1>Welcome to React-Pinterest</h1>
      {loadComponent()}
    </div>
  );
}
