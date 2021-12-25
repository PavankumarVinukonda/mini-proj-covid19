import './index.css'

const StatesTotal = props => {
  const {
    totalConfirmedCases,
    totalActiveCases,
    totalRecoveredCases,
    totalDeceasedCases,
  } = props

  return (
    <ul className="total-list">
      <li testid="countryWideConfirmedCases" className="stats-block-column">
        <p className="stats-title confirmed">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dvcurljig/image/upload/v1639236573/Covid19DashBoard/confirmed_symbol.svg"
          alt="country wide confirmed cases pic"
          className="stats-icon"
        />

        <p className="stats-number confirmed">{totalConfirmedCases}</p>
      </li>
      <li testid="countryWideActiveCases" className="stats-block-column">
        <p className="stats-title active">Active</p>
        <img
          src="https://res.cloudinary.com/dvcurljig/image/upload/v1639237314/Covid19DashBoard/protection_1_x3f55t.svg"
          alt="country wide active cases pic"
          className="stats-icon"
        />
        <p className="stats-number active">{totalActiveCases}</p>
      </li>
      <li testid="countryWideRecoveredCases" className="stats-block-column">
        <p className="stats-title recovered">Recovered</p>
        <img
          src="https://res.cloudinary.com/dvcurljig/image/upload/v1639237381/Covid19DashBoard/recovered_1_ekfpqy.svg"
          alt="country wide recovered cases pic"
          className="stats-icon"
        />
        <p className="stats-number recovered">{totalRecoveredCases}</p>
      </li>
      <li testid="countryWideDeceasedCases" className="stats-block-column ">
        <p className="stats-title deceased">Deceased</p>
        <img
          src="https://res.cloudinary.com/dvcurljig/image/upload/v1639237349/Covid19DashBoard/breathing_1_s7illv.svg"
          alt="country wide deceased cases pic"
          className="stats-icon"
        />
        <p className="stats-number deceased">{totalDeceasedCases}</p>
      </li>
    </ul>
  )
}

export default StatesTotal
