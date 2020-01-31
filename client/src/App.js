import React, { Component } from 'react';
// import io from 'socket.io-client';
import './App.css';


const renderEvent = (props) => {
  const { message, type, timestamp } = props;

  const datetime = `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}.${timestamp.getMilliseconds()}`;

  if (type === "send") {
    return (
      <li>
        {datetime} <b>Sent</b><br/>
        <pre>{JSON.stringify(message, null, 2)}</pre>
      </li>
    );
  } else if (type === "recieve") {
    return (
      <li>
        {datetime} <b>Recieved</b><br/>
        <pre>{JSON.stringify(message, null, 2)}</pre>
      </li>
    );
  } 

  return (<li>{datetime} {message}</li>);
};


export default class App extends Component {
  state = {
    url: '',
    name: '',
    client: null,
    events: [],

    action: "Echo",
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
    const { action, message } = this.state;
    const socketMessage = {
      action,
      message,
    };
    this.state.client.send(JSON.stringify(socketMessage));
    this.addEvent({
      type: "send",
      message: socketMessage,
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
           <label htmlFor="action">
             Action
             <select value={this.state.action} onChange={(e) => {this.setState({action: e.target.value})}}>
               <option value="Echo">Echo</option> 
               <option value="Quote">Quote of the Day</option>
             </select>
           </label>
           <label htmlFor="message" >
             Message
             <input name="message" onChange={(e) => {this.setState({message: e.target.value})}} />
           </label>
           <input type="submit" value="Send" />
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
