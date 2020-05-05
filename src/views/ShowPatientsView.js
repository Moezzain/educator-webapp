import React from "react";
import {
  Button,
  Form,
  ListGroup,
  Row,
  Col,
  Container,
  Tab,
  Nav,
  Table,
  Accordion,
  Card,
} from "react-bootstrap";
import { useMediaQuery } from 'react-responsive'
import CardContainer from "../components/CardContainer";
import logo from "../assets/ithnain.png";
import { login } from "../API/apiAuth";
import { DataContext } from "../stateManagement/context";
import { parseArray } from "../helpers/Converters";

import MyNav from "../components/MyNav";
import Footer from "../components/Footer";
import Chat from '../components/Chat';
import PatientProfile from './PatientProfile';

class ShowPatientsView extends React.Component {
  static contextType = DataContext;

  state = {
    username: "",
    password: "",
    activeList: '',
    activeChat: '',
  };

  componentWillMount() {
    if (this.context.educatorId == "") {
      this.props.history.goBack();
      // console.log(this.props)
    }
  }
  componentDidMount() {
    let { chats, educators } = this.context
    if (!this.context.chats[0].id) {
      chats = parseArray(this.context.chats);
      this.context.setChats(chats)
    }

    let paths = []
    for (var i in educators) {
      let educator = educators[i]
      paths.push({})
    }
  }

  renderChat() {
    let { chats, showPatient } = this.context;
    let { activeChat } = this.state;
    console.log('rendering chat', typeof chats, '\nactivated', activeChat);

    if (!chats) {
      return null
    }
    return chats.map(chat => {
      return (
        <Tab.Pane key={chat.id} eventKey={chat.id}>
          <div>
            <a style={{ color: '#3581b8' }} onClick={() => showPatient()}>مشاهدة البروفايل</a>
          </div>
          {activeChat == chat.id ?
            <Chat chatId={chat.id} />
            : null}
        </Tab.Pane>
      )
    })
  }

  renderAppointments() {
    const { appointments } = this.context;
    // let appointments = {
    //   '2020-11-28':
    //     [{ date: '2020-11-28T17:00:00.000Z', name: 'W3', time: '20:00:00' },
    //     { date: '2020-11-28T17:00:00.000Z', name: 'W1', time: '08:00:00' }],
    //   '2020-11-29': [{ date: '2020-11-29T17:00:00.000Z', name: 'W2', time: '16:00:00' }]
    // }
    if (!appointments || (appointments && !Object.keys(appointments).length)) {
      return null;
    }
    console.log('rendering appointments');

    return Object.keys(appointments).map(appointmentDate => {
      let appointmentsInDay = appointments[appointmentDate]

      return (
        <Tab.Pane key={appointmentDate} eventKey={appointmentDate}>
          <div style={{ width: '100vh', maxHeight: '80vh', }}>
            <div style={{ fontWeight: '600', marginBottom: 10, textAlign: 'center', fontSize: 20 }}>{appointmentDate}</div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Patient Name</th>
                </tr>
              </thead>
              <tbody>
                {appointmentsInDay.map(({ appointmentId, time, name }) => {
                  let hours = parseInt(time.split(':')[0])
                  let minutes = time.split(':')[1]
                  let displayTime = hours > 12 ? `${hours - 12}:${minutes}` : `${hours}:${minutes}`
                  return (
                    <tr key={appointmentId}>
                      <td>{displayTime}</td>
                      <td>{name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Tab.Pane>
      )
    })
  }

  renderAppointmentsList() {
    const { appointments, showAppointments } = this.context;
    // let appointments = {
    //   '2020-11-28':
    //     [{ date: '2020-11-28T17:00:00.000Z', name: 'W3', time: '20:00:00' },
    //     { date: '2020-11-28T17:00:00.000Z', name: 'W1', time: '08:00:00' }],
    //   '2020-11-29': [{ date: '2020-11-29T17:00:00.000Z', name: 'W2', time: '16:00:00' }]
    // }
    console.log('appointments render:', appointments);

    if (!appointments || (appointments && !Object.keys(appointments).length)) {
      return null
    }

    return Object.keys(appointments).map(appointmentDate => {
      return (
        <ListGroup.Item key={appointmentDate} eventKey={appointmentDate} onClick={()=>showAppointments()}>
          {appointmentDate}
        </ListGroup.Item>

      );
    });
  }

  setActiveChat(chatId) {
    this.setState({
      activeChat: chatId
    })
  }

  renderPatientsList() {
    const { chats } = this.context;
    if (!chats) {
      return null
    }
    return chats.map(chat => {
      return (
        <ListGroup.Item key={chat.id} eventKey={chat.id} onClick={() => this.setActiveChat(chat.id)}>
          {chat.patientName}
        </ListGroup.Item>

      );
    });
  }

  setActiveList = (type) => {
    this.setState({
      activeList: type,
    })

  }

  closeWindows = () => {
    this.setState({
      activeChat: '',
      activeAppointment: '',
    })
    this.context.hidePatient();
    this.context.hideAppointments();
  }

  renderListHeader() {
    let { activeList } = this.state;
    let patientsStyle, appointmentStyle;
    if (activeList == 'appointments') {
      patientsStyle = 'dark'
      appointmentStyle = 'primary'
    } else {
      patientsStyle = 'primary'
      appointmentStyle = 'dark'
    }
    return (
      <div style={{
        display: 'block',
        backgroundColor: 'white',
        textAlign: 'center',
        padding: 10
      }}>
        <Button variant={patientsStyle} onClick={() => this.setActiveList('patients')} style={{ marginRight: 5 }}>المحادثات</Button>
        <Button variant={appointmentStyle} onClick={() => this.setActiveList('appointments')} >المواعيد</Button>

      </div>
    )
  }

  renderCircle() {
    return (
      <div style={styles.circle} onClick={() => this.closeWindows()}>
        X
      </div>
    )
  }
  renderDesktop() {
    let { activeList, } = this.state
    let { shouldShowPatient, shouldShowAppointments } = this.context
    console.log("shouldShowAppointments", activeList == 'appointments' && shouldShowAppointments);
    console.log('activeList', activeList);
    
    return (
      <>
        <MyNav />
        <Container
          fluid
          style={styles.container}>
          <CardContainer width="80%" direction="row" padding={10} marginT={40} marginB={40}>
            <Tab.Container id="left-tabs-example" >
              <div className="left-col">
                {this.renderListHeader()}
                {activeList == 'appointments' ?
                  <ListGroup >{this.renderAppointmentsList()}</ListGroup>
                  : <ListGroup >{this.renderPatientsList()}</ListGroup>
                }
              </div>
              <div className="right-col">


                <Tab.Content>
                  {this.renderCircle()}
                  {activeList == 'appointments' && shouldShowAppointments ?
                    this.renderAppointments()
                    : shouldShowPatient ?
                      <PatientProfile />
                      : this.renderChat()
                  }
                </Tab.Content>
              </div>
            </Tab.Container>
          </CardContainer>
        </Container>
        <Footer />
      </>
    );
  }
  renderTablet() {

  }
  renderPhone() {

  }
  render() {

    return (
      <>
        {this.renderDesktop()}

      </>
    )
  }
}

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

export default ShowPatientsView;

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#0a122a"
  },
  circle: {
    width: 30,
    height: 30,
    borderWidth: 0,
    textAlign: 'center',
    borderStyle: 'solid',
    borderColor: '#000',
    color: '#000',
    borderRadius: 80,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    top: 20,
    boxShadow: "0px 2px 5px 4px rgba(0,0,0,0.1)"
  }
}