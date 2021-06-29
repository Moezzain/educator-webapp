import React, { useEffect, useState } from 'react';

import { concatProfile } from '../helpers';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setFetchedEducatorIdReducer } from '../redux/reducers/educatorsReducer';
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
import RenderCard from '../components/ProfileCard';
import PatientAppointments from '../components/PatientAppointments';

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

  const dispatch = useDispatch();

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
  const [localEducators, setLocalEducators] = useState([]);
  const [filteredEducators, setFilteredEducators] = useState([]);
  const { darkMode } = useSelector((state) => state.auth);
  const { patients, educators } = useSelector((state) => state.educators);
  const { patientProfile, loading } = useSelector((state) => state.patient);

  const styles = !darkMode ? lightStyles : darkStyles;

  useEffect(() => {
    try {
      if (patientProfile) {
        setDateAffected(patientProfile?.dateAffected);
        setDateBirth(patientProfile?.dateBirth);
        setWeights(patientProfile?.weights);
        setHeights(patientProfile?.height);
        setHba1cs(concatProfile(patientProfile, 'hba1cs'));

        setMedicines(concatProfile(patientProfile, 'medicines'));
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
    const patient = Object.values(patients).filter((patient) => {
      return patient?.patientId === patientProfile?.patientId;
    })[0];

    setPatientName(patient?.patientName);
    setLocalEducators(
      patient?.educators.map((educator) => ({
        id: educator.id,
        name: educator.name,
      }))
    );
  }, [patients, patientProfile]);
  useEffect(() => {
    const educatorsIds = [];
    localEducators.forEach((educator) => {
      educatorsIds.push(educator.id);
    });
    const filteredEducators = Object.values(educators).filter((educator) => {
      return educatorsIds.includes(educator.id);
    });
    setFilteredEducators(filteredEducators);
  }, [localEducators]);

  function createData(date, weight, height) {
    return { date, weight, height };
  }

  const data = [];

  const renderChart = (text) => {
    weights.forEach((weight) => {
      data.push(
        createData(weight.createdOn.split('T')[0], weight.weight, heights)
      );
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
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="height" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  };
  const goToEducator = (educatorId) => {
    dispatch(setFetchedEducatorIdReducer(educatorId));
  };
  const renderEducators = () => {
    return (
      <Card color style={styles.rightSideCard}>
        <CardContent>
          <Typography style={styles.text} variant="h5" component="h2">
            Educators
          </Typography>
          <div style={styles.educatorsDiv}>
            {localEducators?.map((educator) => (
              <Button
                variant="contained"
                onClick={() => {
                  goToEducator(educator.id);
                }}
                style={styles.educatorsButton}
              >
                <text>{educator.name}</text>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const {
    dateAffectedText,
    name,
    dateBirthText,
    dietText,
    diseaseText,
    medicinesText,
    otherDiseaseText,
    outSideLinkText,
    sexText,
    surgeryText,
    whoIsPatientText,
    Hba1CText,
  } = lang.ar;
  const renderContent = () => {
    return (
      <div style={{ flex: 1 }}>
        <Card style={styles.patientName}>
          <div style={styles.text}>
            {patientName} :{name}
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
          <div style={{ width: '50%', marginRight: 15 }}>
            <RenderCard
              text={dateAffected}
              description={dateAffectedText}
              style={styles.leftSideCard}
            />
            <RenderCard
              text={dateBirth}
              description={dateBirthText}
              style={styles.leftSideCard}
            />
            <RenderCard
              text={diseaseType}
              description={diseaseText}
              style={styles.leftSideCard}
            />
            <RenderCard
              text={sex}
              description={sexText}
              style={styles.leftSideCard}
            />
          </div>
          <div style={{ width: '50%', marginRight: 20 }}>
            <RenderCard
              text={whoIsPatient}
              description={whoIsPatientText}
              style={styles.leftSideCard}
            />

            <RenderCard
              text={surgery}
              description={surgeryText}
              style={styles.leftSideCard}
            />
            <RenderCard
              text={otherDisease}
              description={otherDiseaseText}
              style={styles.leftSideCard}
            />
            <Card color style={styles.leftSideCard}>
              <CardContent>
                <Typography style={styles.text} variant="h5" component="h2">
                  {outSideLinkText}
                </Typography>
                <a
                  href={outSideLink}
                  target="_blank"
                  style={styles.textColor}
                  rel="noreferrer"
                >
                  {outSideLink}
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div style={styles.flex1}>
      {loading ? <Spinner animation="border" /> : ''}
      <div style={styles.root}>
        <div style={styles.contentWrapper}>{renderContent()}</div>

        <div style={styles.rightSideDiv}>
          <div style={styles.chartDiv}>
            <Card style={styles.chartWrapper}>{renderChart()}</Card>
          </div>
          {/* {renderAppointments()} */}

          <div style={styles.rightBottomRightDiv}>
            <div style={styles.rightSideLeftColumn}>
              <RenderCard
                text={medicines}
                description={medicinesText}
                style={styles.rightSideCard}
              />
              <RenderCard
                text={diet}
                description={dietText}
                style={styles.rightSideCard}
              />
              <RenderCard
                text={hba1cs}
                description={Hba1CText}
                style={styles.rightSideCard}
              />
            </div>
            <div style={styles.rightSideRightColumn}>
              {renderEducators()}
              <PatientAppointments
                patientId={patientProfile.patientId}
                educators={filteredEducators}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
