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
import CalendarView from './CalendarView';
import PatientList from '../components/PatientList';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { setChatsAction } from '../redux/reducers/authReducer';
import { setCurrentChatAction } from '../redux/reducers/chatsReducer';
import { setPatientIdAction } from '../redux/reducers/patientReducer';
import { setDarkModeAction } from '../redux//reducers/authReducer';

// ui libraries
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import NoteIcon from '@material-ui/icons/Note';
import Button from '@material-ui/core/Button';
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

  const [currentPage, setCurrentPage] = useState('');
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
    currentEducator,
  } = useSelector((state) => state.educators);
  const { patientId } = useSelector((state) => state.patient);
  const {  allChatsLoading } = useSelector((state) => state.chats);

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
    if (patientId) {
      setDisableIcons(false);
    }
  }, [patientId]);
  const renderChat = () => {
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

  const goToPatient = (patientId) => {
    setCurrentPage('profile');
    setActiveList('');
    if (patientId) dispatch(setPatientIdAction(patientId));
    const currentChat = currentEducator?.chats?.find((chat) => {
      return chat?.patientId === patientId;
    });
    if (currentChat) dispatch(setCurrentChatAction(currentChat?.id));
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
          <ShortTextIcon style={styles.icons} fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="darkmode"
          style={{ right: 85, position: 'absolute' }}
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
        <CardContainer style={styles.cardContainer}>
          {activeList === 'appointments' ? (
            <div style={styles.calendarMainDiv}>
              <div style={styles.headerListDiv}>{renderListHeader()}</div>
              <div style={styles.calendarContentDiv}>
                <CalendarView
                  currentEducator={currentEducator}
                  darkMode={darkMode}
                  goToPatient={goToPatient}
                />
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
              <div style={styles.listDev}>
                {renderListHeader()}
                <div>
                  <PatientList
                    activateChat={activateChat}
                    patientId={patientId}
                    darkMode={darkMode}
                    allChatsLoading={allChatsLoading}
                  />
                </div>
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
