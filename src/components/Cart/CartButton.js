import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { displayItemAction } from '../store';

const CartButton = (props) => {
  // const noOfItems=useSelector(state=>state.itemChange.noOfItems);
  // const totalCartQuantity=useSelector(state=>state.displayItem.numberOfDisplayItem);
  // const totalNoOfItems=noOfItems + totalCartQuantity

   const dispatch=useDispatch()
   const totalQuantity=useSelector(state=>state.cart.totalQuantity)
  
  const toggleCartHandler=()=>{
    dispatch(displayItemAction.toggleCart())
  }
  
  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
