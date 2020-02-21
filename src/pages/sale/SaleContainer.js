import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody } from "reactstrap";

import { getLoggedInUser } from "../../helpers/authUtils";

import SaleService from "../../services/SaleService";
import SaleList from "./List/SaleList";

class SaleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: getLoggedInUser(),
      sales: [],
      modal: false,
      isFetching: false,
      error: null,
      successMsg: null
    };
  }

  componentDidMount() {
    this.getSales();
  }

  getSales() {
    const { token } = this.state.user;
    SaleService.getSales(token)
      .then(response => {
        this.setState({ sales: response });
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    const { sales } = this.state;
    return (
      <>
        <div className="sale">
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
                  <h3>Sales</h3>
                </CardBody>
                <Row className="course--list">
                  <SaleList sales={sales} />
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default connect()(SaleContainer);
