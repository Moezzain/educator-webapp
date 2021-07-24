import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { lightStyles, darkStyles } from '../styles/patientNotesStyles';

import '../App.css';
import ReadMore from '../components/ReadMore';

import {getPatientAction} from '../redux/reducers/patientReducer'

const PatientNotes = () => {
  const dispatch = useDispatch()

  const { patientProfile, patientId } = useSelector((state) => state.patient);
  const { darkMode, educatorId, token, admin } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState('notes');
  const [currentNote, setCurrentNote] = useState(null);
  const lang = {
    ar: {
      title: 'العنوان',
      text: 'المحتوى',
      date: 'التاريخ',
      summary: 'الملخص',
      goToPatient: 'اذهب للمريض',
      patientName: 'اسم المريض',
      learnMore: 'اقرا المزيد',
      notes:'الملاحظات'
    },
  };
  
  const styles = !darkMode ? lightStyles : darkStyles;
  useEffect(() => {
    if (admin) dispatch(getPatientAction({ adminId:educatorId, token, patientId }));
    else dispatch(getPatientAction({ educatorId, token, patientId }));
  },[patientId])
  const setReadMore = (note) => {
    setCurrentNote(note);
    setCurrentPage('readmore');
  };
  const setNotes = () => {
    setCurrentPage('notes');
  };
  const renderCard = () => {
    return patientProfile?.notes?.map((note) => (
      <div style={styles.cardDev}>
        <Card style={styles.root} variant="outlined">
          <CardContent style={styles.cardContent}>
            <Typography color={styles.color} variant="h5" component="h2">
              {note.title}
            </Typography>
            <Typography
              color={styles.color}
              style={styles.text}
              variant="body2"
              component="p"
            >
              {note.text}
            </Typography>
            <Typography color={styles.color} style={styles.date} gutterBottom>
              {note.createdOn.split('T')[0]}
            </Typography>
            <Typography
              style={styles.learnMore}
              color="textSecondary"
              gutterBottom
            >
              <Button
                size="small"
                style={styles.learnMoreButton}
                onClick={() => setReadMore(note)}
              >
                {lang.ar.learnMore}
              </Button>
            </Typography>
          </CardContent>
        </Card>
      </div>
    ));
  };
  return (
    <div style={styles.mainDev}>
      <div style={{ width: '100%',}}>
        <div style={{textAlign:'center',marginRight:50, fontSize:25}}>{lang.ar.notes}</div>
      </div>
      <div className="grid-container">
        {currentPage === 'notes' ? (
          renderCard()
        ) : (
          <ReadMore currentNote={currentNote} setNotes={setNotes} />
        )}
      </div>
    </div>
  );
};

export default PatientNotes;
