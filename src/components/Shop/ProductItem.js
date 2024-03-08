import Card from "../UI/Card";
import store from "../store";
import classes from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { cartAction } from "../store";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, price, description } = props;
  //update the server with the new state which we derive on the frontend
  //lean components and fat reducers
  //keep all data tranformation logic in reducer

  const addToCartHandler = (event) => {
    dispatch(
      cartAction.addItemToCart({
        id,
        price,
        title,
      })
    );

    console.log(store.getState());
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;

// //you must not mutate redux state outside of a reducer
// const newTotalQuantity=cart.totalQuantity+1;

// const updatedItems=cart.items.slice(); // create a brand new array with the existing object
// // means create a copy with slice without mutation
// const existingItem=updatedItems.find(item=>item.id===id)  //objects are reference values in javascript
// if(existingItem){
//   const updatedItem={...existingItem} //copy that object in a anew object. updatedItem is a brand new object in memory
//   //now we can update properties of that object without manipulating the redux store
//   updatedItem.quantity++;
//   updatedItem.price=updatedItem.price + price;
//   //now we find index of that existing object
//   const existingItemIndex=updatedItems.findIndex(item=>item.id===id)
//   // and replace current item in my cart with updated item
//   updatedItems[existingItemIndex]=updatedItem;
// }else{
//   //now we push a new brand new object to the updated items array
//   updatedItems.pushh({
//     id:id,
//     price:price,
//     quantity:1,
//     totalPrice:price,
//     name:title
//   })
// }
// const newCart={
//   totalQuantity:newTotalQuantity,
//   items:updatedItems
// }
// dispatch(cartAction.replaceCart(newCart))

// event.preventDefault();
