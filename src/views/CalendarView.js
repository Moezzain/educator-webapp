import React from 'react'
import { momentLocalizer, Calendar } from 'react-big-calendar';
import moment from 'moment';
import {darkStyles, lightStyles} from '../styles/showPatientsViewStyles'
import Card from '@material-ui/core/Card';
import convoStyles from 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const CalendarView = ({currentEducator, darkMode, goToPatient}) => {

    const styles = !darkMode ? lightStyles : darkStyles
    let appointments = [];
    if (currentEducator) {
      const educatorAppointments = currentEducator.appointments;
      educatorAppointments.forEach((appointment) => {
        appointments.push({
          appointmentId: appointment.appointmentId,
          date: new Date(appointment.date.split('T')[0]),
          name: appointment.name,
          time: appointment.time,
          patientId: appointment.patientId,
        });
      });
    }

    if (!appointments || (appointments && !Object.keys(appointments).length)) {
      return null;
    }
    let upComing = 0;
    const calendarAppointments = appointments.map((appointment) => {
      let date = new Date(appointment.date);
      if (date > Date.now()) upComing++;
      date.setHours(appointment.time.split(':')[0]);

      return {
        id: appointment.appointmentId,
        title: appointment.name,
        allDay: false,
        start: date,
        end: date,
        patinetId: appointment.patientId,
      };
    });

    return (
      <div style={styles.calendarCardDiv}>
        <Card elevation={5} style={styles.calendarCard}>
          <div style={styles.calendarDiv}>
            <div
              style={{
                alignSelf: 'start',
                marginLeft: 10,
                marginTop: 5,
                fontSize: 20,
              }}
            >
              Upcoming Appointments: {upComing}
            </div>
            <Calendar
              localizer={localizer}
              events={calendarAppointments}
              startAccessor="start"
              endAccessor="end"
              style={styles.calendar}
              onSelectEvent={(e) => {
                goToPatient(e?.patinetId);
              }}
            />
          </div>
        </Card>
      </div>
    );
  };

export default CalendarView