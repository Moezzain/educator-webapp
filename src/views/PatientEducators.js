import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { mainTheme } from '../styles/themes';
import { setFetchedEducatorIdReducer } from '../redux/reducers/educatorsReducer';
import {styles} from '../styles/patientEducatorsStyles'
const PatientEducators = (props) => {
  const theme = mainTheme;

  const dispatch = useDispatch();

  const { patientProfile } = useSelector((state) => state.patient);
  const { patients } = useSelector((state) => state.educators);
  const goToEducator = (educatorId) => {
    dispatch(setFetchedEducatorIdReducer(educatorId));
  };
  return (
    <div
      style={styles.root}
    >
      <Card
        style={styles.card}
      >
        <text style={styles.title}>
          Educators
        </text>

        {Object.values(patients)
          .filter((patient) => {
            return patient?.patientId === patientProfile?.patientId;
          })[0]
          ?.educators.map((educator) => (
            <Button
              variant="contained"
              onClick={() => {goToEducator(educator.id)}}
              style={styles.button}
            >
              <text style={styles.educatorText}>
                {educator.name}
              </text>
            </Button>
          ))}
      </Card>
    </div>
  );
};

export default PatientEducators;
