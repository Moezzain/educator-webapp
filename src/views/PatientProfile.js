/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-sparse-arrays */
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  Text,
} from 'react';
import {
  Tab,
  Col,
  OverlayTrigger,
  // Popover,
  Form,
  Button,
  Spinner,
  Row,
} from 'react-bootstrap';
import { DataContext } from '../stateManagement/context';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { getPatientAction } from '../redux/reducers/patientReducer';
import { createStyles } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';

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
};

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
    saveText: 'حفظ',
  },
};

const PatientProfile = () => {
  const dispatch = useDispatch();
  // let { chats, hidePatient, showEducators, activeChat, getPatient } = useContext(DataContext)
  const [dateAffected, setDateAffected] = useState('gdfsdgbdgb');
  const [dateBirth, setDateBirth] = useState('dbdbgdbdbdg');
  const [weights, setWeights] = useState([]);
  const [heights, setHeights] = useState([]);
  const [hba1cs, setHba1cs] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [patientName, setPatientName] = useState('dbdgbdbt');
  const [notes, setNotes] = useState('');
  const [diseaseType, setDiseaseType] = useState('');
  const [sex, setSex] = useState('');
  const [whoIsPatient, setWhoIsPatient] = useState('');
  const [surgery, setSurgery] = useState('');
  const [otherDisease, setOtherDisease] = useState('');
  const [outSideLink, setOutSideLink] = useState('');
  const [topics, setTopics] = useState([]);
  const [diet, setDiet] = useState('');

  const { patientId, patientProfile, loading } = useSelector(
    (state) => state.patient
  );
  const { token, educatorId } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log('patient profile:', patientProfile);
    try {
      if (patientProfile) {
        setDateAffected(patientProfile?.dateAffected);
        setDateBirth(patientProfile?.dateBirth);
        setWeights(patientProfile?.weights);
        setHeights(patientProfile?.heights);
        setHba1cs(patientProfile?.hba1cs);
        setMedicines(patientProfile?.medicines);
        setPatientName(patientProfile?.patientName);
        setNotes(patientProfile?.notes);
        setDiseaseType(patientProfile?.diseaseType);
        setWhoIsPatient(patientProfile?.whoIsPatient);
        setSurgery(patientProfile?.surgery);
        setOtherDisease(patientProfile?.otherDisease);
        setOutSideLink(patientProfile?.outSideLink);
        setTopics(patientProfile?.topics);
        setDiet(patientProfile?.diet);
      }
    } catch (e) {
      console.log(e);
    }
  }, [patientProfile]);
  useEffect(() => {
    dispatch(getPatientAction({ educatorId, token, patientId }));
  }, [patientId]);

  console.log('rendering profile');
  const {
    dateAffectedText,
    dietText,
    dateBirthText,
    diseaseText,
    weightText,
    heightText,
    Hba1CText,
    medicinesText,
    sexText,
    surgeryText,
    otherDiseaseText,
    whoIsPatientText,
    outSideLinkText,
    topicsText,
    saveText,
  } = lang.ar;

  // if (!chat.medicalProfile) {
  //   chat.medicalProfile = defaultProfile
  // }
  // console.log('patientName:', chat.patientName);

  const hba1cPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{Hba1CText}</Popover.Title>
      <Popover.Content style={{ width: '100%', padding: 0 }}>
        {hba1cs?.map((hba1c) => (
          <div
            style={{
              border: '1px solid black',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {hba1c?.hba1c}
          </div>
        ))}
      </Popover.Content>
    </Popover>
  );
  const weightsPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{weightText}</Popover.Title>
      <Popover.Content style={{ width: '100%', padding: 0 }}>
        {weights?.map((weight) => (
          <div
            style={{
              border: '1px solid black',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {weight?.weight}
          </div>
        ))}
      </Popover.Content>
    </Popover>
  );
  const heightsPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{heightText}</Popover.Title>
      <Popover.Content style={{ width: '100%', padding: 0 }}>
        {heights?.map((height) => (
          <div
            style={{
              border: '1px solid black',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {height?.height}
          </div>
        ))}
      </Popover.Content>
    </Popover>
  );
  const medicinesPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{medicinesText}</Popover.Title>
      <Popover.Content style={{ width: '100%', padding: 0 }}>
        {medicines?.map((medicine) => (
          <div
            style={{
              border: '1px solid black',
              width: '100%',
              textAlign: 'center',
            }}
          >
            {medicine?.medicine}
          </div>
        ))}
      </Popover.Content>
    </Popover>
  );

  const [notelsAnchorEl, setNotesAnchorEl] = React.useState(null);

  const handleNotesPopoverOpen = (e) => {
    setNotesAnchorEl(e.currentTarget);
  };

  const handleNotesPopoverClose = () => {
    setNotesAnchorEl(null);
  };

  const openNotes = Boolean(notelsAnchorEl);
  // const open = Boolean(anchorEl);
  // const open = Boolean(anchorEl);

  const notesPopover = () => {
    console.log('notes: ', notes);

    return (
      <Popover
        open={openNotes}
        anchorEl={notelsAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleNotesPopoverClose}
        disableRestoreFocus
      >
        <div style={{ height: '20vh', width: '30vw' }}>
          <ul>
            {Object.values(notes).map((note) => {
              return (
                <li style={{ listStyleType: 'none', flex: 1 }}>
                  <Paper
                    style={{
                      backgroundColor: '#ccc',
                      alignSelf: 'center',
                      marginRight: 35,
                      marginTop: 10,
                      flex: 1,
                    }}
                  >
                    <td style={{ flex: 1 }}>
                      <tr style={{ alignSelf: 'center', flex: 1 }}>
                        <div
                          style={{
                            width: '26vw',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                          }}
                        >
                          note.title
                        </div>
                      </tr>
                      <tr>
                        <text>note.text</text>
                      </tr>
                      <tr>
                        <text>note.createdOn</text>
                      </tr>
                      <tr>
                        <text>note.firstName</text>
                      </tr>
                    </td>
                  </Paper>
                </li>
              );
            })}
          </ul>
        </div>
      </Popover>
    );
  };

  return (
    <div style={{ direction: 'row', flex: 1 }}>
      {loading ? <Spinner animation="border" /> : ''}
      <tr style={{ flex: 1 }}>
        {/* <div>npigr</div>
          <div>npigr</div> */}
        <td style={{ flex: 1 }}>
          <div style={{}}>
            <div
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              <Paper style={styles.paper}>
                <div style={styles.text}>
                  {dateAffected} :{lang.ar.dateAffectedText}
                </div>
              </Paper>
            </div>
            <Paper style={styles.paper}>
              <text
                style={styles.text}
              >
                {dateBirth} :{lang.ar.dateBirthText}
              </text>
            </Paper>
            <Paper style={styles.paper}>
            <div style={styles.text}>
              {patientName} :{lang.ar.whoIsPatientText}

            </div>
            </Paper>
            <Paper style={styles.paper}>
            <div style={styles.text}>

              {diseaseType} :{lang.ar.diseaseText}
            </div>
            </Paper>
            <Paper style={styles.paper}>
            <div style={styles.text}>

              {sex} :{lang.ar.sexText}
            </div>
            </Paper>
            <Paper style={styles.paper}>
            <div style={styles.text}>
              {whoIsPatient} :{lang.ar.whoIsPatientText}

            </div>
            </Paper>
            <Paper style={styles.paper}>
            <div style={styles.text}>

              {surgery} :{lang.ar.surgeryText}
            </div>
            </Paper>
            <Paper style={styles.paper}>
            <div style={styles.text}>

              {otherDisease} :{lang.ar.otherDiseaseText}
            </div>
            </Paper>
            <Paper style={styles.paper}>
            <div style={styles.text}>
              {outSideLink} :{lang.ar.outSideLinkText}

            </div>
            </Paper>
            <Paper style={styles.paper}>
            <div style={styles.text}>

              {diet} :{lang.ar.dietText}
            </div>
            </Paper>
          </div>
        </td>
        <td>
          <div>
            <Paper
              style={{ textAlign: 'center', width: '30vw' }}
              onClick={(e) => {
                handleNotesPopoverOpen(e);
              }}
            >
              item
            </Paper>
            {notesPopover()}
          </div>
        </td>
      </tr>
    </div>
  );
};
const styles = {
  text: {
    textAlign: 'center',
    verticalAlign: 'center',
    top: '1vh',
    position: 'relative',
  },
  paper: {
    flex: 1,
    textAlign: 'center',
    width: '30vw',
    height: '5vh',
    margin: 10,
    fontSize: 20,
    alignVertical: 'center',
    alignSelf: 'center',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center',
  },
};
export default PatientProfile;
