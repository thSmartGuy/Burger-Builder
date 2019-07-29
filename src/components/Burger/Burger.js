import React from 'react' ;

import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients.js'

const burger = (props) => { // receiving ingredients
  // javascript "Object"  keys method to convert a object to keys
  // we are reciving ingredients as an object
  let transformIngredients = Object.keys(props.ingredients).map(
    (ingrKeys) => {
      return ([...Array(props.ingredients[ingrKeys])].map(
          (_, idx) => {
            return (
              <BurgerIngredients key={ingrKeys + idx} type={ingrKeys}/>
            ) ;
          }
        )
      ) ;
    }
    // reduce built in array function which transform array
    // into something else
    ).reduce(
    (arr, el) => {
      return (
        arr.concat(el)
      );
    }, []); // accept initial value [] => curentlly passing an empty array

  if (transformIngredients.length === 0){
    transformIngredients = <p>Please start adding Ingredients</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top"/>
        {transformIngredients}
      <BurgerIngredients type="bread-bottom"/>
    </div>
  ) ;
}

export default burger ;
