import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { delFavItinerary } from "../../actions/favouriteActions";

class DelFavButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favItinerary: [],
      email: "",
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.delFav = this.delFav.bind(this);
    this.state = {
      show: false,
    };
  }

  delFav(id) {
    this.setState(
      {
        show: false,
        favItinerary: id,
      },
      () =>
        this.props.delFavItinerary(
          this.state.favItinerary,
          this.props.user.email
        )
    );
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
          <i className="material-icons"> favorite </i>
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            Are you sure you want to delete this MYtinerary from your
            favourites?
          </Modal.Body>
          <div className="delFav-modal-footer">
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  this.delFav(this.props.id);
                }}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    );
  }
}

DelFavButton.propTypes = {
  delFavItinerary: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.userReducer.loggedIn,
  user: state.userReducer.user,
});

export default connect(
  mapStateToProps,
  { delFavItinerary }
)(DelFavButton);
