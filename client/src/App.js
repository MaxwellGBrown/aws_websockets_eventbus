import React, { Component } from 'react';
// import io from 'socket.io-client';
import './App.css';

export default class App extends Component {
  state = {
    url: '',
    client: null,
    events: [],
    message: "",
  };

  connect = (e) => {
    e.preventDefault();
    const client = new WebSocket(this.state.url);

    client.addEventListener('open', (e) => {
      this.addEvent(`Connected to ${this.state.url}`);
    });

    client.addEventListener('message', this.recieveMessage);
    client.addEventListener('close', this.onDisconnect);
    this.setState({client});
  }

  onDisconnect = () => {
    this.addEvent(`Disconnected from ${this.state.url}`);
    this.setState({client: null});
  }

  addEvent = (message) => {
    this.setState((state) => ({events: [...state.events, message]}))
  }

  sendMessage = (e) => {
    e.preventDefault();
    const { message } = this.state;
    this.state.client.send(message);
    this.addEvent(`Sent: "${message}"`)
  }

  recieveMessage = (e) => {
    const { data } = e;
    this.addEvent(`Recieved: "${data}"`);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.connect}>
          <fieldset disabled={this.state.client}>
            <label htmlFor="url">
              Websocket URL
              <input name="url" onChange={(e) => {this.setState({url: e.target.value})}} />
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
        
        <ol>
          {this.state.events.map((e, idx) => <li key={idx}>{e}</li>)}
        </ol>
      </div>
    );
  }
};
