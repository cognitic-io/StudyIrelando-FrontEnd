import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";

import { getLoggedInUser } from "../../../helpers/authUtils";

class SaleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser()
    };
  }

  render() {
    const { sales } = this.props;

    return (
      <>
        <Col lg={12}>
          <ListGroup>
            {sales &&
              sales.map((c, index) => {
                let date = new Date(c.dateCreated).toLocaleDateString("pt-BR");
                return (
                  <ListGroupItem key={index}>
                    <Row>
                      <Col lg={6} md={6} sm={12} className="sale--info">
                        <Col lg={8} md={6} sm={12}>
                          <label>Name: </label>
                          {c.userId.name}
                        </Col>

                        <Col lg={8} md={6} sm={12}>
                          <label>Course:</label>
                          {c.courseId.name}
                        </Col>

                        <Col lg={8} md={6} sm={12}>
                          <label>Price:</label>
                          {c.totalPrice}
                        </Col>
                        <Col lg={8} md={6} sm={12}>
                          <label>Date:</label>
                          {date}
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

export default connect()(SaleList);
