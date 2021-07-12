import React, { useState, useEffect } from 'react';
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
import {
  setCurrentChatAction,
  clearAllChatsAction,
  getAllChats,
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
import ShortTextIcon from '@material-ui/icons/ShortText';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

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
  const [checkedAllChats, setCheckedAllChats] = useState('');
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
  const { allChats, allChatsLoading } = useSelector((state) => state.chats);

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
    if (educators) {
      tempEducator = Object.values(educators).filter((educator) => {
        return fetchedEducatorId === educator.id;
      });
      if (tempEducator.length !== 0) {
        setLocalPatients(tempEducator[0].chats);
      }
      setCheckedAllChats(false)
      setSearchTerm('');
      dispatch(setCurrentEducatorAction(tempEducator[0]));
      dispatch(clearAllChatsAction());
    }
  }, [dispatch, educatorId, educators, fetchedEducatorId, patients]);
  useEffect(() => {
    if (patientId) {
      setDisableIcons(false);
    }
  }, [patientId]);
  useEffect(() => {
    if (allChats?.length) {
      setLocalPatients(allChats);
    }
  }, [allChats]);
  useEffect(() => {
    let tempEducator
    if(!checkedAllChats){
      tempEducator = Object.values(educators).filter((educator) => {
        return fetchedEducatorId === educator.id;
      });
      if (tempEducator.length !== 0) {
        setLocalPatients(tempEducator[0].chats);
      }
    }
  },[checkedAllChats])
  const renderChat = () => {
    if (!localPatients.length) {
      return null;
    }

    return (
      <Chat/>
    );
  };

  const activateChat = (chatId, patientId) => {
    dispatch(setPatientIdAction(patientId));
    dispatch(setCurrentChatAction(chatId));
  };
  const allPateints = () => {
    dispatch(getAllChats({ educatorId: fetchedEducatorId, token }));
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
    <div style={{height:'100vh'}}>
      <MyNav />
      <Container maxWidth={false} style={styles.container}>
        <Card style={styles.card}
        >
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
                    localPatients={localPatients}
                    allPateints={allPateints}
                    activateChat={activateChat}
                    patientId={patientId}
                    darkMode={darkMode}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    allChatsLoading={allChatsLoading}
                    checkedAllChats={checkedAllChats}
                    setCheckedAllChats={setCheckedAllChats}
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
        </Card>
      </Container>
      <Footer />
    </div >
  );
};

export default ShowPatientsView;
