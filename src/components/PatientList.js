import React  from 'react'
import Input from '@material-ui/core/Input';
import { Conversation } from '@chatscope/chat-ui-kit-react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import {darkStyles,lightStyles} from '../styles/patientListStyles'
import LinearProgress from '@material-ui/core/LinearProgress';

const PatientList = ({localPatients,allPateints,activateChat,patientId,darkMode,setSearchTerm,searchTerm,allChatsLoading}) => {
    

    const styles =!darkMode ? lightStyles :darkStyles
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
            <Input
              placeholder="Search name"
              style={styles.input}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            <Button style={styles.allChatsButton} onClick={allPateints} variant="contained" color="blue">
              all chats
            </Button>
          </div>
          {allChatsLoading ? <LinearProgress/> : null}
          {queriedPatient?.map((patient) => (
            <Conversation
              key={patient.id}
              active={patientId === patient.patientId}
              onClick={() => activateChat(patient.id, patient.patientId)}
            >
              <Conversation.Content>
                <div
                  style={styles.convo}
                >
                  <AccountCircleIcon
                    fontSize="large"
                    style={styles.accountIcon}
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
export default PatientList