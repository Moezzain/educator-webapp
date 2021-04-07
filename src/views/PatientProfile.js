import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Tab, Col, OverlayTrigger, Popover, Form, Button, Spinner, Row } from 'react-bootstrap'
import { DataContext } from "../stateManagement/context";

/*
canBookAppointment: false
challenge: ""
createdOn: "2021-03-28T14:57:37.289Z"
dateAffected: null
dateBirth: null
diet: null
diseaseId: "7a365d41-2c88-494d-98dd-f52da0a2a28e"
diseaseType: "T1D"
hba1cs: [
  {hba1c: '5'},
  {hba1c: '5.5'},
  {hba1c: '10.0'}
]
height: null
infoNeeded: null
medicines: []
needPayment: null
notes: []
otherDisease: null
outSideLink: null
patientId: "92dbbccb-a9c7-4c9f-b696-26b69eaaff77"
patientProfilesId: "5d059d12-323a-4d39-8d83-22a58995c6f3"
realPatientName: null
sex: null
subType: null
summaries: []
surgery: null
topics: null
weights: []
whoIsPatient: "Patient"
*/

const defaultProfile = {
  dateAffected: '',
  dateBirth: '',
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
  otherDisease: '',
  diet: '',
}

const lang = {
  ar: {
    dateAffectedText: 'مصاب منذ',
    dateBirthText: 'سنة الميلاد',
    dietText: 'النظام الغذائي المتبع',
    diseaseText: 'المرض',
    weightText: 'الوزن',
    heightText: 'الطول',
    Hba1CText: 'Hba1C',
    medicinesText: 'الأدوية',
    sexText: 'الجنس',
    surgeryText: 'العمليات الجراحية',
    otherDiseaseText: 'الأمراض الأخرى',
    whoIsPatientText: 'من المتلقي؟',
    outSideLinkText: 'رابط ملف خارجي',
    topicsText: 'المواضيع',
    saveText: 'حفظ'

  }
}


