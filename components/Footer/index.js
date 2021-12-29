import {Link} from 'react-router-dom'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <Link to="/" className="link">
      <h1 className="logo">
        COVID19<span className="india">INDIA</span>
      </h1>
    </Link>
    <p className="tagline">
      we stand with everyone fighting on the front lines
    </p>
    <div className="icon-container">
      <VscGithubAlt className="icon" />
      <FiInstagram className="icon" />
      <FaTwitter className="icon" />
    </div>
  </div>
)

export default Footer
