import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux.js' ;
import Button from '../../UI/Button/Button.js'
class OrderSummary extends Component {
  // This COmponent can be a functional component doesnt heve to be a class component
  componentDidUpdate(){
    console.log('[OrderSummary.js] DidUpdate');
  }

  render(){
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
          </li>) ;
      }
    ) ;

    return (
        <Aux>
          <h3>Your Order</h3>
          <p>A delicious burger with the following ingreadients: </p>
          <ul>
            {ingredientSummary}
          </ul>
          <p>Continue to Checkout?</p>
          <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
          <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    ) ;
  } ;
}

export default OrderSummary ;
