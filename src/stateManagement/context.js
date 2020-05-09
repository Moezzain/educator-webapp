import React, { Component } from "react";
import { getEducatorChats, getAllEducatorsAndPatients } from '../API/apiEducator'

const DataContext = React.createContext();
class DataProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      educatorId: '',
      activeChat: '',
      loading: false,
      patientsVisible: false,
      appointmentsVisible: true,
      educatorsVisible: false,
      appointments: {},
      educators: {},
      patients: {},
      chats: [
        { id: '1234', patientName: 'w' }
      ]
    };
  }


  saveData = (educatorId, appointments, chats) => {
    appointments = this.filterAppointments(appointments)
    this.setState({ educatorId, appointments, chats })
    if (educatorId == '55aabda5-8af2-4a39-b074-80a1852dcb1d')
      this.getEducatorData();

  }
  // componentDidMount() {
  //   this.getEducatorData();  
  // }

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
    let { educators, patients } = await getAllEducatorsAndPatients()
    if (educators && patients) {
      this.setState({ educators, patients, loading: false })
      return educators
    }
    else if (educators) {
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
  showPatient = () => this.setState({ patientsVisible: true })
  hidePatient = () => this.setState({ patientsVisible: false })
  showAppointments = () => this.setState({ appointmentsVisible: true })
  hideAppointments = () => this.setState({ appointmentsVisible: false })
  showEducators = () => this.setState({ educatorsVisible: true, patientsVisible: false })
  hideEducators = () => this.setState({ educatorsVisible: false, patientsVisible: true })
  setActiveChat = chatId => this.setState({ activeChat: chatId })
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
          showEducators: this.showEducators,
          hideEducators: this.hideEducators,
          setActiveChat: this.setActiveChat,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer, DataContext };

