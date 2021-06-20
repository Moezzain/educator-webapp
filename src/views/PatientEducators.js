import React, { useContext } from 'react'
import { DataContext } from "../stateManagement/context";
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
import { useSelector } from 'react-redux';

// import {} from '../redux/reducers/authReducer'

const PatientEducators = (props) => {
  const {chats, educatorId} = useSelector((state) => state.auth)

  // const context = useContext(DataContext)
  // let { chats, patients, hidePatient, showEducators, educatorId, activeChat } = context;
  
  if (!chats) {
    return null
  }
  // const chat = chats.find(c => c.id == activeChat)
  return chats.map(chat => {
    if(!chat){
      return null
    }
    // let patient = patients[chat.patientId]
    console.log('educators:', chat.id);

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
        <h3 style={{marginBottom: 10}}>المثقفين المتابعين</h3>
          <ListGroup as="ul">
            <div>pibmdninsfinsfoin</div>
            {/* {patient && patient.educators && patient.educators.reverse().map(educator => (
              <ListGroup.Item as="li" key={educator.id} active={educator.id == educatorId}>{educator.name}</ListGroup.Item>
            ))} */}
          </ListGroup>
        </div>
      </Tab.Pane>
    )
  })
}


export default PatientEducators