import { useContext } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';

import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = (props) => {

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0 ;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount:1})
    }

    const cartItems = <ul className={classes['cart-items']}> {
        cartCtx.items.map((item) => <CartItem
         key={item.id}
         name={item.name}
         amount={item.amount}
         price={item.price}

         //bind ensures that the idea of the to be added  or removed item is passed here to remove handler 
         //bind pre-configure as a function for future execution and basically allows you to pre-configure the argument that function will receive when it's being executed
         onRemove={cartItemRemoveHandler.bind(null, item.id)}
         onAdd={cartItemAddHandler.bind(null, item)}
         /> )} </ul>;
  
    return (
    <Modal onClose={props.onClose}>
        
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button}>Order</button>}
        </div>
    </Modal>
  )
}

export default Cart