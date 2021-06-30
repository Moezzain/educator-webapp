import React from 'react';
import { darkStyles, lightStyles } from '../styles/chatStyles';
import { useSelector } from 'react-redux';

const CustomSeparator = ({ date, darkMode }) => {
  const Styles = !darkMode ? lightStyles : darkStyles;
  const d = new Date(date);
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return (
    <div style={Styles.separatorDiv}>
      <div style={Styles.leftLine} />
      <div style={Styles.date}>
        {date}, {days[d.getDay()]}
      </div>
      <div style={Styles.rightLine} />
    </div>
  );
};

export default CustomSeparator;
