import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux.js';

import Burger from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js'
import Modal from '../../components/UI/Modal/Modal.js'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';

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
    totalPrice : 50,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients).map(
      (igKeys) => {
        return (ingredients[igKeys]);
      }
    ).reduce((sum, el) => {
      return sum + el ;
    }, 0) ;
    this.setState({purchasable: sum > 0}) ;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true}) ;
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
    this.updatePurchaseState(updatedIngredients) ;
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
    this.updatePurchaseState(updatedIngredients) ;
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    alert('You Continue') ;
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Aux>
        <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
          <OrderSummary
            ingredients = {this.state.ingredients}
            purchaseCancel = {this.purchaseCancelHandler}
            purchaseContinue = {this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ordered = {this.purchaseHandler}
          price = {this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          disabled = {disabledInfo}
          purchasable={this.state.purchasable}/>
      </Aux>
    );
  }
}

export default BurgerBuilder ;
