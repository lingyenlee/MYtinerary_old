import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Activity from "../Activity";
import AddFavButton from "./AddFavButton";
import DelFavButton from "../FavouritePage/DelFavButton";

//This is reusable Itinerary component (used in ItineraryPage and FavouritePage )
//passed in itineraries as props from parent
//has child component - Activity
//has child component - AddFavButton and DelFavButton
//buttons are conditionally rendered

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent: "",
      isToggleOpen: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  //toggle "view" button to show activities of selected itinerary
  handleToggle(event) {
    event.preventDefault();
    if (!this.state.isToggleOpen) {
      this.setState({
        showComponent: event.target.id,
        isToggleOpen: true,
      });
    } else {
      this.setState({
        showComponent: "",
        isToggleOpen: false,
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="itinerary-container-wrapper">
          {this.props.itineraries.map(result => {
            return (
              <div className="itinerary-container" key={result._id}>
                <div className="itinerary-wrapper">
                  <div className="profile-figure">
                    <img
                      className="profileImage"
                      src={result.userimage}
                      alt="user"
                    />
                    <figcaption>{result.username}</figcaption>
                  </div>
                  <div className="itinerary-text-wrapper">
                    <div className="itinerary-text-outer">
                      <h5>{result.title}</h5>
                    </div>
                    <div className="itinerary-text-inner">
                      <p>Likes: {result.rating}</p>
                      <p>Duration: {result.duration}</p>
                      <p>Cost: {result.cost}</p>
                      <p>Hashtags: {result.hashtags}</p>
                    </div>
                  </div>
                  {/* ------- add fav and del fav buttons are rendered conditionally ----------- */}
                  {this.props.loggedIn && this.props.addButton && (
                    <AddFavButton id={result._id} />
                  )}

                  {this.props.loggedIn && this.props.delButton && (
                    <DelFavButton id={result._id} />
                  )}
                </div>
                {/* ---------START show child activity component ---------------  */}
                <div>
                  {this.state.showComponent === result._id && (
                    <Activity id={result._id} />
                  )}
                  <div className="view-toggle-btn">
                    <button id={result._id} onClick={this.handleToggle}>
                      {/* Text on Button is controlled by isToggleOpen state */}
                      {this.state.isToggleOpen ? "Close" : "View"}
                    </button>
                  </div>
                </div>
                {/* ---------END show child activity component ---------------  */}
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  // user: state.userReducer.user,
  loggedIn: state.userReducer.loggedIn,
});

export default connect(mapStateToProps)(Itinerary);
