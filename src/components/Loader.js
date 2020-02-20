import React, { Component } from "react";

/**
 * Renders the preloader
 */
class PreLoaderWidget extends Component {
  render() {
    return (
      <div className="preloader">
        <div className="status">
          <div
            className="spinner-border avatar-sm text-default"
            style={{ height: "20px", width: "20px", color: "#ededed" }}
            role="status"
          ></div>
        </div>
      </div>
    );
  }
}

export default PreLoaderWidget;
