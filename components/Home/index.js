import {Component} from 'react'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import StatesItem from '../StatesItem'
import StatesTotal from '../stateTotal'
import SearchResult from '../SearchResult'
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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    statesArray: {},
    apiStatus: apiStatusConstants.initial,
    totalActiveCases: 0,
    totalConfirmedCases: 0,
    totalRecoveredCases: 0,
    totalDeceasedCases: 0,
    filteredSearchList: [],
    search: '',
  }

  componentDidMount() {
    this.getData() // when component mount it calls the getData function
  }

  // fetching the states Data
  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const responseData = await response.json()

      let nationalWideConfirmedCases = 0
      let nationalWideRecoveredCases = 0
      let nationalWideDeceasedCases = 0
      let nationalWideActiveCases = 0

      // we are adding individual state confirmed recovered and deceased cases to get the total country wide cases
      statesList.forEach(state => {
        if (responseData[state.state_code]) {
          const {total} = responseData[state.state_code]
          nationalWideConfirmedCases += total.confirmed ? total.confirmed : 0
          nationalWideRecoveredCases += total.recovered ? total.recovered : 0
          nationalWideDeceasedCases += total.deceased ? total.deceased : 0
        }
      })
      nationalWideActiveCases +=
        nationalWideConfirmedCases -
        (nationalWideRecoveredCases + nationalWideDeceasedCases)

      const statesData = statesList.map(item => ({
        stateName: item.state_name,
        stateCode: item.state_code,
        confirmed: Object.keys(responseData)
          .filter(state => state === item.state_code)
          .map(e => responseData[e].total.confirmed),
        recovered: Object.keys(responseData)
          .filter(state => state === item.state_code)
          .map(e => responseData[e].total.recovered),
        deceased: Object.keys(responseData)
          .filter(state => state === item.state_code)
          .map(e => responseData[e].total.deceased),
        other: Object.keys(responseData)
          .filter(state => state === item.state_code)
          .map(e => responseData[e].total.other),
        population: Object.keys(responseData)
          .filter(state => state === item.state_code)
          .map(e => responseData[e].meta.population),
      }))

      this.setState({
        statesArray: statesData,
        apiStatus: apiStatusConstants.success,
        totalActiveCases: nationalWideActiveCases,
        totalRecoveredCases: nationalWideRecoveredCases,
        totalDeceasedCases: nationalWideDeceasedCases,
        totalConfirmedCases: nationalWideConfirmedCases,
      })
      console.log(statesData)
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  // rendering the total number of cases count

  renderTotalCasesOfStates = () => {
    const {
      totalConfirmedCases,
      totalActiveCases,
      totalRecoveredCases,
      totalDeceasedCases,
    } = this.state
    return (
      <div className="total_container">
        <StatesTotal
          totalConfirmedCases={totalConfirmedCases}
          totalActiveCases={totalActiveCases}
          totalRecoveredCases={totalRecoveredCases}
          totalDeceasedCases={totalDeceasedCases}
        />
      </div>
    )
  }

  // this function calls when ever we search on the search bar

  searchStarted = event => {
    const searchItem = event.target.value
    const searchResult = statesList.filter(data =>
      data.state_name.toLowerCase().includes(searchItem.toLowerCase()),
    )

    return this.setState({
      search: event.target.value,
      filteredSearchList: searchResult,
    })
  }

  // search results container
  showSearchList = () => {
    const {filteredSearchList} = this.state
    console.log(filteredSearchList)
    return (
      <ul
        className="search-result-container"
        testid="searchResultsUnorderedList"
      >
        {filteredSearchList.map(each => (
          <SearchResult
            key={each.state_code}
            stateName={each.state_name}
            stateCode={each.state_code}
          />
        ))}
      </ul>
    )
  }

  removeFilteredList = () => {
    this.setState({filteredSearchList: []})
  }

  renderSearch = () => {
    const {search} = this.state
    return (
      <div className="search-container">
        <div className="search-bar-container">
          <BsSearch className="icon" />
          <input
            type="search"
            value={search}
            placeholder="Enter the State"
            className="search-bar"
            onChange={this.searchStarted}
            onAbort={this.removeFilteredList}
          />
        </div>
        {search.length > 0 ? this.showSearchList() : null}
      </div>
    )
  }

  whenAscendingSortButtonClicked = () => {
    const {statesArray} = this.state
    console.log(statesArray)
    const sortedList = statesArray.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x > y ? 1 : -1
    })
    this.setState({statesArray: sortedList})
  }

  whenDescendingSortButtonClicked = () => {
    const {statesArray} = this.state
    const sortedList = statesArray.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x < y ? 1 : -1
    })
    this.setState({statesArray: sortedList})
  }

  renderLoadingView = () => (
    <div className="loader" testid="homeRouteLoader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderStatesListContainer = () => {
    const {statesArray} = this.state

    return (
      <div className="states_container" testid="stateWiseCovidDataTable">
        <div className="states_headings">
          <div className="state_name">
            <h1 className="heading">States/UT</h1>
            <button
              className="ordering_button"
              type="button"
              testid="ascendingSort"
              onClick={this.whenAscendingSortButtonClicked}
            >
              <FcGenericSortingAsc className="icons" />
            </button>

            <button
              className="ordering_button"
              type="button"
              testid="descendingSort"
              onClick={this.whenDescendingSortButtonClicked}
            >
              <FcGenericSortingDesc className="icons" />
            </button>
          </div>

          <div className="headings_container">
            <p className="heading">Confirmed</p>
          </div>

          <div className="headings_container">
            <p className="heading">Active</p>
          </div>
          <div className="headings_container">
            <p className="heading">Recovered</p>
          </div>
          <div className="headings_container">
            <p className="heading">Deceased</p>
          </div>
          <div className="headings_container">
            <p className="heading">Population</p>
          </div>
        </div>
        <hr className="horizantal-line" />
        <ul className="statewisecovid-19-data">
          {statesArray.map(item => (
            <StatesItem
              key={item.stateCode}
              stateName={item.stateName}
              confirmed={item.confirmed}
              recovered={item.recovered}
              population={item.population}
              deceased={item.deceased}
              stateCode={item.stateCode}
            />
          ))}
        </ul>

        <StatesItem />
      </div>
    )
  }

  renderStatesContainer = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderStatesListContainer()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg">
        <Header />
        {this.renderSearch()}
        {this.renderTotalCasesOfStates()}
        {this.renderStatesContainer()}
        <Footer />
      </div>
    )
  }
}

export default Home
