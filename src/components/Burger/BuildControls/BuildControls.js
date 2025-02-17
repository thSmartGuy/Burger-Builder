import React from 'react' ;

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl.js' ;

const controls = [
  {label : 'Salad', type: 'salad'},
  {label : 'Bacon', type: 'bacon'},
  {label : 'Cheese', type: 'cheese'},
  {label : 'Meat', type: 'meat'},
] ;

const buildControls = (props) => {
  return(
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price}</strong></p>
      {controls.map(
        (ctrl) => {
          return (
            <BuildControl
              key={ctrl.label}
              label={ctrl.label}
              added={() => props.ingredientAdded(ctrl.type)}
              remove={() => props.ingredientRemove(ctrl.type)}
              disabled={props.disabled[ctrl.type]}
            />
          ) ;
        }
      )}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
    </div>
  );
};

export default buildControls ;
