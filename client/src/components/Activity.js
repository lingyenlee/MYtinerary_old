import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getActivity } from "../actions/activityActions";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CommentForm from "./CommentForm";

class Activity extends Component {
  componentDidMount() {
    const itinerary_id = this.props.id;
    this.props.getActivity(itinerary_id);
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };

    return (
      <div className="activity-container">
        <Slider {...settings}>
          {this.props.activities.map(result => {
            return (
              <Fragment key={result._id}>
                <div className="activity-images">
                  <img src={result.activityImage} alt="" />
                  <figcaption>{result.activityCaption}</figcaption>
                </div>
              </Fragment>
            );
          })}
        </Slider>
        <CommentForm itinerary_id={this.props.id} />
      </div>
    );
  }
}

Activity.propTypes = {
  getActivity: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  activities: state.activityReducer.activities,
});

export default connect(
  mapStateToProps,
  { getActivity }
)(Activity);
