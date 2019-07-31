import React from 'react' ;

import classes from './NavigationItems.css' ;
import NavigationItem from './NavigationItem/NavigationItem.js';

const navigationItems = (props) => {
  return (
    <ul className={classes.navigationItems}>
      <NavigationItem link="/" active={true}>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/">
        CheckOut
      </NavigationItem>
    </ul>
  );
}

export default navigationItems ;
