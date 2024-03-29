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
    <li className="cart-sm-item">
      <img src={imageUrl} alt="cartItem" className="sm-cart-img" />
      <div className="sm-content">
        <p className="sm-name">{name}</p>
        <div className="sm-btn-con">
          <button
            type="button"
            className="sm-count-btn"
            onClick={onDecreaseQuantity}
          >
            -
          </button>
          <p className="count">{quantity}</p>
          <button
            type="button"
            className="sm-count-btn"
            onClick={onIncreaseQuantity}
          >
            +
          </button>
        </div>
        <div className="price-con">
          <FaRupeeSign />
          <p>{`${cost * quantity}.00`}</p>
        </div>
      </div>
    </li>
  )
}

export default CartItem
