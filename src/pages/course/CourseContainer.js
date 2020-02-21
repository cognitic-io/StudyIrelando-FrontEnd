import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

import { getLoggedInUser } from "../../helpers/authUtils";
import Loader from "../../components/Loader";

import CourseService from "../../services/CourseService";
import CourseList from "./List/CourseList";

import SweetAlert from "react-bootstrap-sweetalert";

class CourseContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
      courses: [],
      modal: false,
      _id: "",
      name: "",
      category: "",
      price: "",
      hoursweek: "",
      duration: "",
      period: "",
      city: "",
      description: "",
      isFetching: false,
      error: null,
      successMsg: null
    };
    this.deleteThisGoal = this.deleteThisGoal.bind(this);
  }

  componentDidMount() {
    this.getCourses();
  }

  getCourses() {
    const { token } = this.state.user;
    CourseService.getCourses(token)
      .then(response => {
        this.setState({ courses: response });
      })
      .catch(error => this.setState({ error }));
  }

  //delete service type
  deleteThisGoal(id) {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Would you like to remove this course?"
        cancelBtnText="Cancel"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Are you sure that you want to remove this course?"
        onConfirm={this.deleteFile}
        onCancel={this.onCancelDelete}
      >
        {/* Você não  */}
      </SweetAlert>
    );

    this.setState({
      alert: getAlert(),
      id: id
    });
  }

  hideAlert = () => {
    // console.log("Hiding alert...");
    this.setState({
      alert: null
    });
  };

  deleteFile = () => {
    let { id } = this.state;
    const { token } = this.state.user;

    CourseService.deleteCourse(token, id)
      .then(res => {
        this.getCourses();
      })
      .catch(err => {
        this.getCourses();
        alert("Something wrong happen when we tried to remove this course.");
      });
    this.setState({
      alert: (
        <SweetAlert success title="Deleted" onConfirm={this.hideAlert}>
          Success to remove the course
        </SweetAlert>
      ),
      id: ""
    });
  };

  onCancelDelete = () => {
    this.setState({
      alert: (
        <SweetAlert danger title="Cancelled" onConfirm={this.hideAlert}>
          Course is still available
        </SweetAlert>
      )
    });
  };

  onConfirmModal(id) {
    this.deleteFile(id);
  }

  updateCourse = () => {
    const {
      _id,
      name,
      category,
      price,
      hoursweek,
      duration,
      period,
      city,
      description
    } = this.state;

    if (
      !name ||
      !category ||
      !price ||
      !hoursweek ||
      !duration ||
      !period ||
      !city ||
      !description
    )
      return false;

    const { token } = this.state.user;

    this.setState({
      isFetching: true,
      error: null,
      successMsg: null
    });

    let course = {
      _id,
      name,
      category,
      price,
      hoursweek,
      duration,
      period,
      city,
      description
    };

    CourseService.saveCourse(course, token)
      .then(response => {
        if (response !== 400) {
          this.getCourses();
          let message = "Course was successfully updated.";
          this.setState({ successMsg: message, isFetching: false });
        } else {
          this.getCourses();
          this.setState({
            error: "Error!",
            isFetching: false,
            successMsg: false
          });
        }
      })
      .catch(error => {
        this.getCourses();
        this.setState({
          error: error.message,
          isFetching: false,
          successMsg: false
        });
      });
  };

  toggle = value => {
    const {
      _id,
      name,
      category,
      price,
      hoursweek,
      duration,
      period,
      city,
      description
    } = value;
    this.setState({
      _id,
      name,
      category,
      price,
      hoursweek,
      duration,
      period,
      city,
      description
    });
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { courses, modal, isFetching, error, successMsg } = this.state;
    return (
      <>
        <div className="course">
          {/* {this.props.loading && <Loader />} */}
          <Row>
            <Col>
              <div className="page-title-box">
                <Row>
                  <Col lg={7}>
                    <h4 className="page-title">
                      Welcome, {this.state.user.username}
                    </h4>
                  </Col>
                  <Col lg={5} className="mt-lg-3 mt-md-0"></Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h3>Courses</h3>
                </CardBody>
                <Row className="course--list">
                  <CourseList
                    courses={courses}
                    deleteCourse={this.deleteThisGoal}
                    updateCourse={this.toggle}
                  />
                </Row>
              </Card>
            </Col>
          </Row>
          {this.state.alert}
          <Modal isOpen={modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Edit course</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={this.state.name || ""}
                    onChange={e =>
                      this.setState({
                        name: e.target.value
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="category">Category</Label>
                  <Input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Category"
                    value={this.state.category || ""}
                    onChange={e =>
                      this.setState({
                        category: e.target.value
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input
                    type="text"
                    name="price"
                    id="price"
                    placeholder="Price"
                    value={this.state.price || ""}
                    onChange={e =>
                      this.setState({
                        price: e.target.value
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="hoursweek">Hours week</Label>
                  <Input
                    type="text"
                    name="hoursweek"
                    id="hoursweek"
                    placeholder="hoursweek"
                    value={this.state.hoursweek || ""}
                    onChange={e =>
                      this.setState({
                        hoursweek: e.target.value
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="duration">Duration</Label>
                  <Input
                    type="text"
                    name="duration"
                    id="duration"
                    placeholder="duration"
                    value={this.state.duration || ""}
                    onChange={e =>
                      this.setState({
                        duration: e.target.value
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="period">Period</Label>
                  <Input
                    type="text"
                    name="period"
                    id="period"
                    placeholder="period"
                    value={this.state.period || ""}
                    onChange={e =>
                      this.setState({
                        period: e.target.value
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="city"
                    value={this.state.city || ""}
                    onChange={e =>
                      this.setState({
                        city: e.target.value
                      })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="description"
                    value={this.state.description || ""}
                    onChange={e =>
                      this.setState({
                        description: e.target.value
                      })
                    }
                  />
                </FormGroup>

                <div className="submit">
                  <Button onClick={this.updateCourse}>
                    {isFetching ? <Loader /> : "Submit"}
                  </Button>
                </div>

                {error && (
                  <div
                    className="alert alert-danger text-center"
                    style={{ marginTop: "50px" }}
                  >
                    <p style={{ margin: "0" }}>{error}</p>
                  </div>
                )}

                {successMsg && (
                  <div
                    className="alert alert-success text-center"
                    style={{ marginTop: "50px" }}
                  >
                    <p style={{ margin: "0" }}>{successMsg}</p>
                  </div>
                )}
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </>
    );
  }
}

export default connect()(CourseContainer);
