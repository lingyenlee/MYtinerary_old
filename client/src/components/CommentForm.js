import React, { Component, Fragment } from "react";
import { postComment, fetchComment } from "../actions/commentActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      comment: "",
      itinerary_id: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchComment(this.props.itinerary_id);
  }

  handleChange(e) {
    const getUsername = localStorage.getItem("username");
    this.setState({
      username: getUsername,
      comment: e.target.value,
      itinerary_id: this.props.itinerary_id
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { comment, username, itinerary_id } = this.state;
    this.props.postComment(comment, username, itinerary_id);
    this.props.fetchComment(this.props.itinerary_id);
  }

  render() {
    return (
      <Fragment>
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
                      {result.username}: {result.comment}
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
  fetchComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  comment: state.commentReducer.comment
});

export default connect(
  mapStateToProps,
  { postComment, fetchComment }
)(CommentForm);
