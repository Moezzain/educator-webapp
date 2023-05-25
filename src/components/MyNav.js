import React, { useEffect, useState } from 'react';
import logo from '../assets/logo-dark-notext.png';
import { useHistory } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from 'react-redux';
import {
  clearAllAuthAction,
  logoutAction,
  resetPasswordAction,
  setResetErrorAction
} from '../redux/reducers/authReducer';
import { clearAllChatsAction } from '../redux/reducers/chatsReducer';
import {
  clearAllEducatorsAction,
  getEducatorsAndPatients,
  setFetchedEducatorIdReducer,
  getAllEducators,
} from '../redux/reducers/educatorsReducer';
import { clearAllPatientAction } from '../redux/reducers/patientReducer';

import PopUpProfile from './PopUpProfile';

import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import { lightStyles, darkStyles } from '../styles/myNavStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PersonIcon from '@material-ui/icons/Person';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ReceiptIcon from '@material-ui/icons/Receipt';

import app from '../App.css';

const MyNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [localEducators, setLocalEducators] = useState([]);
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordVerify, setNewPasswordVerify] = useState('');
  const [value, setValue] = useState(2);
  const { educators, loading, fetchedEducatorId } = useSelector(
    (state) => state.educators
  );
  const { educatorId, token, darkMode, admin, resetError } = useSelector(
    (state) => state.auth
  );

  const styles = !darkMode ? lightStyles : darkStyles;
    
  useEffect(() => {
    if (admin) {
      dispatch(getAllEducators({ adminId: educatorId, token }));
    } else {
      dispatch(getEducatorsAndPatients({ educatorId, token }));
    }
  }, []);
  useEffect(() => {
    //sort educators first casehandlers then the rest
    if (educators) {
      setLocalEducators(
        Object.values(educators).sort((first, second) => {
          if (first?.isCaseHandler === second?.isCaseHandler) return 0;
          else {
            if (first?.isCaseHandler) return -1;
            else return 1;
          }
        })
      );
    }
  }, [educators]);

  useEffect(() => {
    let placeValue = 0;
    if (localEducators) {
      Object.values(localEducators).forEach((educator, index) => {
        if (educator?.id === fetchedEducatorId) placeValue = index;
      });
      if(admin) 
      setValue(placeValue + 3);
      else
      setValue(placeValue + 2);

    }
  }, [fetchedEducatorId]);
  const logout = () => {
    dispatch(clearAllAuthAction());
    dispatch(clearAllEducatorsAction());
    dispatch(clearAllChatsAction());
    dispatch(clearAllPatientAction());
    if (admin) dispatch(logoutAction({ adminId: educatorId, token }));
    else dispatch(logoutAction({ educatorId, token }));
    history.replace('/');
  };

  const RenderEducator = (id) => {
    dispatch(setFetchedEducatorIdReducer(id));
  };
  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleResetSubmit = () => {
    if (newPassword === newPasswordVerify)
      dispatch(
        resetPasswordAction({
          adminId: educatorId,
          token,
          oldPassword,
          newPassword,
        })
      );
      else 
      dispatch(setResetErrorAction('Passwords don\'t match'))
  };
  return (
    <div style={styles.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}   
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          style={styles.tabs}
        >
          <img
            alt=""
            src={logo}
            width="110"
            height="35"
            style={styles.navLogo}
            onClick={() => history.push('showpatients')}
          />
          {admin ? 
          <>

            <Button onClick={() => history.push('invoices')}>
              <ReceiptIcon />
            </Button>
            <Button onClick={handleClickOpen}>
              <PermIdentityIcon />
            </Button>
            <PopUpProfile
              open={open}
              setOpen={setOpen}
              setOldPassword={setOldPassword}
              setNewPassword={setNewPassword}
              setNewPasswordVerify={setNewPasswordVerify}
              handleResetSubmit={handleResetSubmit}
              error={resetError}
            /> 
          </>
          : null
          }
          <Button style={styles.logout}>
            <ExitToAppIcon className="logout" onClick={() => logout()} />
          </Button>
          {Object.keys(localEducators).length
            ? Object.values(localEducators).map((educator) => {
                return (
                  <Button
                    style={styles.customTabDiv}
                    onClick={() => RenderEducator(educator.id)}
                  >
                    <div style={styles.tabDiv}>
                      <Typography style={styles.text}>
                        <div style={styles.icon}>
                          {educator?.isCaseHandler ? (
                            <AssignmentIndIcon />
                          ) : (
                            <PersonIcon />
                          )}
                        </div>
                        {educator.name}
                      </Typography>
                      <text>{educator?.specialty}</text>
                    </div>
                  </Button>
                );
              })
            : ''}
        </Tabs>
        {loading ? <LinearProgress /> : null}
      </AppBar>
    </div>
  );
};
export default MyNav;
