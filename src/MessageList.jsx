import React, {Component} from 'react';
import Message from "./Message.jsx";
import Notices from "./Notices.jsx";


class MessageList extends Component {

  render() {

    return (
      <main className="messages">
        {this.props.messages.map((currentMessage) => {
          return <Message message={currentMessage} key={currentMessage.id} />
          })
        }

        {this.props.notices.map((currentNotice)=>{
          return <Notices notice={currentNotice} key={currentNotice.id} />
        })
      }
      </main>
    );
  }
}

export default MessageList;
