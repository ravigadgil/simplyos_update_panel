import React from 'react';
import { stat } from 'fs';

export default class UpdateTest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test_id: props.match.params.id,
            struct_questions: [],
            questions: [],
            currentIndex: 0,
            answers: [],
        }
    }

    componentDidMount() {
        fetch(`https://simpleosbackend.herokuapp.com/test/${this.state.test_id}`)
    .then(res => res.json())
    .then(data => {
        let myData = [];
        data.questions.forEach(question => {
        let myQuestion = question;
        myQuestion = myQuestion.replace('A.', '\n\nA.');
        myQuestion = myQuestion.replace('B.', '\nB.');
        myQuestion = myQuestion.replace('C.', '\nC.');
        myQuestion = myQuestion.replace('D.', '\nD.');
        myQuestion = myQuestion.replace('E.', '\nE.');
        myQuestion = myQuestion.replace('F.', '\nF.');
        myQuestion = myQuestion.replace('G.', '\nG.');
        myQuestion = myQuestion.replace('H.', '\nH.');
        myQuestion = myQuestion.replace('I.', '\nI.');
        myData.push(myQuestion);
      });
      this.setState({struct_questions: myData, answers: data.answers, questions: data.questions}, () => {
        document.getElementById('answers_input').value = this.state.struct_questions[0];
        document.getElementById('answer_input').value = this.state.answers[0];
        this.set_select()
      })
    });
    }

    set_select = () => {
        let output = '';
        this.state.questions.forEach((o, i) => {
            output += `<option>${i + 1}</option>`
        })
        document.getElementById('questions_select').innerHTML = output;
    }

    update_test = () => {
        if(window.confirm('Are you sure?')) {
            let question = document.getElementById('answers_input').value;
            let answer = document.getElementById('answer_input').value;
            question = question.replace('\n\nA. ', 'A. ');
            question = question.replace('\nB. ', 'B. ');
            question = question.replace('\nC. ', 'C. ');
            question = question.replace('\nD. ', 'D. ');
            question = question.replace('\nE. ', 'E. ');
            question = question.replace('\nF. ', 'F. ');
            question = question.replace('\nG. ', 'G. ');
            question = question.replace('\nH. ', 'H. ');
            question = question.replace('\nI. ', 'I. ');
            let stateQuestions = this.state.questions;
            stateQuestions[this.state.currentIndex] = question;
            let stateAnswers = this.state.answers;
            stateAnswers[this.state.currentIndex] = answer;
            this.setState({questions: stateQuestions, answers: stateAnswers}, () => {
                console.log(this.state.questions)
                console.log(this.state.answers);
            })
        }
    }

    select_question = () => {
        const e = document.getElementById("questions_select");
        const id = e.options[e.selectedIndex].value;
        this.setState({currentIndex: id - 1}, () => {
            document.getElementById('answers_input').value = this.state.struct_questions[this.state.currentIndex];
            document.getElementById('answer_input').value = this.state.answers[this.state.currentIndex];
        })
    }

    update_to_server = () => {
        if(window.confirm('Are you sure?')) {
            const data = {answers: this.state.answers, questions: this.state.questions}
            fetch('https://simpleosbackend.herokuapp.com/update/test/' + this.state.test_id, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                  }
            }).then(res => {
                alert('Updated')
            })
            .catch(err => console.log(err))
        }
    }

    render() {
        return(
            <div>
                <div className="container" style={{marginTop: 10}}>
                    <h1>2. Select the question</h1>
                    <select className="form-control" id='questions_select'>

                    </select>
                    <br />
                    <button onClick={this.select_question} style={{marginBottom: 10, width: "100%"}} className="btn btn-primary">Select Question</button>
                    <br /><br />
                    <h1>3. Update Question</h1>
                    <hr />
                    <h5>Question</h5>
                    <textarea style={{minHeight: 200}} className="form-control" id="answers_input"></textarea>
                    <br />
                    <h5>Answer</h5>
                    <input className="form-control" id="answer_input" />
                    <button onClick={this.update_test} style={{marginTop: 10, width: "100%"}} className="btn btn-primary">Update Question</button>
                    <br /><br />
                    <br /><br />
                    <h1>5. Save changes to server</h1>
                    <button onClick={this.update_to_server} style={{marginBottom: 10, width: "100%"}} className="btn btn-primary">Save</button>
                    <br /><br />
                </div>
            </div>
        );
    }
}