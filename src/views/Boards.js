import React from 'react';
import BoardContainer from '../components/BoardContainer';
import Auth from '../components/Auth';

export default function Boards(props) {
  const loadComponent = () => {
    let component = '';
    if (props.authed) {
      component = <BoardContainer />;
    } else {
      component = <Auth />;
    }
    return component;
  };
  return (
    <div>
      <h1>BOARDS</h1>
      {loadComponent()}
    </div>
  );
}
