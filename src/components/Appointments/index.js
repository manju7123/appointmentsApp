import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    starButton: false,
  }

  isStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isActive: !each.isActive}
        }
        return each
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const reqDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: reqDate,
      isActive: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  starredItems = () => {
    this.setState(prevState => ({
      starButton: !prevState.starButton,
    }))
  }

  onTitleChange = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onDateChange = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  render() {
    const {appointmentsList, titleInput, dateInput, starButton} = this.state
    const filteredItems = appointmentsList.filter(
      each => each.isActive === true,
    )

    const coloredStarred = starButton && 'color-btn'

    return (
      <div className="bg-container">
        <div className="card">
          <div className="inner-card">
            <div className="appointment-card">
              <form className="form-card" onSubmit={this.onAddAppointment}>
                <h1 className="card-heading"> Add Appointment </h1>
                <label className="title" htmlFor="titleId">
                  TITLE
                </label>
                <input
                  className="input-item"
                  id="titleId"
                  type="text"
                  placeholder="Title"
                  onChange={this.onTitleChange}
                  value={titleInput}
                />
                <label className="title" htmlFor="dateId">
                  DATE
                </label>
                <input
                  className="input-item"
                  id="dateId"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  onChange={this.onDateChange}
                  value={dateInput}
                />
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="appointments-card">
            <div className="first-card">
              <h1 className="appointments"> Appointments </h1>
              <button
                className={`starred ${coloredStarred}`}
                type="button"
                onClick={this.starredItems}
              >
                Starred
              </button>
            </div>
            <ul className="list-items">
              {starButton
                ? filteredItems.map(each => (
                    <AppointmentItem
                      key={each.id}
                      item={each}
                      isStarred={this.isStarred}
                    />
                  ))
                : appointmentsList.map(each => (
                    <AppointmentItem
                      key={each.id}
                      item={each}
                      isStarred={this.isStarred}
                    />
                  ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
