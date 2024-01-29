import {Component} from 'react'
import {FaStar, FaRupeeSign} from 'react-icons/fa'

import './index.css'

class FoodItem extends Component {
  state = {activeCount: 1, isShowCount: false}

  onClickedButton = () => {
    const {details} = this.props
    const {cost, imageUrl, name, id} = details
    const {activeCount} = this.state
    this.setState({isShowCount: true})

    const cartData = localStorage.getItem('cartData')
    const parsedCart = JSON.parse(cartData)
    if (parsedCart === null) {
      const cartList = [
        {
          cost,
          imageUrl,
          name,
          id,
          quantity: activeCount,
        },
      ]

      const stringifiedList = JSON.stringify(cartList)
      localStorage.setItem('cartData', stringifiedList)
    } else if (parsedCart.id !== id) {
      const newItem = {
        cost,
        imageUrl,
        name,
        id,
        quantity: activeCount,
      }
      parsedCart.push(newItem)
      const stringifiedCart = JSON.stringify(parsedCart)
      localStorage.setItem('cartData', stringifiedCart)
    }
    console.log(JSON.parse(localStorage.getItem('cartData')))
  }

  updateCount = () => {
    const {details} = this.props
    const {id} = details
    const {activeCount} = this.state
    const parsedCart = JSON.parse(localStorage.getItem('cartData'))
    const modifiedCart = parsedCart.map(each => {
      if (each.id === id) {
        return {...each, quantity: activeCount}
      }
      return each
    })
    const stringifiedCart = JSON.stringify(modifiedCart)
    localStorage.setItem('cartData', stringifiedCart)
    console.log(JSON.parse(localStorage.getItem('cartData')))
  }

  removeItem = () => {
    const {details} = this.props
    const {id} = details
    const parsedCart = JSON.parse(localStorage.getItem('cartData'))
    const updatedCart = parsedCart.filter(each => each.id !== id)
    const stringifiedCart = JSON.stringify(updatedCart)
    localStorage.setItem('cartData', stringifiedCart)
  }

  onIncrementCount = () => {
    this.setState(
      prevState => ({activeCount: prevState.activeCount + 1}),
      this.updateCount,
    )
  }

  onDecrementCount = () => {
    const {activeCount} = this.state
    if (activeCount > 1) {
      this.setState(
        prevState => ({activeCount: prevState.activeCount - 1}),
        this.updateCount,
      )
    } else {
      this.setState({isShowCount: false}, this.removeItem)
    }
  }

  render() {
    const {details} = this.props
    const {cost, imageUrl, name, rating} = details
    const {activeCount, isShowCount} = this.state

    return (
      <li className="food-item-con">
        <img src={imageUrl} className="food-item-img" alt={name} />
        <div className="food-item-content">
          <h1 className="food-item-name">{name}</h1>
          <div className="food-item-para">
            <FaRupeeSign />
            <p className="food-item-suffix">{cost}</p>
          </div>
          <div className="food-item-para food-item-rating">
            <FaStar color="#f7931e" />
            <p className="food-item-suffix rate">{rating}</p>
          </div>

          {!isShowCount && (
            <button
              type="button"
              className="add-btn"
              onClick={this.onClickedButton}
            >
              ADD
            </button>
          )}
          {isShowCount && (
            <div className="count-btn-con">
              <button
                type="button"
                className="count-btn"
                onClick={this.onDecrementCount}
              >
                -
              </button>
              <p className="count">{activeCount}</p>
              <button
                type="button"
                className="count-btn"
                onClick={this.onIncrementCount}
              >
                +
              </button>
            </div>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
