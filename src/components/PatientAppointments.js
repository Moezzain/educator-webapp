import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { darkStyles, lightStyles } from '../styles/patientAppointmentsStyles';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { setFetchedEducatorIdReducer } from '../redux/reducers/educatorsReducer';
import { getAppointmentsAction } from '../redux/reducers/patientReducer';
import { getAppointmentsEducators } from '../helpers';
const RenderAppointments = ({ patientId, educators, darkMode }) => {
  const dispatch = useDispatch();
  const [localAppointments, setLocalAppointments] = useState([]);
  const { token, educatorId } = useSelector((state) => state.auth);
  const { appointments } = useSelector((state) => state.patient);
  useEffect(() => {
    dispatch(getAppointmentsAction({ educatorId, token, patientId }));
  }, [educators, patientId]);
  useEffect(() => {
    if (appointments)
      setLocalAppointments(getAppointmentsEducators(educators, appointments));
  }, [appointments]);
  const goToEducator = (educatorId) => {
    dispatch(setFetchedEducatorIdReducer(educatorId));
  };
  const styles = !darkMode ? lightStyles : darkStyles;
  return (
    <div style={styles.root}>
      <Card style={styles.card}>
        <Typography style={styles.text} variant="h5" component="h2">
          Appointments
        </Typography>
        <div style={styles.listDiv}>
          {localAppointments?.map((appointment) => {
            return (
              <Button
                variant="contained"
                onClick={() => goToEducator(appointment.educatorId)}
                style={styles.button}
              >
                <text>
                  {appointment.date.split('T')[0]} {appointment.name}
                </text>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default RenderAppointments;
