import React, { useState, useEffect } from 'react';
import {
  Button,
  ListGroup,
  Container,
  Tab,
  Tabs,
  Table,
} from 'react-bootstrap';
import CardContainer from '../components/CardContainer';
import { DataContext } from '../stateManagement/context';
import { parseArray } from '../helpers/Converters';

import MyNav from '../components/MyNav';
import Footer from '../components/Footer';
import Chat from '../components/Chat';
import PatientProfile from './PatientProfile';
import PatientEducators from './PatientEducators';
import PatientNotes from './PatientNotes';

import { ConversationList, Conversation } from '@chatscope/chat-ui-kit-react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import { useSelector, useDispatch } from 'react-redux';
import { setChatsAction } from '../redux/reducers/authReducer';
import {
  setCurrentChatAction,
  clearAllChatsAction,
} from '../redux/reducers/chatsReducer';
import {
  setPatientIdAction,
  getPatientAction,
} from '../redux/reducers/patientReducer';
import { setCurrentEducatorAction } from '../redux//reducers/educatorsReducer';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import NotesIcon from '@material-ui/icons/Notes';

const ShowPatientsView = () => {
  const dispatch = useDispatch();

  const [activeList, setActiveList] = useState('');
  const [localPatients, setLocalPatients] = useState();
  const [currentPage, setCurrentPage] = useState('');
  const [lang, setLang] = useState({
    ar: {
      chat: 'المحادثة',
      profile: 'البروفايل',
      educators: 'المتابعين',
    },
  });

  const { chats, token, educatorId } = useSelector((state) => state.auth);
  const {
    fetchedEducatorId,
    patients,
    educators,
    currentEducator,
  } = useSelector((state) => state.educators);
  const { patientId } = useSelector((state) => state.patient);

  useEffect(() => {
    // if (this.context.educatorId == '') {
    //   // this.props.history.goBack();
    //   // console.log(this.props)
    // }
    try {
      if (chats?.length && !chats[0].id) {
        let tempChats = parseArray(chats);
        dispatch(setChatsAction(tempChats));
      }
    } catch (err) {
      console.log('error setting chats:', err);
    }
  }, [chats, dispatch]);
  useEffect(() => {
    let p;
    let e;
    if (patients.length !== 0) {
      console.log('filter', patients);
      p = Object.values(patients).filter((patient) => {
        return fetchedEducatorId === patient.educatorId;
      });
    }
    e = Object.values(educators).filter((educator) => {
      return fetchedEducatorId === educator.id;
    });
    dispatch(setCurrentEducatorAction(e[0]));
    dispatch(clearAllChatsAction());
    setLocalPatients(p);
    console.log('educators: ', e);

    console.log('patients: ', p);
  }, [dispatch, educatorId, educators, fetchedEducatorId, patients]);
  useEffect(() => {
    dispatch(getPatientAction({ educatorId, token, patientId }));
  }, [dispatch, educatorId, patientId, token]);
  const renderChat = () => {
    if (!localPatients) {
      return null;
    }
    console.log('chats rendering');

    return (
      <Chat
        style={{ width: 1000 }}
        chatId={5634}
        tokxen={token}
        educatorId={educatorId}
      />
    );
  };

  const activateChat = (chatId, patientId) => {
    console.log('currentChat', chatId);
    dispatch(setPatientIdAction(patientId));
    dispatch(setCurrentChatAction(chatId));
  };

  const renderPatientsList = () => {
    if (!localPatients) {
      return null;
    }
    return (
      <div>
        <ConversationList style={{ height: '90vh' }}>
          {localPatients.map((patient) => (
            <Conversation
              name={patient.patientName}
              visible={true}
              onClick={() => activateChat(patient.id, patient.patientId)}
            ></Conversation>
          ))}
        </ConversationList>
      </div>
    );
  };
  const renderListHeader = () => {
    let patientsStyle, appointmentStyle;
    if (activeList == 'appointments') {
      patientsStyle = 'dark';
      appointmentStyle = 'primary';
    } else {
      patientsStyle = 'primary';
      appointmentStyle = 'dark';
    }
    return (
      <div
        style={{
          display: 'block',
          backgroundColor: 'white',
          textAlign: 'center',
          padding: 10,
        }}
      >
        <Button
          variant={patientsStyle}
          onClick={() => setActiveList('patients')}
          style={{ marginRight: 5 }}
        >
          المحادثات
        </Button>
        <Button
          variant={appointmentStyle}
          onClick={() => setActiveList('appointments')}
        >
          المواعيد
        </Button>
      </div>
    );
  };
  const renderPatient = () => {
    return <PatientProfile />;
  };
  const renderAppointmentsList = () => {
    let appointments = [

      { date: '2020-11-28T17:00:00.000Z', name: 'W3', time: '20:00:00' },
      { date: '2020-11-28T17:00:00.000Z', name: 'W1', time: '08:00:00' },
      { date: '2020-11-29T17:00:00.000Z', name: 'W2', time: '16:00:00' },
    ]
    if(currentEducator){

    const educatorAppointments = currentEducator.appointments;
    console.log('educatorAppointments: ', educatorAppointments);
    educatorAppointments.forEach((appointment) => {
      appointments.push( {
        id:appointment.id,
        date: appointment.date.split('T')[0],
        name: appointment.name,
        time: appointment.time,
      });
    });
  }
    console.log('appointments render:', appointments);

    if (!appointments || (appointments && !Object.keys(appointments).length)) {
      return null;
    }

    return Object.values(appointments).map((appointment) => {
      return (
        <div style={{overflow:'auto', flex:1, backgroundColor: 'green',}}> 

        <ListGroup.Item
          key={appointment.id}
          // onClick={() => showAppointments()}
        >
          {appointment.date}
        </ListGroup.Item>
        </div>
      );
    });
  };
  const renderUpperTabs = () => {
    return (
      <div>
        <Tabs defaultActiveKey="chat" id="noanim-tab-example" mountOnEnter>
          <Tab eventKey="chat" title={lang.ar.chat}>
            {renderChat()}
          </Tab>
          <Tab eventKey="profile" title={lang.ar.profile}>
            <PatientProfile />
          </Tab>
          <Tab eventKey="educators" title={lang.ar.educators}>
            <PatientEducators />
          </Tab>
        </Tabs>
      </div>
    );
  };
  const setValueCurrentPage = (page) => {
    console.log(page);

    setCurrentPage(page);
  };
  return (
    <>
      <MyNav />
      <Container fluid style={localStyles.container}>
        <CardContainer
          width="95%"
          direction="row"
          padding={10}
          marginT={10}
          marginB={10}
        >
          <Tab.Container>
            <div style={{ width: '15%', backgroundColor: '#6A6262' }}>
              {renderListHeader()}
              {activeList === 'appointments' ? (
                <ListGroup>{renderAppointmentsList()}</ListGroup>
              ) : (
                <ListGroup>{renderPatientsList()}</ListGroup>
              )}
            </div>
            <div className="right-col" style={{ width: '80%', height: '100%' }}>
              <Tab.Content
                style={{
                  marginLeft: 50,
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                {/* <div>
                  wrngiern vbger
                </div> */}

                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <IconButton
                    aria-label="chat"
                    onClick={() => setValueCurrentPage('chat')}
                  >
                    <ChatBubbleIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    aria-label="caht"
                    onClick={() => {
                      setValueCurrentPage('profile');
                    }}
                  >
                    <PersonIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    aria-label="notes"
                    onClick={() => {
                      setValueCurrentPage('notes');
                    }}
                  >
                    <NotesIcon fontSize="large"></NotesIcon>
                  </IconButton>

                  {currentPage === 'profile' ? (
                    renderPatient()
                  ) : currentPage === 'notes' ? (
                    <PatientNotes />
                  ) : (
                    renderChat()
                  )}
                </div>
              </Tab.Content>
            </div>
          </Tab.Container>
        </CardContainer>
      </Container>
      <Footer />
    </>
  );
};

export default ShowPatientsView;

const localStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '89.9vh',
    width: '100wh',
    backgroundColor: '#0a122a',
  },
  circle: {
    width: 30,
    height: 30,
    borderWidth: 0,
    textAlign: 'center',
    borderStyle: 'solid',
    borderColor: '#000',
    color: '#000',
    alignItems: 'center',
    borderRadius: 80,
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    top: 20,
    boxShadow: '0px 2px 5px 4px rgba(0,0,0,0.1)',
  },
};
