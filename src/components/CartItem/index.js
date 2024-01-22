import {FaRupeeSign} from 'react-icons/fa'

import './index.css'

const CartItem = props => {
  const {
    details,
    onIncrementQuantity,
    onDecrementQuantity,
    onDeleteFromCart,
  } = props
  const {imageUrl, name, quantity, cost, id} = details

  const onIncreaseQuantity = () => {
    onIncrementQuantity(id)
  }

  const onDecreaseQuantity = () => {
    if (quantity > 1) {
      onDecrementQuantity(id)
    } else {
      onDeleteFromCart(id)
    }
  }

  return (
    <li className="cart-Item" data-testid="cartItem">
      <div className="cart-img-con">
        <img src={imageUrl} alt="cartItem" className="cart-img" />

        <h1 className="cart-item-name">{name}</h1>
      </div>
      <img src={imageUrl} alt="cartItem" className="cart-sm-img" />
      <div className="quantity-btn-con">
        <button
          type="button"
          className="count-btn"
          data-testid="decrement-quantity"
          onClick={onDecreaseQuantity}
        >
          -
        </button>
        <p className="count" data-testid="item-quantity">
          {quantity}
        </p>
        <button
          type="button"
          className="count-btn"
          data-testid="increment-quantity"
          onClick={onIncreaseQuantity}
        >
          +
        </button>
      </div>
      <div className="price-con">
        <FaRupeeSign />
        <p>{`${cost * quantity}.00`}</p>
      </div>
      <div className="cart-sm-content">
        <p className="cart-item-name">{name}</p>
        <div className="quantity-btn-con-sm">
          <button
            type="button"
            className="count-btn"
            data-testid="decrement-quantity"
            onClick={onDecreaseQuantity}
          >
            -
          </button>
          <p className="count" data-testid="item-quantity">
            {quantity}
          </p>
          <button
            type="button"
            className="count-btn"
            data-testid="increment-quantity"
            onClick={onIncreaseQuantity}
          >
            +
          </button>
        </div>
        <div className="price-con-sm">
          <FaRupeeSign />
          <p>{`${cost * quantity}.00`}</p>
        </div>
      </div>
    </li>
  )
}

export default CartItem
