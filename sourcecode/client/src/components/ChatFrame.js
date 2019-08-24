import Message from "../subcomponents/Message";
import BlackButton from "../subcomponents/BlackButton";
import React from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import { addMessage } from "../actions/chatAction";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import "./ChatFrame.css";
import "../subcomponents/BlackButton.css";

// class ChatInput extends React.Component {
//   render() {
//     return (
//       <FormGroup controlId="formBasicEmail">
//         <FormControl
//           className="m-0"
//           type="text"
//           placeholder="Type a message..."
//         />
//       </FormGroup>
//     );
//   }
// }

class ChatFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  componentWillMount() {
    console.log(this.props.user);
    console.log(this.props.messages);
  }

  componentDidUpdate() {
    document
      .querySelector(".cfr-message-frame")
      .scrollTo(0, document.querySelector(".cfr-message-frame").scrollHeight);
  }

  handleTextChange(e) {
    this.setState({ message: e.target.value });
  }

  handleClick() {
    if (this.state.message.trim() == "") return;

    this.setState({ message: "" });

    this.props.addMessage(
      this.state.message,
      this.props.user.avatar,
      this.props.user.displayedName,
      "response"
    );
  }

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.handleClick();
      //Do stuff in here
    }
  }

  //socket on recieve message
  // {   
  //   this.props.addMessage(
  //     message.message,
  //     message.avatar,
  //     message.displayedName,
  //     "recieve"
  //   );
  // }

  render() {
    return (
      <div className="cfr-chat-frame">
        <div className="cfr-display-frame">
          <div className="cfr-title">{this.props.opponent.username}</div>
          <div className="cfr-message-frame">
            {this.props.messages.map(message => {
              return (
                <Message
                  type={message.type}
                  message={message.message}
                  username={this.props.username}
                  avatar={message.avatar}
                />
              );
            })}
          </div>
        </div>
        <div className="cfr-input-frame">
          <FormGroup className="cfr-input" controlId="formBasicEmail">
            <FormControl
              className="m-0"
              type="text"
              value={this.state.message}
              placeholder="Type a message..."
              onChange={e => {
                this.handleTextChange(e);
              }}
              onKeyPress={this.enterPressed.bind(this)}
            />
          </FormGroup>
          {/* <ChatInput className="cfr-input" /> */}
          <Button
            type="submit"
            className="black-button cfr-btn"
            onClick={this.handleClick.bind(this)}
          >
            >
          </Button>
          {/* <BlackButton className="cfr-btn" text=">" /> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, index) {
  return {
    messages: state.chatReducer.messages,
    user: state.userReducer,
    opponent: state.gameReducer.opponent
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage(message, avatar, username, type) {
      dispatch(addMessage(message, avatar, username, type));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatFrame);
