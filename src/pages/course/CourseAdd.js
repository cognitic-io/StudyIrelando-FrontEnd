import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody } from "reactstrap";

import { getLoggedInUser } from "../../helpers/authUtils";
import Loader from "../../components/Loader";
import CourseForm from "./Form/CourseForm";

import CourseService from "../../services/CourseService";

class CategoryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(value) {
    const {
      name,
      category,
      price,
      hoursweek,
      duration,
      period,
      city,
      description
    } = value;

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
          let message = "Course was successfully inserted.";
          this.setState({ successMsg: message, isFetching: false });
        } else {
          this.setState({
            error: "Error!",
            isFetching: false,
            successMsg: false
          });
        }
      })
      .catch(error => {
        this.setState({
          error: error.message,
          isFetching: false,
          successMsg: false
        });
      });
  }

  render() {
    return (
      <>
        <div className="course">
          {this.props.loading && <Loader />}
          <Row>
            <Col>
              <div className="page-title-box">
                <Row>
                  <Col lg={7}>
                    <h4 className="page-title">Create course</h4>
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
                  <Row>
                    <Col lg={3} />
                    <Col lg={6}>
                      <CourseForm
                        handleSubmit={this.handleSubmit}
                        error={this.state.error}
                        successMsg={this.state.successMsg}
                        isFetching={this.state.isFetching}
                      />
                    </Col>
                    <Col lg={3} />
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default connect()(CategoryAdd);
