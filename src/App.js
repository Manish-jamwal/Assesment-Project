import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";

import "./App.css";

class App extends Component {
  questionInSinglePage = 3;
  questions = [
    {
      value: 0,
      id: 1,
      question: "Are you a good listener ?",
      error: false,
    },
    {
      value: 0,
      id: 2,
      question: "How often do you manage to meet your deadlines at work ?",
      error: false,
    },
    {
      value: 0,
      id: 3,
      question: "I understand why people are being difficult to me ",
      error: false,
    },
    {
      value: 0,
      id: 4,
      question: "How good are you to lead a team ?",
      error: false,
    },
    {
      value: 0,
      id: 5,
      question: "How good are you on teamwork ?",
      error: false,
    },
    {
      value: 0,
      id: 6,
      question: "Rate your behaviour with others ",
      error: false,
    },
    {
      value: 0,
      id: 7,
      question: "how efficiently do you work under pressure ?",
      error: false,
    },
    {
      value: 0,
      id: 8,
      question: "How much do you think you are fit for this job ?",
      error: false,
    },
    {
      value: 0,
      id: 9,
      question: "I understand why people good to me ?",
      error: false,
    },
    {
      value: 0,
      id: 10,
      question: "How much do you like to code ?",
      error: false,
    },
  ]
  state = {
    questions: this.questions,
    current_page: 1,
    progress_bar: 0,
    total_score: 0,
    completed: false,
  };
  totalPages = Math.ceil(
    this.state.questions.length / this.questionInSinglePage
  );

  changePage = (value) => {
    this.setState({ current_page: this.state.current_page + value });
  };

  sliderHandler = (value, index) => {
    const questionsCopy = [...this.state.questions];
    const state = {};

    if (!questionsCopy[index].value) {
      state.progress_bar =
        this.state.progress_bar + (1 / this.state.questions.length) * 100;
    }
    state.total_score =
      this.state.total_score - questionsCopy[index].value + value;
    questionsCopy[index].value = value;
    questionsCopy[index].error = false;
    state.questions = questionsCopy;
    return this.setState(state);
  };

  submitHandler = () => this.setState({ completed: true });

  resetHandler = () =>{
    const resetQuestions = this.questions.map(ques => {
      ques.value = 0;
      return ques;
    });

    this.setState({
      completed: false,
      current_page: 1,
      progress_bar: 0,
      total_score: 0,
      questions: resetQuestions
    });

  }

  render() {
    const marks = [
      {
        value: 1,
        label: "1",
      },
      {
        value: 2,
        label: "2",
      },
      {
        value: 3,
        label: "3",
      },
      {
        value: 4,
        label: "4",
      },
      {
        value: 5,
        label: "5",
      },
      {
        value: 6,
        label: "6",
      },
      {
        value: 7,
        label: "7",
      },
      {
        value: 8,
        label: "8",
      },
      {
        value: 9,
        label: "9",
      },
      {
        value: 10,
        label: "10",
      },
    ];

    return (
      <React.Fragment>
        <div className="container-fluid mainBody">
          {!this.state.completed ? (
            <React.Fragment>
              <div className="row mx-0 mt-3 progressRaw">
                <div className="col-11 px-0">
                  <div className="progressWrapper position-relative">
                    <span className="progress-bg bg-white d-inline-block position-absolute w-100"></span>
                    {!!this.state.progress_bar && (
                      <span
                        className="progress-bar d-inline-block position-absolute"
                        style={{
                          width: `${this.state.progress_bar}%`,
                          backgroundColor:
                            this.state.progress_bar > 66
                              ? "#6fff7a"
                              : this.state.progress_bar > 33
                              ? "#fffb6f"
                              : "#ff6f6f",
                        }}
                      ></span>
                    )}
                  </div>
                </div>
                <div className="col-1 text-right text-md-center px-0">
                  <span className="d-inline-block position-relative percentageText">
                    {this.state.progress_bar}%
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <span className="d-inline-block assesmentProgress">
                    Assesment Progress
                  </span>
                </div>
              </div>
              {this.state.questions.map(({ question, id, value }, index) => {
                return index + 1 <=
                  this.state.current_page * this.questionInSinglePage &&
                  index + 1 >
                    (this.state.current_page - 1) *
                      this.questionInSinglePage ? (
                  <React.Fragment key={id}>
                    <div className="row my-4">
                      <div className="col-12">
                        <div className="questionWrapper bg-white">
                          <p className="question p-4 mb-0">{question}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 text-left">
                        <span className="d-inline-block assesmentProgress">
                          Never
                        </span>
                      </div>
                      <div className="col-6 text-right">
                        <span className="d-inline-block assesmentProgress">
                          Always
                        </span>
                      </div>
                      <div className="col-12" style={{ overflow: "hidden" }}>
                        <div className="rangeWrapper">
                          <Slider
                            value={value}
                            min={1}
                            max={10}
                            onChange={(event, value) =>
                              this.sliderHandler(value, index)
                            }
                            style={{ width: "94%", left: "3%" }}
                            aria-labelledby="discrete-slider-custom"
                            step={1}
                            valueLabelDisplay="auto"
                            marks={marks}
                          />
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ) : null;
              })}

              <div className="row my-3 ">
                <div className="col-6 text-left">
                  <button
                    className="btn d-inline-block pageTransfer"
                    disabled={this.state.current_page === 1}
                    onClick={() => this.changePage(-1)}
                  >
                    Prev
                  </button>
                </div>
                <div className="col-6 text-right">
                  <button
                    className="btn d-inline-block pageTransfer"
                    onClick={() => this.changePage(1)}
                    disabled={this.state.current_page === this.totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>

              {this.state.current_page === this.totalPages &&
                !this.state.completed && (
                  <div className="row">
                    <div className="col-12 text-center">
                      <button
                        className="finishButton px-5 py-2"
                        type="button"
                        onClick={this.submitHandler}
                      >
                        <span className="finishText text-white">
                          {"Finish >"}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
            </React.Fragment>
          ) : (
            <React.Fragment>
            <div className="row my-4 justify-content-center">
              <div className="col-4">
              <div className="questionWrapper bg-white text-center p-4">
                  <b>Score : <span className="d-inline-block">
                  {(this.state.total_score /
                      (this.state.questions.length * 10)) *
                      100}%</span></b>
              </div>
              </div>
           
            </div>
            <div className="row">
                  <div className="col-12 text-center">
                    <button
                      className="finishButton px-5 py-2"
                      type="button"
                      onClick={this.resetHandler}
                    >
                      <span className="finishText text-white">
                        {"Take again"}
                      </span>
                    </button>
                  </div>
                </div>
                </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
