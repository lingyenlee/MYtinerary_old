import React, { Component, Fragment } from "react";
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
      favButtonActive: true,
    };
    this.addToFav = this.addToFav.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  //when component mounts,only itineraries not added to favourites
  //have active "addFav" button
  // componentDidMount() {
  //   if (
  //     this.props.loggedIn &&
  //     this.props.user.favItinerary.includes(this.props.id)
  //   ) {
  //     this.setState({
  //       favButtonActive: false,
  //     });
  //   } else {
  //     this.setState({
  //       favButtonActive: true,
  //     });
  //   }
  // }

  componentDidMount() {
    if (this.props.user.favItinerary.includes(this.props.id)) {
      this.setState({
        favButtonActive: false,
      });
    } else {
      this.setState({
        favButtonActive: true,
      });
    }
  }

  // Pass itinerary_id and email to backend to save
  addToFav(id) {
    this.setState(
      {
        show: true,
        favItinerary: id,
        favButtonActive: false,
      },
      () =>
        this.props.addFavItinerary(
          this.state.favItinerary,
          this.props.user.email
        )
    );
  }
  // else {
  //   this.setState({
  //     show: true,
  //     favItinerary: "",
  //     favButtonActive: true,
  //   });
  // }

  handleClose() {
    this.setState({ show: false });
  }

  activeFavButton() {
    return (
      <Fragment>
        <button
          // variant="light"
          onClick={() => {
            this.addToFav(this.props.id);
          }}
          // disabled={!this.state.favButtonActive}
        >
          <i className="material-icons favActive"> favorite_border </i>
          <p>Add Me!</p>
        </button>
      </Fragment>
    );
  }

  inactiveFavButton() {
    return (
      <Fragment>
        <div>
          <i className="material-icons favInactive"> favorite </i>
          <p>Added!</p>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <div>
          {this.state.favButtonActive
            ? this.activeFavButton()
            : this.inactiveFavButton()}

          {/* --------------conditional rendering of modal message 
        if login, favourite added, if not login, ask user to login ------------ */}

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
        </div>
      </Fragment>
    );
  }
}

AddFavButton.propTypes = {
  addFavItinerary: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.userReducer.loggedIn,
  user: state.userReducer.user,
});

export default connect(
  mapStateToProps,
  { addFavItinerary }
)(AddFavButton);
