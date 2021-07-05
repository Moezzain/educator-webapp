import React, { useEffect, useState } from 'react';
import logo from '../assets/logo-dark-notext.png';
import { useHistory } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from 'react-redux';
import {
  clearAllAuthAction,
  logoutAction,
} from '../redux/reducers/authReducer';
import { clearAllChatsAction } from '../redux/reducers/chatsReducer';
import {
  clearAllEducatorsAction,
  getEducatorsAndPatients,
  setFetchedEducatorIdReducer,
} from '../redux/reducers/educatorsReducer';
import { clearAllPatientAction } from '../redux/reducers/patientReducer';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { lightStyles, darkStyles } from '../styles/myNavStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import PanToolIcon from '@material-ui/icons/PanTool';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Typography } from '@material-ui/core';

const MyNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [localEducators, setLocalEducators] = useState([]);

  const { educators, loading, fetchedEducatorId } = useSelector(
    (state) => state.educators
  );
  const { educatorId, token, darkMode } = useSelector((state) => state.auth);

  const styles = !darkMode ? lightStyles : darkStyles;

  useEffect(() => {
    dispatch(getEducatorsAndPatients({ educatorId, token }));
  }, []);
  useEffect(() => {
    //sort educators first casehandlers then the rest
    if (educators) {
      setLocalEducators(
        Object.values(educators).sort((x, y) => {
          if (x?.isCaseHandler === y?.isCaseHandler) return 0;
          else {
            if (x?.isCaseHandler) return -1;
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
      setValue(placeValue + 2);
    }
  }, [fetchedEducatorId]);
  const logout = () => {
    dispatch(clearAllAuthAction());
    dispatch(clearAllEducatorsAction());
    dispatch(clearAllChatsAction());
    dispatch(clearAllPatientAction());
    dispatch(logoutAction({ educatorId, token }));
    history.replace('/');
  };

  const RenderEducator = (id) => {
    dispatch(setFetchedEducatorIdReducer(id));
  };
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    if (newValue > 1) setValue(newValue);
  };

  return (
    <div style={styles.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          style={styles.tabs}
        >
          <img
            alt=""
            src={logo}
            width="80"
            height="35"
            style={styles.navLogo}
          />
          <Tab label="Logout" style={styles.tab} onClick={() => logout()} />
          {Object.keys(localEducators).length
            ? Object.values(localEducators).map((educator) => {
                return (
                  <div
                    style={styles.customTabDiv}
                    onClick={() => RenderEducator(educator.id)}
                  >
                    <Typography style={styles.text}>
                      <div style={styles.icon}>
                        {educator?.isCaseHandler ? (
                          <PanToolIcon />
                        ) : (
                          <MenuBookIcon />
                        )}
                      </div>
                      {educator.name}
                    </Typography>
                  </div>
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
