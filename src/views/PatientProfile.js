import React, {useContext} from 'react'
import {Tab, Col, Row, Form} from 'react-bootstrap'
import { DataContext } from "../stateManagement/context";


const PatientProfile = (props) => {
    const context= useContext(DataContext)
    let { chats, hidePatient } = context;
    
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
      console.log('rendering chats');
      
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

            <a style={{ color: '#3581b8', fontSize: 26 }} onClick={() => hidePatient()}>فتح المحادثة</a>

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

export default PatientProfile