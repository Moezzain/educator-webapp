import React, { Component } from "react";
import { getEducatorChats, getAllEducators } from '../API/apiEducator'

const DataContext = React.createContext();
class DataProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educatorId: 'e0d57df1-e8ae-4ca5-a076-93edb11deaa1',
      loading: false,
      showPatient: true,
      showAppointments: true,
      appointments: {},
      educators: {},
      chats: [
        { id: '1234', patientName: 'w' }
      ]
    };
  }


  saveData = (educatorId, appointments, chats) => {
    appointments = this.filterAppointments(appointments)
    this.setState({ educatorId, appointments, chats })
    if (educatorId == '8bd3c7e1-c6ec-48bf-8ac8-80bf1f013eef')
      this.getEducatorData();

  }

  filterAppointments(appointments) {

    if (appointments) {
      let output = {}
      appointments.forEach(app => {
        if (typeof app == 'string') {
          app = JSON.parse(app)
        }
        var appointmentDate = app.date.split('T')[0]
        //if there is no array with this Date key, make one and add to it the appointment
        if (!output[appointmentDate]) {
          output[appointmentDate] = [app]
        }
        else {
          //if it already exists, push to it the appointment
          output[appointmentDate].push(app)
        }
      })

      return output
    }
    return appointments
  }


  getEducatorChats = async () => {
    this.setState({ loading: true })
    let educators = await getEducatorChats();
    if (educators) {
      this.setState({ educators, loading: false })
      return educators
    }
    else {
      this.setState({ loading: false })
    }
  }

  getEducatorData = async () => {
    this.setState({ loading: true })
    let educators = await getAllEducators()
    if (educators) {
      this.setState({ educators, loading: false })
      return educators
    }
    else {
      this.setState({ loading: false })
    }
  }

  setEducatorId = educatorId => {
    let appointments = this.filterAppointments(this.state.educators[educatorId].appointments)

    this.setState({
      educatorId,
      chats: this.state.educators[educatorId].chats,
      appointments
    })

  }
  setChats = chats => this.setState({ chats })
  showPatient = () => this.setState({showPatient: true})
  hidePatient = () => this.setState({showPatient: false})
  showAppointments = () => this.setState({showAppointments: true})
  hideAppointments = () => this.setState({showAppointments: false })

  render() {

    return (
      <DataContext.Provider
        value={{
          ...this.state,
          saveData: this.saveData,
          getEducatorChats: this.getEducatorChats,
          setEducatorId: this.setEducatorId,
          setChats: this.setChats,
          showPatient: this.showPatient,
          hidePatient: this.hidePatient,
          showAppointments: this.showAppointments,
          hideAppointments: this.hideAppointments,
          shouldShowPatient: this.state.showPatient,
          shouldShowAppointments: this.state.showAppointments,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer, DataContext };

