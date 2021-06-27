import React, { useEffect, useState } from 'react';

import {concatProfile} from '../helpers'
// redux
import { useSelector, useDispatch } from 'react-redux';
import {setFetchedEducatorIdReducer} from '../redux/reducers/educatorsReducer'
// ui
import { Spinner } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import '../App.css';
import Popover from '@material-ui/core/Popover';
import { useTheme } from '@material-ui/core/styles';
import { lightStyles, darkStyles } from '../styles/patientProfileStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
  Tooltip,
  Legend,
} from 'recharts';

const lang = {
  ar: {
    name: 'الاسم',
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
    whoIsPatientText: 'من المتلقي',
    outSideLinkText: 'رابط ملف خارجي',
    topicsText: 'المواضيع',
    saveText: 'حفظ',
  },
};

const PatientProfile = () => {
  const theme = useTheme();

  const dispatch = useDispatch()
  
  const [dateAffected, setDateAffected] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [weights, setWeights] = useState([]);
  const [heights, setHeights] = useState([]);
  const [hba1cs, setHba1cs] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [patientName, setPatientName] = useState('');
  const [notes, setNotes] = useState([]);
  const [diseaseType, setDiseaseType] = useState('');
  const [sex, setSex] = useState('');
  const [whoIsPatient, setWhoIsPatient] = useState('');
  const [surgery, setSurgery] = useState('');
  const [otherDisease, setOtherDisease] = useState('');
  const [outSideLink, setOutSideLink] = useState('');
  const [topics, setTopics] = useState([]);
  const [diet, setDiet] = useState('');
  
  const {darkMode } = useSelector((state) => state.auth)
  const {patients } = useSelector((state) => state.educators)
  const {patientProfile, loading } = useSelector(
    (state) => state.patient
    );

    const styles = ! darkMode ? lightStyles : darkStyles 

    useEffect(() => {
      try {
        if (patientProfile) {
          setDateAffected(patientProfile?.dateAffected);
          setDateBirth(patientProfile?.dateBirth);
          setWeights(patientProfile?.weights);
          setHeights(patientProfile?.height);
          setHba1cs(concatProfile(patientProfile,'hba1cs'));
          
          
          setMedicines(concatProfile(patientProfile, 'medicines'));
          setPatientName(patientProfile?.realPatientName);
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
    
  function createData(date, weight,height) {
    return { date, weight, height};
  }

  const data = [];

  const renderChart = (text) => {
    
    weights.forEach((weight) => {
      data.push(createData(weight.createdOn.split('T')[0], weight.weight,heights));
    });

    return (
      <React.Fragment>
        <ResponsiveContainer>
          <LineChart data={data} margin={styles.chartMargin}>
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
            {/* <Line
              type="monotone"
              name={text}
              dataKey="weight"
              stroke={theme.palette.primary.main}
              dot={false}
            /> */}
            <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="height" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  };
  const renderCard = (text, description) => {
    return (
      <Card color style={styles.card}>
        <CardContent>
          <Typography style={styles.text} variant="h5" component="h2">
            {description}
          </Typography>
          <Typography color={styles.textColor} >{text}</Typography>
        </CardContent>
      </Card>
    );
  };
  const goToEducator = (educatorId) => {
    dispatch(setFetchedEducatorIdReducer(educatorId));
  };
  const renderEducators = () => {
    return (
      <Card color style={styles.card}>
        <CardContent>
          <Typography style={styles.text} variant="h5" component="h2">
            Educators
          </Typography>
          <div style={styles.educatorsDiv}> 

          {Object.values(patients)
          .filter((patient) => {
            return patient?.patientId === patientProfile?.patientId;
          })[0]
          ?.educators.map((educator) => (
            <Button
            variant="contained"
            onClick={() => {goToEducator(educator.id)}}
            style={styles.educatorsButton}
            >
              <text >
                {educator.name}
              </text>
            </Button>
          ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderContent = () => {
    return (
      <div>
          <Card style={styles.patientName}>
            <div style={styles.text}>
              {patientName} :{lang.ar.name}
            </div>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              {renderCard(dateAffected, lang.ar.dateAffectedText)}
              {renderCard(dateBirth, lang.ar.dateBirthText)}
              {renderCard(diseaseType, lang.ar.diseaseText)}
              {renderCard(sex, lang.ar.sexText)}
            </div>
            <div>
              {renderCard(whoIsPatient, lang.ar.whoIsPatientText)}
              {renderCard(surgery, lang.ar.surgeryText)}
              {renderCard(otherDisease, lang.ar.otherDiseaseText)}
              {renderCard(outSideLink, lang.ar.outSideLinkText)}
            </div>
          </div>
      </div>
    );
  };
  return (
    <div style={styles.flex1}>
      {loading ? <Spinner animation="border" /> : ''}
      <div style={styles.root}>
        <div>{renderContent()}</div>

        <div style={styles.rightSideDiv}>
          <Card style={styles.chartWrapper}>{renderChart()}</Card>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              {renderCard(medicines, lang.ar.medicinesText)}
              {renderCard(diet, lang.ar.dietText)}
            </div>
            <div>

            {renderEducators()}
            {renderCard(hba1cs,lang.ar.Hba1CText)}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
