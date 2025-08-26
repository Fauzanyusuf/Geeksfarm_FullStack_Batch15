import React, { Component } from "react";

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
    };
    this.handleAddLikes = this.handleAddLikes.bind(this);
  }

  handleAddLikes() {
    this.setState((prevState) => ({
      likes: prevState.likes + 1,
    }));
  }

  render() {
    const { avatar, fullName, date, comment } = this.props;
    const { likes } = this.state;

    return (
      <div className="comment">
        <a className="avatar">
          <img src={avatar} />
        </a>
        <div className="content">
          <a className="author">{fullName}</a>
          <div className="metadata">
            <span className="date">{date}</span>
            <span>|</span>
            <span className="likes" style={{ color: "#0f0f0f" }}>
              Liked: {likes}
            </span>
          </div>
          <div className="text">{comment}</div>
          <div className="likeButton">
            <button onClick={this.handleAddLikes}>Click Me</button>
          </div>
        </div>
      </div>
    );
  }
}
