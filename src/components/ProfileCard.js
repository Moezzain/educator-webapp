import React from 'react'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {lightStyles, darkStyles} from '../styles/patientProfileStyles'
import { useSelector } from 'react-redux';
const ProfileCard = ({text, description, style}) => {
    const {darkMode} = useSelector((state) => state.auth)
    const styles = !darkMode? lightStyles : darkStyles
    return (
      <Card color style={style}>
        <CardContent>
          <Typography style={styles.text} variant="h5" component="h2">
            {description}
          </Typography>
          <Typography style={styles.textColor}>{text}</Typography>
        </CardContent>
      </Card>
    );
  };

export default ProfileCard