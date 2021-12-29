import {Link} from 'react-router-dom'
import './index.css'

const StatesItem = props => {
  const {
    stateName,
    stateCode,
    confirmed,
    recovered,
    deceased,
    population,
  } = props

  const active = confirmed - recovered - deceased

  return (
    <ul className="states_headings">
      <Link to={`/state/${stateCode}`} className="link">
        <li className="state_name">
          <h1 className="heading">{stateName}</h1>
        </li>
      </Link>

      <li className="headings_container">
        <h1 className="heading confirmed ">{confirmed}</h1>
      </li>

      <li className="headings_container">
        <h1 className="heading active">
          {confirmed === undefined ? null : active}
        </h1>
      </li>
      <li className="headings_container">
        <h1 className="heading recovered">{recovered}</h1>
      </li>
      <li className="headings_container">
        <h1 className="heading deceased">{deceased}</h1>
      </li>
      <li className="headings_container">
        <h1 className="heading population">{population}</h1>
      </li>
    </ul>
  )
}

export default StatesItem
