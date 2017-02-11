import React, {Component} from 'react';

class Notices extends Component {

  render() {
    return (
      <div className="message-system">
        <div className="message-system">
          <span>{this.props.notice.content}</span>
        </div>
      </div>
    );
  }
}

export default Notices;
