import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import logo from "../assets/images/logo-light.png";
import profilePic from "../assets/images/users/user-1.jpg";

const ProfileMenus = [
  {
    label: "Logout",
    icon: "fe-log-out",
    redirectTo: "/logout",
    hasDivider: true
  }
];

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="navbar-custom">
          <ul className="list-unstyled topnav-menu float-right mb-0">
            <li>
              <ProfileDropdown
                profilePic={profilePic}
                menuItems={ProfileMenus}
                username={"Admin"}
              />
            </li>
          </ul>

          <div className="logo-box">
            <Link to="/" className="logo text-center">
              <span className="logo-lg">
                <img src={logo} alt="" height="48" />
              </span>
              <span className="logo-sm">
                <img src={logo} alt="" height="48" />
              </span>
            </Link>
          </div>

          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button
                className="button-menu-mobile waves-effect waves-light"
                onClick={this.props.menuToggle}
              >
                <i className="fe-menu"></i>
              </button>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default connect()(Topbar);
