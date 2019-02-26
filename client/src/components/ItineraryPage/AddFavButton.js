import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addFavItinerary } from "../../actions/favouriteActions";

// This component is in the ItineraryPage component
class AddFavButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      favItinerary: [],
      email: "",
      favButtonDisable: false,
    };
    this.addToFav = this.addToFav.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  //when component mounts,only itineraries not added to favourites
  //have active "addFav" button
  componentDidMount() {
    if (
      this.props.loggedIn &&
      this.props.googleuser.favItinerary.includes(this.props.id)
    ) {
      this.setState({
        favButtonDisable: true,
      });
    }
  }

  // Pass itinerary_id and email to backend to save
  addToFav(id) {
    if (this.props.loggedIn) {
      this.setState(
        {
          show: true,
          favItinerary: id,
          email: this.props.googleuser.email,
          favButtonDisable: true,
        },
        () =>
          this.props.addFavItinerary(this.state.favItinerary, this.state.email)
      );
    } else {
      this.setState({
        show: true,
        favItinerary: "",
      });
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <Button
          variant="primary"
          onClick={() => {
            this.addToFav(this.props.id);
          }}
          disabled={this.state.favButtonDisable}
        >
          <i className="material-icons"> favorite </i>
        </Button>
        {/* --------------conditional rendering of modal message 
        if login, favourite added, if not login, ask user to login ------------ */}
        {this.props.loggedIn ? (
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>MYtinerary added to your Favorites</Modal.Title>
            </Modal.Header>
            <Link to={`/favourites`}>
              <Modal.Body>Go to Favorites page</Modal.Body>
            </Link>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          // goto login if user not login
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                Please log in to add favourite itinerary!
              </Modal.Title>
            </Modal.Header>
            <Link to={`/LoginPage`}>
              <Modal.Body>Go to Login</Modal.Body>
            </Link>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    );
  }
}

AddFavButton.propTypes = {
  addFavItinerary: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.userReducer.loggedIn,
  googleuser: state.userReducer.googleuser,
});

export default connect(
  mapStateToProps,
  { addFavItinerary }
)(AddFavButton);
