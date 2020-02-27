import React from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import CardContainer from "../components/CardContainer";
import logo from "../assets/ithnain.png";
import { login } from "../API/apiAuth";
import { DataContext } from "../stateManagement/context";

class Login extends React.Component {
  static contextType = DataContext;

  state = {
    username: "",
    password: ""
  };

  handleChang = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = () => {
    const { saveData } = this.context;
    login(this.state)
      .then(res => {
        saveData(res.data.educatorId, res.data.appointments, res.data.chats);
        this.props.history.push("showpatients");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { username, password } = this.state;
    const { lang, userLang } = this.context;
    const { usernameText, enterUsernameText, passwordText, submitText } = lang[
      userLang
    ];
    return (
      <Container className="home-background" fluid>
        <Row>
          <Col sm={12} lg={4} className="container-center">
            <img src={logo} className="logo" />
          </Col>
          <Col sm={12} lg={6} className="container-center">
            <CardContainer width="80%" padding={30}>
              <Form className="flex-col">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>{usernameText}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={enterUsernameText}
                    value={username}
                    name={"username"}
                    onChange={e => this.handleChang(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>{passwordText}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={passwordText}
                    value={password}
                    name={"password"}
                    onChange={e => this.handleChang(e)}
                  />
                </Form.Group>
                <Button variant="secondary" onClick={this.onSubmit}>
                  {submitText}
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