const PatientProfile = () => {
  let { chats, hidePatient, showEducators, activeChat, getPatient } = useContext(DataContext)
  const [loading, setLoading] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [currentChat, setCurrentChat] = useState({});
  const [patientProfile, setPatientProfile] = useState(defaultProfile);
  const [editPatient, setEditPatient] = useState({
    medicalProfile: {
      ...defaultProfile
    }
  });

  // componentDidMount(){
  //   // call a get for patient profile??
  //   // then set it
  // }
  const getPatientAction = useCallback(async () => {
    if (patientId) {
      setLoading(true);
      const patientData = await getPatient(patientId)
      setLoading(false);
      if (patientData?.patientProfile) {
        setPatientProfile(patientData.patientProfile);
        console.log(patientData.patientProfile);
      }
    }
  }, [getPatient, patientId]);

  useEffect(() => {
    if (activeChat) {
      const chat = chats?.find((c) => c.id === activeChat)
      if (chat) {
        setCurrentChat(chat);
        setPatientId(chat?.patientId)
        getPatientAction();
      }
    }
  }, [activeChat, chats, getPatientAction]);

  // useEffect(() => {
  //   const profile = {
  //     canBookAppointment: false,
  //     challenge: "",
  //     createdOn: "2021-03-28T14:57:37.289Z",
  //     dateAffected: null,
  //     dateBirth: null,
  //     diet: null,
  //     diseaseId: "7a365d41-2c88-494d-98dd-f52da0a2a28e",
  //     diseaseType: "T1D",
  //     hba1cs: [
  //       { hba1c: '5' },
  //       { hba1c: '5.5' },
  //       { hba1c: '10.0' },
  //     ],
  //     height: null,
  //     infoNeeded: null,
  //     medicines: [],
  //     needPayment: null,
  //     notes: [],
  //     otherDisease: null,
  //     outSideLink: null,
  //     patientId: "92dbbccb-a9c7-4c9f-b696-26b69eaaff77",
  //     patientProfilesId: "5d059d12-323a-4d39-8d83-22a58995c6f3",
  //     realPatientName: null,
  //     sex: null,
  //     subType: null,
  //     summaries: [],
  //     surgery: null,
  //     topics: null,
  //     weights: [],
  //     whoIsPatient: "Patient",
  //   }
  //   setPatientProfile(profile);
  // }, []);

  // setEditPatient = prop => {
  //   let { editPatient } = this.state;
  //   editPatient.medicalProfile = { ...editPatient.medicalProfile, ...prop };
  //   this.setState({
  //     editPatient,
  //   });
  // };


  if (!chats) {
    return null
  }
  console.log('rendering profile');
  const { dateAffectedText, dietText, dateBirthText, diseaseText, weightText, heightText, Hba1CText, medicinesText, sexText, surgeryText, otherDiseaseText, whoIsPatientText, outSideLinkText, topicsText, saveText } = lang.ar;
  return chats.map(chat => {
    // if (!chat.medicalProfile) {
    //   chat.medicalProfile = defaultProfile
    // }
    let {
      dateAffected,
      dateBirth,
      weights,
      heights,
      hba1cs,
      medicines,
      patientName,
      notes,
      diseaseType,
      sex,
      whoIsPatient,
      surgery,
      otherDisease,
      diet,
      outSideLink,
      topics,
    } = patientProfile;
    console.log('patientName:', chat.patientName);

    if (chat.id !== activeChat) {
      return null;
    }

    const hba1cPopover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">{Hba1CText}</Popover.Title>
        <Popover.Content style={{width:'100%', padding: 0}}>
          {hba1cs?.map((hba1c) => (
            <div style={{border: '1px solid black', width: '100%', textAlign: 'center'}}>{hba1c?.hba1c}</div>
          ))}
        </Popover.Content>
      </Popover>
    );
    const weightsPopover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">{weightText}</Popover.Title>
        <Popover.Content style={{width:'100%', padding: 0}}>
          {weights?.map((weight) => (
            <div style={{border: '1px solid black', width: '100%', textAlign: 'center'}}>{weight?.weight}</div>
          ))}
        </Popover.Content>
      </Popover>
    );
    const heightsPopover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">{heightText}</Popover.Title>
        <Popover.Content style={{width:'100%', padding: 0}}>
          {heights?.map((height) => (
            <div style={{border: '1px solid black', width: '100%', textAlign: 'center'}}>{height?.height}</div>
          ))}
        </Popover.Content>
      </Popover>
    );
    const medicinesPopover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">{medicinesText}</Popover.Title>
        <Popover.Content style={{width:'100%', padding: 0}}>
          {medicines?.map((medicine) => (
            <div style={{border: '1px solid black', width: '100%', textAlign: 'center'}}>{medicine?.medicine}</div>
          ))}
        </Popover.Content>
      </Popover>
    );
    const topicsPopover = (
      <Popover id="popover-basic">
        <Popover.Title as="h3">{topicsText}</Popover.Title>
        <Popover.Content style={{width:'100%', padding: 0}}>
          {topics?.map((topic) => (
            <div style={{border: '1px solid black', width: '100%', textAlign: 'center'}}>{topic}</div>
          ))}
        </Popover.Content>
      </Popover>
    );

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
          {loading ? <Spinner animation="border" /> : null}
          <Form style={{ width: '100vh', maxHeight: '75vh', overflowY: 'scroll', overflowX: 'hidden' }}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  {diseaseText}
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={diseaseType} />
                </Col>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  {dateAffectedText}
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={dateAffected} />
                </Col>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  {Hba1CText}
                  <OverlayTrigger trigger="click" placement="right" overlay={hba1cPopover}>
                    <Button variant='link' style={{ padding: '2px 2px', alignSelf: 'center', marginLeft: 5, marginBottom: 3}}>{">"}</Button>
                  </OverlayTrigger>
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={hba1cs ? hba1cs[0]?.hba1c : ''} />
                </Col>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  {dateBirthText}
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={dateBirth} />
                </Col>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  {sexText}
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={sex} />
                </Col>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  {whoIsPatientText}
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={whoIsPatient} />
                </Col>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  {medicinesText}
                  <OverlayTrigger trigger="click" placement="right" overlay={medicinesPopover}>
                    <Button variant='link' style={{ padding: '2px 2px', alignSelf: 'center', marginLeft: 5, marginBottom: 3}}>{">"}</Button>
                  </OverlayTrigger>
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={medicines ? medicines[0]?.medicine : null} />
                </Col>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  {otherDiseaseText}
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={otherDisease} />
                </Col>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  {weightText}
                  <OverlayTrigger trigger="click" placement="right" overlay={weightsPopover}>
                    <Button variant='link' style={{ padding: '2px 2px', alignSelf: 'center', marginLeft: 5, marginBottom: 3}}>{">"}</Button>
                  </OverlayTrigger>
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={weights ? weights[0]?.weight : ''} />
                </Col>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  {heightText}
                  <OverlayTrigger trigger="click" placement="right" overlay={heightsPopover}>
                    <Button variant='link' style={{ padding: '2px 2px', alignSelf: 'center', marginLeft: 5, marginBottom: 3}}>{">"}</Button>
                  </OverlayTrigger>
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={heights ? heights[0]?.height : ''} />
                </Col>
              </Form.Group>
            </Form.Row>
            <Form.Row>

              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  {dietText}
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={diet} />
                </Col>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  {surgeryText}
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={surgery} />
                </Col>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  {topicsText}
                  <OverlayTrigger trigger="click" placement="right" overlay={topicsPopover}>
                    <Button variant='link' style={{ padding: '2px 2px', alignSelf: 'center', marginLeft: 5, marginBottom: 3}}>{">"}</Button>
                  </OverlayTrigger>
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={topics ? topics[0]?.text : ''} />
                </Col>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label column sm="10">
                  {outSideLinkText}
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="text" defaultValue={outSideLink} />
                </Col>
              </Form.Group>
            </Form.Row>
            {/* <Form.Group as={Row}>
                <Form.Label column sm="10">
                  Notes
              </Form.Label>
                <Col sm="10">
                  <Form.Control as="textarea" defaultValue={notes} />
                </Col>
              </Form.Group> */}
          </Form>
          {/* <Button variant="success" onClick={() => console.log('clicked')}>{saveText}</Button> */}
        </div>
      </Tab.Pane>
    );
  });
}

export default PatientProfile