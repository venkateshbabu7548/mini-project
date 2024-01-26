import {FaRupeeSign} from 'react-icons/fa'

import './index.css'

const TableCell = props => {
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
    <tr testid="cartItem">
      <td>
        <div className="cart-img-con">
          <img src={imageUrl} alt="cartItem" className="cart-img" />

          <h1 className="cart-item-name">{name}</h1>
        </div>
      </td>
      <td>
        <div className="quantity-btn-con">
          <button
            testid="decrement-quantity"
            type="button"
            className="count-btn"
            onClick={onDecreaseQuantity}
          >
            -
          </button>
          <p testid="item-quantity" className="count">
            {quantity}
          </p>
          <button
            testid="increment-quantity"
            type="button"
            className="count-btn"
            onClick={onIncreaseQuantity}
          >
            +
          </button>
        </div>
      </td>
      <td className="price-con">
        <FaRupeeSign />
        <p>{`${cost * quantity}.00`}</p>
      </td>
    </tr>
  )
}

export default TableCell
