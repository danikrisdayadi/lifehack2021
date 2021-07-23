import React, {useState} from 'react';
import {Button, Form, FormGroup} from 'react-bootstrap';

const McqQuestion = ({...props}) => {
    // const [question, setQuestion] = useState(
    //     {
    //         content: "Are we gonna survive?",
    //         file: null,
    //         answer: "Yes",
    //         options: ["Yes", "No", "Maybe", "Maybe Not"],
    //         questionNumber: 1,
    //         totalQuestions: 10,
    //         id: 100
    //     }
    // );
    let question = props.question
    const CHOICES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
    let idx = -1;
    let answer=""
    
    function onClickChoice(choice) {
        //to temporarily store the option chosen
        console.log("ANSWER");
        console.log(choice.target.value)
        //set the temporary answer to be the chosen one
        answer = choice.target.value
    }
    //store the answer to backend and go to next question
    function onClickNextQuestion(choice) {
        //set path to next question
        console.log("NEXT")
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-10 col-lg-offset-1">
                    <div id="question" style={{textAlign:"left"}}>
                        {/* <h4>Question {question.questionNumber}/{question.totalQuestions}</h4> */}
                        <p>{question.content}</p>
                    </div>
                    <ul className="list-group" style={{textAlign:"left"}}>
                        {
                          question.options.map(choice => {
                            idx++;
                            return (
                              <li className="list-group-item" key={choice}>
                                <input type="radio" onClick={(value)=> onClickChoice(value)} name={question.id} value={choice} /> {CHOICES[idx]}. {choice}
                              </li>
                            )
                          })
                        }
                    </ul>
                    <br></br>
                </div>
            </div>
        </div>
    );
    
};

export default McqQuestion;
