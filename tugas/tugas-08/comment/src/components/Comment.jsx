import { Component } from "react";

// export default function Comment(props) {
//   const { avatar, fullName, date, comment } = props;

//   return (
//     <div className="comment">
//       <a className="avatar">
//         <img src={avatar} />
//       </a>
//       <div className="content">
//         <a className="author">{fullName}</a>
//         <div className="metadata">
//           <span className="date">{date}</span>
//         </div>
//         <div className="text">{comment}</div>
//       </div>
//     </div>
//   );
// }

export default class Comment extends Component {
  render() {
    const { avatar, fullName, date, comment } = this.props;

    return (
      <div className="comment">
        <a className="avatar">
          <img src={avatar} alt={fullName} />
        </a>
        <div className="content">
          <a className="author">{fullName}</a>
          <div className="metadata">
            <span className="date">{date}</span>
          </div>
          <div className="text">{comment}</div>
        </div>
      </div>
    );
  }
}
