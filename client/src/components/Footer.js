import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }
  handleBack() {
    this.props.history.goBack();
  }
  render() {
    const backButton = (
      <i className="large material-icons" onClick={this.handleBack}>
        arrow_back_ios
      </i>
    );
    return (
      <div>
        <Navbar fixed="bottom" variant="light" bg="light">
          <Grid item xs={5}>
            <div className="BackButton">{backButton}</div>
          </Grid>
          <Grid item xs={7}>
            <div className="FooterWrapper">
              <NavLink to="/">
                <img
                  src={require("../images/homeIcon.png")}
                  alt={"home icon"}
                />
              </NavLink>
            </div>
          </Grid>
        </Navbar>
      </div>
    );
  }
}
export default withRouter(Footer);
