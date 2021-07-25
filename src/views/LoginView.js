import React, { useState, useEffect } from 'react';
import logo from '../assets/bright-no-bg.png';
import { useSelector, useDispatch } from 'react-redux';
import { loginEducatorAction, setLoadingAction, loginAdminAction } from '../redux/reducers/authReducer';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import { ToggleButton } from '@material-ui/lab';
import { ToggleButtonGroup } from '@material-ui/lab';
import Container from '@material-ui/core/Container';
import { styles } from '../styles/loginViewStyles';
import Card from '@material-ui/core/Card';

const LoginView = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeRole, setActiveRole] = useState('educator');
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
  const onEducatorSubmit = async () => {
    dispatch(setLoadingAction(true));
    dispatch(loginEducatorAction({ username: username, password: password }));
  };
  const onAdminSubmit = async () => {
    dispatch(setLoadingAction(true));
    dispatch(loginAdminAction({ username: username, password: password }));
  };
  const renderLoginAdmin = () => {
    return (
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
        <Button variant="primary" style={styles.button} onClick={() => {onAdminSubmit()}}>
          {lang.ar.submit}
        </Button>
        {loading ? <LinearProgress /> : null}
        {error ? <text style={styles.error}>{error}</text> : ''}
      </form>
    );
  };
  const renderLoginEducator = () => {
    return (
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
        <Button variant="primary" style={styles.button} onClick={onEducatorSubmit}>
          {lang.ar.submit}
        </Button>
        {loading ? <LinearProgress /> : null}
        {error ? <text style={styles.error}>{error}</text> : ''}
      </form>
    );
  };
  return (
    <Container
      // fluid
      maxWidth={false}
      style={styles.container}
    >
      <div style={styles.root}>
        <img src={logo} style={styles.logo} />
        <div style={styles.formDiv}>
          <Card style={styles.card}>
            <ToggleButtonGroup
              style={{ width: '100%' }}
              value={activeRole}
              exclusive
              aria-label="text alignment"
            >
              <ToggleButton
                style={{ width: '50%', height: 50 }}
                value="educator"
                onClick={() => setActiveRole('educator')}
              >
                Educator
              </ToggleButton>
              <ToggleButton
                style={{ width: '50%', height: 50 }}
                value="admin"
                onClick={() => setActiveRole('admin')}
              >
                {' '}
                Admin
              </ToggleButton>
            </ToggleButtonGroup>
            {activeRole === 'admin'
              ? renderLoginAdmin()
              : renderLoginEducator()}
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default LoginView;
