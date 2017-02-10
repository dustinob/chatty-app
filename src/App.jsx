import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import Chatbar from "./Chatbar.jsx";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    this.webSocket = new WebSocket("ws://localhost:4000");

    
  }

  addMessage(event) {
    // console.log(event.target.value);
    if(event.keyCode === 13) {
      const newMessage = {
        id:3,
        username: this.state.currentUser.name,
        content: event.target.value
      }
        this.webSocket.send(JSON.stringify(newMessage));

        // const messages = this.state.messages.concat(newMessage)
        // this.setState({messages: messages})
    }
  }

  render() {
    return(
      <div>
        <MessageList
          messages={this.state.messages} />
        <Chatbar
          currentUser={this.state.currentUser}
          addMessage={this.addMessage} />
      </div>
    );
  }
}







export default App;
