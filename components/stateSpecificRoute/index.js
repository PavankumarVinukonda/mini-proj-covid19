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
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595954/Covid19DashBoard/maps/India_fkud6p.svg',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640598373/Covid19DashBoard/maps/Group_7354_qrkcod.svg',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595959/Covid19DashBoard/maps/ArunaChalPradesh_vtkeud.svg',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595964/Covid19DashBoard/maps/Assam_ovsb6b.svg',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595951/Covid19DashBoard/maps/Bihar_vunip9.svg',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595949/Covid19DashBoard/maps/MP_gpclfu.svg',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595954/Covid19DashBoard/maps/India_fkud6p.svg',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595954/Covid19DashBoard/maps/India_fkud6p.svg',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595954/Covid19DashBoard/maps/India_fkud6p.svg',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595960/Covid19DashBoard/maps/Goa_phe8xl.svg',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595949/Covid19DashBoard/maps/Gujrath_cd16oq.svg',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595967/Covid19DashBoard/maps/Haryana_edoobc.svg',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595964/Covid19DashBoard/maps/Himachal_Pradesh_xp503d.svg',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595965/Covid19DashBoard/maps/J_k_eqtjst.svg',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595956/Covid19DashBoard/maps/jarkhand_gg2da0.svg',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595957/Covid19DashBoard/maps/Karnataka_bwwneo.svg',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595957/Covid19DashBoard/maps/Kerala_tdvn0x.svg',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595954/Covid19DashBoard/maps/India_fkud6p.svg',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595954/Covid19DashBoard/maps/India_fkud6p.svg',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595952/Covid19DashBoard/maps/Maharastra_l23p28.svg',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595949/Covid19DashBoard/maps/MP_gpclfu.svg',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595962/Covid19DashBoard/maps/Manipur_yu53rf.svg',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595965/Covid19DashBoard/maps/Maghalava_b2hwtv.svg',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595963/Covid19DashBoard/maps/mizeram_nieu41.svg',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595961/Covid19DashBoard/maps/NagaLand_yjgwkx.svg',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595950/Covid19DashBoard/maps/Orrisa_r9qshl.svg',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595954/Covid19DashBoard/maps/India_fkud6p.svg',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595967/Covid19DashBoard/maps/Punjab_tahebl.svg',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595969/Covid19DashBoard/maps/Rajastan_ntxrzv.svg',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595957/Covid19DashBoard/maps/sikkim_rzye6j.svg',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595957/Covid19DashBoard/maps/TamilNadu_okfimr.svg',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595953/Covid19DashBoard/maps/Telangana_hsmnka.svg',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595950/Covid19DashBoard/maps/tripura_vjcicf.svg',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640596095/Covid19DashBoard/maps/res-console.cloudinary_bjwkp8.png',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595965/Covid19DashBoard/maps/UttaraKhand_rj8btv.svg',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
    img:
      'https://res.cloudinary.com/dvcurljig/image/upload/v1640595958/Covid19DashBoard/maps/westbengal_zl3zvs.svg',
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
    stateMap: '',
    statePopulation: 0,
    stateTested: 0,
    updated: '',
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

    const filteredList = statesList.filter(item => item.state_code === id)

    const stateImg = filteredList[0].img

    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const responseData = await response.json()

      const totalPopulation = responseData[id].meta.population
      const totalTested = responseData[id].total.tested
      console.log(responseData)

      const date = new Date(responseData[id].meta.date)
      const day = date.getDate()
      const month = date.getMonth() - 1
      const monthString = dateOptions[month]
      const year = date.getFullYear()

      const dateString = `last update date ${monthString} ${day} ${year}`
      const stateDateString = `as of ${day} ${monthString} per source `
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
        stateMap: stateImg,
        statePopulation: totalPopulation,
        stateTested: totalTested,
        updated: stateDateString,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderStateNameAndCount = () => {
    const {totalCount, date, stateImg} = this.state
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

  renderTopDistrictsAndCharts = () => {
    const {districtList, districtCount, stateCode, activeId} = this.state

    return (
      <div testid="lineChartsContainer" className="top-districts-charts">
        <div className="Top-districts-container">
          <h1 className="top-districts">Top Districts</h1>
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
        <div className="charts">
          <Charts stateCode={stateCode} activeId={activeId} />
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader" testid="stateDetailsLoader">
      <Loader type="TailSpin" height="50px" width="50px" />
    </div>
  )

  renderMapAndStateTotal = () => {
    const {
      stateMap,
      updated,
      statePopulation,
      stateTested,
      activeId,
    } = this.state

    return (
      <div className="map-state-total-container">
        <img src={stateMap} alt="map" className="state-map" />
        <div className="state-details-container">
          <h1 className="ncp-report">NCP report</h1>
          <p className="population">Population</p>
          <p className="population-count">{statePopulation}</p>

          <p className="population">Tested</p>
          <p className="population-count">{stateTested}</p>

          <p className="source">{updated}</p>
        </div>
      </div>
    )
  }

  renderComponents = () => (
    <div className="render-all">
      {this.renderStateNameAndCount()}

      {this.renderSateTotal()}
      {this.renderMapAndStateTotal()}
      {this.renderTopDistrictsAndCharts()}
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
