import React, { useState, useEffect } from 'react';
import Input from '@material-ui/core/Input';
import { Conversation } from '@chatscope/chat-ui-kit-react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { darkStyles, lightStyles } from '../styles/patientListStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentEducatorAction } from '../redux/reducers/educatorsReducer';
import {
  clearAllChatsAction,
  getAllChats,
} from '../redux/reducers/chatsReducer';

const PatientList = ({ activateChat, darkMode }) => {
  const dispatch = useDispatch();
  const [checkedAllChats, setCheckedAllChats] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [localPatients, setLocalPatients] = useState([]);
  const lang = {
    ar: {
      searchHolder: 'ابحث',
      allChats: 'جميع المحادثات',
    },
  };

  const { educators, fetchedEducatorId, patients } = useSelector(
    (state) => state.educators
  );
  const { educatorId, token } = useSelector((state) => state.auth);
  const { patientId } = useSelector((state) => state.patient);
  const { allChats, allChatsLoading } = useSelector((state) => state.chats);
  useEffect(() => {
    let tempEducator;
    if (educators && !checkedAllChats) {
      tempEducator = Object.values(educators).filter((educator) => {
        return fetchedEducatorId === educator.id;
      });
      if (tempEducator.length !== 0) {
        setLocalPatients(tempEducator[0].chats);
      }
      setSearchTerm('');
      dispatch(setCurrentEducatorAction(tempEducator[0]));
      dispatch(clearAllChatsAction());
    }
  }, [
    dispatch,
    educatorId,
    educators,
    fetchedEducatorId,
    patients,
    allChats,
    checkedAllChats,
  ]);
  useEffect(() => {
    if (allChats?.length) {
      setLocalPatients(allChats);
    }
  }, [allChats]);

  useEffect(() => {
    if (checkedAllChats) allPateints();
  }, [checkedAllChats]);
  const allPateints = () => {
    dispatch(getAllChats({ educatorId, token }));
  };
  const styles = !darkMode ? lightStyles : darkStyles;
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
      <div style={styles.mainDiv}>
        <div style={styles.uperDiv}>
          {/* <input
            // type="text"
            placeholder={lang.ar.searchHolder}
            style={styles.input}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          /> */}
          <div style={styles.inputDiv} dir="rtl">
            <Input
              style={styles.input}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              placeholder={lang.ar.searchHolder}
            />
          </div>
          <div style={styles.switchDiv}>
            <Typography style={styles.allChatsText}>
              {lang.ar.allChats}
            </Typography>
            <Switch
              style={styles.allChatsSwitch}
              checked={checkedAllChats}
              onChange={() => {
                setCheckedAllChats(!checkedAllChats);
              }}
              name="checkedB"
              color="primary"
            />
          </div>
        </div>
        {allChatsLoading ? <LinearProgress /> : null}
        {queriedPatient?.map((patient) => (
          <Conversation
            key={patient.id}
            active={patientId === patient.patientId}
            onClick={() => activateChat(patient.id, patient.patientId)}
          >
            <Conversation.Content>
              <div style={styles.convo}>
                <AccountCircleIcon
                  fontSize="large"
                  style={styles.accountIcon}
                ></AccountCircleIcon>
                <div style={styles.patientListName}>{patient.patientName}</div>
              </div>
            </Conversation.Content>
          </Conversation>
        ))}
      </div>
    </div>
  );
};
export default PatientList;
