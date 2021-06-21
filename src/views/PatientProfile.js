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
import Paper from '@material-ui/core/Paper';
import '../App.css';
import { getPatientAction } from '../redux/reducers/patientReducer';
import { createStyles } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { useTheme } from '@material-ui/core/styles';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
  Tooltip,
  Legend,
} from 'recharts';
import Chart from '../components/Chart';
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
  const theme = useTheme();
  const dispatch = useDispatch();
  // let { chats, hidePatient, showEducators, activeChat, getPatient } = useContext(DataContext)
  const [dateAffected, setDateAffected] = useState('gdfsdgbdgb');
  const [dateBirth, setDateBirth] = useState('dbdbgdbdbdg');
  const [weights, setWeights] = useState([]);
  const [heights, setHeights] = useState([]);
  const [hba1cs, setHba1cs] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [patientName, setPatientName] = useState('dbdgbdbt');
  const [notes, setNotes] = useState([]);
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
  // useEffect(() => {
  //   dispatch(getPatientAction({ educatorId, token, patientId }));
  // }, [patientId]);

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

  const [notelsAnchorEl, setNotesAnchorEl] = React.useState(null);

  const handleNotesPopoverOpen = (e) => {
    setNotesAnchorEl(e.currentTarget);
  };

  const handleNotesPopoverClose = () => {
    setNotesAnchorEl(null);
  };

  const openNotes = Boolean(notelsAnchorEl);

  const medicinesPopover = () => {
    console.log('notes: ', notes);

    return (
      <Popover
        open={openNotes}
        anchorEl={notelsAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleNotesPopoverClose}
        disableRestoreFocus
      >
        <div style={{ height: '20vh', width: '30vw' }}>
          <ul>
            {Object.values(medicines).map((medicine) => {
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
                    <text style={{width:'20vw', textAlign:"center",}}>
                      {medicine.medicine}
                    </text>
                  </Paper>
                </li>
              );
            })}
          </ul>
        </div>
      </Popover>
    );
  };
  function createData(date, weight) {
    return { date, weight };
  }

  const data = []

  const renderChart = (text) => {
    weights.forEach((weight) => {
      data.push(createData(weight.createdOn.split('T')[0],weight.weight))
    })
    data.push(createData('2020-04-04',80))
    data.push(createData('2020-04-08',90))
    console.log('chart data`: ',data);
    
    return (
      <React.Fragment>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: 'middle',
                  fill: theme.palette.text.primary,
                }}
              >
                {text}
              </Label>
            </YAxis>
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              name={text}
              dataKey="weight"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  };
  const renderContent = () => {
    return (
      <div>
        <div
          style={
            {
              // alignItems: 'center',
              // alignSelf: 'center',
              // alignContent: 'center',
              // justifyContent: 'center',
            }
          }
        >
          <div style={{display:'flex', flexDirection:'row', }}>

        <Paper elevation={3} style={{flex:1, margin:10, height:'5vh'}}>
          <div style={styles.text} >
            {patientName} :{lang.ar.whoIsPatientText}
          </div>
        </Paper>

        <Paper elevation={3} style={{width: '5vw', margin:10, height:'5vh'}}>
          <div style={styles.text} onClick={(e) => {handleNotesPopoverOpen(e)}}>
            Medicines
          </div>
        </Paper>
        {medicinesPopover()}
          </div>
          <Paper elevation={3} style={styles.paper}>
            <div style={styles.text}>
              {dateAffected} :{lang.ar.dateAffectedText}
            </div>
          </Paper>
        </div>
        <Paper elevation={3} style={styles.paper}>
          <text style={styles.text}>
            {dateBirth} :{lang.ar.dateBirthText}
          </text>
        </Paper>
        <Paper elevation={3} style={styles.paper}>
          <div style={styles.text}>
            {diseaseType} :{lang.ar.diseaseText}
          </div>
        </Paper>
        <Paper elevation={3} style={styles.paper}>
          <div style={styles.text}>
            {sex} :{lang.ar.sexText}
          </div>
        </Paper>
        <Paper elevation={3} style={styles.paper}>
          <div style={styles.text}>
            {whoIsPatient} :{lang.ar.whoIsPatientText}
          </div>
        </Paper>
        <Paper elevation={3} style={styles.paper}>
          <div style={styles.text}>
            {surgery} :{lang.ar.surgeryText}
          </div>
        </Paper>
        <Paper elevation={3} style={styles.paper}>
          <div style={styles.text}>
            {otherDisease} :{lang.ar.otherDiseaseText}
          </div>
        </Paper>
        <Paper elevation={3} style={styles.paper}>
          <div style={styles.text}>
            {outSideLink} :{lang.ar.outSideLinkText}
          </div>
        </Paper>
        <Paper elevation={3} style={styles.paper}>
          <div style={styles.text}>
            {diet} :{lang.ar.dietText}
          </div>
        </Paper>
      </div>
    );
  };
  return (
    <div style={{ flex: 1 }}>
      {loading ? <Spinner animation="border" /> : ''}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>{renderContent('Weight')}</div>

        <div style={{ flex: 1 }}>
          <Paper
              elevation={3}
            style={{
              width: '30vw',
              height: '27vh',
              marginLeft: '1vw',

              // backgroundColor:'black'
            }}
          >
            {renderChart()}
          </Paper>
          <div style={{width:'30vw',display:'flex',flexDirection:'row', marginLeft:'1vw',marginTop:'1vh',height:'39.3vh'}}>

          <Paper
            elevation={3}
            style={{
              flex:1,
              // marginLeft: '1vw',
              // marginTop: '1vw',
              // backgroundColor:'black'
            }}
          >
            <div style={{display:'flex', flexDirection:'column'}}>
            <text  style={{fontSize:30,textAlign:'center'}}> hba1cs</text>
            {hba1cs.map((hba1c) => {
              return (

                <div style={{display:'flex',flexDirection:'row', alignContent:'center'}}>
                  <text  style={{fontSize:30, color:'#ccc',}}> {hba1c.createdOn.split('T')[0]}:{'\ '} </text>
              <text  style={{fontSize:30, color:'red'}}> {hba1c.hba1c} </text>
                  </div>
              )
              
            })}
                </div>
          </Paper>
          <Paper
            elevation={3}
            style={{
              flex:1,
              marginLeft: '1vw',
              // marginTop: '1vw',
              // backgroundColor:'black'
            }}
          >
            <div style={{display:'flex',flexDirection:'column',overflow:'auto',height:'35vh'}}>
              <text style={{fontSize:30, textAlign:'center'}}>Notes</text>
              {notes.map((note) => {
                  return(
                <Paper elevation={2} style={{flex:1,alignSelf:'center',marginTop:3}}>
                  <div style={{display:'flex',flexDirection:'column'}}>
                  <text>
                    title: {note.title}
                  </text>
                    <text>
                      Content: {note.text}
                    </text>
                    <text>
                      date: {note.createdOn}
                    </text>
                  </div>
                </Paper>
                )
              })}
            </div>
          </Paper>
          </div>
        </div>
      </div>
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
    textAlign: 'center',
    width: '30vw',
    height: '6vh',
    margin: 10,
    fontSize: 20,
    alignVertical: 'center',
    alignSelf: 'center',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center',
  },
};
export default PatientProfile;
