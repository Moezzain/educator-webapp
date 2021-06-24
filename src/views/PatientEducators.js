import React, { useContext } from 'react'
import { DataContext } from "../stateManagement/context";
import {
  ListGroup,
  Tab,
} from "react-bootstrap";
import { useSelector } from 'react-redux';

const PatientEducators = (props) => {
  const {chats, educatorId} = useSelector((state) => state.auth)

  if (!chats) {
    return null
  }
  return chats.map(chat => {
    if(!chat){
      return null
    }

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
          </ListGroup>
        </div>
      </Tab.Pane>
    )
  })
}


export default PatientEducators