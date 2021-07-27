import React, { useEffect, useState } from 'react';
import Input from '@material-ui/core/Input';
import { Conversation } from '@chatscope/chat-ui-kit-react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { darkStyles, lightStyles } from '../styles/patientListStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

const PatientList = ({
  localPatients,
  allPateints,
  activateChat,
  patientId,
  darkMode,
  setSearchTerm,
  searchTerm,
  allChatsLoading,
  checkedAllChats,
  setCheckedAllChats,
}) => {
  const [filteredPatients, setFilteredPatients] = useState([]);
  const lang = {
    ar: {
      allChats: 'جميع المحادثات',
      searchHolder: 'ابحث',
    },
  };

  const styles = !darkMode ? lightStyles : darkStyles;
  useEffect(() => {
    if (checkedAllChats) allPateints();
  },[checkedAllChats])
  useEffect(() => {
    
    if (!localPatients.length) {
      setFilteredPatients([]);
      return null;
    }
    let patients;
    searchTerm === ''
      ? (patients = localPatients)
      : (patients = localPatients?.filter((patient) => {
          return (
            patient?.patientName?.toLowerCase().includes(searchTerm) ||
            patient?.id?.includes(searchTerm)
          );
        }));
    setFilteredPatients(patients);
  }, [localPatients, searchTerm,]);

  return (
    <div>
      <div style={styles.mainDiv}>
        <div style={styles.uperDiv}>
          <div style={styles.inputDiv} dir="rtl">
            <Input
              style={styles.input}
              value={searchTerm}
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
        {filteredPatients?.map((patient) => (
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
