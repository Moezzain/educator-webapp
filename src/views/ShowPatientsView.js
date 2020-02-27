import React from "react";
import {
  Button,
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
import SideBarComponent from "../components/SideBarComponent";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

class ShowPatientsView extends React.Component {
  static contextType = DataContext;

  state = {
    username: "",
    password: ""
  };

  componentWillMount() {
    if (this.context.educatorId == "") {
      this.props.history.push('/');
    }
  }

  render() {
    let { chats } = this.context;
    if (!chats[0].id) {
      chats = parseArray(this.context.chats);
    }
    const patients = chats.map(chat => {
      return (
      
          <ListGroup.Item  key={chat.id}  eventKey={chat.id}>
            {chat.patientName}
          </ListGroup.Item>
        
      );
    });
    const patientsInfo = chats.map(chat => {
     
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
            <h2>Name is : {chat.patientName}</h2>
            <h3>chat ID: {chat.id}</h3>
            {chat.medicalProfile && (
              <>
                <h3>
                  height:{" "}
                  {chat.medicalProfile.height && chat.medicalProfile.height}
                </h3>
                <h3>
                  sex: {chat.medicalProfile.sex && chat.medicalProfile.sex}
                </h3>
                <h3>
                  age: {chat.medicalProfile.age && chat.medicalProfile.age}
                </h3>
                <h3>
                  weight:{" "}
                  {chat.medicalProfile.weight && chat.medicalProfile.weight}
                </h3>
                <h3>
                  years:{" "}
                  {chat.medicalProfile.years && chat.medicalProfile.years}
                </h3>
                <h3>
                  otherDiseases:{" "}
                  {chat.medicalProfile.otherDiseases &&
                    chat.medicalProfile.otherDiseases}
                </h3>
              </>
            )}
          </div>
        </Tab.Pane>
      );
    });
    return (
      <>
        <MyNav />
          <SideBarComponent history={this.props.history} />
       
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
                <ListGroup >{patients}</ListGroup>
              </div>

              <div className="right-col">
                <Tab.Content>{patientsInfo}</Tab.Content>
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
