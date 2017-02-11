import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import Chatbar from "./Chatbar.jsx";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }

    this.addMessage = this.addMessage.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }


  updateUsername(event) {
    if(event.keyCode === 13) {
      const prevName = this.state.currentUser.name;
      console.log(event.target.value)
       this.setState({currentUser: {name: event.target.value}}, () => {
       this.webSocket.send(JSON.stringify(
          { type: "postNotification",
            content: `${prevName} has changed their name to ${this.state.currentUser.name}`
        }))
      });
    }
  }

  addMessage(event) {
    if(event.keyCode === 13) {
      const newMessage = {
        type: "postMessage",
        id: 0,
        username: this.state.currentUser.name,
        content: event.target.value
      }
        this.webSocket.send(JSON.stringify(newMessage));
    }
  }

  componentDidMount() {
    this.webSocket = new WebSocket("ws://localhost:4000");

    this.webSocket.onmessage = (event) => {
      console.log(event);
      const incomingObj = JSON.parse(event.data);

    let messages = [];

    messages = this.state.messages.concat(incomingObj);
      this.setState({messages: messages});
    }
  }

  render() {
    return(
      <div>
        <MessageList
          messages={this.state.messages} />
        <Chatbar
          updateUsername={this.updateUsername}
          currentUser={this.state.currentUser.name}
          addMessage={this.addMessage} />
      </div>
    );
  }
}







export default App;
