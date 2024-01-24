import './index.css'

const CarouselItem = props => {
  const {image} = props
  return <img className="offer-image" src={image} alt="offer" />
}

export default CarouselItem
