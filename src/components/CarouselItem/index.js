import './index.css'

const CarouselItem = props => {
  const {image} = props
  return (
    <li>
      <img className="offer-image" src={image} alt="offer" />
    </li>
  )
}

export default CarouselItem
