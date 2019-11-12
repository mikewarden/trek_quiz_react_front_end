import React from 'react';
import './App.css';
import Quiz from './components/Quiz.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      player: "player1",
      score: 0,
      selected: "",
      answer: "c",
      quiz: [],
      winLose: "",
      count: 1,
      randArray: [],
      randLink: 30
    }
  }

  getDataFromAPI=()=>{
    var numArray = [];
    var randNum;
    var randLink;
    for (let i = 3; i < 67; i++) {
      if (i !== 8 && i !== 17 && i !== 29) {
        numArray.push(i);
      }
    }
    randNum = Math.floor(Math.random() * numArray.length);
     this.setState(prevState => ({ 
      randArray: [...prevState.randArray, randNum]
    }));
    
    if (this.state.randArray.includes(randNum)) {
      numArray.splice(randNum);
    } 
    randLink = numArray[randNum];
    if (randLink ===  undefined) {
      randLink = 30;
      this.setState({choice: ""})
    } else {
      randLink = numArray[randNum];
    }
    this.setState({randLink: randLink});  
  
    fetch("http://localhost:8080/quiz/" + randLink)
    .then((res) => res.json())
    .then((response)=>{
      this.setState({quiz:response});
    }).catch((err) => console.log(err));
    console.log(this.state.randArray);
  }

   handleChecked = (event) => {
      this.setState({selected: event.target.value});
  };

   handleClick = () => {
    this.getDataFromAPI();

    if (this.state.randLink === 30) {
      this.setState({count: this.state.count});
    }
    else if (this.state.selected === this.state.quiz.answer) {
      this.setState({score: this.state.score + 1});
      this.setState({count: this.state.count + 1});
      }
    else if (this.state.selected !== this.state.quiz.answer){
      this.setState({count: this.state.count + 1});
    }
    this.calculateScore();
  }

  calculateScore = () => {
    if (this.state.count === 20) {
      console.log("end game.");
      if (this.state.score > 15) {
        this.setState({winLose: "You scored " + this.state.score + " out of 20." + " You really know your Trek!"});
      }
      else if (this.state.score > 10 && this.state.score <= 15) {
        this.setState({winLose: "You scored " + this.state.score + " out of 20." + " Not bad, not bad at all."});
      }
      else if (this.state.score > 5 && this.state.score <= 10) {
        this.setState({winLose: "You scored " + this.state.score + " out of 20." + " Might wanna go back and watch some episodes."});
      }
      else if (this.state.score <= 5) {
        this.setState({winLose: "You scored " + this.state.score + " out of 20." + " This isn't Star Wars."});
      }
      
    }
  }

  render() { 
    return (
      <div id="main-container" className="App">
        <h1 id="header-font">Star Trek Quiz</h1>
        <h4>Test your knowledge!</h4>
        <h4>Question {this.state.count}</h4>
        <div id="question-zone">{this.state.quiz.question}</div>
        <Quiz getDataFromAPI={this.getDataFromAPI} quiz={this.state.quiz} handleClick={this.handleClick} handleChecked={this.handleChecked} />
        <h1>{this.state.winLose}</h1>
      </div>
    )
  }
}

export default App;
