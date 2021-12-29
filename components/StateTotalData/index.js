import {Component} from 'react'
import './index.css'

class StateTotalData extends Component {
  state = {
    confirmedData: {},
    activeData: {},
    recoveredData: {},
    deceasedData: {},
  }

  componentDidMount() {
    this.getEachState()
  }

  getEachState = async () => {
    const {eachStateTotalData} = this.props

    const totalConfirmed = eachStateTotalData.confirmed
    const totalRecovered = eachStateTotalData.recovered

    const totalDeceased = eachStateTotalData.deceased

    const totalActive = totalConfirmed - totalRecovered - totalDeceased

    const confirmedData = {
      name: 'Confirmed',
      logo:
        'https://res.cloudinary.com/dvcurljig/image/upload/v1639236573/Covid19DashBoard/confirmed_symbol.svg',
      value: totalConfirmed,
    }

    const activeData = {
      name: 'Active',
      logo:
        'https://res.cloudinary.com/dvcurljig/image/upload/v1639237314/Covid19DashBoard/protection_1_x3f55t.svg',
      value: totalActive,
    }

    const recoveredData = {
      name: 'Recovered',
      logo:
        'https://res.cloudinary.com/dvcurljig/image/upload/v1639237381/Covid19DashBoard/recovered_1_ekfpqy.svg',
      value: totalRecovered,
    }
    const deceasedData = {
      name: 'Deceased',
      logo:
        'https://res.cloudinary.com/dvcurljig/image/upload/v1639237349/Covid19DashBoard/breathing_1_s7illv.svg',
      value: totalDeceased,
    }

    this.setState({
      confirmedData,
      activeData,
      recoveredData,
      deceasedData,
    })
  }

  onGetTotal = value => {
    const {setActiveId} = this.props
    setActiveId(value)
  }

  render() {
    const {confirmedData, activeData, recoveredData, deceasedData} = this.state
    console.log(confirmedData)
    const {active} = this.props
    const itsactiveonload = active ? 'confirmed-block' : ''

    return (
      <>
        <ul className="ul-list-eachstate ">
          <li
            className={`category-item ${confirmedData.name} ${itsactiveonload} `}
            tabIndex="-1"
            key={confirmedData.name}
            value={confirmedData.name}
            onClick={() => this.onGetTotal(confirmedData.name)}
          >
            <div testid="stateSpecificConfirmedCasesContainer">
              <p className="stats-title">Confirmed</p>
              <img
                src={confirmedData.logo}
                alt="state specific confirmed cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{confirmedData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${activeData.name}`}
            tabIndex="-1"
            key={activeData.name}
            value={activeData.name}
            onClick={() => this.onGetTotal(activeData.name)}
          >
            <div testid="stateSpecificActiveCasesContainer">
              <p className="stats-title">Active</p>
              <img
                src={activeData.logo}
                alt="state specific active cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{activeData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${recoveredData.name}`}
            tabIndex="-1"
            key={recoveredData.name}
            value={recoveredData.name}
            onClick={() => this.onGetTotal(recoveredData.name)}
          >
            <div testid="stateSpecificRecoveredCasesContainer">
              <p className="stats-title">Recovered</p>
              <img
                src={recoveredData.logo}
                alt="state specific recovered cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{recoveredData.value}</p>
            </div>
          </li>
          <li
            className={`category-item ${deceasedData.name}`}
            tabIndex="-1"
            key={deceasedData.name}
            value={deceasedData.name}
            onClick={() => this.onGetTotal(deceasedData.name)}
          >
            <div testid="stateSpecificDeceasedCasesContainer">
              <p className="stats-title">Deceased</p>
              <img
                src={deceasedData.logo}
                alt="state specific deceased cases pic"
                className="stats-icon"
              />
              <p className="stats-number">{deceasedData.value}</p>
            </div>
          </li>
        </ul>
      </>
    )
  }
}
export default StateTotalData
