import React from "react";
import {
  Button,
  Form,
  ListGroup,
  Row,
  Col,
  Container,
  Tab,
  Nav
} from "react-bootstrap";
import CardContainer from "../components/CardContainer";
import logo from "../assets/ithnain.png";
import { login } from "../API/apiAuth";
import { DataContext } from "../stateManagement/context";
import { parseArray } from "../helpers/Converters";
import MyNav from "../components/MyNav";
import Footer from "../components/Footer";
import Chat from '../components/Chat';

class ShowPatientsView extends React.Component {
  static contextType = DataContext;

  state = {
    username: "",
    password: "",
    showPatient: false,
    activeList: '',
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


  renderPatientInfo() {

    let { chats } = this.context;

    if (!chats) {
      return null
    }
    return chats.map(chat => {
      if (!chat.medicalProfile) {
        return null
      }
      let { years,
        age,
        weight,
        height,
        hba1c,
        medications,
        patientName,
        notes,
        disease,
        sex,
        whoIsPatient,
        surgery,
        otherDiseases,
        haveTakenDiet,
      } = chat.medicalProfile
      return (
        <Tab.Pane key={chat.id} eventKey={chat.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >

            <a style={{ color: '#3581b8', fontSize: 26 }} onClick={() => this.setState({ showPatient: false })}>فتح المحادثة</a>

            <h3>{chat.id}</h3>

            <Form style={{ width: '100vh', maxHeight: '80vh', overflowY: 'auto', overflowX: 'hidden' }}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label column sm="10">
                    disease
              </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={disease} />
                  </Col>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label column sm="10">
                    years
              </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={years} />
                  </Col>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label column sm="10">
                    Hba1C
              </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={hba1c} />
                  </Col>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label column sm="10">
                    age
              </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={age} />
                  </Col>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label column sm="10">
                    sex
              </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={sex} />
                  </Col>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label column sm="10">
                    Patient Type
              </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={whoIsPatient} />
                  </Col>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label column sm="10">
                    medications
              </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={medications} />
                  </Col>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label column sm="10">
                    otherDiseases
              </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={otherDiseases} />
                  </Col>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label column sm="10">
                    Weight
              </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={weight} />
                  </Col>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label column sm="10">
                    Height
              </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={height} />
                  </Col>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label column sm="10">
                    Diet Taken
              </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={haveTakenDiet} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="10">
                    Past Surgeries
              </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={surgery} />
                  </Col>
                </Form.Group>
              </Form.Row>
              <Form.Group as={Row}>
                <Form.Label column sm="10">
                  Notes
              </Form.Label>
                <Col sm="10">
                  <Form.Control type="textarea" value={notes} />
                </Col>
              </Form.Group>
            </Form>

          </div>
        </Tab.Pane>
      );
    });

  }
  renderChat() {
    let { chats } = this.context;
    if (!chats) {
      return null
    }
    return chats.map(chat => {
      return (
        <Tab.Pane key={chat.id} eventKey={chat.id}>
          <div>
            <a style={{ color: '#3581b8' }} onClick={() => this.setState({ showPatient: true })}>مشاهدة البروفايل</a>
          </div>
          <Chat chatId={chat.id} />
        </Tab.Pane>
      )
    })
  }

  renderPatientsList() {
    const { chats } = this.context;
    if (!chats) {
      return null
    }
    return chats.map(chat => {
      return (
        <ListGroup.Item key={chat.id} eventKey={chat.id}>
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


  renderListHeader() {
    let {activeList} = this.state;
    let patientsStyle, appointmentStyle;
    if(activeList=='appointments'){
      patientsStyle='dark'
      appointmentStyle= 'primary'
    } else{
      patientsStyle='primary'
      appointmentStyle= 'dark'
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

  render() {

    return (
      <>
        <MyNav />
        <Container
          fluid
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#0a122a"
          }}
        >
          <CardContainer width="80%" direction="row" padding={10} marginT={40} marginB={40}>
            <Tab.Container id="left-tabs-example" >
              <div className="left-col">
                {this.renderListHeader()}
                <ListGroup >{this.renderPatientsList()}</ListGroup>
              </div>

              <div className="right-col">
                <Tab.Content>
                  {this.state.showPatient ?
                    this.renderPatientInfo()
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
}

export default ShowPatientsView;
