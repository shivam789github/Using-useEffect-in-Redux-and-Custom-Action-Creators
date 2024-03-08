import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import store from "../store";
import { cartAction } from "../store";

const CartItem = (props) => {
  const { id, title, quantity, total, price } = props.item;
  const dispatch = useDispatch();
  const increaseCartItemHandler = (event) => {
    event.preventDefault();
    dispatch(
      cartAction.addItemToCart({
        id,
        price,
        title,
      })
    );
    console.log(store.getState());
  };
  const decreaseCartItemHandler = (event) => {
    event.preventDefault();
    dispatch(cartAction.removeItemFromCart(id));
    console.log(store.getState());
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decreaseCartItemHandler}>-</button>
          <button onClick={increaseCartItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
