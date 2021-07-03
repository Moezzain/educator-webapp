import React from 'react'
import {lightStyles, darkStyles} from '../styles/patientProfileStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import {setFetchedEducatorIdReducer} from '../redux/reducers/educatorsReducer'
const PatientEducators = ({localEducators, darkMode}) => {
    const dispatch = useDispatch()

    const styles = !darkMode ? lightStyles : darkStyles

    const goToEducator = (educatorId) => {
        dispatch(setFetchedEducatorIdReducer(educatorId));
      };
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
export default PatientEducators