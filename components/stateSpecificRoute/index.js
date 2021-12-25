import {Component} from 'react'
import Loader from 'react-loader-spinner'
import StateTotalData from '../StateTotalData'
import Header from '../Header'
import Footer from '../Footer'
import Charts from '../Charts'
import ShowEachDistrictData from '../ShowEachDistrictData'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const dateOptions = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class StateSpecificRoute extends Component {
  state = {
    stateData: {},
    totalCount: 0,
    date: '',
    eachStateTotalData: [],
    apiStatus: apiStatusConstants.initial,
    stateCode: '',
    activeId: 'Confirmed',
    districtList: [],
    districtCount: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
      stateCode: id,
    })
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const responseData = await response.json()
      console.log(responseData)
      const date = new Date(responseData[id].meta.date)
      const day = date.getDate()
      const month = date.getMonth() - 1
      const monthString = dateOptions[month]
      const year = date.getFullYear()

      const dateString = `Last updated on ${monthString} ${day} ${year}`
      const eachStateData = responseData[id].total
      const districtNameLists = Object.keys(responseData[id].districts)
      const districtData = responseData[id].districts

      this.setState({
        stateData: responseData,
        totalCount: responseData[id].total.confirmed,
        date: dateString,
        eachStateTotalData: eachStateData,
        apiStatus: apiStatusConstants.success,
        districtList: districtNameLists,
        districtCount: districtData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderStateNameAndCount = () => {
    const {totalCount, date} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    const filterdStateList = statesList.filter(item => item.state_code === id)
    const stateName = filterdStateList[0].state_name

    return (
      <div className="state-name-and-lastupdated" testid="stateDetailsLoader">
        <div className="state-name-and-count-container">
          <div className="state-name-container">
            <h1 className="state-name">{stateName}</h1>
          </div>
          <div className="total-count">
            <p className="total">Tested</p>
            <p className="count">{totalCount}</p>
          </div>
        </div>
        <h1 className="last-updated">{date}</h1>
      </div>
    )
  }

  setActiveId = id => {
    this.setState({
      activeId: id,
    })
  }

  renderSateTotal = () => {
    const {eachStateTotalData} = this.state
    return (
      <div>
        <StateTotalData
          eachStateTotalData={eachStateTotalData}
          setActiveId={this.setActiveId}
        />
      </div>
    )
  }

  renderTopDistricts = () => {
    const {districtList, districtCount} = this.state

    return (
      <div className="Top-districts-container">
        <h1 className="top-districts">Top Districts </h1>
        <ul className="each-district-data" testid="topDistrictsUnorderedList">
          {districtList.map(item => (
            <ShowEachDistrictData
              key={item}
              name={item}
              number={districtCount[item].total.confirmed}
            />
          ))}
          <ShowEachDistrictData />
        </ul>
      </div>
    )
  }

  renderCharts = () => {
    const {stateCode, activeId} = this.state
    return (
      <div className="charts" testid="lineChartsContainer">
        <Charts stateCode={stateCode} activeId={activeId} />
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader" testid="stateDetailsLoader">
      <Loader type="TailSpin" height="50px" width="50px" />
    </div>
  )

  renderComponents = () => (
    <div className="render-all">
      {this.renderStateNameAndCount()}
      {this.renderSateTotal()}
      {this.renderTopDistricts()}
      {this.renderCharts()}
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderComponents()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="state-wise-bg">
        <Header />
        {this.renderAll()}
        <Footer />
      </div>
    )
  }
}

export default StateSpecificRoute
