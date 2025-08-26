import { Component } from "react";
import Comment from "./components/Comment";
import { faker } from "@faker-js/faker";

function formatDate(date) {
  const now = new Date();
  const d = new Date(date);

  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear();

  if (isToday) {
    return `Today, ${d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else if (isYesterday) {
    return `Yesterday, ${d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else {
    return d.toLocaleDateString([], { day: "numeric", month: "short" });
  }
}

// export default function App() {
//   const dates = Array.from({ length: 10 }, () => faker.date.recent(14));

//   dates.sort((a, b) => b - a);

//   const comments = dates.map((date) => ({
//     fullName: faker.person.fullName(),
//     avatar: faker.image.avatar(),
//     date: date,
//     comment: faker.word.words({ count: { min: 10, max: 40 } }),

//   }));

//   return (
//     <>
//       <div className="container">
//         <div className="ui comments">
//           {comments.map((comment, i) => (
//             <Comment
//               key={i}
//               avatar={comment.avatar}
//               fullName={comment.fullName}
//               comment={comment.comment}
//               date={formatDate(comment.date)}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { comments: [], time: new Date() };
    this.timer = null;
  }

  componentDidMount() {
    const dates = Array.from({ length: 10 }, () => faker.date.recent(14));
    dates.sort((a, b) => b - a);

    const comments = dates.map((date) => ({
      fullName: faker.person.fullName(),
      avatar: faker.image.avatar(),
      date: date,
      comment: faker.word.words({ count: { min: 10, max: 40 } }),
    }));

    this.setState({ comments });

    this.timer = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="container">
        <h1>{this.state.time.toLocaleTimeString()}</h1>
        <div className="form">
          <Form />
        </div>
        <div className="ui comments">
          {this.state.comments.map((comment, i) => (
            <Comment
              key={i}
              avatar={comment.avatar}
              fullName={comment.fullName}
              comment={comment.comment}
              date={formatDate(comment.date)}
            />
          ))}
        </div>
      </div>
    );
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    alert("A name was submitted: " + this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Input your name"
          onChange={this.handleChange}
        />
        <button type="submit">Click me</button>
      </form>
    );
  }
}
