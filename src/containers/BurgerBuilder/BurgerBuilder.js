import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux.js';

import Burger from '../../components/Burger/Burger.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.js'
import Modal from '../../components/UI/Modal/Modal.js'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';

import axios from '../../axios-orders.js' ;
import Spinner from '../../components/UI/Spinner/Spinner.js' ;
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js'

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
    ingredients : null,
    totalPrice : 50,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount = () => {
    axios.get('https://react-my-burger-561b7.firebaseio.com/ingredients.json').then(
      (response) => {
        this.setState({ingredients: response.data}) ;
      }
    ).catch(
      () => {
        this.setState({error: true}) ;
      }
    ) ;
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
    // alert('You Continue') ;
    // SEND DATA TO BACKEND

    this.setState(
      {loading: true}
    ) ;

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Shubham Pandey",
        address: {
          street: "Noida Delhi Banglore Ola",
          zipcode: "41555",
          country: 'Bharat'
        },
        email: 'tests@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order).then(
      (response) => {
        this.setState({loading: false, purchasing: false}) ;
        //console.log(response);
      }
    ).catch(
      (error) => {
        this.setState({loading: false, purchasing: false}) ;
        //console.log(error) ;
      }
    ) ; // .json for firebase necessary
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null ;
    let burger = this.state.error ? <p>Ingredients cant be loaded!! </p> : <Spinner /> ;

    if(this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
          ordered = {this.purchaseHandler}
          price = {this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          disabled = {disabledInfo}
          purchasable={this.state.purchasable}/>
        </Aux>) ;

      orderSummary = (
        <OrderSummary
          ingredients = {this.state.ingredients}
          purchaseCancel = {this.purchaseCancelHandler}
          purchaseContinue = {this.purchaseContinueHandler}
        />
      ) ;
    }

    if(this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
          {orderSummary}
        </Modal>

        {burger}

      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios) ;
