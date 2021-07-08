import React, { useState, useEffect } from 'react';
import logo from '../assets/bright-no-bg.png';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginAction,
  setLoadingAction,
} from '../redux/reducers/authReducer';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {styles} from '../styles/loginViewStyles'
import Card from '@material-ui/core/Card';

const LoginView = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lang, setLang] = useState({
    ar: {
      username: 'اسم المستخدم',
      password: 'الرقم السري',
      submit: 'دخول',
    },
  });

  const { educatorId, token, loading, error } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (token && educatorId) {
      history.push('showpatients');
    }
  }, [educatorId, history, token]);
  const onSubmit = async () => {
    dispatch(setLoadingAction(true));
    dispatch(loginAction({ username: username, password: password }));
  };
  return (
    <Container
      // fluid
      maxWidth={false}
      style={styles.container}
    >
      <div style={styles.root}>
        <img src={logo} style={styles.logo} />
        <div
          style={styles.formDiv}
        >
          <Card style={styles.card}>
            <form style={styles.form}>
              <TextField
                type="username"
                required
                id="outlined-required"
                label={lang.ar.username}
                variant="outlined"
                value={username}
                onChange={(e) => {
                  e.persist();
                  setUsername(e.target.value);
                }}
                style={styles.username}
              />
              <TextField
                type="password"
                required
                id="outlined-required"
                label={lang.ar.password}
                variant="outlined"
                value={password}
                onChange={(e) => {
                  e.persist();
                  setPassword(e.target.value);
                }}
                style={styles.password}
              />
              <Button
                variant="primary"
                style={styles.button}
                onClick={onSubmit}
              >
                {lang.ar.submit}
              </Button>
              {loading ? <LinearProgress /> : null}
              {error ? <text style={styles.error}>{error}</text> : ''}
            </form>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default LoginView;
