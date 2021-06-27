import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Container, Spinner } from 'react-bootstrap';
import CardContainer from '../components/CardContainer';
import logo from '../assets/ithnain.png';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, setLoadingAction, clearAllAuthAction } from '../redux/reducers/authReducer';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { educatorId, token, loading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (token && educatorId) {
      history.push('showpatients');
    }
  }, [educatorId, history, token]);
  useEffect(() => {
    dispatch(clearAllAuthAction())
  }, [])
  const onSubmit = async () => {
    console.log('username', username, 'password', password);

    dispatch(setLoadingAction(true));
    dispatch(loginAction({ username: username, password: password }));
  };
  return (
    <Container
      fluid
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0a122a',
      }}
    >
      <Row>
        <Col
          sm={12}
          lg={4}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={logo} style={{ width: '50%', marginBottom: '4%' }} />
        </Col>
        <Col
          sm={12}
          lg={6}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardContainer width="80%" padding={30}>
            <Form style={{ display: 'flex', flexDirection: 'column' }}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  name={'username'}
                  onChange={(e) => {
                    e.persist()
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  name={'password'}
                  onChange={(e) => {
                    e.persist();
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              {loading ? (
                <Spinner
                  style={{ alignSelf: 'center', marginBottom: 10 }}
                  animation="border"
                />
              ) : null}
              <Button variant="primary" onClick={onSubmit}>
                Submit
              </Button>
              {
                error ?
              <Form.Label style={{color:'red'}}>The Username or Password is incorrect</Form.Label>
              : ''
              }
            </Form>
          </CardContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
