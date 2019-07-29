import React, { Component } from 'react';

import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js'

const INGREDIENTS_PRICE = {
  salad: 5,
  cheese: 10,
  meat: 20,
  bacon: 20
}

class BurgerBuilder extends Component {
  //constructor(props){
  //  super(props);
  //  this.state = (...);
  //}

  state = {
    ingredients : {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice : 50
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type] ;

    if(oldCount <= 0){
      return ;
    }

    const updatedCount = oldCount - 1 ;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount ;
    const priceAddition = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition ;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    }
    );
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type] ;
    const updatedCount = oldCount + 1 ;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount ;
    const priceAddition = INGREDIENTS_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition ;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    }
    );
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder ;
