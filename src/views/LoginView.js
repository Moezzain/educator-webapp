import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container, Spinner } from "react-bootstrap";
import CardContainer from "../components/CardContainer";
import logo from "../assets/ithnain.png";
import { DataContext } from '../stateManagement/context'
import { useSelector, useDispatch } from "react-redux";
import {loginAction, setLoadingAction} from '../redux/reducers/authReducer'
import {getEducatorsAndPatients} from '../redux/reducers/educatorsReducer'
import { useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [username, setUsername] = useState('Tld')
  const [password, setPassword] = useState(' ')

  const {educatorId, token, loading} = useSelector((state) => state.auth)
  useEffect(() => {
    if(token && educatorId) {
      
      history.push("showpatients")

    }
  }, [educatorId, history, token])
  

  const onSubmit = async() => {    
    dispatch(setLoadingAction(true))
    dispatch(loginAction({username:'Tld',password:' '}))

  }
  return (
          <Container
            fluid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#0a122a"
            }}
          >
            <Row>
              <Col
                sm={12}
                lg={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <img src={logo} style={{ width: "50%", marginBottom: "4%" }} />
              </Col>
              <Col
                sm={12}
                lg={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <CardContainer width="80%" padding={30}>
                  <Form style={{ display: "flex", flexDirection: "column" }}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        name={"username"}
                        onChange={(e) => setUsername(e.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        name={"password"}
                        onChange={(e) => setPassword(e.value)}

                      />
                    </Form.Group>
                    {loading? <Spinner style={{alignSelf:'center', marginBottom: 10}} animation="border" /> : null}
                    <Button variant="primary" onClick={onSubmit}>
                      Submit
                    </Button>
                  </Form>
                </CardContainer>
              </Col>
            </Row>
          </Container>
        );
}

export default Login;
