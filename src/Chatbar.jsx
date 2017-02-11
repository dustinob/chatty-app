import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          defaultValue={this.props.currentUser}
          placeholder="Your Name (Optional)"
          onKeyUp={this.props.updateUsername}/>
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyUp={this.props.addMessage}/>
      </footer>
    );
  }
}

export default Chatbar;
