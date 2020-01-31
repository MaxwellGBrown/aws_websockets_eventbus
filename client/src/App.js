import React, { Component } from 'react';
// import io from 'socket.io-client';
import './App.css';


const renderEvent = (props) => {
  const { message, type, timestamp } = props;

  const datetime = `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}.${timestamp.getMilliseconds()}`;

  if (type === "send") {
    return (<li>{datetime} Sent: {message}</li>);
  } else if (type === "recieve") {
    return (<li>{datetime} Recieved: {message}</li>);
  } 

  return (<li>{datetime} {message}</li>);
};


export default class App extends Component {
  state = {
    url: '',
    name: '',
    client: null,
    events: [],
    message: "",
  };

  connect = (e) => {
    e.preventDefault();
    const url = `${this.state.url}?name=${this.state.name}`;
    const client = new WebSocket(url);

    client.addEventListener('open', (e) => {
      this.addEvent({
        type: "connect",
        message: `Connected to ${this.state.url}`,
      });
    });

    client.addEventListener('message', this.recieveMessage);
    client.addEventListener('close', this.onDisconnect);
    this.setState({client});
  }

  onDisconnect = () => {
    this.addEvent({
      type: "disconnect",
      message: `Disconnected from ${this.state.url}`,
    });
    this.setState({client: null});
  }

  addEvent = (message) => {
    message["timestamp"] = new Date();
    this.setState((state) => ({events: [...state.events, message]}))
  }

  sendMessage = (e) => {
    e.preventDefault();
    const { message } = this.state;
    this.state.client.send(message);
    this.addEvent({
      type: "send",
      message: message,
    });
  }

  recieveMessage = (e) => {
    const { data } = e;
    this.addEvent({
      type: "recieve",
      message: data,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.connect}>
          <fieldset disabled={this.state.client}>
            <label htmlFor="url">
              Websocket URL
              <input required name="url" onChange={(e) => {this.setState({url: e.target.value})}} />
            </label>
            <label>
              Name
              <input required name="name" onChange={(e) => {this.setState({name: e.target.value})}} />
            </label>
            <input type="submit" value="Connect" />
          </fieldset>
        </form>

        <form onSubmit={this.sendMessage}>
          <fieldset disabled={!this.state.client}>
           <label htmlFor="message" >
             Send message
             <input name="message" onChange={(e) => {this.setState({message: e.target.value})}} />
             <input type="submit" value="Send" />
           </label>
           <input type="button" value="disconnect" onClick={() => {this.state.client.close()}} />
          </fieldset>
        </form>
        
        <ol style={{
          listStyle: "none",
        }}>
          {this.state.events.map(renderEvent)}
        </ol>
      </div>
    );
  }
};
