import React, { Component } from 'react';
import '../styles/LandingPage.css'

class LandingPage extends Component {
  constructor(){
    super();
    
    this.state = {
      userName: '',
      userQuestion: [],
    }
  }

  handleNameChange = (e) => {
    this.setState({
      userName: e.target.value,
    })
  }
  
  handleQuestionChange = (e) => {
    const questionString= e.target.value;
    // taking the question and converting it to an array
    const questionArray = questionString.trim().split(' ');
    
    this.setState({
      userQuestion: questionArray,
    })
  }

  clickHandler = (e) => {
    if (this.state.userName === '') {
      alert('Please enter your name.');
      return false;
    } else if (this.state.userQuestion.length === 0) {
      alert('Please enter a question.');
      return false;
    } else {
      this.props.storeUserQuestion(e, this.state.userQuestion);
      this.props.storeUserName(e, this.state.userName);
    };
  }

  
  render() {
    return (
      <main>
          <header className="head">
            <h1 className="headTitle">Welcome to the Nygma Machine</h1>
            <h2 className="headInstructions">Ask your question for some advice</h2>
            <div className="headImageContainer">
              <img src="" alt="" className="headImage"/>
            </div>
          </header>

          <form action="" className="form">
            <label htmlFor="" className="formLabel">What's your name?</label>
            <input type="text" placeholder="Batman" id="userName" onChange={this.handleNameChange} className="formInput"/>
            <label htmlFor="" className="formLabel">Ask your question</label>
            <input type="text" placeholder="Does the Joker think I'm cute?" id="userQuestion" onChange={this.handleQuestionChange} className="formInput"/>
            <button type="submit" onClick={this.clickHandler} className="formButton">Submit</button>
          </form>
        </main>
    )
  }
}

export default LandingPage;