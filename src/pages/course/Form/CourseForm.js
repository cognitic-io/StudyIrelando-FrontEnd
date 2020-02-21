import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import { getLoggedInUser } from "../../../helpers/authUtils";
import Loader from "../../../components/Loader";

class CategoryForm extends Component {
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
      description: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.name) {
      this.setState({ name: nextProps.name });
    }

    if (nextProps.category) {
      this.setState({ category: nextProps.category });
    }

    if (nextProps.price) {
      this.setState({ price: nextProps.price });
    }

    if (nextProps.hoursweek) {
      this.setState({ hoursweek: nextProps.hoursweek });
    }

    if (nextProps.duration) {
      this.setState({ duration: nextProps.duration });
    }

    if (nextProps.period) {
      this.setState({ period: nextProps.period });
    }

    if (nextProps.city) {
      this.setState({ city: nextProps.city });
    }

    if (nextProps.description) {
      this.setState({ description: nextProps.description });
    }
  }

  render() {
    const { isFetching } = this.props;
    return (
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={this.state.name}
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
            value={this.state.category}
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
            value={this.state.price}
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
            value={this.state.hoursweek}
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
            value={this.state.duration}
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
            value={this.state.period}
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
            value={this.state.city}
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
            value={this.state.description}
            onChange={e =>
              this.setState({
                description: e.target.value
              })
            }
          />
        </FormGroup>

        <div className="submit">
          <Button onClick={this.handleSubmit}>
            {isFetching ? <Loader /> : "Submit"}
          </Button>
        </div>

        {this.props.error && (
          <div
            className="alert alert-danger text-center"
            style={{ marginTop: "50px" }}
          >
            <p style={{ margin: "0" }}>{this.props.error}</p>
          </div>
        )}

        {this.props.successMsg && (
          <div
            className="alert alert-success text-center"
            style={{ marginTop: "50px" }}
          >
            <p style={{ margin: "0" }}>{this.props.successMsg}</p>
          </div>
        )}
      </Form>
    );
  }
}

export default connect()(CategoryForm);
