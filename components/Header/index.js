import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {showPopup: false}

  onClickPopup = () => {
    this.setState(prevState => ({showPopup: !prevState.showPopup}))
  }

  showDropDownMenu = () => (
    <div className="drop-down">
      <ul className="navBar">
        <Link to="/" className="link">
          <li className="item">
            <button type="button" className="btn-el">
              Home
            </button>
          </li>
        </Link>

        <Link to="/vaccination" className="link">
          <li className="item">
            <button type="button" className="btn-el">
              Vaccination
            </button>
          </li>
        </Link>

        <Link to="/about" className="link">
          <li className="item">
            <button type="button" className="btn-el">
              About
            </button>
          </li>
        </Link>
      </ul>
      <button
        type="button"
        className="close-button"
        onClick={this.onClickPopup}
      >
        <img
          src="https://res.cloudinary.com/dvcurljig/image/upload/v1639610058/Covid19DashBoard/Shape_mcb6ew.svg"
          alt="cross"
        />
      </button>
    </div>
  )

  render() {
    const {showPopup} = this.state

    return (
      <>
        <div className="header-container">
          <Link to="/" className="link">
            <h1 className="logo">COVID19INDIA</h1>
          </Link>
          {/* <span className="india"></span> */}
          <div className="navBar">
            <Link to="/" className="link">
              <h1 className="item">Home</h1>
            </Link>

            <Link to="/vaccination" className="link">
              <h1 className="item">Vaccination</h1>
            </Link>

            <Link to="/about" className="link">
              <h1 className="item">About</h1>
            </Link>
          </div>
        </div>

        <div className="mobile-menu">
          <div className="mobile-header-container">
            <Link to="/" className="link">
              <h1 className="logo">
                COVID19<span className="india">INDIA</span>
              </h1>
            </Link>
            <button
              type="button"
              className="toggle-button"
              onClick={this.onClickPopup}
            >
              <img
                src="https://res.cloudinary.com/dvcurljig/image/upload/v1639545433/Covid19DashBoard/add-to-queue_1_wy2cf1.svg"
                alt="Ham"
              />
            </button>
          </div>
          <div className="menu">
            {showPopup ? this.showDropDownMenu() : null}
          </div>
        </div>
      </>
    )
  }
}

export default Header
