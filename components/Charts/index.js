import {Component} from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  LabelList,
  Bar,
} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

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

class ChartsData extends Component {
  state = {
    stateChartData: '',
    forOtherChart: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getChartData()
  }

  modifyNUmbers = number => {
    let result = number
    if (number > 1000000) {
      result = `${Math.round(number / 100000).toFixed(1)} L`
    } else if (number > 1000) {
      result = `${Math.round(number / 1000).toFixed(1)} K`
    }

    return result
  }

  modifyDate = date => {
    const dt = new Date(date)

    const day = dt.getDate()
    const mon = dt.getMonth() - 1
    const month = dateOptions[mon]

    const dateString = `${day} ${month}`
    return dateString
  }

  getChartData = async () => {
    const {stateCode} = this.props
    console.log(stateCode)
    const apiUrl = `https://apis.ccbp.in/covid19-timelines-data`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const dataDateWise = Object.keys(data[stateCode].dates)

      const particularState = dataDateWise.map(date => ({
        date: this.modifyDate(date),
        confirmed: data[stateCode].dates[date].total.confirmed,
        confirmedString: this.modifyNUmbers(
          data[stateCode].dates[date].total.confirmed,
        ),

        deceased: data[stateCode].dates[date].total.deceased,
        deceasedString: this.modifyNUmbers(
          data[stateCode].dates[date].total.deceased,
        ),
        recovered: data[stateCode].dates[date].total.recovered,
        recoveredString: this.modifyNUmbers(
          data[stateCode].dates[date].total.recovered,
        ),
        tested: data[stateCode].dates[date].total.tested,
        active:
          data[stateCode].dates[date].total.confirmed -
          (data[stateCode].dates[date].total.deceased +
            data[stateCode].dates[date].total.recovered),
        activeString: this.modifyNUmbers(
          data[stateCode].dates[date].total.confirmed -
            (data[stateCode].dates[date].total.deceased +
              data[stateCode].dates[date].total.recovered),
        ),
      }))

      console.log(particularState)

      const particularStateForOtherChart = dataDateWise.map(date => ({
        date,
        confirmed: data[stateCode].dates[date].total.confirmed,

        deceased: data[stateCode].dates[date].total.deceased,

        recovered: data[stateCode].dates[date].total.recovered,

        tested: data[stateCode].dates[date].total.tested,
        active:
          data[stateCode].dates[date].total.confirmed -
          (data[stateCode].dates[date].total.deceased +
            data[stateCode].dates[date].total.recovered),
      }))

      this.setState({
        stateChartData: particularState,
        forOtherChart: particularStateForOtherChart,
        isLoading: false,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader" testid="timelinesDataLoader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  barChart = () => {
    const {stateChartData} = this.state
    const {activeId} = this.props
    const barChartType = activeId.toLowerCase()
    let activeLabel = 'confirmedString'

    if (barChartType === 'confirmed') {
      activeLabel = 'confirmedString'
    } else if (barChartType === 'active') {
      activeLabel = 'activeString'
    } else if (barChartType === 'deceased') {
      activeLabel = 'deceasedString'
    } else if (barChartType === 'recovered') {
      activeLabel = 'recoveredString'
    }
    console.log(activeLabel)
    const toptendata = stateChartData.slice(
      Math.max(stateChartData.length - 8, 0),
    )
    console.log(toptendata)

    let colortype = '#9A0E31'
    if (barChartType === 'confirmed') {
      colortype = '#9A0E31'
    } else if (barChartType === 'active') {
      colortype = '#0A4FA0'
    } else if (barChartType === 'recovered') {
      colortype = '#216837'
    } else if (barChartType === 'deceased') {
      colortype = '#474C57'
    }

    return (
      <div className="chart-wrapper">
        <BarChart width={800} height={500} data={toptendata} barSize={45}>
          <Legend />
          <Bar
            dataKey={`${barChartType}`}
            fill={`${colortype}`}
            label={{
              dataKey: 'date',
              fontSize: '10px',
              position: 'bottom',
              fill: 'white',
            }}
            radius={[8, 8, 8, 8]}
          >
            <LabelList dataKey={`${activeLabel}`} position="top" fill="white" />
          </Bar>
        </BarChart>
      </div>
    )
  }

  graph = (type, color) => {
    const {forOtherChart} = this.state
    return (
      <div>
        <LineChart
          width={800}
          height={250}
          data={forOtherChart}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="date"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={type} stroke={color} />
        </LineChart>
      </div>
    )
  }

  allChartsView = () => (
    <div className="charts-cont">
      <div className="barchart-container">{this.barChart()}</div>
      <div
        className="charts-title-linecharts"
        testid='lineChartsContainer" and the text '
      >
        <h1 className="charts-title">Spread Trends</h1>
        <div testid="lineChartsContainer" className="barcharts-container">
          <div className="charts confirmed-background">
            {this.graph('confirmed', '#FF073A')}
          </div>
          <div className="charts active-background">
            {this.graph('active', '#007BFF')}
          </div>
          <div className="charts recovered-background">
            {this.graph('recovered', '#27A243')}
          </div>
          <div className="charts deceased-background">
            {this.graph('deceased', '#6C757D')}
          </div>
          <div className="charts tested-background">
            {this.graph('tested', '#9673B9')}
          </div>
        </div>
      </div>
    </div>
  )

  render() {
    const {isLoading} = this.state
    const showAllData = isLoading
      ? this.renderLoadingView()
      : this.allChartsView()
    return <div className="charts-container">{showAllData}</div>
  }
}

export default ChartsData
