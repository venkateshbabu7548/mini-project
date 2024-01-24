import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaRupeeSign} from 'react-icons/fa'

import Header from '../Header'
import Footer from '../Footer'
import TableCell from '../TableCell'
import CartItem from '../CartItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Cart extends Component {
  state = {apiStatus: apiStatusConstants.initial, cart: []}

  componentDidMount() {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const cart = JSON.parse(localStorage.getItem('cartData'))
    console.log(cart)

    this.setState({apiStatus: apiStatusConstants.success, cart})
  }

  onIncrementQuantity = id => {
    const {cart} = this.state
    const modifiedCart = cart.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    this.setState({cart: modifiedCart})
    const stringfiedCart = JSON.stringify(modifiedCart)
    localStorage.setItem('cartData', stringfiedCart)

    console.log(JSON.parse(localStorage.getItem('cartData')))
  }

  onDecrementQuantity = id => {
    const {cart} = this.state
    const modifiedCart = cart.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity - 1}
      }
      return each
    })
    this.setState({cart: modifiedCart})
    const stringfiedCart = JSON.stringify(modifiedCart)
    localStorage.setItem('cartData', stringfiedCart)
  }

  onDeleteFromCart = id => {
    const {cart} = this.state
    const selectedCart = cart.filter(each => each.id !== id)
    this.setState({cart: selectedCart})
    const stringfiedCart = JSON.stringify(selectedCart)
    localStorage.setItem('cartData', stringfiedCart)
  }

  renderCartLoadingView = () => (
    <div className="cart-loader-container">
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  totalPrice = () => {
    const {cart} = this.state
    let total = 0
    const totalPrice = cart.map(each => each.quantity * each.cost)
    totalPrice.forEach(x => {
      total += x
    })

    return total
  }

  forwardToPayment = () => {
    const {history} = this.props
    history.replace('/payment')
  }

  renderCartItems = () => {
    const {cart} = this.state

    return (
      <div className="cart-con">
        <table>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          <tbody>
            {cart.map(each => (
              <TableCell
                key={each.id}
                details={each}
                onIncrementQuantity={this.onIncrementQuantity}
                onDecrementQuantity={this.onDecrementQuantity}
                onDeleteFromCart={this.onDeleteFromCart}
              />
            ))}
          </tbody>
        </table>
        <ul className="cart-items-sm-con">
          {cart.map(each => (
            <CartItem
              key={each.id}
              details={each}
              onIncrementQuantity={this.onIncrementQuantity}
              onDecrementQuantity={this.onDecrementQuantity}
              onDeleteFromCart={this.onDeleteFromCart}
            />
          ))}
        </ul>

        <hr className="dotted" />
        <div className="total-con">
          <div className="total-con-res">
            <p>Order Total:</p>
            <div className="total-price">
              <FaRupeeSign />
              <p>{`${this.totalPrice()}.00`}</p>
            </div>
          </div>
        </div>
        <div className="total-con">
          <div className="order-btn-res">
            <button
              type="button"
              className="order-btn"
              onClick={this.forwardToPayment}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  redirectToHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderNoOrdersView = () => (
    <div className="empty-cart-con">
      <img
        src="https://res.cloudinary.com/dqeh6jl97/image/upload/v1704094590/clipart-food-soup-7_qvmdub.png"
        alt="empty cart"
        className="empty-cart-img"
      />
      <h1>No Order Yet!</h1>
      <p className="empty-para">
        Your cart is empty. Add something from the menu.
      </p>
      <button type="button" className="order-btn" onClick={this.redirectToHome}>
        Order now
      </button>
    </div>
  )

  renderCartSuccessView = () => {
    const {cart} = this.state

    if (cart.length === 0) {
      return this.renderNoOrdersView()
    }
    return this.renderCartItems()
  }

  renderCart = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderCartLoadingView()
      case apiStatusConstants.success:
        return this.renderCartSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="cart-main-con">
          <div className="cart-responsive">
            <div className="cart-res">{this.renderCart()}</div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}
export default Cart
