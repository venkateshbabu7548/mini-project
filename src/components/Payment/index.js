import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Payment = () => (
  <>
    <Header />
    <div className="payment-con">
      <div className="payment-res">
        <img
          src="https://res.cloudinary.com/dqeh6jl97/image/upload/v1704099950/check-circle.1_1_ih4z5l.jpg"
          alt="payment"
          className="pay-img"
        />
        <h1>Payment Successful</h1>
        <p className="empty-para">
          Thank you for ordering Your payment is successfully completed.
        </p>

        <button type="button" className="order-btn">
          <Link to="/">Go To Home</Link>
        </button>
      </div>
    </div>
  </>
)

export default Payment
