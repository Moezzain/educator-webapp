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
import CalendarView from './CalendarView'

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setChatsAction } from '../redux/reducers/authReducer';
import {
  setCurrentChatAction,
  clearAllChatsAction,
} from '../redux/reducers/chatsReducer';
import { setPatientIdAction } from '../redux/reducers/patientReducer';
import { setCurrentEducatorAction } from '../redux//reducers/educatorsReducer';
import { setDarkModeAction } from '../redux//reducers/authReducer';

// ui libraries
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import NoteIcon from '@material-ui/icons/Note';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShortTextIcon from '@material-ui/icons/ShortText';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import { Conversation } from '@chatscope/chat-ui-kit-react';

import '../App.css';
import { lightStyles, darkStyles } from '../styles/showPatientsViewStyles';
import { useHistory } from 'react-router-dom';

const ShowPatientsView = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [activeList, setActiveList] = useState('');
  const [localPatients, setLocalPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState('');
  const [disableIcons, setDisableIcons] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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

  const styles = !darkMode ? lightStyles : darkStyles;
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
    let queriedPatient;
    searchTerm === ''
      ? (queriedPatient = localPatients)
      : (queriedPatient = localPatients?.filter((patient) => {
          return (
            patient?.patientName?.toLowerCase().includes(searchTerm) ||
            patient?.id?.includes(searchTerm)
          );
        }));
    return (
      <div>
        <div style={{ height: '76vh', overflow: 'auto' }}>
          <Input
            placeholder="Search name"
            style={{ width: '100%' }}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          {queriedPatient?.map((patient) => (
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
                  <div style={styles.patientListName}>
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
      <div style={styles.listHeaderDiv}>
        <Button
          variant="contained"
          onClick={() => setActiveList('patients')}
          style={styles.buttonsText}
        >
          المحادثات
        </Button>
        <Button
          style={styles.buttonsText}
          variant="contained"
          onClick={() => setActiveList('appointments')}
        >
          المواعيد
        </Button>
      </div>
    );
  };
  // const localizer = momentLocalizer(moment);
  // const renderAppointmentsList = () => {
  //   let appointments = [];
  //   if (currentEducator) {
  //     const educatorAppointments = currentEducator.appointments;
  //     educatorAppointments.forEach((appointment) => {
  //       appointments.push({
  //         appointmentId: appointment.appointmentId,
  //         date: new Date(appointment.date.split('T')[0]),
  //         name: appointment.name,
  //         time: appointment.time,
  //         patientId: appointment.patientId,
  //       });
  //     });
  //   }

  //   if (!appointments || (appointments && !Object.keys(appointments).length)) {
  //     return null;
  //   }
  //   let upComing = 0;
  //   const calendarAppointments = appointments.map((appointment) => {
  //     let date = new Date(appointment.date);
  //     if (date > Date.now()) upComing++;
  //     date.setHours(appointment.time.split(':')[0]);

  //     return {
  //       id: appointment.appointmentId,
  //       title: appointment.name,
  //       allDay: false,
  //       start: date,
  //       end: date,
  //       patinetId: appointment.patientId,
  //     };
  //   });

  //   return (
  //     <div style={styles.calendarCardDiv}>
  //       <Card elevation={5} style={styles.calendarCard}>
  //         <div style={styles.calendarDiv}>
  //           <div
  //             style={{
  //               alignSelf: 'start',
  //               marginLeft: 10,
  //               marginTop: 5,
  //               fontSize: 20,
  //             }}
  //           >
  //             Upcoming Appointments: {upComing}
  //           </div>
  //           <Calendar
  //             localizer={localizer}
  //             events={calendarAppointments}
  //             startAccessor="start"
  //             endAccessor="end"
  //             style={styles.calendar}
  //             onSelectEvent={(e) => {
  //               goToPatient(e?.patinetId);
  //             }}
  //           />
  //         </div>
  //       </Card>
  //     </div>
  //   );
  // };
  const goToPatient = (patientId) => {
    setCurrentPage('profile');
    setActiveList('');
    if (patientId) dispatch(setPatientIdAction(patientId));
    const currentChat = currentEducator?.chats?.find((chat) => {
      return chat?.patientId === patientId;
    });
    if (currentChat) dispatch(setCurrentChatAction(currentChat?.id));
  };
  const renderIcons = () => {
    return (
      <div>
        <IconButton
          aria-label="chat"
          onClick={() => setValueCurrentPage('chat')}
        >
          <ChatBubbleIcon style={styles.icons} fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="chat"
          onClick={() => {
            setValueCurrentPage('profile');
          }}
        >
          <PersonIcon style={styles.icons} fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="notes"
          onClick={() => {
            setValueCurrentPage('notes');
          }}
        >
          <NoteIcon style={styles.icons} fontSize="large"></NoteIcon>
        </IconButton>
        <IconButton
          aria-label="summary"
          onClick={() => {
            setValueCurrentPage('summaries');
          }}
        >
          <ShortTextIcon style={styles.icons} fontSize="large"></ShortTextIcon>
        </IconButton>
        <IconButton
          aria-label="darkmode"
          style={{ left: '56vw' }}
          onClick={() => {
            dispatch(setDarkModeAction(!darkMode));
          }}
        >
          <Brightness4Icon
            style={styles.icons}
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
      <Container maxWidth={false} style={styles.container}>
        <CardContainer
          width="95%"
          display="flex"
          direction="row"
          padding={10}
          marginT={10}
          marginB={10}
          backgroundColor={styles.cardContainer}
        >
          {activeList === 'appointments' ? (
            <div style={styles.calendarMainDiv}>
              <div style={styles.headerListDiv}>{renderListHeader()}</div>
              <div style={styles.calendarContentDiv}>
                <CalendarView currentEducator={currentEducator} darkMode={darkMode} goToPatient={goToPatient}/>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
              <div style={styles.listDev}>
                {renderListHeader()}
                  <div>{renderPatientsList()}</div>
              </div>
              <div style={styles.rightColumn}>
                <div style={styles.mianDev}>
                  <div style={styles.iconsDev}>
                    {renderIcons()}
                    {currentPage === 'profile' ? (
                      <PatientProfile />
                    ) : currentPage === 'notes' ? (
                      <PatientNotes />
                    ) : currentPage === 'summaries' ? (
                      <PatientSummaries />
                    ) : (
                      renderChat()
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContainer>
      </Container>
      <Footer />
    </>
  );
};

export default ShowPatientsView;
