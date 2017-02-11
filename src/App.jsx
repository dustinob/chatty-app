import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import Chatbar from "./Chatbar.jsx";
import Notices from "./Notices.jsx";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages: [],
      notices: [],
      usersOnline: 0
    }

    this.addMessage = this.addMessage.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  //Change usersname function
  updateUsername(event) {
    if(event.keyCode === 13) {
      const prevName = this.state.currentUser.name;
      console.log(event.target.value)
       this.setState({currentUser: {name: event.target.value}}, () => {
       this.webSocket.send(JSON.stringify(
          { type: "postNotification",
            id: 0,
            content: `${prevName} has changed their name to ${this.state.currentUser.name}`
        }))
      });
    }
  }

  //Send message
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
      console.log("Incoming Type:", incomingObj.type);

      if(incomingObj.type === "incomingNotification"){
        //console.log("Rohit Notification");
        let notices = [];
        notices = this.state.notices.concat(incomingObj);
        console.log(notices);
        this.setState({notices: notices});
      }
      else if (incomingObj.type === "userCount" ) {
        this.setState({usersOnline: incomingObj.content});
      }
      else {
        let messages = [];
        messages = this.state.messages.concat(incomingObj);
        //console.log("data type", messages);
          this.setState({messages: messages});
      }
    }
  }

  //Render main app page
  render() {
    return(
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-users">
            {this.state.usersOnline} Users Online
          </span>
        </nav>
        <MessageList messages={this.state.messages} notices={this.state.notices}/>
        <Chatbar
          updateUsername={this.updateUsername}
          currentUser={this.state.currentUser.name}
          addMessage={this.addMessage} />
      </div>
    );
  }
}

export default App;
