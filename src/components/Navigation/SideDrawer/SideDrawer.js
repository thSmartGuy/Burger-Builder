import React from 'react' ;

import Logo from '../../Logo/Logo.js';
import NavigationItems from '../NavigationItems/NavigationItems.js';
import classes from './SideDrawer.css';

import Backdrop from '../../UI/Backdrop/Backdrop.js';
import Aux from '../../../hoc/Aux/Aux.js';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close] ;

  if(props.open){
    attachedClasses = [classes.SideDrawer, classes.Open] ;
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  ) ;
}

export default sideDrawer ;
