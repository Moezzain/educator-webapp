import React, { useState, useEffect } from 'react';
import CardContainer from '../components/CardContainer';
import { parseArray } from '../helpers/Converters';

// Components
import MyNav from '../components/MyNav';
import Footer from '../components/Footer';
import Chat from './Chat';
import PatientProfile from './PatientProfile';
import PatientNotes from './PatientNotes';
import PatientSummaries from './patientSummaries';
import {
  Conversation,
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
import NoteIcon from '@material-ui/icons/Note';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShortTextIcon from '@material-ui/icons/ShortText';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Container from '@material-ui/core/Container';

import '../App.css';
import { lightStyles, darkStyles } from '../styles/showPatientsViewStyles';
import { useHistory } from 'react-router-dom';

const ShowPatientsView = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [activeList, setActiveList] = useState('');
  const [localPatients, setLocalPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState('');
  const [appointmentAnchorEl, setAppointmentAnchorEl] = useState('');
  const [currentAppointment, setCurrentAppointment] = useState('');
  const [disableIcons, setDisableIcons] = useState(true);
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

  const { chats, token, educatorId, darkMode } = useSelector(
    (state) => state.auth
  );
  const {
    fetchedEducatorId,
    patients,
    educators,
    currentEducator,
  } = useSelector((state) => state.educators);
  const { patientId } = useSelector((state) => state.patient);

  const openAppointment = Boolean(appointmentAnchorEl);

  const localStyles = !darkMode ? lightStyles : darkStyles;
  useEffect(() => {
    if (!token) history.replace('/');
  }, [token]);
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
    if (patientId) {
      setDisableIcons(false);
    }
  }, [patientId]);
  useEffect(() => {
    dispatch(getPatientAction({ educatorId, token, patientId }));
  }, [dispatch, educatorId, patientId, token]);
  const renderChat = () => {
    if (!localPatients.length) {
      return null;
    }

    return (
      <Chat
        style={{ width: 1000, backgroundColor: 'green' }}
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
    if (!localPatients.length) {
      return null;
    }
    return (
      <div>
        <div style={{ height: '76vh', overflow: 'auto' }}>
          {localPatients.map((patient) => (
            <Conversation
            key={patient.id}
            active={patientId === patient.patientId}
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
                  <div style={localStyles.patientListName}>
                    {patient.patientName}
                  </div>
                </div>
              </Conversation.Content>
            </Conversation>
          ))}
        </div>
      </div>
    );
  };
  const renderListHeader = () => {
    return (
      <div style={localStyles.listHeaderDiv}>
        <Button
          variant="contained"
          onClick={() => setActiveList('patients')}
          style={localStyles.buttonsText}
        >
          المحادثات
        </Button>
        <Button
          style={localStyles.buttonsText}
          variant="contained"
          onClick={() => setActiveList('appointments')}
        >
          المواعيد
        </Button>
      </div>
    );
  };

  const renderAppointmentsList = () => {
    let appointments = [];
    if (currentEducator) {
      const educatorAppointments = currentEducator.appointments;
      educatorAppointments.forEach((appointment) => {
        appointments.push({
          appointmentId: appointment.appointmentId,
          date: new Date( appointment.date.split('T')[0]),
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
        style={{ overflow: 'auto', height: '80vh' }}
      >
        {Object.values(appointments).sort((a,b)=> b.date - a.date).map((appointment) => {
          return (
            <Button
              variant="contained"
              style={{ width: '100%' }}
              key={appointment.appointmentId}
              onClick={(e) => showAppointment(e, appointment)}
            >
              {new Date(appointment.date).toDateString()}
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
          variant="contained"
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
      <div>
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
          <NoteIcon style={localStyles.icons} fontSize="large"></NoteIcon>
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
          aria-label="darkmode"
          style={{ left: '56vw' }}
          onClick={() => {
            dispatch(setDarkModeAction(!darkMode));
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
    if (!disableIcons) setCurrentPage(page);
  };
  return (
    <>
      <MyNav />
      <Container maxWidth={false}  style={localStyles.container}>
        <CardContainer
          width="95%"
          display='flex'
          direction="row"
          padding={10}
          marginT={10}
          marginB={10}
          backgroundColor={localStyles.cardContainer}
        >
            <div style={localStyles.listDev}>
              {renderListHeader()}
              {activeList === 'appointments' ? (
                <div>{renderAppointmentsList()}</div>
              ) : (
                <div>{renderPatientsList()}</div>
              )}
            </div>
            <div style={localStyles.rightColumn}>
              <div style={localStyles.mianDev}>
                <div style={localStyles.iconsDev}>
                  {renderIcons()}
                  {currentPage === 'profile' ? (
                    <PatientProfile />
                  ) : currentPage === 'notes' ? (
                    <PatientNotes />
                  ) : currentPage === 'appointment' ? (
                    appointmentPopover()
                  ) : currentPage === 'summaries' ? (
                    <PatientSummaries />
                  ) : (
                    renderChat()
                  )}
                </div>
              </div>
            </div>
        </CardContainer>
      </Container>
      <Footer />
    </>
  );
};

export default ShowPatientsView;
