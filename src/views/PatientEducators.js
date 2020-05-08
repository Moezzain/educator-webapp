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

const PatientEducators = (props) => {
  const context = useContext(DataContext)
  let { chats, patients, hidePatient, showEducators, educatorId } = context;

  if (!chats) {
    return null
  }

  return chats.map(chat => {
    let patient = patients[chat.patientId]
    console.log(patient.educators);

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
            {patient.educators.reverse().map(educator => (
              <ListGroup.Item as="li" active={educator.id == educatorId}>{educator.name}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Tab.Pane>
    )
  })
}

export default PatientEducators