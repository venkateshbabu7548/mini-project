import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-responsive">
      <div className="footer-image-container">
        <img
          src="https://res.cloudinary.com/dqeh6jl97/image/upload/v1702403328/Frame_275_fzl5ez.png"
          className="website-footer-logo"
          alt="website-footer-logo"
        />
        <h1 className="website-footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="footer-para">
        The only thing we are serious about is food. Contact us on
      </p>
      <ul className="footer-icons-con">
        <li>
          <FaPinterestSquare
            testid="pintrest-social-icon"
            className="footer-icon"
          />
        </li>
        <li>
          <FaInstagram testid="instagram-social-icon" className="footer-icon" />
        </li>
        <li>
          <FaTwitter testid="twitter-social-icon" className="footer-icon" />
        </li>
        <li>
          <FaFacebookSquare
            testid="facebook-social-icon"
            className="footer-icon"
          />
        </li>
      </ul>
    </div>
  </div>
)

export default Footer
