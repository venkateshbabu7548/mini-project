import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import {MdOutlineSort} from 'react-icons/md'
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import Footer from '../Footer'
import CarouselItem from '../CarouselItem'
import HomeRestaurantItem from '../HomeRestaurantItem'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 1,
    displayText: 'Highest',
    value: 'Highest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const settings = {
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dotsClass: 'slick-dots',
  autoplay: true,
}

class Home extends Component {
  state = {
    carouselItems: [],
    carouselItemsApiStatus: apiStatusConstants.initial,
    sortBy: sortByOptions[0].value,
    activePageNumber: 1,
    restaurantsList: [],
    restaurantsListApiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getCarouselImages()
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    const {activePageNumber, sortBy, searchInput} = this.state
    this.setState({restaurantsListApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const limit = 9
    const offset = (activePageNumber - 1) * limit
    const restaurantsResponse = await fetch(
      `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortBy}&search=${searchInput}`,
      options,
    )
    const data = await restaurantsResponse.json()

    if (restaurantsResponse.ok === true) {
      const restaurantsList = data.restaurants.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        menuType: each.menu_type,
        name: each.name,
        userRating: {
          rating: each.user_rating.rating,
          ratingColor: each.user_rating.rating_color,
          totalReviews: each.user_rating.total_reviews,
        },
      }))
      console.log(restaurantsList)
      this.setState({
        restaurantsList,
        restaurantsListApiStatus: apiStatusConstants.success,
      })
    }
  }

  getCarouselImages = async () => {
    this.setState({carouselItemsApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const carouselResponse = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    const data = await carouselResponse.json()

    if (carouselResponse.ok === true) {
      const carouselOfferList = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))

      this.setState({
        carouselItems: carouselOfferList,
        carouselItemsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({carouselItemsApiStatus: apiStatusConstants.failure})
    }
  }

  onIncreasePage = () => {
    const {activePageNumber} = this.state
    console.log('Hii')
    if (activePageNumber < 3) {
      this.setState(
        prevState => ({
          activePageNumber: prevState.activePageNumber + 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onDecreasePage = () => {
    const {activePageNumber} = this.state
    if (activePageNumber > 1) {
      this.setState(
        prevState => ({
          activePageNumber: prevState.activePageNumber - 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  renderCarouselLoadingView = () => (
    <div
      testid="restaurants-offers-loader"
      className="carousel-loader-container"
    >
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderCarouselSuccessView = () => {
    const {carouselItems} = this.state
    return (
      <Slider {...settings}>
        {carouselItems.map(eachItem => (
          <CarouselItem key={eachItem.id} image={eachItem.imageUrl} />
        ))}
      </Slider>
    )
  }

  renderSliderContainer = () => {
    const {carouselItemsApiStatus} = this.state
    switch (carouselItemsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderCarouselLoadingView()
      case apiStatusConstants.success:
        return this.renderCarouselSuccessView()

      default:
        return null
    }
  }

  renderRestaurantsLoadingView = () => (
    <div testid="restaurants-list-loader" className="carousel-loader-container">
      <Loader type="Oval" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderRestaurantsListSuccessView = () => {
    const {restaurantsList} = this.state
    return (
      <ul className="restaurants-list-success-con">
        {restaurantsList.map(each => (
          <HomeRestaurantItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderRestaurantsList = () => {
    const {restaurantsListApiStatus} = this.state
    switch (restaurantsListApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderRestaurantsLoadingView()
      case apiStatusConstants.success:
        return this.renderRestaurantsListSuccessView()
      default:
        return null
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeSelect = event => {
    this.setState({sortBy: event.target.value}, this.getRestaurantsList)
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {activePageNumber, searchInput} = this.state
    return (
      <div className="home-large-container">
        <Header />
        <div className="home-carousel-con">
          <div className="slider-con">{this.renderSliderContainer()}</div>
        </div>
        <div className="popular-restaurants-con">
          <h1>Popular Restaurants</h1>

          <p className="restaurants-suffix">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="second-con">
            <input
              type="search"
              placeholder="Search your favourite restaurant"
              className="search-input"
              value={searchInput}
              onChange={this.onChangeSearch}
            />
            <div className="restaurants-sort-by-con">
              <MdOutlineSort className="sort-by-icon" />
              <p>Sort by</p>
              <select
                className="sort-by-dropdown"
                onChange={this.onChangeSelect}
              >
                {sortByOptions.map(each => (
                  <option key={each.id} value={each.value}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="restaurants-con">{this.renderRestaurantsList()}</div>
          <div className="home-pagination-con">
            <button
              testid="pagination-left-button"
              className="pagination-button"
              type="button"
              onClick={this.onDecreasePage}
            >
              <FaAngleLeft className="pagination-icon" aria-label="close" />
            </button>
            <p className="home-pages">
              <span testid="active-page-number">{activePageNumber} </span>
              of 3
            </p>
            <button
              testid="pagination-right-button"
              className="pagination-button"
              type="button"
              onClick={this.onIncreasePage}
            >
              <FaAngleRight className="pagination-icon" aria-label="close" />
            </button>
          </div>
        </div>

        <Footer />
      </div>
    )
  }
}

export default Home
