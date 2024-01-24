import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-con">
    <div className="not-found-responsive">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
        alt="not found"
        className="not-found-img"
      />
      <h1>Page Not Found</h1>
      <p className="not-found-text">
        We are sorry, the page you requested could not be found.
        <br /> Please go back to the homepage
      </p>

      <button type="button" className="not-found-btn">
        <Link to="/">Home Page</Link>
      </button>
    </div>
  </div>
)

export default NotFound
