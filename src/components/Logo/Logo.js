import React from 'react';

// automatically gets the path of burger-logo in string format
// in burgerLogo
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css'

const logo = (props) => {
  return (
    <div className={classes.Logo} style={{height: props.height}}>
      <img src={burgerLogo} />
    </div>
  ) ;
}

export default logo;
