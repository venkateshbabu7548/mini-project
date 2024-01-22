import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaRupeeSign} from 'react-icons/fa'

import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Restaurant extends Component {
  state = {
    restaurantDetailsApiStatus: apiStatusConstants.initial,
    restaurantDetails: [],
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  convertToCamelCase = every => ({
    imageUrl: every.image_url,
    rating: every.rating,
    name: every.name,
    cost: every.cost,
    id: every.id,
  })

  getRestaurantDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({restaurantDetailsApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list/${id}`,
      options,
    )
    const data = await response.json()

    if (response.ok === true) {
      const restaurantDetails = {
        name: data.name,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        location: data.location,
        costForTwo: data.cost_for_two,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        foodItems: data.food_items.map(every => this.convertToCamelCase(every)),
      }

      this.setState({
        restaurantDetailsApiStatus: apiStatusConstants.success,
        restaurantDetails,
      })
    }
  }

  renderRestaurantLoadingView = () => (
    <div
      className="restaurant-loader-container"
      data-testid="restaurant-details-loader"
    >
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderRestaurantsSuccessView = () => {
    const {restaurantDetails} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantDetails
    return (
      <div className="restaurant-details">
        <img src={imageUrl} alt="restaurant" className="restaurant-img" />

        <div className="restaurant-content">
          <h1 className="restaurant-heading">{name}</h1>
          <p className="restaurant-suffix position">{cuisine}</p>
          <p className="restaurant-suffix position">{location}</p>
          <div className="ratings-con position">
            <div className="each-content">
              <div className="restaurant-rating">
                <FaStar />
                <p className="special">{rating}</p>
              </div>
              <p className="restaurant-suffix position">{`${reviewsCount}+ ratings`}</p>
            </div>
            <hr />
            <div className="each-content">
              <div className="restaurant-rating">
                <FaRupeeSign />
                <p className="special">{costForTwo}</p>
              </div>
              <p className="restaurant-suffix position">Cost for two</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderRestaurantDetails = () => {
    const {restaurantDetailsApiStatus} = this.state
    switch (restaurantDetailsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderRestaurantLoadingView()
      case apiStatusConstants.success:
        return this.renderRestaurantsSuccessView()
      default:
        return null
    }
  }

  renderFoodItemsSuccessView = () => {
    const {restaurantDetails} = this.state
    const {foodItems} = restaurantDetails

    return (
      <ul className="restaurant-food-items-list">
        {foodItems.map(each => (
          <FoodItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderFoodItems = () => {
    const {restaurantDetailsApiStatus} = this.state
    switch (restaurantDetailsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderRestaurantLoadingView()
      case apiStatusConstants.success:
        return this.renderFoodItemsSuccessView()
      default:
        return null
    }
  }

  render() {
    const {restaurantDetails} = this.state
    console.log(restaurantDetails)
    return (
      <div className="restaurant-con">
        <Header />
        <div className="specific-restaurant-con">
          {this.renderRestaurantDetails()}
        </div>
        <div className="restaurant-food-items-con">
          {this.renderFoodItems()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Restaurant
