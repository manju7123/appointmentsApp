import './index.css'

const AppointmentItem = props => {
  const {item, isStarred} = props
  const {id, title, date, isActive} = item
  const image = isActive
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onStarImage = () => {
    isStarred(id)
  }

  return (
    <li className="list-item">
      <div className="title-card">
        <p className="title-item"> {title} </p>
        <p className="date-item"> {date} </p>
      </div>
      <div>
        <button
          data-testid="star"
          className="btn-item"
          type="button"
          onClick={onStarImage}
        >
          <img className="star-image" src={image} alt="star" />
        </button>
      </div>
    </li>
  )
}
export default AppointmentItem
