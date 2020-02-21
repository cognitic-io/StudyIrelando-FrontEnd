import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  FormGroup,
  Button,
  Alert
} from "reactstrap";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback
} from "availity-reactstrap-validation";

import { loginUser } from "../../redux/actions";
import { isUserAuthenticated } from "../../helpers/authUtils";
import Loader from "../../components/Loader";
import logo from "../../assets/images/logo-light.png";

import UserService from "../../services/UserService";

class Login extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirm: "",
      login: true,
      register: false,
      successRegister: false,
      errorRegister: false
    };
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    document.body.classList.add("authentication-bg");
    document.body.classList.add("authentication-bg-pattern");
  }

  componentWillUnmount() {
    this._isMounted = false;

    document.body.classList.remove("authentication-bg");
    document.body.classList.remove("authentication-bg-pattern");
  }

  /**
   * Handles the submit
   */
  handleValidSubmit = (event, values) => {
    this.props.loginUser(values.username, values.password, this.props.history);
  };

  /**
   * Redirect to root
   */
  renderRedirectToRoot = () => {
    const isAuthTokenValid = isUserAuthenticated();
    if (isAuthTokenValid) {
      return <Redirect to="/" />;
    }
  };

  handleForm = () => {
    const { register, login } = this.state;
    this.setState({ register: !register, login: !login });
  };

  register = () => {
    this.setState({
      successRegister: false,
      errorRegister: false
    });

    const { username, email, password, confirm } = this.state;

    let user = {
      name: username,
      email,
      password,
      confirm
    };

    UserService.register(user)
      .then(response => {
        console.log("response", response);
        if (response === 400) {
          this.setState({
            successRegister: false,
            errorRegister: true
          });
        } else {
          this.setState({
            successRegister: true,
            errorRegister: false
          });
        }
      })
      .catch(err => {
        console.log("err", err);
        this.setState({
          successRegister: false,
          errorRegister: true
        });
      });
  };

  render() {
    const isAuthTokenValid = isUserAuthenticated();
    const { login, register, successRegister, errorRegister } = this.state;
    return (
      <React.Fragment>
        {this.renderRedirectToRoot()}

        {(this._isMounted || !isAuthTokenValid) && (
          <div className="account-pages mt-5 mb-5">
            <Container>
              <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                  <Card className="bg-pattern">
                    <CardBody className="p-4 position-relative">
                      {/* preloader */}
                      {this.props.loading && <Loader />}

                      <div className="text-center w-75 m-auto">
                        <a href="/">
                          <span>
                            <img src={logo} alt="" height="48" />
                          </span>
                        </a>
                        <p className="text-muted mb-4 mt-3">
                          Enter your username and password to access admin
                          panel.
                        </p>
                      </div>

                      {this.props.error && (
                        <Alert
                          color="danger"
                          isOpen={this.props.error ? true : false}
                        >
                          <div>{this.props.error}</div>
                        </Alert>
                      )}

                      {login && (
                        <AvForm onValidSubmit={this.handleValidSubmit}>
                          <AvField
                            name="username"
                            label="Username"
                            placeholder="Enter your username"
                            value={this.state.username}
                            required
                          />

                          <AvGroup className="mb-3">
                            <Label for="password">Password</Label>
                            <AvInput
                              type="password"
                              name="password"
                              id="password"
                              placeholder="Enter your password"
                              value={this.state.password}
                              required
                            />
                            <AvFeedback>This field is invalid</AvFeedback>
                          </AvGroup>

                          <FormGroup>
                            <Button color="primary" className="btn-block">
                              Log In
                            </Button>
                          </FormGroup>

                          <div className="text-center w-75 m-auto">
                            <p className="text-muted mb-4 mt-3">
                              or{" "}
                              <Button
                                onClick={() => this.handleForm("register")}
                              >
                                Register
                              </Button>
                            </p>
                          </div>
                        </AvForm>
                      )}

                      {register && (
                        <AvForm>
                          <AvField
                            name="username"
                            label="Username"
                            placeholder="Name of school"
                            value={this.state.username}
                            onChange={e =>
                              this.setState({ username: e.target.value })
                            }
                            required
                          />

                          <AvField
                            type="email"
                            name="email"
                            label="Email address"
                            placeholder="Enter your email"
                            onChange={e =>
                              this.setState({ email: e.target.value })
                            }
                            required
                          />

                          <AvGroup>
                            <Label for="password">Password</Label>
                            <AvInput
                              type="password"
                              name="password"
                              id="password"
                              placeholder="Enter your password"
                              onChange={e =>
                                this.setState({ password: e.target.value })
                              }
                              required
                            />
                            <AvFeedback>This field is invalid</AvFeedback>
                          </AvGroup>

                          <AvGroup>
                            <Label for="confirm">Confirm Password</Label>
                            <AvInput
                              type="password"
                              name="confirm"
                              id="confirm"
                              placeholder="Enter your password again"
                              onChange={e =>
                                this.setState({ confirm: e.target.value })
                              }
                              required
                            />
                            <AvFeedback>This field is invalid</AvFeedback>
                          </AvGroup>

                          <FormGroup>
                            <Button
                              color="primary"
                              className="btn-block"
                              onClick={() => this.register()}
                            >
                              Register
                            </Button>
                          </FormGroup>
                          {successRegister && (
                            <Alert color="success">
                              Success to register your account.
                            </Alert>
                          )}
                          {errorRegister && (
                            <Alert color="danger">
                              Success to register your account! See your e-mail
                              to confirmation.
                            </Alert>
                          )}

                          <div className="text-center w-75 m-auto">
                            <p className="text-muted mb-4 mt-3">
                              or{" "}
                              <Button
                                onClick={() => this.handleForm("register")}
                              >
                                Login
                              </Button>
                            </p>
                          </div>

                          <FormGroup>
                            <Button color="primary" className="btn-block">
                              Home
                            </Button>
                          </FormGroup>
                        </AvForm>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col className="col-12 text-center">
                  <p>
                    {/* <Link to="/forget-password" className="text-white-50 ml-1">
                      Forgot your password?
                    </Link> */}
                  </p>
                </Col>
              </Row>
            </Container>
          </div>
        )}

        <footer className="footer footer-alt">2020 &copy; Study Ireland</footer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { user, loading, error } = state.Auth;
  return { user, loading, error };
};

export default connect(mapStateToProps, { loginUser })(Login);
