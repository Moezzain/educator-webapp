import React, { useContext } from 'react'
import { Tab, Col, Row, Form } from 'react-bootstrap'
import { DataContext } from "../stateManagement/context";

const defaultProfile = {
  years: '',
  age: '',
  weight: '',
  height: '',
  hba1c: '',
  medications: '',
  patientName: '',
  notes: '',
  disease: '',
  sex: '',
  whoIsPatient: '',
  surgery: '',
  otherDiseases: '',
  haveTakenDiet: '',
}

const PatientProfile = (props) => {
  const context = useContext(DataContext)
  let { chats, hidePatient, showEducators, activeChat } = context;

  if (!chats) {
    return null
  }
  console.log('rendering profile');

  return chats.map(chat => {
    if (!chat.medicalProfile) {
       chat.medicalProfile= defaultProfile
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

    if (chat.id != activeChat) {
      return;
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
          <h3>{chat.id}</h3>

          <Form style={{ width: '100vh', maxHeight: '75vh', overflowY: 'scroll', overflowX: 'hidden' }}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  disease
              </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={disease} />
                </Col>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  years
              </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={years} />
                </Col>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  Hba1C
              </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={hba1c} />
                </Col>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  age
              </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={age} />
                </Col>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  sex
              </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={sex} />
                </Col>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  Patient Type
              </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={whoIsPatient} />
                </Col>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  medications
              </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={medications} />
                </Col>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  otherDiseases
              </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={otherDiseases} />
                </Col>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  Weight
              </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={weight} />
                </Col>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  Height
              </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={height} />
                </Col>
              </Form.Group>
            </Form.Row>
            <Form.Row>

              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  Diet Taken
              </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={haveTakenDiet} />
                </Col>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  Past Surgeries
              </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={surgery} />
                </Col>
              </Form.Group>
            </Form.Row>
            <Form.Group as={Row}>
              <Form.Label column sm="10">
                Notes
              </Form.Label>
              <Col sm="10">
                <Form.Control as="textarea" rows="3" defaultValue={notes} />
              </Col>
            </Form.Group>
          </Form>

        </div>
      </Tab.Pane>
    );
  });
}

export default PatientProfile