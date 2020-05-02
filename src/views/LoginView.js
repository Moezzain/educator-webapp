import React from "react";
import { Button, Form, Row, Col, Container, Spinner } from "react-bootstrap";
import CardContainer from "../components/CardContainer";
import logo from "../assets/ithnain.png";
import { login } from '../API/apiAuth'
import { DataContext } from '../stateManagement/context'

class Login extends React.Component {

  static contextType = DataContext;


  state = {
    username: "",
    password: "",
    loading: false,
  }

  handleChang = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = () => {    
    this.setState({ loading: true })
    login(this.state)
      .then(res => {
        this.setState({ loading: false })
        this.context.saveData(res.data.educatorId, res.data.appointments, res.data.chats)
        this.props.history.push("showpatients")
      })
      .catch(err => {
        console.log(err)
        this.setState({ loading: false })
      })
  }


  render() {
    const { username, password, loading} = this.state;
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
                    onChange={(e) => this.handleChang(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    name={"password"}
                    onChange={(e) => this.handleChang(e)}
                  />
                </Form.Group>
                {loading? <Spinner style={{alignSelf:'center', marginBottom: 10}} animation="border" /> : null}
                <Button variant="primary" onClick={this.onSubmit}>
                  Submit
                </Button>
              </Form>
            </CardContainer>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
