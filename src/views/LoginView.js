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

  componentDidMount() {
    try {
      this.context.getLocalData();
      if(this.context.token) {
        this.props.history.push("showpatients")
      }
    } catch (err) {
      console.log('context not loaded');
    }
    
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = () => {    
    this.setState({ loading: true })
    login(this.state)
      .then(res => {
        const educator = JSON.parse(res.data.educator)
        const tokens = educator.token;
        const token= tokens[tokens.length -1];
        const {educatorId, appointments, chats} = res.data;
        this.setState({ loading: false })
        this.context.saveToken(token);
        this.context.saveData(educatorId, appointments, chats)
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
                    onChange={(e) => this.handleChange(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    name={"password"}
                    onChange={(e) => this.handleChange(e)}
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
