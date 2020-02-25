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

class ShowPatientsView extends React.Component {
  static contextType = DataContext;

  state = {
    username: "",
    password: ""
  };

  componentWillMount() {
    if (this.context.educatorId == "") {
      this.props.history.goBack();
      // console.log(this.props)
    }
  }

  render() {
    // console.log(this.context.chats);
    let { chats } = this.context;
    if (!this.context.chats[0].id) {
      chats = parseArray(this.context.chats);
    }
    const patients = chats.map(chat => {
      
      return (
        <Nav.Item>
          <Nav.Link key={chat.id} active={true} eventKey={chat.id} >
            {chat.patientName}
          </Nav.Link>
        </Nav.Item>
      );
    });
    const patientsInfo = chats.map(chat => {
        console.log(chat.medicalProfile)
      return (
        <Tab.Pane key={chat.id} eventKey={chat.id}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
         <h2>Name is : {chat.patientName}</h2>
         <h3>chat ID: {chat.id}</h3>
         {chat.medicalProfile && <> 
            <h3>height: {chat.medicalProfile.height && chat.medicalProfile.height}</h3>
            <h3>sex: {chat.medicalProfile.sex && chat.medicalProfile.sex}</h3>
            <h3>age: {chat.medicalProfile.age && chat.medicalProfile.age}</h3>
            <h3>weight: {chat.medicalProfile.weight && chat.medicalProfile.weight}</h3>
            <h3>years: {chat.medicalProfile.years && chat.medicalProfile.years}</h3>
            <h3>otherDiseases: {chat.medicalProfile.otherDiseases && chat.medicalProfile.otherDiseases}</h3>
         
         </>}
         </div>
        </Tab.Pane>
      );
    });
    return (
        <>
        <div style={{backgroundColor: "#0a122a", justifyContent: "center", alignItems: "center"}}>
            <h1>this is header</h1>
            <h1>this is header</h1>
            <h1 style={{marginBottom: "0px"}}>this is header</h1>
        </div>
      <Container
        fluid
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#0a122a",
        }}
      >
         
        <CardContainer width="80%" direction="row">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <div className="center-col">
              <span>List</span>
              <ListGroup as="ul">{patients}</ListGroup>
            </div>

            <div className="right-col">
              <Tab.Content>{patientsInfo}</Tab.Content>
            </div>
          </Tab.Container>
        </CardContainer>
      </Container>
      <div style={{backgroundColor: "#0a122a", justifyContent: "center", alignItems: "center"}}>
            <h1>this is header</h1>
            <h1>this is header</h1>
            <h1>this is header</h1>
        </div>
      </>
      //   <Container
      //     fluid
      //     style={{
      //       backgroundColor: "#0a122a",
      //       justifyContent: "center",
      //       alignItems: "center",
      //       display: "flex"
      //     }}
      //   >
      //           {/* <Row>
      //               <Col sm={4} lg={3}>

      //

      //               </Col>
      //               </Row>
      //             */}

      //     <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      //       {/* <Row>
      //         <Col > */}
      //         <div>
      //     <CardContainer width="100%">
      //           <Nav variant="pills" className="flex-column" style={{overflowY:  "scroll"}}>
      //             {/* <Nav.Item>
      //               <Nav.Link eventKey="first">Tab 1</Nav.Link>
      //             </Nav.Item> */}
      //             {patients}
      //           </Nav>
      //         </CardContainer>
      //         </div>
      //         {/* </Col>
      //         </Row> */}

      //         {/* <Col sm={9}>
      //         <CardContainer width="100%">
      //           <Tab.Content>
      //             <Tab.Pane eventKey="first">
      //               <h1>Doneeeee</h1>
      //             </Tab.Pane>
      //             {patientsInfo}
      //           </Tab.Content>
      //           </CardContainer>
      //         </Col> */}
      //     </Tab.Container>
      //     <div>
      //         <h1>fffff</h1>
      //     </div>
      //   </Container>
    );
  }
}

export default ShowPatientsView;
