import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, ListGroup, ListGroupItem, Button, Row } from "reactstrap";

import { getLoggedInUser } from "../../../helpers/authUtils";

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser()
    };
  }

  render() {
    const { courses } = this.props;
    return (
      <>
        <Col lg={12}>
          <ListGroup>
            {courses &&
              courses.map((c, index) => {
                return (
                  <ListGroupItem key={index}>
                    <Row>
                      <Col lg={6} md={6} sm={12} className="course--info">
                        <Col lg={8} md={6} sm={12}>
                          <label>Name: </label>
                          {c.name}
                        </Col>

                        <Col lg={8} md={6} sm={12}>
                          <label>Category:</label>
                          {c.category}
                        </Col>
                      </Col>

                      <Col lg={6} md={6} sm={12}>
                        <Col lg={12} md={12} sm={12}>
                          <Button
                            color="danger"
                            onClick={() => this.props.deleteCourse(c._id)}
                          >
                            Remove
                          </Button>
                          <Button
                            color="primary"
                            onClick={() => this.props.updateCourse(c)}
                            data-toggle="modal"
                            data-target={`#myModal`}
                          >
                            Edit
                          </Button>
                        </Col>
                      </Col>
                    </Row>
                  </ListGroupItem>
                );
              })}
          </ListGroup>
        </Col>
      </>
    );
  }
}

export default connect()(CourseList);
