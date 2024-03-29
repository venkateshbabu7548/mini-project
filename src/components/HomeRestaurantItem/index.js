import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'

import './index.css'

const HomeRestaurantItem = props => {
  const {details} = props
  const {id, imageUrl, menuType, name, userRating} = details
  const {rating, ratingColor, totalReviews} = userRating
  return (
    <Link to={`/restaurant/${id}`} className="set-link">
      <li className="home-restaurant-item">
        <img src={imageUrl} alt="restaurant" className="restaurant-image" />
        <div className="item-content">
          <p className="item-name">{name}</p>
          <p className="item-menu-type">{menuType}</p>
          <div className="rating-con">
            <FaStar color={ratingColor} />
            <p className="item-name">{rating}</p>
            <p className="item-reviews">{`(${totalReviews} ratings)`}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default HomeRestaurantItem
