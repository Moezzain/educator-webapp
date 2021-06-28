import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { lightStyles, darkStyles } from '../styles/patientNotesStyles';

import '../App.css';
import ReadMore from '../components/ReadMore';

const PatientSummaries = () => {
  const { patientProfile } = useSelector((state) => state.patient);
  const { darkMode } = useSelector((state) => state.auth);

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
    },
  };
  const styles = !darkMode ? lightStyles : darkStyles;

  const renderReadMore = (note) => {
    setCurrentNote(note);
    setCurrentPage('readmore');
  };
  const renderNotes = () => {
    setCurrentPage('notes');
  };
  const renderCard = () => {
    return patientProfile?.summaries?.map((note) => (
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
                onClick={() => renderReadMore(note)}
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
      <div class="grid-container">
        {currentPage === 'notes'
          ? renderCard()
          : <ReadMore currentNote={currentNote}  setNotes={renderNotes}/>}
      </div>
    </div>
  );
};

export default PatientSummaries;
