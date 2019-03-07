import React, { Component, Fragment } from "react";
import { postComment, fetchComment } from "../actions/commentActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileName: "",
      comment: "",
      itinerary_id: "",
      errorMessage: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchComment(this.props.itinerary_id);
    if (!this.props.loggedIn) {
      this.setState({
        errorMessage: "Please login to post comment!",
      });
    }
  }

  handleChange(e) {
    this.setState({
      profileName: this.props.user.profileName,
      comment: e.target.value,
      itinerary_id: this.props.itinerary_id,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { comment, profileName, itinerary_id } = this.state;
    this.props.fetchComment(this.props.itinerary_id);
    this.props.postComment(comment, profileName, itinerary_id);
  }

  render() {
    console.log(this.state.errorMessage);
    return (
      <Fragment>
        <div className="comment-errMsg">
          {!this.props.loggedIn && <div>{this.state.errorMessage}</div>}
        </div>
        <div className="commentBox">
          <form onClick={this.handleSubmit}>
            <label htmlFor="comment">
              Comments
              <textarea
                type="text"
                className="form-control"
                name="comment"
                value={this.state.comment}
                onChange={this.handleChange}
              />
            </label>

            <div className="post-comment-btn">
              <button type="submit">Post Comment</button>
            </div>
            <div className="commentList">
              {this.props.comment.map(result => {
                return (
                  <div key={result._id}>
                    <span>
                      {result.profileName}: {result.comment}
                    </span>
                  </div>
                );
              })}
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

CommentForm.propTypes = {
  postComment: PropTypes.func.isRequired,
  fetchComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
  loggedIn: state.userReducer.loggedIn,
  comment: state.commentReducer.comment,
});

export default connect(
  mapStateToProps,
  { postComment, fetchComment }
)(CommentForm);
