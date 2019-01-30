import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      nameError: "",
      emailError: "",
      completed: false,
      new: true,
      submit: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTwo = this.handleChangeTwo.bind(this);
    this.submitinput = this.submitinput.bind(this);
  }

  handleChange(event) {
    var name = event.target.value;
    this.setState({name: name});

    if (name.length === 0) {
      this.setState({nameError: "Please type in your name", submit: false});
    }
    else if (name.length < 5) {
      this.setState({nameError: "Name must be at least 5 characters long", submit: false});
    }
    else {
      this.setState({nameError: ""});
      if (this.state.email.length > 0) {
        this.setState({submit: true});
      }
    }
  }

  handleChangeTwo(event) {
    var email = event.target.value;
    this.setState({email: email});
    
    if ( !(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(email) ) {
      this.setState({emailError: "Not a valid email", submit: false});
    }
    else {
      this.setState({emailError: ""});
      if (this.state.name.length > 0) {
        this.setState({submit: true});
      }
    }
  }

  submitinput(e) {
    e.preventDefault();
    this.setState({completed: true, new: false});
    this.showresults();
  }

  showresults() {
    return (
      <div id = "results">
        <p>Thanks for submitting your info, {this.state.name}!</p>
        <p>Your email is: {this.state.email}</p>
        <button class = "btn btn-info" onClick = {() => this.goback()}>
        Thanks!</button>
      </div>
    )
  }

  goback() {
    this.setState({completed: false, new: true, name: "", email: "", submit: false});
  }

  fillForm() {
    return (
      <div id = "inputs">
        {this.state.completed ? this.showresults() : null}

        <form onSubmit = {this.submitinput}>
          <div className = "error">{this.state.nameError}</div>
          Name: <input type = "text" name = "name" value = {this.state.name}
          onChange = {this.handleChange}></input>
          <br></br><br></br>

          <div className = "error">{this.state.emailError}</div>
          Email: <input type = "text" name = "email" value = {this.state.email}
          onChange = {this.handleChangeTwo}></input>
          <br></br><br></br>
          
          <input type = "submit" class = "btn btn-primary" disabled = {!this.state.submit}></input>
        </form>
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        <h1>Validated Form</h1><br></br>
        {this.state.completed ? this.showresults() : null}
        {this.state.new ? this.fillForm(): null}
      </div>
    );
  }
}

export default App;
