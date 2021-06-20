// import React, { Component } from "react";
// import { getEducatorChats, getAllEducatorsAndPatients, getPatient } from '../API/apiEducator'

// const DataContext = React.createContext();
// class DataProvider extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       educatorId: '',
//       token: '',
//       activeChat: '',
//       loading: false,
//       patientsVisible: false,
//       appointmentsVisible: true,
//       educatorsVisible: false,
//       appointments: {},
//       educators: {},
//       patients: {},
//       chats: []
//     };
//   }


//   saveData = (educatorId, appointments, chats) => {
//     appointments = this.filterAppointments(appointments)
//     localStorage.setItem('educatorId', educatorId)
//     this.setState({ educatorId, appointments, chats })
//     // if (educatorId === '540d2ebd-bca2-4934-98b9-87ec4a592592')
//     console.log('educatorId', educatorId);
//     if (educatorId == '55aabda5-8af2-4a39-b074-80a1852dcb1d')
//       this.getEducatorData();

//   }

//   setEducatorId = (educatorId) => this.setState({educatorId});

//   saveToken = (token) => {
//     this.setState({token});
//     localStorage.setItem('token', token);
//   }
//   componentDidMount() {
//     this.getLocalData();
//   }
//   // componentDidMount() {
//   //   this.getEducatorData(this.state.token);  
//   // }

//   getLocalData = async () => {
//     return new Promise((resolve, reject) => {

//       const educatorId= localStorage.getItem('educatorId')
//       const token = localStorage.getItem('token')
//       if (educatorId && token) {
//         this.saveToken(token)
//         this.setEducatorId(educatorId)
//         resolve({educatorId, token})
//       } else {
//         reject('no educatorId or token set')
//       }
//     })
//   }

//   clearState = () => {
//     localStorage.clear();
//     this.setState({
//             // educatorId: '',
//             educatorId: '',
//             token: '',
//             activeChat: '',
//             loading: false,
//             patientsVisible: false,
//             appointmentsVisible: true,
//             educatorsVisible: false,
//             appointments: {},
//             educators: {},
//             patients: {},
//             chats: []
//     })
//   }

//   filterAppointments(appointments) {

//     if (appointments) {
//       let output = {}
//       appointments.forEach(app => {
//         if (typeof app == 'string') {
//           app = JSON.parse(app)
//         }
//         var appointmentDate = app.date.split('T')[0]
//         //if there is no array with this Date key, make one and add to it the appointment
//         if (!output[appointmentDate]) {
//           output[appointmentDate] = [app]
//         }
//         else {
//           //if it already exists, push to it the appointment
//           output[appointmentDate].push(app)
//         }
//       })

//       return output
//     }
//     return appointments
//   }


//   getEducatorChats = async () => {
//     this.setState({ loading: true })
//     const {token, educatorId} = this.state;
//     let educators = await getEducatorChats(educatorId, token);
//     if (educators) {
//       this.setState({ educators, loading: false })
//       return educators
//     }
//     else {
//       this.setState({ loading: false })
//     }
//   }

//   getEducatorData = async () => {
//     this.setState({ loading: true });
//     const {token, educatorId} = this.state;
//     let {educators, patients} = await getAllEducatorsAndPatients(educatorId, token);
//     if (educators && patients) {
//       this.setState({ educators, patients, loading: false })
//       return educators
//     }
//     else if (educators) {
//       this.setState({ educators, loading: false })
//       return educators
//     }
//     else {
//       this.setState({ loading: false })
//     }
//   }

//   getPatient = async (patientId) => {
//     const {token, educatorId} = this.state;
//     const data = await getPatient(educatorId, token, patientId)
//     return data;
//   }

//   setActiveEducator = educatorId => {
//     let appointments = this.filterAppointments(this.state.educators[educatorId].appointments)

//     this.setState({
//       educatorId,
//       chats: this.state.educators[educatorId].chats,
//       appointments
//     })

//   }
//   setChats = chats => this.setState({ chats })
//   showPatient = () => this.setState({ patientsVisible: true })
//   hidePatient = () => this.setState({ patientsVisible: false })
//   showAppointments = () => this.setState({ appointmentsVisible: true })
//   hideAppointments = () => this.setState({ appointmentsVisible: false })
//   showEducators = () => this.setState({ educatorsVisible: true, patientsVisible: false })
//   hideEducators = () => this.setState({ educatorsVisible: false, patientsVisible: true })
//   setActiveChat = chatId => this.setState({ activeChat: chatId })
//   render() {

//     return (
//       <DataContext.Provider
//         value={{
//           ...this.state,
//           saveData: this.saveData,
//           saveToken: this.saveToken,
//           clearState: this.clearState,
//           getEducatorChats: this.getEducatorChats,
//           setEducatorId: this.setEducatorId,
//           setActiveEducator: this.setActiveEducator,
//           setChats: this.setChats,
//           showPatient: this.showPatient,
//           hidePatient: this.hidePatient,
//           showAppointments: this.showAppointments,
//           hideAppointments: this.hideAppointments,
//           showEducators: this.showEducators,
//           hideEducators: this.hideEducators,
//           setActiveChat: this.setActiveChat,
//           getLocalData: this.getLocalData,
//           getPatient: this.getPatient,
//         }}
//       >
//         {this.props.children}
//       </DataContext.Provider>
//     );
//   }
// }
// const DataConsumer = DataContext.Consumer;

// export { DataProvider, DataConsumer, DataContext };

