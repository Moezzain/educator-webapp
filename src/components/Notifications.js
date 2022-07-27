import React, { useState } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
import {
  sendNotification,
  clearErrorsAction,
} from '../redux/reducers/NotificationsReducer';
//UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import styles from '../styles/refrralsStyles';

const Notification = ({ setActiveList }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [showMenu, setShowMenu] = React.useState(null);
  const [targetText, setTargetText] = useState('Select Targeted Patients');
  const [notificationTarget, setNotificationTarget] = useState(
    'Select Targeted Patients'
  );
  const { token, educatorId } = useSelector((state) => state.auth);

  const submit = () => {
    setBody('')
    setTitle('')
    if (title && body && educatorId && token) {
      dispatch(
        sendNotification({
          notificationTarget,
          text: title,
          body,
          adminId: educatorId,
          token,
        })
      );
    }
  };

  const handleClick = (event) => {
    setShowMenu(event.currentTarget);
  };

  const handleClose = () => {
    setShowMenu(null);
  };

  const onSelectTarget = (text, target) => {
    setTargetText(text);
    setNotificationTarget(target);
  };
  const renderActionSelect = () => {
    return (
      <div>
        <Button
          style={styles.menuButton}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {targetText}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={showMenu}
          keepMounted
          open={Boolean(showMenu)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => onSelectTarget('All Patients', 'allPatients')}
          >
            All Patients
          </MenuItem>
        </Menu>
      </div>
    );
  };

  return (
    <div style={{ flex: 1, display: 'flex' }}>
      <IconButton
        style={{ ...styles.iconsButton, left: 0 }}
        aria-label="notes"
        onClick={() => {
          setActiveList('');
          dispatch(clearErrorsAction());
        }}
      >
        <CloseIcon style={styles.closeIcon} fontSize="large" />
      </IconButton>
      <div
        style={{
          flex: 1,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
        >
        {renderActionSelect()}
        <TextField
          style={{ width: 300, marginBottom: 20 }}
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          variant="outlined"
        />
        <TextField
          style={{ width: 300, marginBottom: 20 }}
          onChange={(e) => setBody(e.target.value)}
          label="Body"
          variant="outlined"
        />
        <Button
          style={{
            justifyContent: 'center',
            width: '50%',
            marginTop: '10%',
            border: '1px solid gray',
          }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={submit}
        >
          Send Notification
        </Button>
      </div>
    </div>
  );
};
export default Notification;
