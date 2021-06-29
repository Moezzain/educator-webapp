import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSelector } from 'react-redux';
import { lightStyles, darkStyles } from '../styles/readMoreStyles';
const ReadMore = ({ currentNote, setNotes }) => {
  const { darkMode } = useSelector((state) => state.auth);
  const styles = !darkMode ? lightStyles : darkStyles;
  return (
    <div>
      <Button
        onClick={() => {
          setNotes();
        }}
      >
        <ArrowBackIcon />
      </Button>
      <div style={styles.titleText}>{currentNote.title}</div>
      <div style={styles.text}>{currentNote.text}</div>
    </div>
  );
};

export default ReadMore;
