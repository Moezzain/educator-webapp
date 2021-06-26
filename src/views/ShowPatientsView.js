import React, { useState, useEffect } from 'react';
import { ListGroup, Container, Tab, Tabs, Table } from 'react-bootstrap';
import CardContainer from '../components/CardContainer';
import { DataContext } from '../stateManagement/context';
import { parseArray } from '../helpers/Converters';

// Components
import MyNav from '../components/MyNav';
import Footer from '../components/Footer';
import Chat from '../components/Chat';
import PatientProfile from './PatientProfile';
import PatientNotes from './PatientNotes';
import PatientSummaries from './patientSummaries';
import {
  ConversationList,
  Conversation,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

// Redux
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
import { setDarkModeAction } from '../redux//reducers/authReducer';

// ui libraries
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import NotesIcon from '@material-ui/icons/Notes';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShortTextIcon from '@material-ui/icons/ShortText';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import '../App.css';
import { mainTheme,darkTheme } from '../styles/themes';
import { lightStyles,darkStyles  } from '../styles/showPatientsViewStyles';
import PatientEducators from './PatientEducators';

const ShowPatientsView = () => {
  
  const dispatch = useDispatch();
  
  const [activeList, setActiveList] = useState('');
  const [localPatients, setLocalPatients] = useState();
  const [currentPage, setCurrentPage] = useState('');
  const [appointmentAnchorEl, setAppointmentAnchorEl] = useState('');
  const [currentAppointment, setCurrentAppointment] = useState('');
  const [lang, setLang] = useState({
    ar: {
      chat: 'المحادثة',
      profile: 'البروفايل',
      educators: 'المتابعين',
      patientName: 'اسم المريض',
      goToPatient: 'اذهب للمريض',
      time: 'الوقت',
    },
  });
  
  const { chats, token, educatorId, darkMode } = useSelector((state) => state.auth);
  const {
    fetchedEducatorId,
    patients,
    educators,
    currentEducator,
  } = useSelector((state) => state.educators);
  const { patientId } = useSelector((state) => state.patient);
  
  const openAppointment = Boolean(appointmentAnchorEl);
  
  const localStyles = !darkMode ? lightStyles : darkStyles

  useEffect(() => {
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
    let tempEducator;
    tempEducator = Object.values(educators).filter((educator) => {
      return fetchedEducatorId === educator.id;
    });
    if (tempEducator.length !== 0) {
      setLocalPatients(tempEducator[0].chats);
    }
    dispatch(setCurrentEducatorAction(tempEducator[0]));
    dispatch(clearAllChatsAction());
  }, [
    dispatch,
    educatorId,
    educators,
    fetchedEducatorId,
    localPatients,
    patients,
  ]);
  useEffect(() => {
    dispatch(getPatientAction({ educatorId, token, patientId }));
  }, [dispatch, educatorId, patientId, token]);
  const renderChat = () => {
    if (!localPatients) {
      return null;
    }

    return (
      <Chat
        style={{ width: 1000, backgroundColor:'green'}}
        chatId={5634}
        tokxen={token}
        educatorId={educatorId}
      />
    );
  };

  const activateChat = (chatId, patientId) => {
    dispatch(setPatientIdAction(patientId));
    dispatch(setCurrentChatAction(chatId));
  };

  const renderPatientsList = () => {
    if (!localPatients) {
      return null;
    }
    return (
      <div>
        <ConversationList style={{ height: '73vh' }}>
          {localPatients.map((patient) => (
            <Conversation
              onClick={() => activateChat(patient.id, patient.patientId)}
            >
              <Conversation.Content>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <AccountCircleIcon
                    fontSize="large"
                    style={{ marginRight: 5 }}
                  ></AccountCircleIcon>
                  <div style={{}}>{patient.patientName}</div>
                </div>
              </Conversation.Content>
            </Conversation>
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
        style={localStyles.listHeaderDiv}
      >
        <Button
          variant={patientsStyle}
          onClick={() => setActiveList('patients')}
          style={localStyles.buttonsText}
        >
          المحادثات
        </Button>
        <Button
          style={localStyles.buttonsText}
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
    let appointments = [];
    if (currentEducator) {
      const educatorAppointments = currentEducator.appointments;
      educatorAppointments.forEach((appointment) => {
        appointments.push({
          appointmentId: appointment.appointmentId,
          date: appointment.date.split('T')[0],
          name: appointment.name,
          time: appointment.time,
          patientId: appointment.patientId,
        });
      });
    }

    if (!appointments || (appointments && !Object.keys(appointments).length)) {
      return null;
    }

    return (
      <div
        style={{ overflow: 'auto', height: '75vh', backgroundColor: 'green' }}
      >
        {Object.values(appointments).map((appointment) => {
          return (
            <Button
              variant="contained"
              color="white"
              style={{ width: '100%' }}
              key={appointment.appointmentId}
              onClick={(e) => showAppointment(e, appointment)}
            >
              {appointment.date}
            </Button>
          );
        })}
      </div>
    );
  };
  const appointmentPopover = () => {
    return (
      <Popover
        open={openAppointment}
        anchorEl={appointmentAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleAppointmentPopoverClose}
        disableRestoreFocus
      >
        <div style={{ height: '10vh', width: '10vw' }}>
          <h6 style={{ textAlign: 'center' }}>
            {currentAppointment.name} :{lang.ar.patientName}
          </h6>
          <h6 style={{ textAlign: 'center' }}>
            {currentAppointment.time} :{lang.ar.time}
          </h6>
          <Button
            style={localStyles.goToPatientButton}
            onClick={() => goToPatient(currentAppointment.patientId)}
          >
            {lang.ar.goToPatient}
          </Button>
        </div>
      </Popover>
    );
  };
  const goToPatient = (patientId) => {
    setCurrentPage('profile');
    dispatch(getPatientAction({ fetchedEducatorId, token, patientId }));
  };
  const handleAppointmentPopoverOpen = (e) => {
    setAppointmentAnchorEl(e.currentTarget);
  };

  const handleAppointmentPopoverClose = () => {
    setAppointmentAnchorEl(null);
  };
  const showAppointment = (e, appointment) => {
    setCurrentAppointment(appointment);
    handleAppointmentPopoverOpen(e);
    setCurrentPage('appointment');
  };
  const renderIcons = () => {
    return (
      <div >
        <IconButton
          aria-label="chat"
          onClick={() => setValueCurrentPage('chat')}
        >
          <ChatBubbleIcon style={localStyles.icons} fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="chat"
          onClick={() => {
            setValueCurrentPage('profile');
          }}
        >
          <PersonIcon style={localStyles.icons} fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="notes"
          onClick={() => {
            setValueCurrentPage('notes');
          }}
        >
          <NotesIcon style={localStyles.icons} fontSize="large"></NotesIcon>
        </IconButton>
        <IconButton
          aria-label="summary"
          onClick={() => {
            setValueCurrentPage('summaries');
          }}
        >
          <ShortTextIcon
            style={localStyles.icons}
            fontSize="large"
          ></ShortTextIcon>
        </IconButton>
        <IconButton
          aria-label="educators"
          onClick={() => {
            setValueCurrentPage('educators');
          }}
        >
          <VisibilityIcon
            style={localStyles.icons}
            fontSize="large"
          ></VisibilityIcon>
        </IconButton>
        <IconButton
          aria-label="darkmode"
          style={{left:'50vw'}}
          onClick={() => {
            dispatch(setDarkModeAction(!darkMode))
          }}
        >
          <Brightness4Icon
            style={localStyles.icons}
            fontSize="large"
          ></Brightness4Icon>
        </IconButton>
      </div>
    );
  };
  const setValueCurrentPage = (page) => {
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
          backgroundColor={localStyles.cardContainer}
        >
          <Tab.Container>
            <div style={localStyles.listDev}>
              {renderListHeader()}
              {activeList === 'appointments' ? (
                <ListGroup>{renderAppointmentsList()}</ListGroup>
              ) : (
                <ListGroup>{renderPatientsList()}</ListGroup>
              )}
            </div>
            <div style={localStyles.rightColumn}>
              <Tab.Content style={localStyles.mianDev}>
                <div style={localStyles.iconsDev}>
                  {renderIcons()}
                  {currentPage === 'profile' ? (
                    renderPatient()
                  ) : currentPage === 'notes' ? (
                    <PatientNotes />
                  ) : currentPage === 'appointment' ? (
                    appointmentPopover()
                  ) : currentPage === 'summaries' ? (
                    <PatientSummaries />
                  ) : currentPage === 'educators' ? (
                    <PatientEducators />
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
